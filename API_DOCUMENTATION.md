# Customer Loyalty App API Documentation

## 1. Overview

The Customer Loyalty App API provides endpoints for user authentication, account management, product management, purchases, loyalty points, rewards, and reward redemption.

### Base URL

**Production backend:**

`https://customer-loyalty-reward-app-uldx.onrender.com`

API routes are mounted under `/api`.

For example, the login endpoint is:

`POST /api/auth/loginUser`

### Authentication

Protected endpoints require authentication through the application's authentication middleware.

* **Public:** No authentication required.
* **USER:** Authenticated users with the USER role.
* **ADMIN:** Authenticated administrators with the ADMIN role.
* **USER / ADMIN:** Either authorized role may access the endpoint.

The exact authentication header format should be confirmed against the implementation of `authMiddleware.js`.

---

## 2. Authentication and User Management

**Route prefix:** `/api/auth`

| Method | Endpoint              | Access             | Description                                    |
| ------ | --------------------- | ------------------ | ---------------------------------------------- |
| POST   | `/createUser`         | Public             | Register a new user.                           |
| POST   | `/loginUser`          | Public             | Authenticate a user and log in.                |
| POST   | `/forgotPassword`     | Public             | Initiate the password-reset process.           |
| POST   | `/resetPassword`      | Public             | Reset a user's password.                       |
| PATCH  | `/uploadProfilePhoto` | Authenticated user | Upload a profile photo.                        |
| GET    | `/getUser`            | Authenticated user | Retrieve the authenticated user's information. |
| GET    | `/getAllUsers`        | ADMIN              | Retrieve user records.                         |
| PATCH  | `/updateUser`         | Authenticated user | Update user information.                       |
| PATCH  | `/changePassword`     | Authenticated user | Change the authenticated user's password.      |
| PATCH  | `/deactivateAccount`  | USER               | Deactivate the authenticated user's account.   |
| PATCH  | `/deactivateUser/:id` | ADMIN              | Deactivate a user by ID.                       |
| PATCH  | `/activateUser/:id`   | ADMIN              | Activate a user by ID.                         |

### Email Verification

The following routes are currently commented out in the supplied route file and are therefore not registered:

* `POST /api/auth/verifyEmail`
* `POST /api/auth/resendVerificationCode`

### Profile Photo Upload

The `uploadProfilePhoto` endpoint expects a multipart form-data upload using the field name `profilePhoto`.

---

## 3. Product Management

**Route prefix:** `/api/products`

| Method | Endpoint                 | Access       | Description               |
| ------ | ------------------------ | ------------ | ------------------------- |
| POST   | `/createProduct`         | ADMIN        | Create a product.         |
| GET    | `/getAllProducts`        | USER / ADMIN | Retrieve products.        |
| GET    | `/getProduct/:id`        | USER / ADMIN | Retrieve a product by ID. |
| PATCH  | `/updateProduct/:id`     | ADMIN        | Update a product.         |
| PATCH  | `/deactivateProduct/:id` | ADMIN        | Deactivate a product.     |
| PATCH  | `/reactivateProduct/:id` | ADMIN        | Reactivate a product.     |
| DELETE | `/deleteProduct/:id`     | ADMIN        | Delete a product.         |

---

## 4. Purchase Management

**Route prefix:** `/api/purchases`

All routes in this group require authentication.

| Method | Endpoint                          | Access       | Description                                         |
| ------ | --------------------------------- | ------------ | --------------------------------------------------- |
| POST   | `/createPurchase`                 | USER         | Create a purchase.                                  |
| GET    | `/getMyPurchaseHistory`           | USER         | Retrieve the authenticated user's purchase history. |
| GET    | `/getAllPurchaseHistory`          | ADMIN        | Retrieve purchase history across users.             |
| GET    | `/getCustomerPurchaseHistory/:id` | ADMIN        | Retrieve a customer's purchase history by user ID.  |
| GET    | `/getPurchaseById/:id`            | USER / ADMIN | Retrieve a purchase by ID.                          |

---

## 5. Rewards and Redemption

**Route prefix:** `/api/rewards`

| Method | Endpoint                   | Access | Description                                           |
| ------ | -------------------------- | ------ | ----------------------------------------------------- |
| POST   | `/createReward`            | ADMIN  | Create a reward.                                      |
| GET    | `/getRewards`              | USER   | Retrieve available rewards.                           |
| GET    | `/getAllRewards`           | ADMIN  | Retrieve all rewards.                                 |
| POST   | `/redeemReward`            | USER   | Redeem a reward using loyalty points.                 |
| GET    | `/getMyRedemptionHistory`  | USER   | Retrieve the authenticated user's redemption history. |
| GET    | `/getAllRedemptionHistory` | ADMIN  | Retrieve redemption history across users.             |
| PATCH  | `/deactivateReward/:id`    | ADMIN  | Deactivate a reward.                                  |
| PATCH  | `/reactivateReward/:id`    | ADMIN  | Reactivate a reward.                                  |
| PATCH  | `/toggleFeatured/:id`      | ADMIN  | Toggle a reward's featured status.                    |
| GET    | `/featured`                | USER   | Retrieve featured rewards.                            |

---

## 6. Request and Response Details

The endpoint tables above document the routes and access restrictions declared in the supplied Express route files.

Request bodies, query parameters, response examples, and specific error responses should be documented from the corresponding controllers and middleware to ensure accuracy.

## 7. Error Handling

The backend provides centralized error handling for requests. Common HTTP status codes that clients may encounter include:

* **200 OK:** Request completed successfully.
* **201 Created:** A resource was created successfully, where returned by the relevant controller.
* **400 Bad Request:** The request contains invalid data.
* **401 Unauthorized:** Authentication is missing or invalid.
* **403 Forbidden:** The user lacks the required permission.
* **404 Not Found:** The requested resource or route was not found.
* **500 Internal Server Error:** An unexpected server error occurred.

The exact status code and response body for each endpoint depend on its controller implementation.

## 8. Loyalty Points

**Route prefix:** `/api/points`

All endpoints require authentication.

| Method | Endpoint               | Access | Description                                                   |
| ------ | ---------------------- | ------ | ------------------------------------------------------------- |
| GET    | `/getMyPointsHistory`  | USER   | Retrieve the authenticated user's points transaction history. |
| GET    | `/getAllPointsHistory` | ADMIN  | Retrieve points transaction history across users.             |

**Example full endpoint:**

`GET https://customer-loyalty-reward-app-uldx.onrender.com/api/points/getMyPointsHistory`

---

## 9. Favorites

**Route prefix:** `/api/favorites`

All endpoints require authentication. These routes are restricted to users with the USER role.

| Method | Endpoint      | Access | Description                                 |
| ------ | ------------- | ------ | ------------------------------------------- |
| POST   | `/:productId` | USER   | Add a product to the user's favorites.      |
| DELETE | `/:productId` | USER   | Remove a product from the user's favorites. |
| GET    | `/`           | USER   | Retrieve the user's favorite products.      |

**Examples of full endpoints:**

* `POST /api/favorites/PRODUCT_ID`
* `DELETE /api/favorites/PRODUCT_ID`
* `GET /api/favorites/`

Replace `PRODUCT_ID` with the actual product ID.

---

## 10. Notifications

**Route prefix:** `/api/notifications`

All endpoints require authentication. The supplied routes do not specify an ADMIN-only restriction; access is controlled by the authentication middleware and the notification controller.

| Method | Endpoint                    | Access             | Description                                      |
| ------ | --------------------------- | ------------------ | ------------------------------------------------ |
| GET    | `/getMyNotifications`       | Authenticated user | Retrieve the authenticated user's notifications. |
| PATCH  | `/markAllNotificationsRead` | Authenticated user | Mark all of the user's notifications as read.    |
| PATCH  | `/markNotificationRead/:id` | Authenticated user | Mark a specific notification as read.            |
| DELETE | `/deleteReadNotifications`  | Authenticated user | Delete read notifications.                       |

**Example full endpoint:**

`GET https://customer-loyalty-reward-app-uldx.onrender.com/api/notifications/getMyNotifications`

---

## 11. Authentication and Authorization Summary

The API uses authentication middleware to protect private routes and role-based authorization middleware to restrict access to specific operations.

* **Public routes:** User registration and login, plus the password-reset routes currently registered in `authRoutes.js`.
* **USER routes:** User-specific purchases, points history, favorites, rewards, and redemption.
* **ADMIN routes:** Product and reward management, user administration, and administrative history endpoints.
* **Authenticated-user routes:** Profile operations and notifications, subject to the controller's own checks.

Protected requests must include the authentication credentials expected by the backend's authentication middleware.

---

## 12. Documentation Notes

This document lists routes and access restrictions based on the Express route files provided. It does not yet specify the exact request body, query parameters, response format, or validation rules for each endpoint.

Those details should be added by reviewing the corresponding controllers and middleware.

The password-reset endpoints are currently registered. Confirm that they work correctly before presenting them as supported features in the final submission.

# Purchase API Documentation

## 1. Overview

The Purchase API allows authenticated users to purchase products, earn loyalty points, and view their purchase history. Administrators can review purchases across users and retrieve individual purchase records.

**Production Base URL**

`https://customer-loyalty-reward-app-uldx.onrender.com/api`

**Route prefix:** `/purchases`

All purchase endpoints require authentication.

## 2. Create a Purchase

Creates a purchase for the authenticated user, deducts the purchased quantity from product stock, updates the user's points balance, and records the points transaction.

* **Method:** `POST`
* **Endpoint:** `/purchases/createPurchase`
* **Access:** Authenticated USER
* **Full URL:** `https://customer-loyalty-reward-app-uldx.onrender.com/api/purchases/createPurchase`

### Request Headers

http
Content-Type: application/json
Authorization: Bearer YOUR_JWT_TOKEN

The authorization format shown above should be confirmed against the authentication middleware.

### Request Body

{
  "productId": "PRODUCT_OBJECT_ID",
  "quantity": 2
}

| Field       | Type   | Required | Description                                             |
| ----------- | ------ | -------- | ------------------------------------------------------- |
| `productId` | String | Yes      | MongoDB ObjectId of the product.                        |
| `quantity`  | Number | Yes      | Positive integer representing the quantity to purchase. |

The backend calculates the total price and points earned using the product's stored price and points values.

### Successful Response — `201 Created`

{
  "success": true,
  "message": "Purchase created successfully",
  "data": {
    "purchase": {
      "_id": "PURCHASE_OBJECT_ID",
      "user": "USER_OBJECT_ID",
      "product": "PRODUCT_OBJECT_ID",
      "productName": "Example Product",
      "quantity": 2,
      "pricePerUnit": 10000,
      "totalPrice": 20000,
      "pointsEarned": 100,
      "status": "Completed"
    },
    "point": {
      "_id": "POINT_OBJECT_ID",
      "user": "USER_OBJECT_ID",
      "type": "Earned",
      "points": 100,
      "description": "Points earned from purchase of Example Product",
      "purchase": "PURCHASE_OBJECT_ID"
    },
    "pointsBalance": 500,
    "totalPointsEarned": 800,
    "quantity": 8
  }
}

*The values above are illustrative. Actual response fields and generated IDs depend on the database and Mongoose schemas.*

### Business Logic

When a purchase succeeds, the backend:

1. Validates the product ID and purchase quantity.
2. Checks that the product exists, is available, and has sufficient stock.
3. Retrieves the authenticated user.
4. Calculates the total price and points earned.
5. Creates the purchase record.
6. Reduces product stock and updates product availability when stock reaches zero.
7. Updates the user's points balance and total points earned.
8. Records a points transaction.
9. Awards a 100-point referral bonus to an eligible referrer on the referred user's first purchase.
10. Commits the database transaction.
11. Attempts to create a purchase notification.

Notification creation failure does not reverse a completed purchase.

### Possible Error Responses

| Status | Message                                 | Condition                                      |
| ------ | --------------------------------------- | ---------------------------------------------- |
| `400`  | `Invalid product ID`                    | The product ID is invalid.                     |
| `400`  | `Product ID and quantity are required`  | Required purchase information is missing.      |
| `400`  | `Quantity must be a positive number`    | Quantity is not a positive integer.            |
| `400`  | `This product is currently unavailable` | The product is unavailable.                    |
| `400`  | `Only X item(s) are available`          | Requested quantity exceeds stock.              |
| `404`  | `Product not found`                     | The product does not exist.                    |
| `404`  | `User not found`                        | The authenticated user record cannot be found. |
| `500`  | `Unable to complete purchase`           | An unexpected purchase error occurs.           |

## 3. Get My Purchase History

Retrieves purchase records belonging to the authenticated user, with product details populated.

* **Method:** `GET`
* **Endpoint:** `/purchases/getMyPurchaseHistory`
* **Access:** Authenticated USER

### Successful Response — `200 OK`

{
  "success": true,
  "message": "Purchases retrieved successfully",
  "data": {
    "purchases": []
  }
}

The `purchases` array contains the user's purchase records, sorted from newest to oldest. Product information includes the product name, size, description, price, and points.

### Error Response — `500 Internal Server Error`

{
  "success": false,
  "message": "Failed to retrieve purchase history",
  "data": null
}

## 4. Get All Purchase History

Retrieves purchase records across users. User and product details are populated.

* **Method:** `GET`
* **Endpoint:** `/purchases/getAllPurchaseHistory`
* **Access:** ADMIN

### Successful Response — `200 OK`

{
  "success": true,
  "message": "Purchases retrieved successfully",
  "data": []
}

The `data` array contains purchase records, sorted from newest to oldest.

### Error Response — `500 Internal Server Error`

{
  "success": false,
  "message": "Failed to retrieve all purchases",
  "data": null
}

## 5. Get a Customer's Purchase History

Retrieves the purchase history for a specific user.

* **Method:** `GET`
* **Endpoint:** `/purchases/getCustomerPurchaseHistory/:id`
* **Access:** ADMIN

### Path Parameter

| Parameter | Type   | Description                   |
| --------- | ------ | ----------------------------- |
| `id`      | String | MongoDB ObjectId of the user. |

### Example

`GET /api/purchases/getCustomerPurchaseHistory/USER_OBJECT_ID`

### Successful Response — `200 OK`

{
  "success": true,
  "message": "Purchase retrieved successfully",
  "data": {
    "user": {
      "id": "USER_OBJECT_ID",
      "firstName": "Example",
      "lastName": "Customer",
      "email": "customer@example.com",
      "phone": "0000000000",
      "pointsBalance": 500
    },
    "purchases": []
  }
}

### Possible Error Responses

* `404 Not Found` — `User not found`
* `500 Internal Server Error` — `Failed to retrieve purchase`

## 6. Get a Purchase by ID

Retrieves a single purchase by its MongoDB ID. Administrators can retrieve any existing purchase. Ordinary users can retrieve only their own purchases.

* **Method:** `GET`
* **Endpoint:** `/purchases/getPurchaseById/:id`
* **Access:** USER or ADMIN

### Path Parameter

| Parameter | Type   | Description                       |
| --------- | ------ | --------------------------------- |
| `id`      | String | MongoDB ObjectId of the purchase. |

### Successful Response — `200 OK`

{
  "success": true,
  "message": "Purchase retrieved successfully",
  "data": {
    "_id": "PURCHASE_OBJECT_ID",
    "user": {
      "_id": "USER_OBJECT_ID",
      "firstName": "Example",
      "lastName": "Customer",
      "email": "customer@example.com"
    },
    "product": {
      "_id": "PRODUCT_OBJECT_ID",
      "name": "Example Product",
      "size": "Medium",
      "quantity": 8,
      "price": 10000,
      "points": 50
    }
  }
}

*This response is illustrative and omits other possible purchase fields.*

### Possible Error Responses

| Status | Message                                            | Condition                                          |
| ------ | -------------------------------------------------- | -------------------------------------------------- |
| `403`  | `You do not have permission to view this purchase` | A USER attempts to access another user's purchase. |
| `404`  | `Purchase not found`                               | No purchase exists with the specified ID.          |
| `500`  | `Failed to retrieve purchase`                      | An unexpected error occurs.                        |

## 7. Implementation Notes

* Purchase creation uses a MongoDB session and transaction to coordinate changes to the purchase, product, user, and points records.
* Purchase creation requires a MongoDB deployment that supports transactions.
* Product stock and the user's points balance are updated as part of the purchase process.
* Notifications are created after the purchase transaction commits.
* Exact schema fields and response details should be verified against the corresponding Mongoose models.

## 5. Loyalty Points API

All endpoints are prefixed with `/api/points` and require authentication.

### 5.1 Get My Points History

Retrieves the authenticated user's points transactions, with associated purchase details where available. Results are sorted from newest to oldest.

* **Endpoint:** `GET /api/points/getMyPointsHistory`
* **Access:** Authenticated users with the `USER` role
* **Authentication:** Bearer token required
* **Request body:** None

**Success response — `200 OK`**

{
  "success": true,
  "message": "Your points history retrieved successfully",
  "data": {
    "transactions": [
      {
        "_id": "POINT_TRANSACTION_ID",
        "user": "USER_ID",
        "type": "Earned",
        "points": 50,
        "description": "Points earned from purchase of Banana Flavoured ice-cream",
        "purchase": {
          "_id": "PURCHASE_ID",
          "productName": "Banana Flavoured ice-cream",
          "quantity": 1,
          "pricePerUnit": 10000,
          "totalPrice": 10000,
          "pointsEarned": 50,
          "status": "Completed"
        },
        "createdAt": "2026-10-01T12:00:00.000Z"
      }
    ]
  }
}

*The response values above are illustrative. Actual fields depend on the Point and Purchase schemas. The `purchase` field may be absent or null when a transaction has no associated purchase.*

**Error response — `500 Internal Server Error`**

{
  "success": false,
  "message": "Unable to retrieve points history",
  "data": null
}

### 5.2 Get All Points History

Retrieves all points transactions for administrative review. Each transaction includes selected user details and associated purchase information where available. Results are sorted from newest to oldest.

* **Endpoint:** `GET /api/points/getAllPointsHistory`
* **Access:** Authenticated users with the `ADMIN` role
* **Authentication:** Bearer token required
* **Request body:** None

**Success response — `200 OK`**

{
  "success": true,
  "message": "All points history retrieved successfully",
  "data": {
    "transactions": [
      {
        "_id": "POINT_TRANSACTION_ID",
        "user": {
          "_id": "USER_ID",
          "firstName": "Jane",
          "lastName": "Doe",
          "email": "jane@example.com"
        },
        "type": "Earned",
        "points": 50,
        "description": "Points earned from purchase",
        "purchase": {
          "_id": "PURCHASE_ID",
          "productName": "Banana Flavoured ice-cream",
          "quantity": 1,
          "pricePerUnit": 10000,
          "totalPrice": 10000,
          "pointsEarned": 50,
          "status": "Completed"
        },
        "createdAt": "2026-10-01T12:00:00.000Z"
      }
    ]
  }
}

*The response values above are illustrative. Actual fields depend on the Point and Purchase schemas.*

**Error response — `500 Internal Server Error`**

{
  "success": false,
  "message": "Unable to retrieve points history",
  "data": null
}

### Notes

* Users can view only their own points history through the user endpoint.
* Administrators can view all points transactions through the admin endpoint.
* Both endpoints return transactions in descending `createdAt` order.
* These endpoints retrieve transaction history; they do not create, modify, or delete points.


## 6. Favorites API

All endpoints are prefixed with `/api/favorites`. Every endpoint requires authentication and is restricted to users with the `USER` role.

### 6.1 Add a Product to Favorites

Adds a product to the authenticated user's favorites.

* **Endpoint:** `POST /api/favorites/:productId`
* **Access:** Authenticated users with the `USER` role
* **Authentication:** Bearer token required
* **Request body:** None
* **URL parameter:** `productId` — the ID of the product to add.

**Success response — `200 OK`**

{
  "success": true,
  "message": "Product added to favorites",
  "data": {
    "favoriteProducts": ["PRODUCT_ID"]
  }
}

**Possible error responses**

Product not found — `404 Not Found`

{
  "success": false,
  "message": "Product not found"
}

Product already in favorites — `400 Bad Request`

{
  "success": false,
  "message": "Product is already in your favorites"
}

Server error — `500 Internal Server Error`

{
  "success": false,
  "message": "Error details"
}

### 6.2 Remove a Product from Favorites

Removes a product ID from the authenticated user's favorites list.

* **Endpoint:** `DELETE /api/favorites/:productId`
* **Access:** Authenticated users with the `USER` role
* **Authentication:** Bearer token required
* **Request body:** None
* **URL parameter:** `productId` — the ID of the product to remove.

**Success response — `200 OK`**

{
  "success": true,
  "message": "Product removed from favorites",
  "data": {
    "favoriteProducts": []
  }
}

The example shows an empty favorites list; the actual response contains the user's remaining favorite product IDs.

**Server error — `500 Internal Server Error`**

{
  "success": false,
  "message": "Error details"
}

### 6.3 Get My Favorite Products

Retrieves the authenticated user's favorite products, populated with their product details.

* **Endpoint:** `GET /api/favorites`
* **Access:** Authenticated users with the `USER` role
* **Authentication:** Bearer token required
* **Request body:** None

**Success response — `200 OK`**

{
  "success": true,
  "data": {
    "favoriteProducts": [
      {
        "_id": "PRODUCT_ID",
        "name": "Banana Flavoured ice-cream",
        "price": 10000,
        "points": 50
      }
    ]
  }
}

The product fields shown are illustrative. The actual populated fields depend on the Product schema.

**Server error — `500 Internal Server Error`**

{
  "success": false,
  "message": "Error details"
}

### Notes

* Favorites are stored on the user's document in `favoriteProducts`.
* Adding an already-favorited product returns a `400 Bad Request`.
* Removing a product that is not in the favorites list still returns success, provided no server error occurs.
* These endpoints do not create, update, or delete the product itself.

## 4. Rewards and Redemption API

All endpoints are prefixed with `/api/rewards`. Authentication is required for every endpoint.

### 4.1 Create a Reward

Creates a new reward. Active users are notified about the new reward when notification creation succeeds.

* **Method:** `POST`
* **Endpoint:** `/api/rewards/createReward`
* **Access:** `ADMIN`
* **Authentication:** Bearer token required

**Request body**

```json
{
  "name": "Free Ice Cream",
  "description": "Redeem points for a free ice cream.",
  "pointsRequired": 100,
  "quantity": 20,
  "featured": false
}
```

`featured` is optional and defaults to `false`. The other fields are required. `pointsRequired` must be a positive whole number, `quantity` must be a non-negative whole number, and a reward with no stock cannot be featured.

**Success response — `201 Created`**

```json
{
  "success": true,
  "message": "Reward created successfully",
  "data": {
    "reward": {
      "_id": "REWARD_ID",
      "name": "Free Ice Cream",
      "description": "Redeem points for a free ice cream.",
      "pointsRequired": 100,
      "quantity": 20,
      "isAvailable": true,
      "featured": false
    }
  }
}
```

**Possible errors**

* `400 Bad Request` — missing or invalid reward details, or attempting to feature a reward with no stock.
* `409 Conflict` — a reward with the same name already exists.
* `500 Internal Server Error` — unable to create the reward.

### 4.2 Get Available Rewards

Returns available rewards with stock remaining, sorted by the lowest points requirement first.

* **Method:** `GET`
* **Endpoint:** `/api/rewards/getRewards`
* **Access:** `USER`
* **Authentication:** Bearer token required

**Success response — `200 OK`**

```json
{
  "success": true,
  "message": "Available rewards retrieved successfully",
  "data": {
    "rewards": []
  }
}
```

### 4.3 Get All Rewards

Returns all rewards, including unavailable rewards, sorted from newest to oldest.

* **Method:** `GET`
* **Endpoint:** `/api/rewards/getAllRewards`
* **Access:** `ADMIN`
* **Authentication:** Bearer token required

**Success response — `200 OK`**

```json
{
  "success": true,
  "message": "All rewards retrieved successfully",
  "data": {
    "rewards": []
  }
}
```

### 4.4 Redeem a Reward

Redeems one unit of a reward and deducts the required points from the authenticated user's balance. The operation uses a MongoDB transaction to coordinate the stock update, points deduction, redemption record, and points transaction.

* **Method:** `POST`
* **Endpoint:** `/api/rewards/redeemReward`
* **Access:** `USER`
* **Authentication:** Bearer token required

**Request body**

```json
{
  "rewardId": "REWARD_ID"
}
```

**Success response — `201 Created`**

```json
{
  "success": true,
  "message": "Reward redeemed successfully",
  "data": {
    "redemption": {
      "_id": "REDEMPTION_ID",
      "user": "USER_ID",
      "reward": "REWARD_ID",
      "pointsUsed": 100,
      "status": "Completed"
    },
    "pointTransaction": {
      "_id": "POINT_TRANSACTION_ID",
      "user": "USER_ID",
      "type": "Redeemed",
      "points": 100,
      "description": "Points redeemed for Free Ice Cream"
    },
    "reward": "Free Ice Cream",
    "pointsUsed": 100,
    "remainingPoints": 250,
    "remainingRewardQuantity": 19
  }
}
```

The response values are illustrative. The remaining balance and stock depend on the actual transaction.

**Possible errors**

* `400 Bad Request` — missing or invalid reward ID, reward unavailable or out of stock, insufficient points, or invalid redemption details.
* `404 Not Found` — reward or user not found.
* `409 Conflict` — a concurrent redemption request conflicts with this transaction.
* `500 Internal Server Error` — unable to complete the redemption.

When the last unit is redeemed, the reward becomes unavailable and is automatically removed from featured rewards. A notification is attempted after the transaction; notification failure does not undo a successful redemption.

### 4.5 Get My Redemption History

Returns the authenticated user's redemption records, including selected reward details, sorted from newest to oldest.

* **Method:** `GET`
* **Endpoint:** `/api/rewards/getMyRedemptionHistory`
* **Access:** `USER`
* **Authentication:** Bearer token required

**Success response — `200 OK`**

```json
{
  "success": true,
  "message": "Your redemption history retrieved successfully",
  "data": {
    "redemptions": []
  }
}
```

Each redemption may include populated reward fields such as `name`, `description`, and `pointsRequired`.

### 4.6 Get All Redemption History

Returns redemption records for administrative review, including selected user and reward details, sorted from newest to oldest.

* **Method:** `GET`
* **Endpoint:** `/api/rewards/getAllRedemptionHistory`
* **Access:** `ADMIN`
* **Authentication:** Bearer token required

**Success response — `200 OK`**

```json
{
  "success": true,
  "message": "All redemption history retrieved successfully",
  "data": {
    "redemptions": []
  }
}
```

### 4.7 Deactivate a Reward

Marks a reward as unavailable and removes its featured status.

* **Method:** `PATCH`
* **Endpoint:** `/api/rewards/deactivateReward/:id`
* **Access:** `ADMIN`
* **Authentication:** Bearer token required

Replace `:id` with the reward's MongoDB ID.

**Possible responses**

* `200 OK` — reward deactivated successfully.
* `400 Bad Request` — invalid reward ID.
* `404 Not Found` — reward not found.
* `500 Internal Server Error` — unable to deactivate reward.

### 4.8 Reactivate a Reward

Makes a previously deactivated reward available again, provided it has stock remaining.

* **Method:** `PATCH`
* **Endpoint:** `/api/rewards/reactivateReward/:id`
* **Access:** `ADMIN`
* **Authentication:** Bearer token required

**Possible responses**

* `200 OK` — reward reactivated successfully.
* `400 Bad Request` — invalid reward ID or reward has no stock.
* `404 Not Found` — reward not found.
* `500 Internal Server Error` — unable to reactivate reward.

### 4.9 Toggle Featured Reward

Switches a reward's featured status. Only available rewards with stock can be newly featured.

* **Method:** `PATCH`
* **Endpoint:** `/api/rewards/toggleFeatured/:id`
* **Access:** `ADMIN`
* **Authentication:** Bearer

## 2. Product Management API

All endpoints are prefixed with `/api/products`. Authentication is required for all endpoints.

### 2.1 Create a Product

Creates a new product.

* **Method:** `POST`
* **Endpoint:** `/api/products/createProduct`
* **Access:** `ADMIN`
* **Authentication:** Bearer token required

**Request body**

```json
{
  "name": "Banana Flavoured ice-cream",
  "size": "Medium",
  "description": "Creamy banana-flavoured ice cream.",
  "price": 10000,
  "quantity": 86,
  "points": 50
}
```

`size` is optional. The other fields are required. Price and points must be non-negative numbers; quantity must be a non-negative integer.

**Success response — `201 Created`**

```json
{
  "success": true,
  "message": "Product created successfully",
  "data": {
    "_id": "PRODUCT_ID",
    "name": "Banana Flavoured ice-cream",
    "size": "Medium",
    "description": "Creamy banana-flavoured ice cream.",
    "price": 10000,
    "quantity": 86,
    "points": 50,
    "isAvailable": true,
    "isManuallyDeactivated": false
  }
}
```

**Possible errors**

* `400 Bad Request` — required fields are missing, values are invalid, or a product with the same name already exists.
* `500 Internal Server Error` — unable to create the product.

### 2.2 Get All Products

Retrieves products. The returned results depend on the authenticated user's role.

* **Method:** `GET`
* **Endpoint:** `/api/products/getAllProducts`
* **Access:** `USER`, `ADMIN`
* **Authentication:** Bearer token required

**Behavior**

* `USER`: receives products that are available and have stock remaining.
* `ADMIN`: receives all products, including unavailable products.

**Success response — `200 OK`**

```json
{
  "success": true,
  "message": "Products retrieved successfully",
  "data": []
}
```

**Error response — `500 Internal Server Error`**

```json
{
  "success": false,
  "message": "Unable to retrieve products",
  "data": null
}
```

### 2.3 Get a Product by ID

Retrieves a single product by its MongoDB ID.

* **Method:** `GET`
* **Endpoint:** `/api/products/getProduct/:id`
* **Access:** `USER`, `ADMIN`
* **Authentication:** Bearer token required

**Success response — `200 OK`**

```json
{
  "success": true,
  "message": "Product retrieved successfully",
  "data": {
    "_id": "PRODUCT_ID",
    "name": "Banana Flavoured ice-cream",
    "size": "Medium",
    "description": "Creamy banana-flavoured ice cream.",
    "price": 10000,
    "quantity": 86,
    "points": 50,
    "isAvailable": true,
    "isManuallyDeactivated": false
  }
}
```

**Possible errors**

* `404 Not Found` — product not found.
* `500 Internal Server Error` — unable to retrieve the product.

### 2.4 Update a Product

Updates the supplied product fields. Only fields included in the request body are changed.

* **Method:** `PATCH`
* **Endpoint:** `/api/products/updateProduct/:id`
* **Access:** `ADMIN`
* **Authentication:** Bearer token required

**Example request body**

```json
{
  "price": 12000,
  "quantity": 75,
  "points": 60
}
```

**Possible errors**

* `400 Bad Request` — invalid price, quantity, or points.
* `404 Not Found` — product not found.
* `409 Conflict` — another product already uses the requested name.
* `500 Internal Server Error` — unable to update the product.

When quantity becomes zero, the product is marked unavailable. If quantity increases above zero, it becomes available again unless it was manually deactivated.

### 2.5 Deactivate a Product

Manually marks a product as unavailable.

* **Method:** `PATCH`
* **Endpoint:** `/api/products/deactivateProduct/:id`
* **Access:** `ADMIN`
* **Authentication:** Bearer token required

**Possible responses**

* `200 OK` — product deactivated successfully.
* `404 Not Found` — product not found.
* `500 Internal Server Error` — unable to deactivate the product.

### 2.6 Reactivate a Product

Makes a previously deactivated product available again, provided stock remains.

* **Method:** `PATCH`
* **Endpoint:** `/api/products/reactivateProduct/:id`
* **Access:** `ADMIN`
* **Authentication:** Bearer token required

**Possible responses**

* `200 OK` — product activated successfully.
* `400 Bad Request` — product has no stock.
* `404 Not Found` — product not found.
* `500 Internal Server Error` — unable to activate the product.

### 2.7 Delete a Product

Permanently deletes a product record.

* **Method:** `DELETE`
* **Endpoint:** `/api/products/deleteProduct/:id`
* **Access:** `ADMIN`
* **Authentication:** Bearer token required

**Success response — `200 OK`**

```json
{
  "success": true,
  "message": "Product deleted successfully",
  "data": null
}
```

**Possible errors**

* `404 Not Found` — product not found.
* `500 Internal Server Error` — unable to delete the product.

# Authentication and User Management API

All endpoints are prefixed with `/api/auth`.

Endpoints marked **Protected** require a valid JWT in the request header:

`Authorization: Bearer <token>`

## 1. Create a User

Registers a new customer account.

* **Method:** `POST`
* **Endpoint:** `/api/auth/createUser`
* **Access:** Public

### Request body

```json
{
  "firstName": "Jane",
  "lastName": "Doe",
  "email": "jane@example.com",
  "phone": "08012345678",
  "password": "SecurePass123",
  "referralCode": "ABC123"
}
```

`referralCode` is optional. If supplied, it must belong to an existing user.

### Success response — `201 Created`

```json
{
  "success": true,
  "message": "Account created successfully",
  "data": {
    "id": "USER_ID",
    "firstName": "Jane",
    "lastName": "Doe",
    "email": "jane@example.com",
    "phone": "08012345678",
    "role": "USER",
    "isActive": true,
    "isEmailVerified": false,
    "pointsBalance": 0
  }
}
```

### Possible errors

* `400 Bad Request` — required fields are missing or the referral code is invalid.
* `409 Conflict` — the email address or phone number is already registered.
* `500 Internal Server Error` — user creation failed.

**Note:** Email verification is not currently performed during registration. The account is created as active, but `isEmailVerified` remains `false`.

## 2. Log In

Authenticates a user and returns a JWT.

* **Method:** `POST`
* **Endpoint:** `/api/auth/loginUser`
* **Access:** Public

### Request body

```json
{
  "email": "jane@example.com",
  "password": "SecurePass123"
}
```

### Success response — `200 OK`

```json
{
  "success": true,
  "message": "Login successful",
  "data": {
    "token": "JWT_TOKEN",
    "user": {
      "id": "USER_ID",
      "firstName": "Jane",
      "lastName": "Doe",
      "email": "jane@example.com",
      "phone": "08012345678",
      "role": "USER",
      "isActive": true,
      "isEmailVerified": false,
      "pointsBalance": 0
    }
  }
}
```

### Possible errors

* `400 Bad Request` — email or password is missing.
* `401 Unauthorized` — email or password is incorrect.
* `403 Forbidden` — the account is inactive.
* `500 Internal Server Error` — login failed.

On successful login, the API also creates a welcome-back notification.

## 3. Request a Password Reset

Generates a password-reset code and sends it to the registered email address.

* **Method:** `POST`
* **Endpoint:** `/api/auth/forgotPassword`
* **Access:** Public

### Request body

```json
{
  "email": "jane@example.com"
}
```

### Success response — `200 OK`

```json
{
  "success": true,
  "message": "If an account exists with this email, a password reset code has been sent.",
  "data": null
}
```

The same response is returned when the email address is not registered, helping prevent account discovery.

The reset code expires after **10 minutes**.

### Possible errors

* `400 Bad Request` — email is missing.
* `500 Internal Server Error` — the reset request could not be processed or the email could not be sent.

## 4. Reset Password

Changes a user's password using a valid reset code.

* **Method:** `POST`
* **Endpoint:** `/api/auth/resetPassword`
* **Access:** Public

### Request body

```json
{
  "email": "jane@example.com",
  "code": "123456",
  "newPassword": "NewSecurePass123"
}
```

The new password must contain at least six characters.

### Success response — `200 OK`

```json
{
  "success": true,
  "message": "Password reset successfully. You can now log in.",
  "data": null
}
```

The reset code is cleared after successful use.

### Possible errors

* `400 Bad Request` — required fields are missing, the new password is too short, or the reset code is invalid or expired.
* `500 Internal Server Error` — password reset failed.

## 5. Get Current User Profile

Retrieves the authenticated user's profile.

* **Method:** `GET`
* **Endpoint:** `/api/auth/getUser`
* **Access:** Protected

### Success response — `200 OK`

```json
{
  "success": true,
  "message": "User retrieved successfully",
  "data": {
    "user": {
      "id": "USER_ID",
      "firstName": "Jane",
      "lastName": "Doe",
      "email": "jane@example.com",
      "phone": "08012345678",
      "role": "USER",
      "pointsBalance": 0,
      "totalPointsEarned": 0,
      "isEmailVerified": false,
      "profilePhoto": "",
      "referralCode": "ABC123"
    }
  }
}
```

## 6. Get All Users

Retrieves user records for administration.

* **Method:** `GET`
* **Endpoint:** `/api/auth/getAllUsers`
* **Access:** `ADMIN`
* **Authentication:** Protected

### Success response — `200 OK`

```json
{
  "success": true,
  "message": "Users retrieved successfully",
  "data": {
    "users": []
  }
}
```

### Possible errors

* `401 Unauthorized` — authentication is missing or invalid.
* `403 Forbidden` — the authenticated user does not have the required role.
* `500 Internal Server Error` — users could not be retrieved.

Password and selected email-verification fields are excluded from the query response.

## 7. Update User Profile

Updates the authenticated user's first name, last name, or phone number.

* **Method:** `PATCH`
* **Endpoint:** `/api/auth/updateUser`
* **Access:** Protected

### Request body

At least one supported field must be provided.

```json
{
  "firstName": "Jane",
  "lastName": "Smith",
  "phone": "08098765432"
}
```

### Success response — `200 OK`

```json
{
  "success": true,
  "message": "Profile updated successfully",
  "data": {
    "user": {
      "id": "USER_ID",
      "firstName": "Jane",
      "lastName": "Smith",
      "email": "jane@example.com",
      "phone": "08098765432",
      "role": "USER",
      "pointsBalance": 0
    }
  }
}
```

### Possible errors

* `400 Bad Request` — no supported field was supplied or a field is invalid.
* `409 Conflict` — the phone number is already in use.
* `500 Internal Server Error` — profile update failed.

## 8. Change Password

Changes the password for an authenticated user who knows their current password.

* **Method:** `PATCH`
* **Endpoint:** `/api/auth/changePassword`
* **Access:** Protected

### Request body

```json
{
  "currentPassword": "SecurePass123",
  "newPassword": "NewSecurePass123"
}
```

The new password must be at least six characters and must differ from the current password.

### Success response — `200 OK`

```json
{
  "success": true,
  "message": "Password changed successfully",
  "data": null
}
```

### Possible errors

* `400 Bad Request` — a password is missing, the new password is too short, or the new password matches the current password.
* `401 Unauthorized` — the current password is incorrect.
* `404 Not Found` — user not found.
* `500 Internal Server Error` — password change failed.

## 9. Deactivate Own Account

Allows a user to deactivate their own account.

* **Method:** `PATCH`
* **Endpoint:** `/api/auth/deactivateAccount`
* **Access:** `USER`
* **Authentication:** Protected

### Success response — `200 OK`

```json
{
  "success": true,
  "message": "Account deactivated successfully",
  "data": null
}
```

An inactive account cannot log in until activated again.

## 10. Deactivate a User Account

Allows an administrator to deactivate another user.

* **Method:** `PATCH`
* **Endpoint:** `/api/auth/deactivateUser/:id`
* **Access:** `ADMIN`
* **Authentication:** Protected

Replace `:id` with the target user's MongoDB ID.

### Success response — `200 OK`

```json
{
  "success": true,
  "message": "User account deactivated successfully",
  "data": {
    "id": "USER_ID",
    "firstName": "Jane",
    "lastName": "Doe",
    "email": "jane@example.com",
    "role": "USER",
    "isActive": false
  }
}
```

### Possible errors

* `400 Bad Request` — an administrator cannot use this endpoint to deactivate their own account.
* `404 Not Found` — user not found.
* `500 Internal Server Error` — account deactivation failed.

## 11. Activate a User Account

Allows an administrator to reactivate a user account.

* **Method:** `PATCH`
* **Endpoint:** `/api/auth/activateUser/:id`
* **Access:** `ADMIN`
* **Authentication:** Protected

### Success response — `200 OK`

```json
{
  "success": true,
  "message": "User account activated successfully",
  "data": {
    "user": {
      "id": "USER_ID",
      "firstName": "Jane",
      "lastName": "Doe",
      "email": "jane@example.com",
      "role": "USER",
      "isActive": true
    }
  }
}
```

### Possible errors

* `404 Not Found` — user not found.
* `500 Internal Server Error` — account activation failed.

## 12. Upload Profile Photo

Uploads a profile image to Cloudinary and saves its secure URL to the user's profile.

* **Method:** `PATCH`
* **Endpoint:** `/api/auth/uploadProfilePhoto`
* **Access:** Protected
* **Authentication:** Bearer token required
* **Content-Type:** `multipart/form-data`

### Request body

Send one file using the field name `profilePhoto`.

### Success response — `200 OK`

```json
{
  "success": true,
  "message": "Profile photo uploaded successfully",
  "data": {
    "profilePhoto": "https://res.cloudinary.com/your-cloud/image/upload/example.jpg"
  }
}
```

### Possible errors

* `400 Bad Request` — no image was supplied.
* `500 Internal Server Error` — upload or storage failed.

The returned URL can be used by the frontend to display the user's profile image.

## 13. Email Verification Status

The following routes are currently not active because they are commented out in the route file:

* `POST /api/auth/verifyEmail`
* `POST /api/auth/resendVerificationCode`

Do not rely on these endpoints in the frontend until they are implemented and enabled.

## Authentication and Security Notes

* Passwords are hashed using `bcryptjs`.
* Protected endpoints require a JWT obtained from successful login.
* The `role` field determines access to administrator-only operations.
* Password-reset codes expire after 10 minutes and are cleared after successful password reset.
* Never expose passwords, JWT secrets, or password-reset codes in public responses.

## Purchase API

All endpoints are prefixed with `/api/purchases`.

All purchase endpoints require authentication. Customers can create purchases and view their own purchase history. Administrators can view all purchases and individual customers' purchase histories.

### 1. Create a Purchase

Creates a purchase, updates product stock, and awards loyalty points.

* **Method:** `POST`
* **Endpoint:** `/api/purchases/createPurchase`
* **Access:** `USER`
* **Authentication:** Bearer token required

**Request body**

```json
{
  "productId": "PRODUCT_ID",
  "quantity": 2
}
```

**Validation rules**

* `productId` must be a valid MongoDB ObjectId.
* `quantity` must be a positive integer.
* The product must exist, be available, and have sufficient stock.

**Success response — `201 Created`**

```json
{
  "success": true,
  "message": "Purchase created successfully",
  "data": {
    "purchase": {
      "_id": "PURCHASE_ID",
      "user": "USER_ID",
      "product": "PRODUCT_ID",
      "productName": "Banana Flavoured ice-cream",
      "quantity": 2,
      "pricePerUnit": 10000,
      "totalPrice": 20000,
      "pointsEarned": 100,
      "status": "Completed"
    },
    "point": {
      "user": "USER_ID",
      "type": "Earned",
      "points": 100,
      "description": "Points earned from purchase of Banana Flavoured ice-cream",
      "purchase": "PURCHASE_ID"
    },
    "pointsBalance": 200,
    "totalPointsEarned": 300,
    "quantity": 84
  }
}
```

The values above are illustrative. Actual values depend on the product, quantity, and customer's existing points balance.

**Purchase processing**

1. Validates the product ID and quantity.
2. Checks product availability and remaining stock.
3. Calculates the total price and points earned.
4. Records the purchase and reduces stock.
5. Updates the customer's points balance and lifetime points earned.
6. Creates a points transaction.
7. Awards a **100-point referral bonus** to the referring user when the customer makes their first purchase and meets the referral conditions.
8. Commits the database transaction.
9. Attempts to create a purchase notification.

If stock reaches zero, the product is marked unavailable.

**Possible errors**

* `400 Bad Request` — invalid product ID, missing required fields, invalid quantity, unavailable product, or insufficient stock.
* `404 Not Found` — product or user not found.
* `500 Internal Server Error` — unable to complete the purchase.

The purchase transaction is rolled back when an operation within the transaction fails. Notification creation happens after the transaction commits, so a notification failure does not undo a successful purchase.

### 2. Get My Purchase History

Retrieves the authenticated customer's purchases, newest first.

* **Method:** `GET`
* **Endpoint:** `/api/purchases/getMyPurchaseHistory`
* **Access:** `USER`
* **Authentication:** Bearer token required

**Success response — `200 OK`**

```json
{
  "success": true,
  "message": "Purchases retrieved successfully",
  "data": {
    "purchases": []
  }
}
```

Each purchase includes populated product details: `name`, `size`, `description`, `price`, and `points`.

**Error response — `500 Internal Server Error`**

```json
{
  "success": false,
  "message": "Failed to retrieve purchase history",
  "data": null
}
```

### 3. Get All Purchase History

Retrieves all purchases, newest first.

* **Method:** `GET`
* **Endpoint:** `/api/purchases/getAllPurchaseHistory`
* **Access:** `ADMIN`
* **Authentication:** Bearer token required

**Success response — `200 OK`**

```json
{
  "success": true,
  "message": "Purchases retrieved successfully",
  "data": []
}
```

Each purchase includes populated user information (`firstName`, `lastName`, `email`, `phone`, `pointsBalance`, `isActive`, `isEmailVerified`) and product information (`name`, `size`, `price`, `points`).

**Possible errors**

* `401 Unauthorized` — missing or invalid authentication.
* `403 Forbidden` — insufficient role permissions.
* `500 Internal Server Error` — unable to retrieve all purchases.

### 4. Get a Customer's Purchase History

Retrieves all purchases associated with a specified user.

* **Method:** `GET`
* **Endpoint:** `/api/purchases/getCustomerPurchaseHistory/:id`
* **Access:** `ADMIN`
* **Authentication:** Bearer token required

Replace `:id` with the customer's MongoDB user ID.

**Success response — `200 OK`**

```json
{
  "success": true,
  "message": "Purchase retrieved successfully",
  "data": {
    "user": {
      "id": "USER_ID",
      "firstName": "Jane",
      "lastName": "Doe",
      "email": "jane@example.com",
      "phone": "08012345678",
      "pointsBalance": 200
    },
    "purchases": []
  }
}
```

**Possible errors**

* `404 Not Found` — user not found.
* `500 Internal Server Error` — unable to retrieve the customer's purchases.

### 5. Get a Purchase by ID

Retrieves an individual purchase by its MongoDB ID.

* **Method:** `GET`
* **Endpoint:** `/api/purchases/getPurchaseById/:id`
* **Access:** `USER`, `ADMIN`
* **Authentication:** Bearer token required

Replace `:id` with the purchase ID.

Customers may view only their own purchases. Administrators may view any purchase.

**Success response — `200 OK`**

```json
{
  "success": true,
  "message": "Purchase retrieved successfully",
  "data": {
    "_id": "PURCHASE_ID",
    "user": {
      "firstName": "Jane",
      "lastName": "Doe",
      "email": "jane@example.com"
    },
    "product": {
      "name": "Banana Flavoured ice-cream",
      "size": "Medium",
      "quantity": 84,
      "price": 10000,
      "points": 50
    },
    "productName": "Banana Flavoured ice-cream",
    "quantity": 2,
    "pricePerUnit": 10000,
    "totalPrice": 20000,
    "pointsEarned": 100,
    "status": "Completed"
  }
}
```

**Possible errors**

* `403 Forbidden` — a customer attempts to view another customer's purchase.
* `404 Not Found` — purchase not found.
* `500 Internal Server Error` — unable to retrieve the purchase.

### Purchase Data Fields

| Field          | Description                                             |
| -------------- | ------------------------------------------------------- |
| `user`         | Reference to the customer who made the purchase         |
| `product`      | Reference to the product purchased                      |
| `productName`  | Product name stored at purchase time                    |
| `quantity`     | Number of units purchased                               |
| `pricePerUnit` | Product price per unit at purchase time                 |
| `totalPrice`   | Total cost of the purchase                              |
| `pointsEarned` | Loyalty points awarded for the purchase                 |
| `status`       | Purchase status: `Pending`, `Completed`, or `Cancelled` |

Purchase records include `createdAt` and `updatedAt` timestamps.


