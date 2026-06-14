# AMARA — Fashion, Redefined.

A luxury African fashion e-commerce platform built for the modern African wardrobe.

**Live Demo:** https://amara-client.onrender.com

**Backend API:** https://amara-server.onrender.com

**GitHub:** https://github.com/aimemaurice/amara-store

---

## Overview

AMARA is a full-stack e-commerce web application named after the Kinyarwanda and Swahili word for "grace" and "eternal beauty". It is a luxury fashion platform built specifically for Rwandan and African customers, offering a seamless shopping experience with a premium black, white, and gold aesthetic.

---

## Live Links

| Service | URL |
|---|---|
| Frontend | https://amara-client.onrender.com |
| Backend API | https://amara-server.onrender.com |
| GitHub | https://github.com/aimemaurice/amara-store |

---

## Features

- **User Authentication** — Secure register/login with JWT tokens
- **Product Browsing** — 24 fashion products across 4 categories
- **Search and Filter** — Filter by category and search by name
- **Shopping Cart** — Add, remove, update quantities with real-time total
- **Checkout and Orders** — Complete checkout with shipping details and order tracking
- **User Profile** — Account dashboard with order history
- **Admin Dashboard** — Analytics with charts for orders, revenue, users, and products
- **Fully Responsive** — Mobile-friendly across all screen sizes
- **Luxury UI** — Black, white, and gold brand aesthetic

---

## Tech Stack

### Frontend

| Technology | Purpose |
|---|---|
| React.js | Component-based UI |
| Tailwind CSS | Styling and responsiveness |
| Vite | Build tool |
| React Router DOM | Client-side routing |
| Axios | HTTP requests |
| Recharts | Analytics charts |
| React Hot Toast | Notifications |

### Backend

| Technology | Purpose |
|---|---|
| Node.js | Runtime environment |
| Express.js | REST API framework |
| MongoDB Atlas | Cloud database |
| Mongoose | Database ODM |
| JWT | Authentication |
| bcryptjs | Password hashing |
| Helmet and CORS | Security middleware |

### DevOps

| Technology | Purpose |
|---|---|
| Docker | Containerization |
| docker-compose | Multi-container orchestration |
| Nginx | Production web server |
| GitHub Actions | CI/CD pipeline |
| Render | Cloud deployment |

---

## Project Structure

    amara-store/
    ├── client/
    │   ├── src/
    │   │   ├── components/
    │   │   ├── pages/
    │   │   ├── context/
    │   │   ├── services/
    │   │   └── styles/
    │   ├── Dockerfile
    │   └── nginx.conf
    ├── server/
    │   ├── src/
    │   │   ├── models/
    │   │   ├── controllers/
    │   │   ├── routes/
    │   │   ├── middleware/
    │   │   └── jobs/
    │   └── Dockerfile
    ├── docker-compose.yml
    └── .github/
        └── workflows/
            └── deploy.yml

---

## Getting Started

### Prerequisites

- Node.js v18+
- MongoDB Atlas account
- Docker Desktop (optional)

### 1. Clone the repository

    git clone https://github.com/aimemaurice/amara-store.git
    cd amara-store

### 2. Set up environment variables

Create server/.env:

    PORT=5000
    MONGO_URI=your_mongodb_connection_string
    JWT_SECRET=your_jwt_secret
    JWT_EXPIRE=7d
    NODE_ENV=development

Create client/.env:

    VITE_API_URL=http://localhost:5000

### 3. Install dependencies

    cd server && npm install
    cd ../client && npm install

### 4. Seed the database

    cd server
    npm run seed

### 5. Run the application

Terminal 1 — Backend:

    cd server && npm run dev

Terminal 2 — Frontend:

    cd client && npm run dev

Open http://localhost:5173 in your browser.

---

## Docker

    docker-compose up --build

Frontend will be available at http://localhost:3000

API will be available at http://localhost:5000

---

## CI/CD Pipeline

AMARA uses GitHub Actions for continuous integration and deployment. The pipeline triggers automatically on every push to the main branch:

1. **Build Frontend** — Installs dependencies and builds the React app with Vite
2. **Build Docker Images** — Builds client and server Docker images using docker-compose

---

## API Endpoints

### Authentication

| Method | Endpoint | Description |
|---|---|---|
| POST | /api/auth/register | Register new user |
| POST | /api/auth/login | Login user |
| GET | /api/auth/me | Get current user |

### Products

| Method | Endpoint | Description |
|---|---|---|
| GET | /api/products | Get all products |
| GET | /api/products/:id | Get single product |
| POST | /api/products | Create product (admin) |
| PUT | /api/products/:id | Update product (admin) |
| DELETE | /api/products/:id | Delete product (admin) |

### Orders

| Method | Endpoint | Description |
|---|---|---|
| POST | /api/orders | Create order |
| GET | /api/orders/my-orders | Get my orders |
| GET | /api/orders/:id | Get order by ID |
| GET | /api/orders | Get all orders (admin) |
| PUT | /api/orders/:id/status | Update status (admin) |

### Admin

| Method | Endpoint | Description |
|---|---|---|
| GET | /api/admin/stats | Get analytics stats (admin) |

---

## Design System

| Element | Value |
|---|---|
| Primary Color | #000000 — Black |
| Secondary Color | #FFFFFF — White |
| Accent Color | #C9A84C — Gold |
| Body Font | Jost, sans-serif |
| Heading Font | Cormorant Garamond, serif |

---

## Future Work

- Payment Integration — MTN Mobile Money, Airtel Money, Stripe
- Wishlist — Save favourite products
- Coupon System — Promotional discount codes
- AI Recommendations — Personalised product suggestions
- Multi-vendor Support — Multiple fashion sellers
- Email Notifications — Order confirmations via SendGrid
- Custom Domain — amarastore.rw

---

## Author

**Aime Maurice Ndahiriwe**

- GitHub: https://github.com/aimemaurice
- Instagram: https://instagram.com/__aime.en.or
- University: University of Lay Adventists of Kigali (UNILAK)

---

## License

Final examination project for EWA408510 — E-Commerce and Web Application at UNILAK, Academic Year 2025-2026.

---

Made with love in Kigali, Rwanda
