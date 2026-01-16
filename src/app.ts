import express from "express";
import cors from "cors";
import authRoutes from "./routes/auth.routes";
import customerRoutes from "./routes/customer.routes";
import clothtypesRoutes from "./routes/clothtypes.routes";
import servicesRoutes from "./routes/services.routes";

const app = express();

app.use(cors({
  origin: "*", // allow all origins for dev
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type"]
}));

app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  console.log("Body:", req.body);
  next();
});

app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/customers", customerRoutes);
app.use("/api/clothtypes", clothtypesRoutes);
app.use("/api/services", servicesRoutes);

export default app;
