import express from "express";
import cors from "cors";
import { config } from "./app/config/app.config";
import pollRoutes from "./app/routes/poll-routes";
import userRoutes from "./app/routes/user-routes";
import { connectDB } from "./app/config/db.config";
import bodyParser from "body-parser";
import authRoutes from "./app/routes/auth-routes";
import cookieParser from "cookie-parser";
import { authenticateToken } from "./app/middlewares/auth.middleware";

const app = express();
app.use(bodyParser.json());
app.use(
  cors({
    origin: "http://localhost:4200",
    credentials: true, // if using cookies/auth
  })
);
app.use(cookieParser())
// Static files
// app.use(express.static(path.join(__dirname, '..', 'public')));
// app.use(express.urlencoded({ extended: false }));

//
app.use("/auth", authRoutes);
// Poll Routes
app.use("/poll", pollRoutes);

// User Routes
app.use("/user", userRoutes);

const startServer = async () => {
  await connectDB();
  app.listen(config.port, () => {
    console.log(
      `${config.appName} running on http://localhost:${config.port} in ${config.nodeEnv}`
    );
  });
};

startServer();
