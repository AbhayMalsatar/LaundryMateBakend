import dotenv from "dotenv";
import app from "./app";
import sequelize from "./config/db";

dotenv.config();

const PORT = process.env.PORT || 8000;

(async () => {
  try {
    await sequelize.authenticate();
    console.log("✅ Database connected");

    app.listen(PORT, () => {
      console.log(`🚀 Server running on http://localhost:${PORT}`);
    });
  } catch (err) {
    console.error("❌ Startup error", err);
  }
})();
