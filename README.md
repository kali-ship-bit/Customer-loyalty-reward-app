# LoyaltyApp - Customer Rewards

A customer loyalty web app. Customers sign up, verify their email, buy products to earn points, and redeem those points for rewards.

## Features
- Sign up with email verification, login, forgot and reset password
- Browse products, mark favorites, and buy products to earn points
- Points earned = product points x quantity
- Referral bonus: when a referred customer makes a first purchase, the referrer gets 100 points
- Rewards catalogue with featured rewards and point redemption
- Wallet, points history, purchase history and notifications
- Profile page with photo upload (Cloudinary) and account settings

## Tech Stack
- Frontend: React, Vite, Tailwind CSS, DaisyUI, React Router
- Backend: Node.js, Express, MongoDB (Mongoose), JWT, bcrypt, Nodemailer, Cloudinary

## Project Structure
- `src/` - React frontend
- `backend/` - Express API (controllers, models, routes, middleware)

## Run Locally
You need Node.js, a MongoDB database (Atlas or a replica set, because purchases and redemptions use transactions), a Cloudinary account and an email account for sending codes.

### 1. Backend
Open a terminal in the `backend` folder and run:

    npm install

Create a file called `backend/.env` with these values:

    MONGODB_URI=your_mongodb_connection_string
    JWT_SECRET=your_secret
    JWT_EXPIRES_IN=7d
    EMAIL_USER=your_email
    EMAIL_PASSWORD=your_email_app_password
    CLOUDINARY_CLOUD_NAME=your_cloud_name
    CLOUDINARY_API_KEY=your_key
    CLOUDINARY_API_SECRET=your_secret
    PORT=3000

Start it with `npm run dev`. The API runs on http://localhost:3000

### 2. Frontend
In the project root folder run:

    npm install

Create a file called `.env` with:

    VITE_API_URL=http://localhost:3000/api

Start it with `npm run dev` and open http://localhost:5173

## Roles
Signup always creates a `USER`. An `ADMIN` account is created by changing the role in the database. The app has no admin page yet, so admin actions are done through the API.

## Run Locally
You need Node.js, a MongoDB database (Atlas or a replica set, because purchases and redemptions use transactions), a Cloudinary account and an email account for sending codes.

### 1. Backend
Open a terminal in the `backend` folder and run:

    npm install

Create a file called `backend/.env` with these values:

    MONGODB_URI=your_mongodb_connection_string
    JWT_SECRET=your_secret
    JWT_EXPIRES_IN=7d
    EMAIL_USER=your_email
    EMAIL_PASSWORD=your_email_app_password
    CLOUDINARY_CLOUD_NAME=your_cloud_name
    CLOUDINARY_API_KEY=your_key
    CLOUDINARY_API_SECRET=your_secret
    PORT=3000

Start it with `npm run dev`. The API runs on http://localhost:3000

### 2. Frontend
In the project root folder run:

    npm install

Create a file called `.env` with:

    VITE_API_URL=http://localhost:3000/api

Start it with `npm run dev` and open http://localhost:5173

## Roles
Signup always creates a `USER`. An `ADMIN` account is created by changing the role in the database. The app has no admin page yet, so admin actions are done through the API.

## API Documentation
Base URL: `/api`. Protected routes need the header `Authorization: Bearer <token>`. The token comes from login.

### Auth - /api/auth
| Method | Endpoint | Access |
|---|---|---|
| POST | /createUser | Public |
| POST | /verifyEmail (email, code) | Public |
| POST | /resendVerificationCode (email) | Public |
| POST | /loginUser (email, password) | Public |
| POST | /forgotPassword (email) | Public |
| POST | /resetPassword (email, code, newPassword) | Public |
| GET | /getUser | Logged in |
| PATCH | /updateUser (firstName, lastName, phone) | Logged in |
| PATCH | /changePassword (currentPassword, newPassword) | Logged in |
| PATCH | /uploadProfilePhoto (file: profilePhoto) | Logged in |
| PATCH | /deactivateAccount | User |
| GET | /getAllUsers | Admin |
| PATCH | /deactivateUser/:id and /activateUser/:id | Admin |

### Products - /api/products
| Method | Endpoint | Access |
|---|---|---|
| GET | /getAllProducts and /getProduct/:id | Logged in |
| POST | /createProduct (name, size, description, price, quantity, points) | Admin |
| PATCH | /updateProduct/:id, /deactivateProduct/:id, /reactivateProduct/:id | Admin |
| DELETE | /deleteProduct/:id | Admin |

## API Documentation
Base URL: `/api`. Protected routes need the header `Authorization: Bearer <token>`. The token comes from login.

### Auth - /api/auth
| Method | Endpoint | Access |
|---|---|---|
| POST | /createUser | Public |
| POST | /verifyEmail (email, code) | Public |
| POST | /resendVerificationCode (email) | Public |
| POST | /loginUser (email, password) | Public |
| POST | /forgotPassword (email) | Public |
| POST | /resetPassword (email, code, newPassword) | Public |
| GET | /getUser | Logged in |
| PATCH | /updateUser (firstName, lastName, phone) | Logged in |
| PATCH | /changePassword (currentPassword, newPassword) | Logged in |
| PATCH | /uploadProfilePhoto (file: profilePhoto) | Logged in |
| PATCH | /deactivateAccount | User |
| GET | /getAllUsers | Admin |
| PATCH | /deactivateUser/:id and /activateUser/:id | Admin |

### Products - /api/products
| Method | Endpoint | Access |
|---|---|---|
| GET | /getAllProducts and /getProduct/:id | Logged in |
| POST | /createProduct (name, size, description, price, quantity, points) | Admin |
| PATCH | /updateProduct/:id, /deactivateProduct/:id, /reactivateProduct/:id | Admin |
| DELETE | /deleteProduct/:id | Admin |

### Purchases - /api/purchases
| Method | Endpoint | Access |
|---|---|---|
| POST | /createPurchase (productId, quantity) | User |
| GET | /getMyPurchaseHistory | User |
| GET | /getPurchaseById/:id | User, Admin |
| GET | /getAllPurchaseHistory and /getCustomerPurchaseHistory/:id | Admin |

### Points - /api/points
| Method | Endpoint | Access |
|---|---|---|
| GET | /getMyPointsHistory | User |
| GET | /getAllPointsHistory | Admin |

### Rewards - /api/rewards
| Method | Endpoint | Access |
|---|---|---|
| GET | /getRewards, /featured, /getMyRedemptionHistory | User |
| POST | /redeemReward (rewardId) | User |
| POST | /createReward (name, description, pointsRequired, quantity, featured) | Admin |
| GET | /getAllRewards and /getAllRedemptionHistory | Admin |
| PATCH | /deactivateReward/:id, /reactivateReward/:id, /toggleFeatured/:id | Admin |

### Favorites - /api/favorites
| Method | Endpoint | Access |
|---|---|---|
| GET | / | User |
| POST and DELETE | /:productId | User |

## Project Status
- Done: customer frontend, backend API, authentication, points, purchases, rewards, favorites
- Not built: admin dashboard

## Team
- Member name - what they built
- Member name - what they built
- Member name - what they built

