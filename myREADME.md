// setup.js - Full script to initialize the MongoDB database, insert books, and run queries

const { MongoClient } = require("mongodb");

const uri = "mongodb://localhost:27017"; // Change if using MongoDB Atlas
const dbName = "plp_bookstore";
const collectionName = "books";

// Sample book data
const books = [
  { title: "To Kill a Mockingbird", author: "Harper Lee", genre: "Fiction", published_year: 1960, price: 12.99, in_stock: true, pages: 336, publisher: "J. B. Lippincott & Co." },
  { title: "1984", author: "George Orwell", genre: "Dystopian", published_year: 1949, price: 10.99, in_stock: true, pages: 328, publisher: "Secker & Warburg" },
  { title: "The Great Gatsby", author: "F. Scott Fitzgerald", genre: "Fiction", published_year: 1925, price: 9.99, in_stock: true, pages: 180, publisher: "Charles Scribner's Sons" },
];

// Connect to MongoDB and perform setup
async function setupDatabase() {
  const client = new MongoClient(uri);

  try {
    await client.connect();
    console.log("✅ Connected to MongoDB");

    const db = client.db(dbName);
    const collection = db.collection(collectionName);

    // Drop collection if it exists
    await collection.drop().catch(() => console.log("ℹ️ No existing collection to drop"));

    // Insert books
    await collection.insertMany(books);
    console.log(`✅ Inserted ${books.length} books`);

    // Perform Queries
    console.log("\n📖 Books in Fiction Genre:");
    console.log(await collection.find({ genre: "Fiction" }).toArray());

    console.log("\n📚 Books Published After 1950:");
    console.log(await collection.find({ published_year: { $gt: 1950 } }).toArray());

    // Update a Book's Price
    await collection.updateOne({ title: "1984" }, { $set: { price: 15.99 } });
    console.log("✅ Updated price of '1984'");

    // Delete a Book
    await collection.deleteOne({ title: "The Great Gatsby" });
    console.log("✅ Deleted 'The Great Gatsby'");

    // Create Index
    await collection.createIndex({ title: 1 });
    console.log("✅ Index created on 'title'");

  } catch (err) {
    console.error("❌ Error:", err);
  } finally {
    await client.close();
    console.log("🚪 Connection closed");
  }
}

// Run the setup
setupDatabase();