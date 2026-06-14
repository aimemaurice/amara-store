---

## Getting Started

### Prerequisites
- Node.js v18+
- MongoDB Atlas account
- Docker Desktop (optional)

### 1. Clone the repository
```bash
git clone https://github.com/aimemaurice/amara-store.git
cd amara-store
```

### 2. Set up environment variables

Create `server/.env`:
```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
JWT_EXPIRE=7d
NODE_ENV=development
```

Create `client/.env`:
```env
VITE_API_URL=http://localhost:5000
```

### 3. Install dependencies
```bash
cd server && npm install
cd ../client && npm install
```

### 4. Seed the database
```bash
cd server
npm run seed
```

### 5. Run the application

**Terminal 1 — Backend:**
```bash
cd server && npm run dev
```

**Terminal 2 — Frontend:**
```bash
cd client && npm run dev
```

Open `http://localhost:5173`

---

## Docker

```bash
docker-compose up --build

# Frontend: http://localhost:3000
# API: http://localhost:5000
```

---

## CI/CD Pipeline

AMARA uses **GitHub Actions** for continuous integration and deployment. The pipeline triggers automatically on every push to `main`:

1. **Build Frontend** — Installs dependencies and builds the React app with Vite
2. **Build Docker Images** — Builds client and server Docker images using docker-compose

---

## API Endpoints

### Authentication
| Method | Endpoint | Description |
|---|---|---|
| POST | `/api/auth/register` | Register new user |
| POST | `/api/auth/login` | Login user |
| GET | `/api/auth/me` | Get current user |

### Products
| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/products` | Get all products |
| GET | `/api/products/:id` | Get single product |
| POST | `/api/products` | Create product (admin) |
| PUT | `/api/products/:id` | Update product (admin) |
| DELETE | `/api/products/:id` | Delete product (admin) |

### Orders
| Method | Endpoint | Description |
|---|---|---|
| POST | `/api/orders` | Create order |
| GET | `/api/orders/my-orders` | Get my orders |
| GET | `/api/orders/:id` | Get order by ID |
| GET | `/api/orders` | Get all orders (admin) |
| PUT | `/api/orders/:id/status` | Update status (admin) |

### Admin
| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/admin/stats` | Get analytics stats (admin) |

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
- GitHub: [@aimemaurice](https://github.com/aimemaurice)
- Instagram: [@__aime.en.or](https://instagram.com/__aime.en.or)
- University: University of Lay Adventists of Kigali (UNILAK)

---

## License

Final examination project for EWA408510 — E-Commerce and Web Application at UNILAK, Academic Year 2025-2026.

---

*Made with love in Kigali, Rwanda*
