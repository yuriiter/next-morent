import mongoose from "mongoose"
import { DB_HOST, DB_PASSWORD, DB_PORT, DB_USER, DB_NAME } from "@/config"

const mongodbURI = `mongodb://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}/${DB_NAME}?authSource=admin`

export const connectToMongoDB = async (): Promise<void> => {
    console.log(`Connecting to MongoDB...`)
    try {
        await mongoose.connect(mongodbURI, {})
        console.log("MongoDB connected successfully")
    } catch (error) {
        console.error("Error connecting to MongoDB:", error)
    }
}

export const closeMongoDBConnection = async (): Promise<void> => {
    try {
        await mongoose.connection.close()
        console.log("MongoDB connection closed")
    } catch (error) {
        console.error("Error closing MongoDB connection:", error)
    }
}
