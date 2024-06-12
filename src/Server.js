import { MongoClient } from "mongodb";

// Connection URL
const url = "mongodb://localhost:27017";
// Database Name
const dbName = "Shopify";

async function main() {
  // Create new MongoClient
  const client = new MongoClient(url);

  try {
    // Use connect method to connect to the server
    await client.connect();
    console.log("Connected successfully to server");

    const db = client.db(dbName);
    // You can now interact with the db object for CRUD operations
  } catch (err) {
    console.error(err);
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}

main().catch(console.error);
