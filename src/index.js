const express = require("express");
const app = express();
const { ServerConfig } = require("./config");
const { PORT, AUTH_SERVICE_URL, BOOKING_SERVICE_URL, FLIGHT_SERVICE_URL } =
  ServerConfig;
const apiRoutes = require("./routes");
const { createProxyMiddleware } = require("http-proxy-middleware");
const rateLimit = require("express-rate-limit");
const mailSender = require("./config/mail-config");

const limiter = rateLimit({
  windowMs: 1000 * 60 * 15,
  max: 50,
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(limiter);

//auth service proxy setup
app.use(
  "/authService/api",
  createProxyMiddleware({
    target: AUTH_SERVICE_URL,
    changeOrigin: true,
  })
);
//flight service proxy setup
app.use(
  "/flightService/api",
  createProxyMiddleware({
    target: FLIGHT_SERVICE_URL,
    changeOrigin: true,
  })
);
//booking service proxy setup
app.use(
  "/bookingService/api",
  createProxyMiddleware({
    target: BOOKING_SERVICE_URL,
    changeOrigin: true,
  })
);

app.use("/api", apiRoutes);

app.listen(PORT, async () => {
  try {
    console.log("Server started running at PORT ::", PORT);
    const response = await mailSender.sendMail({
      from: `"Flights" ${ServerConfig.GMAIL_ID}`,
      to: "ravikydv183@gmail.com",
      subject: "Your booked ticket",
      text: "Hello from Flights service email ",
    });
    console.log(response);
  } catch (error) {
    console.log(error);
  }
});

//http://localhost:PORT/authService/api/v1/info
//http://localhost:PORT/flightService/api/v1/flights
//http://localhost:PORT/bookingService/api/v1/info
