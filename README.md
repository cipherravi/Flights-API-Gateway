# 🌐 Flights API Gateway

The central API Gateway for the Flights Microservices Ecosystem. This service acts as the **only public entry point**, routing all incoming HTTP requests to the appropriate microservice like:

- ✈️ `Flight Service`
- 📦 `Booking Service`
- 🔐 `Auth Service`
- 📨 `Mailing System`

Built with **Node.js + Express**, it ensures scalability, extensibility, and security for the entire system.

---

## 🚀 Features

- 🔀 **Service Proxying** using `http-proxy-middleware`  
  Route requests to the correct microservice based on path

- 🔐 **Rate Limiting** with `express-rate-limit`  
  Protects against abuse, spam, and server overload

- 📧 **Mailing System** using `nodemailer`  
  - Send **booking confirmation** emails  
  - Send **flight reminders** before scheduled departure

- ✅ **Single Gateway Access**  
  All services (Auth, Booking, Flights) are accessible through one secure gateway

- 📦 **Future-Ready**  
  Easily plug in new services (e.g., notifications, payments) with one config

---

## 🛠️ Tech Stack

- **Node.js**
- **Express.js**
- **http-proxy-middleware**
- **express-rate-limit**
- **nodemailer**
- **dotenv** for environment configs

---

## 📁 Folder Structure

<pre>
Flights/
├── src/
│ ├── config/
│ ├── controllers/
│ ├── middlewares/
│ ├── migrations/
│ ├── models/
│ ├── routes/
│ ├── services/
│ ├── utils/
│ └── index.js
├── .env.example
├── package.json
└── README.md
</pre>

---

## ⚙️ Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/cipherravi/Flights-API-Gateway.git
cd Flights-API-Gateway
```


### 2. Install Dependencies

npm install

### 3. Setup Environment Variables
change .env.example file to .env with actual values

### 4. Run Database Migrations

cd src
npx sequelize-cli db:migrate

### 5. Start the Development Server

npm run dev

Server will start on http://localhost:PORT

### 🌉 Proxy Routes
| Path Prefix             | Proxied To              |
| -----------             | ----------------------- |
| `/authService/api`      | `Auth Service`          |
| `/bookingService/api`   | `Booking Service`       |
| `/flightService/api`    | `Flight Service`        |
| `/mail`                 | Internal Mailing System |

### 📧 Mailing System

The gateway sends transactional and reminder emails via nodemailer:

✅ Booking confirmation email (with ticket details)
⏰ Pre-flight reminder email
Mailing logic can be triggered by Booking Service via internal route /mail/send.

### 🚨 Rate Limiting

To prevent abuse and server overload:

Uses express-rate-limit
Configurable window & max requests via .env

### 🔐 Security & Benefits

- JWT is validated before forwarding to downstream services
- Services are NOT directly exposed to clients
- Easy to scale horizontally behind a load balancer
- Central place for:
  - Logging
  - Caching (future)
  - Validation
  - Auth strategies

🤝 Contributing

Contributions, issues, and feature requests are welcome!
Feel free to fork the repo and submit a PR.

👨‍💻 Author

Made with ❤️ by Ravi yadav

