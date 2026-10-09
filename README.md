Customer Loyalty App

A full-stack customer loyalty and rewards application that allows users to earn points through purchases, track their points balance, explore available rewards, and redeem points for rewards.

The application is built with React, Node.js, Express, and MongoDB.

🚀 Live Demo
-  Frontend: https://customer-loyalty-reward-app-frontend.onrender.com
-  Backend API: https://customer-loyalty-reward-app-uldx.onrender.com
-  GitHub Repository: https://github.com/kali-ship-bit/Customer-loyalty-reward-app

✨ Features
Authentication and User Management
-  User registration and login.
-  Password hashing and JWT-based authentication.
-  User profile management.
-  Role-based access control for users and administrators.

Product Management
-  Create, view, update, and manage products.
-  Track product prices and available stock.
-  Control product availability.
-  Allow users to browse available products.

Purchases and Loyalty Points
-  Record customer purchases.
-  Calculate points earned from purchases.
-  Update product stock after purchases.
-  Maintain users' points balances and points transaction history.

Rewards and Redemption
-  Display available rewards.
-  Redeem rewards using accumulated points.
-  Check points balances and reward availability before redemption.
-  Record redemption transactions.

Additional Features
-  Favorites management.
-  Notifications.
-  Responsive user interface.
-  Input validation and error handling.

🛠️ Technology Stack

Frontend
-  React
-  Vite
-  JavaScript
-  Tailwind CSS
-  DaisyUI

Backend
-  Node.js
-  Express.js
-  MongoDB
-  Mongoose
-  JSON Web Tokens (JWT)
-  bcryptjs
-  Helmet
-  CORS

Deployment and Tools
-  Render for application deployment.
-  MongoDB Atlas for cloud database hosting.
-  Git and GitHub for version control and collaboration.

📁 Project Structure

The repository contains the frontend and backend components of the application.

Customer-loyalty-reward-app/
├── backend/
│   ├── config/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── utils/
│   ├── app.js
│   └── package.json
├── src/
├── .gitignore
├── index.html
├── package.json
├── README.md
└── vite.config.js

⚙️ Getting Started
Prerequisites

Install the following before running the project locally:

Node.js and npm.
MongoDB Atlas account or a suitable MongoDB instance.
Git.

1. Clone the Repository
git clone https://github.com/kali-ship-bit/Customer-loyalty-reward-app.git
cd Customer-loyalty-reward-app

2. Configure the Backend

Navigate to the backend directory:

cd backend
npm install

Create a .env file inside the backend directory.

Configure the environment variables required by your backend:

PORT=3000
FRONTEND_URL=http://localhost:5173
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret

Add other environment variables only when the corresponding integrations are enabled in your application.

Security: Never commit your .env file, database credentials, JWT secret, or API keys to GitHub.

Start the backend using the appropriate script defined in backend/package.json, for example:

npm run dev
3. Configure the Frontend

Open a second terminal and navigate to the project root:

cd Customer-loyalty-reward-app
npm install

Create a .env file in the frontend root:

VITE_API_URL=http://localhost:3000/api

This assumes the frontend uses VITE_API_URL as its API base URL and appends endpoint paths without duplicating /api.

Start the frontend:

npm run dev

Open the local URL displayed by Vite, typically:

http://localhost:5173

🌐 API Configuration

The backend exposes API routes under the /api prefix.

Examples of route groups include:

/api/auth — Authentication and user management.
/api/products — Product management.
/api/purchases — Purchase records.
/api/points — Loyalty points and transactions.
/api/rewards — Rewards and redemption.
/api/favorites — Favorite items.
/api/notifications — Notifications.

The exact endpoints, HTTP methods, required authentication, request bodies, and responses should be documented separately or added to this README.

🧪 Testing

The application has been manually tested for its main user flows, including:

User registration and login.
Dashboard and product loading.
Purchases and points updates.
Rewards redemption.
Relevant input validation and role restrictions.

Automated test coverage and results should be documented separately if required by the project submission.

🔐 Security Considerations
Passwords are hashed before storage.
JWTs are used for authenticated requests.
Protected routes enforce authentication and appropriate authorization.
Environment variables are used for sensitive configuration.
CORS restricts browser access to configured frontend origins.
Request validation and centralized error handling help manage invalid requests and failures.

👥 Contributors

This project was developed collaboratively as part of the TS Academy full-stack capstone project.

-  Ajube Tamaradiepreye Daniella
-  Rebecca Woryi
-  Godwin Divine
-  Kenneth Goddy-natus
-  Qudus
-  Ayobami
-  Bambam

📌 Future Improvements

Potential future improvements include:

Automated backend and frontend tests.
More comprehensive API documentation.
Performance monitoring and optimization.
Improved loading states and user feedback.
Additional accessibility and security testing.
