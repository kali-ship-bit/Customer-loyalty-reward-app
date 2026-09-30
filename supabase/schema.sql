-- ============================================================
-- LoyaltyApp — Supabase schema
-- Run this in your Supabase project: SQL Editor → New query → paste → Run
-- ============================================================

-- Needed for gen_random_uuid()
create extension if not exists pgcrypto;

-- ------------------------------------------------------------
-- profiles: one row per authenticated user
-- ------------------------------------------------------------
create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  full_name text not null default '',
  email text,
  avatar_url text default 'https://randomuser.me/api/portraits/women/44.jpg',
  points_balance integer not null default 500,
  lifetime_points integer not null default 500,
  tier text not null default 'Gold',
  member_since date not null default current_date,
  member_code text unique,
  created_at timestamptz not null default now()
);

alter table public.profiles enable row level security;

create policy "Profiles are viewable by owner"
  on public.profiles for select
  using (auth.uid() = id);

create policy "Profiles are editable by owner"
  on public.profiles for update
  using (auth.uid() = id);

-- ------------------------------------------------------------
-- notification_preferences: one row per user
-- ------------------------------------------------------------
create table if not exists public.notification_preferences (
  user_id uuid primary key references public.profiles(id) on delete cascade,
  push_enabled boolean not null default true,
  promo_emails boolean not null default true,
  order_updates boolean not null default true,
  points_alerts boolean not null default true
);

alter table public.notification_preferences enable row level security;

create policy "Notif prefs owner select"
  on public.notification_preferences for select using (auth.uid() = user_id);
create policy "Notif prefs owner update"
  on public.notification_preferences for update using (auth.uid() = user_id);
create policy "Notif prefs owner insert"
  on public.notification_preferences for insert with check (auth.uid() = user_id);

-- ------------------------------------------------------------
-- Auto-create profile + notification_preferences on signup
-- ------------------------------------------------------------
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer set search_path = public
as $$
begin
  insert into public.profiles (id, full_name, email, member_code)
  values (
    new.id,
    coalesce(new.raw_user_meta_data ->> 'full_name', split_part(new.email, '@', 1)),
    new.email,
    '#' || upper(substr(md5(new.id::text), 1, 4)) || '-' || upper(substr(md5(new.id::text || 'x'), 1, 4)) || '-' || upper(substr(md5(new.id::text || 'y'), 1, 2))
  );
  insert into public.notification_preferences (user_id) values (new.id);

  insert into public.notifications (user_id, title, body) values
    (new.id, 'Welcome to LoyaltyApp!', 'You''ve been credited 500 welcome points. Start redeeming rewards today.'),
    (new.id, 'Your Gold Tier is active', 'Earn 10 points for every ₦100 spent at any partner outlet nationwide.');

  insert into public.vouchers (user_id, title, code, expires_at) values
    (new.id, '10% Off Suya Platter', 'SUYA10-WELCOME', now() + interval '14 days'),
    (new.id, 'Free Puff Puff (6 pcs)', 'PUFFPUFF-FREE', now() + interval '7 days');

  insert into public.activity (user_id, title, points_delta, kind) values
    (new.id, 'Welcome bonus', 500, 'bonus');

  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- ------------------------------------------------------------
-- rewards: shared catalog, readable by any signed-in user
-- ------------------------------------------------------------
create table if not exists public.rewards (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  description text,
  category text not null default 'all', -- all | drinks | food | discounts
  points_cost integer not null,
  icon text default 'solar:cup-star-outline',
  badge_label text,
  is_featured boolean not null default false,
  created_at timestamptz not null default now()
);

alter table public.rewards enable row level security;
create policy "Rewards are readable by anyone signed in"
  on public.rewards for select using (auth.role() = 'authenticated');

insert into public.rewards (title, description, category, points_cost, icon, badge_label, is_featured)
values
  ('Chilled Chapman', 'The house special, served ice cold', 'drinks', 200, 'solar:cup-outline', null, false),
  ('Fresh Zobo Drink', 'Hibiscus zobo with ginger and pineapple', 'drinks', 150, 'solar:cup-paper-outline', null, false),
  ('Bottle of Chi Exotic', 'Any flavor, chilled', 'drinks', 250, 'solar:cup-outline', null, false),
  ('Jollof Rice & Chicken', 'Party-style jollof with grilled chicken', 'food', 900, 'solar:chef-hat-outline', null, false),
  ('Suya Platter (Beef)', 'Spicy grilled beef suya with yaji spice', 'food', 700, 'solar:donut-outline', null, false),
  ('Meat Pie (2 pcs)', 'Freshly baked, flaky pastry', 'food', 400, 'solar:donut-outline', null, false),
  ('Puff Puff (6 pcs)', 'Soft, sweet, and golden fried', 'food', 300, 'solar:donut-outline', null, false),
  ('Moin Moin Special', 'Steamed bean pudding with egg and fish', 'food', 500, 'solar:donut-outline', null, false),
  ('15% Off Next Order', 'Applies to your entire bill', 'discounts', 800, 'solar:ticket-sale-outline', null, false),
  ('Reusable Ankara Tote Bag', 'Locally made, limited print', 'discounts', 1200, 'solar:bag-heart-outline', null, false),
  ('Owambe Party Pack', 'Jollof rice, small chops, and 2 bottles of Chapman — enough to share.', 'food', 1800, 'solar:gift-bold', 'Featured', true)
on conflict do nothing;

-- ------------------------------------------------------------
-- redemptions + activity feed
-- ------------------------------------------------------------
create table if not exists public.redemptions (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles(id) on delete cascade,
  reward_id uuid references public.rewards(id),
  reward_title text not null,
  points_spent integer not null,
  redeemed_at timestamptz not null default now()
);

alter table public.redemptions enable row level security;
create policy "Redemptions owner select" on public.redemptions for select using (auth.uid() = user_id);
create policy "Redemptions owner insert" on public.redemptions for insert with check (auth.uid() = user_id);

create table if not exists public.activity (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles(id) on delete cascade,
  title text not null,
  points_delta integer not null,
  kind text not null default 'earn', -- earn | redeem | bonus
  created_at timestamptz not null default now()
);

alter table public.activity enable row level security;
create policy "Activity owner select" on public.activity for select using (auth.uid() = user_id);
create policy "Activity owner insert" on public.activity for insert with check (auth.uid() = user_id);

-- ------------------------------------------------------------
-- vouchers
-- ------------------------------------------------------------
create table if not exists public.vouchers (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles(id) on delete cascade,
  title text not null,
  code text not null,
  expires_at timestamptz,
  is_active boolean not null default true,
  created_at timestamptz not null default now()
);

alter table public.vouchers enable row level security;
create policy "Vouchers owner select" on public.vouchers for select using (auth.uid() = user_id);
create policy "Vouchers owner update" on public.vouchers for update using (auth.uid() = user_id);

-- ------------------------------------------------------------
-- payment_methods (display metadata only — never store real card numbers)
-- ------------------------------------------------------------
create table if not exists public.payment_methods (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles(id) on delete cascade,
  brand text not null,
  last4 text not null,
  exp_month int not null,
  exp_year int not null,
  is_default boolean not null default false,
  created_at timestamptz not null default now()
);

alter table public.payment_methods enable row level security;
create policy "Payment methods owner all"
  on public.payment_methods for all using (auth.uid() = user_id) with check (auth.uid() = user_id);

-- ------------------------------------------------------------
-- notifications (bell icon feed)
-- ------------------------------------------------------------
create table if not exists public.notifications (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles(id) on delete cascade,
  title text not null,
  body text,
  is_read boolean not null default false,
  created_at timestamptz not null default now()
);

alter table public.notifications enable row level security;
create policy "Notifications owner all"
  on public.notifications for all using (auth.uid() = user_id) with check (auth.uid() = user_id);

-- ------------------------------------------------------------
-- support_tickets (Help & Support contact form)
-- ------------------------------------------------------------
create table if not exists public.support_tickets (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles(id) on delete cascade,
  subject text not null,
  message text not null,
  status text not null default 'open',
  created_at timestamptz not null default now()
);

alter table public.support_tickets enable row level security;
create policy "Support tickets owner all"
  on public.support_tickets for all using (auth.uid() = user_id) with check (auth.uid() = user_id);

-- ------------------------------------------------------------
-- redeem_reward: atomic points deduction + logging
-- ------------------------------------------------------------
create or replace function public.redeem_reward(p_reward_id uuid)
returns void
language plpgsql
security definer set search_path = public
as $$
declare
  v_cost integer;
  v_title text;
  v_balance integer;
begin
  select points_cost, title into v_cost, v_title
    from public.rewards where id = p_reward_id;

  if v_cost is null then
    raise exception 'Reward not found';
  end if;

  select points_balance into v_balance
    from public.profiles where id = auth.uid() for update;

  if v_balance < v_cost then
    raise exception 'Not enough points to redeem this reward';
  end if;

  update public.profiles
    set points_balance = points_balance - v_cost
    where id = auth.uid();

  insert into public.redemptions (user_id, reward_id, reward_title, points_spent)
    values (auth.uid(), p_reward_id, v_title, v_cost);

  insert into public.activity (user_id, title, points_delta, kind)
    values (auth.uid(), 'Redeemed ' || v_title, -v_cost, 'redeem');
end;
$$;

-- ------------------------------------------------------------
-- use_voucher: mark a voucher used + log activity
-- ------------------------------------------------------------
create or replace function public.use_voucher(p_voucher_id uuid)
returns void
language plpgsql
security definer set search_path = public
as $$
declare
  v_title text;
begin
  select title into v_title from public.vouchers
    where id = p_voucher_id and user_id = auth.uid() and is_active = true;

  if v_title is null then
    raise exception 'Voucher not found or already used';
  end if;

  update public.vouchers set is_active = false where id = p_voucher_id;

  insert into public.activity (user_id, title, points_delta, kind)
    values (auth.uid(), 'Used voucher: ' || v_title, 0, 'redeem');
end;
$$;
