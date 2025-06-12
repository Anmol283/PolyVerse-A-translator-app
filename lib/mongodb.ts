import { MongoClient, type Db } from "mongodb"

// MongoDB connection string - updated to include database name
const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost:27017/translator-app"

if (!MONGODB_URI) {
  throw new Error("Please define the MONGODB_URI environment variable")
}

// Add database name to your connection string if not present
const getConnectionString = () => {
  if (MONGODB_URI.includes("mongodb+srv://") && !MONGODB_URI.includes("?")) {
    // Add database name if using Atlas and no database specified
    return `${MONGODB_URI}/translator-app?retryWrites=true&w=majority`
  }
  return MONGODB_URI
}

// Global variable to store the MongoDB client
let client: MongoClient
let clientPromise: Promise<MongoClient>

// In development mode, use a global variable to preserve the connection
// across hot reloads
if (process.env.NODE_ENV === "development") {
  const globalWithMongo = global as typeof globalThis & {
    _mongoClientPromise?: Promise<MongoClient>
  }

  if (!globalWithMongo._mongoClientPromise) {
    client = new MongoClient(getConnectionString())
    globalWithMongo._mongoClientPromise = client.connect()
  }
  clientPromise = globalWithMongo._mongoClientPromise
} else {
  // In production mode, it's best to not use a global variable
  client = new MongoClient(getConnectionString())
  clientPromise = client.connect()
}

// Function to get the database
export async function getDatabase(): Promise<Db> {
  const client = await clientPromise
  return client.db("translator-app")
}

export default clientPromise
