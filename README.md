# 🍽️ Online Food Ordering System

A comprehensive, full-stack food ordering platform built with **Spring Boot 3.5** and **React 19**, featuring a modern customer portal, restaurant admin dashboard, JWT-based security, and Stripe payment integration.

## 🚀 Features

### **Customer Portal**

- **Restaurant Discovery**: Browse restaurants by city with search and filtering
- **Menu Browsing**: View restaurant menus with filters (vegetarian, seasonal, category)
- **Shopping Cart**: Add, update quantity, and remove items with real-time total calculation
- **Order Placement**: Select delivery address and place orders
- **Payment Integration**: Stripe payment link for secure checkout
- **User Profile**: Manage account info, order history, addresses, and favorite restaurants
- **User Authentication**: Secure login/registration with JWT token-based authentication
- **Responsive Design**: Mobile-first UI built with Material UI and Tailwind CSS

### **Restaurant Admin Dashboard**

- **Restaurant Management**: Create and update restaurant details, status, and contact info
- **Menu Management**: CRUD operations for food items with image upload via Cloudinary
- **Category Management**: Organize menu items by food categories
- **Ingredient Management**: Manage ingredient categories, items, and stock levels
- **Order Processing**: View restaurant orders and update order status in real time
- **Dashboard Overview**: Centralized admin panel for restaurant operations

### **Technical Features**

- **RESTful API**: Complete REST API with proper HTTP status codes
- **Database Integration**: MySQL with JPA/Hibernate ORM
- **File Management**: Cloudinary integration for image storage
- **Security**: Spring Security with JWT authentication and role-based access control
- **State Management**: Redux with thunk middleware on the frontend
- **Search & Filtering**: Menu and restaurant search with multiple criteria
- **Soft Delete**: Safe food item deletion when linked to existing orders

## 🛠️ Technology Stack

### **Backend**

- **Java 21** - Latest LTS version with modern features
- **Spring Boot 3.5.9** - Rapid application development framework
- **Spring Security** - Authentication and authorization
- **Spring Data JPA** - Data persistence layer
- **Hibernate** - Object-relational mapping
- **MySQL 8.0** - Relational database
- **JWT (jjwt)** - JSON Web Token for stateless authentication
- **Stripe Java SDK** - Payment processing
- **Lombok** - Reduces boilerplate code

### **Frontend**

- **React 19** - Component-based UI library
- **Redux & Redux Thunk** - Global state management
- **React Router 7** - Client-side routing
- **Material UI (MUI)** - UI component library
- **Tailwind CSS** - Utility-first styling
- **Formik & Yup** - Form handling and validation
- **Axios** - HTTP client for API calls
- **React Slick** - Carousel components

### **External Services**

- **Cloudinary** - Cloud image management for restaurant and food photos
- **Stripe** - Online payment gateway
- **Maven** - Backend dependency management and build tool
- **npm** - Frontend package management

### **Development Tools**

- **Spring Boot DevTools** - Hot reload and development utilities
- **Lombok** - Reduces boilerplate code
- **Maven Wrapper** - Consistent backend build environment
- **Create React App** - Frontend development toolchain

## 🏗️ Architecture

### **Layered Architecture**

```
┌─────────────────────────────────────┐
│        Presentation Layer           │
│   (React SPA + REST Controllers)    │
├─────────────────────────────────────┤
│           Business Layer            │
│        (Services + DTOs)            │
├─────────────────────────────────────┤
│           Data Access Layer         │
│      (Repositories + Entities)      │
├─────────────────────────────────────┤
│           Database Layer            │
│            (MySQL 8.0)              │
└─────────────────────────────────────┘
```

### **Core Components**

- **Controllers**: REST API endpoints for auth, cart, orders, restaurants, and admin
- **Services**: Business logic implementation
- **Repositories**: Data access layer with Spring Data JPA
- **Entities**: JPA entities with proper relationships
- **Request/Response DTOs**: Data transfer objects for API payloads
- **Security**: Custom JWT filter and role-based authorization
- **Redux Store**: Frontend state for auth, cart, orders, restaurant, and menu

## 📁 Project Structure

```
Online-Food-Ordering/
├── backend/
│   └── src/main/java/com/vietphap/Online/Food/Ordering/
│       ├── config/                 # Security, JWT, CORS configuration
│       ├── controller/             # REST API controllers
│       ├── model/                  # JPA entities
│       ├── repository/             # Data access repositories
│       ├── service/                # Business logic services
│       ├── request/                # Request payloads
│       ├── response/               # Response payloads
│       └── dto/                    # Data Transfer Objects
├── frontend/
│   └── src/
│       ├── component/              # Customer pages (Home, Cart, Profile, ...)
│       ├── AdminComponent/         # Restaurant admin dashboard
│       ├── Routers/                # CustomerRouter, AdminRouter
│       ├── component/State/        # Redux actions, reducers, action types
│       └── component/config/       # API configuration
└── README.md
```

## 🚀 Getting Started

### **Prerequisites**

- Java 21 or higher
- MySQL 8.0
- Maven 3.6+
- Node.js 18+ and npm
- Cloudinary account
- Stripe account (for payment testing)

### **Installation**

1. **Clone the repository**

   ```bash
   git clone https://github.com/vietphappro27/Online-Food-Ordering.git
   cd Online-Food-Ordering
   ```

2. **Database Setup**

   ```sql
   CREATE DATABASE food_ordering;
   ```

3. **Backend Configuration**

   Update `backend/src/main/resources/application.properties`:

   ```properties
   spring.datasource.url=jdbc:mysql://localhost:3306/food_ordering
   spring.datasource.username=your_username
   spring.datasource.password=your_password
   stripe.secret.key=your_stripe_secret_key
   ```

4. **Run the backend**

   ```bash
   cd backend
   ./mvnw spring-boot:run
   ```

5. **Frontend Configuration (optional)**

   Create `frontend/.env` if the backend runs on a different host/port:

   ```env
   REACT_APP_API_URL=http://localhost:8080
   ```

6. **Run the frontend**

   ```bash
   cd frontend
   npm install
   npm start
   ```

7. **Access the application**

   - Customer Portal: `http://localhost:3000`
   - Admin Dashboard: `http://localhost:3000/admin/restaurant`
   - Backend API: `http://localhost:8080`

## 🔧 Configuration

### **Backend (`application.properties`)**

| Property | Description |
|----------|-------------|
| `spring.datasource.url` | MySQL connection URL |
| `spring.datasource.username` | Database username |
| `spring.datasource.password` | Database password |
| `stripe.secret.key` | Stripe secret key for payment |
| `spring.jpa.hibernate.ddl-auto` | Schema strategy (`update` for development) |

### **Frontend (`frontend/.env`)**

| Variable | Description |
|----------|-------------|
| `REACT_APP_API_URL` | Backend API base URL (default: `http://localhost:8080`) |

### **Cloudinary**

Update `frontend/src/AdminComponent/util/UploadToCloudinary.js` with your Cloudinary credentials:

- `cloud_name`
- `upload_preset`

### **Environment Variables (Production)**

```bash
export SPRING_DATASOURCE_URL=jdbc:mysql://localhost:3306/food_ordering
export SPRING_DATASOURCE_USERNAME=your_username
export SPRING_DATASOURCE_PASSWORD=your_password
export STRIPE_SECRET_KEY=your_stripe_secret_key
export REACT_APP_API_URL=https://your-api-domain.com
```

## 🔐 Security Features

- **JWT Authentication**: Stateless token-based authentication
- **Role-based Access Control**: `ROLE_CUSTOMER`, `ROLE_RESTAURANT_OWNER`, and `ROLE_ADMIN`
- **Password Encryption**: BCrypt password hashing
- **CORS Configuration**: Cross-origin resource sharing for `http://localhost:3000`
- **Protected Admin Routes**: `/api/admin/**` requires `RESTAURANT_OWNER` or `ADMIN` role
- **SQL Injection Prevention**: Parameterized queries via JPA

> **Note:** Do not commit database passwords, Stripe secret keys, or JWT secrets to a public repository.

## 📊 Database Schema

### **Core Entities**

- **User**: Customer, restaurant owner, and admin accounts
- **Restaurant**: Restaurant profiles with contact information
- **Food**: Menu items linked to restaurants and categories
- **Category**: Food classification per restaurant
- **IngredientCategory / IngredientItem**: Ingredient and stock management
- **Cart / CartItem**: Shopping cart functionality
- **Order / OrderItem**: Customer orders with status tracking
- **Address**: User delivery addresses

### **Key Relationships**

- One-to-Many: User → Orders, Restaurant → Foods, Cart → CartItems
- Many-to-Many: Orders ↔ Foods (via OrderItems)
- One-to-One: User ↔ Cart
- Many-to-One: Food → Restaurant, Food → Category

### **User Roles**

| Role | Description |
|------|-------------|
| `ROLE_CUSTOMER` | Browse restaurants, manage cart, place orders |
| `ROLE_RESTAURANT_OWNER` | Manage restaurant, menu, ingredients, and orders |
| `ROLE_ADMIN` | Full admin access to the restaurant dashboard |

## 🧪 API Endpoints

### **Authentication**

- `POST /auth/signup` - User registration
- `POST /auth/signin` - User authentication

### **Restaurant**

- `GET /api/restaurant` - Get all restaurants
- `GET /api/restaurant/search` - Search restaurants
- `GET /api/restaurant/{id}` - Get restaurant details
- `PUT /api/restaurant/{id}/add-favorite` - Add restaurant to favorites

### **Food / Menu**

- `GET /api/food/restaurant/{restaurantId}` - Get menu with filters
- `GET /api/food/search` - Search food items

### **Cart**

- `GET /api/cart` - Get user cart
- `PUT /api/cart/add` - Add item to cart
- `PUT /api/cart-item/update` - Update cart item quantity
- `DELETE /api/cart-item/remove/{id}` - Remove item from cart
- `PUT /api/cart/clear` - Clear cart

### **Order**

- `POST /api/order/add` - Create order and get Stripe payment link
- `GET /api/order/user` - Get user order history

### **User**

- `GET /api/user/profile` - Get user profile

### **Admin — Restaurant**

- `POST /api/admin/restaurant/create` - Create restaurant
- `PUT /api/admin/restaurant/update/{id}` - Update restaurant
- `DELETE /api/admin/restaurant/delete/{id}` - Delete restaurant
- `GET /api/admin/restaurant/user` - Get restaurant by logged-in owner

### **Admin — Food & Category**

- `POST /api/admin/food/create` - Create food item
- `DELETE /api/admin/food/delete/{id}` - Delete food item
- `POST /api/admin/category` - Create food category
- `GET /api/category/restaurant/{id}` - Get categories by restaurant

### **Admin — Ingredient**

- `POST /api/admin/ingredient/category` - Create ingredient category
- `POST /api/admin/ingredient/item` - Create ingredient item
- `PUT /api/admin/ingredient/stock/{id}` - Update ingredient stock

### **Admin — Order**

- `GET /api/admin/order/restaurant/{id}` - Get orders by restaurant
- `PUT /api/admin/order/{orderId}/{orderStatus}` - Update order status

Authenticated requests require the header:

```
Authorization: Bearer <jwt_token>
```

## 🎨 UI/UX Features

- **Modern Design**: Dark theme with Material UI components
- **Responsive Layout**: Works on desktop and mobile devices
- **Interactive Elements**: Dynamic menu filtering, cart management, and order tracking
- **Form Validation**: Formik + Yup for address and registration forms
- **Carousel**: Restaurant highlights on the homepage
- **Admin Sidebar**: Collapsible navigation for restaurant management

## 📈 Performance Optimizations

- **Lazy Data Loading**: Menu and orders fetched on demand via Redux actions
- **Image Optimization**: Cloudinary-hosted images for restaurants and food items
- **Stateless API**: JWT-based authentication without server-side sessions
- **Efficient Cart Updates**: Redux reducer merges duplicate cart items locally

## 🔄 Development Workflow

1. **Feature Development**: Implement new features in feature branches
2. **Backend First**: Define API endpoints and services before frontend integration
3. **Redux Integration**: Connect frontend actions/reducers to REST APIs
4. **Testing**: Manual testing across customer and admin flows
5. **Deployment**: Run backend and frontend as separate services

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is for educational and personal use. Contact the author for commercial licensing.

## 👨‍💻 Author

**Viet Phap**

- GitHub: [vietphappro27](https://github.com/vietphappro27)
- Email: phaplon32@gmail.com

## 🙏 Acknowledgments

- Spring Boot team for the excellent framework
- React and Redux communities for frontend tooling
- Cloudinary for image management services
- Stripe for payment processing
- Material UI for the component library
- MySQL team for the reliable database

---

⭐ **Star this repository if you find it helpful!**
