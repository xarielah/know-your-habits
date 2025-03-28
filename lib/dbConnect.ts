import config from "@/config";
import mongoose from "mongoose";

const connection: { isConnected?: number } = {};

async function dbConnect() {
  if (connection.isConnected) {
    return;
  }

  const db = await mongoose.connect(config.MONGO_URL);

  connection.isConnected = db.connections[0].readyState;
}

export default dbConnect;
