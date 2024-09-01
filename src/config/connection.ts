import mongoose, { ConnectOptions } from "mongoose";
import dotenv from "dotenv";

// Load environment variables from the .env file
dotenv.config();

class Database {
  private mongoURI: string;

  constructor() {
    this.mongoURI = process.env.MONGO_URI || "";
  }

  // Method to connect to the database
  public async connect(): Promise<void> {
    try {
      await mongoose.connect(this.mongoURI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      } as ConnectOptions);
      console.log("Database connected successfully.");
    } catch (error) {
      this.handleError(error);
    }
  }

  // Error handling method
  private handleError(error: any): void {
    console.error("Error connecting to database:", error.message);
    process.exit(1); // Exit the process with a failure code
  }
}

// Export an instance of the Database class
export default new Database();
