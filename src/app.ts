import express from "express";
import cors from "cors";
import authRoutes from "./routes/auth.routes";
import customerRoutes from "./routes/customer.routes";
import clothtypes from "./routes/clothtypes.routes";

const app = express();

app.use(cors({
  origin: "*", // allow all origins for dev
  methods: ["GET","POST","PUT","DELETE"],
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
app.use("/api/clothtypes", clothtypes);

export default app;
