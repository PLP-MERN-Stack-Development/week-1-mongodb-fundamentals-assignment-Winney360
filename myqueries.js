//find all books in a specific genre
db.books.find({ genre: "Fantasy" })

//Find books published after a certain year
db.books.find({ published_year: { $gt: 2000 } })

//Find books by a specific author
db.books.find({ author: "J.R.R. Tolkien" })

//update the price of a specific book
db.books.updateOne(
  { title: "The Hobbit" }, 
  { $set: { price: 16.99 } }
)

//Delete a book by its title
db.books.deleteOne({ title: "Moby Dick" })


//Task 3:
//Find books that are both in stock and published after 2010
db.books.find({ in_stock: true, published_year: { $gt: 2010 } })

//Use projection to return only title, author, and price
db.books.find({}, { title: 1, author: 1, price: 1, _id: 0 })

//Sort books by price (ascending and descending)
//1.Ascending:
db.books.find().sort({ price: 1 })
//2.Descending:
db.books.find().sort({ price: -1 })

//Pagination: Limit and Skip (5 books per page
//- Page 1:
db.books.find().limit(5)
//Page 2:
db.books.find().skip(5).limit(5)


//Task4:
//Calculate the average price of books by genre
db.books.aggregate([
  { $group: { _id: "$genre", avgPrice: { $avg: "$price" } } }
])

//Find the author with the most books in the collection
db.books.aggregate([
  { $group: { _id: "$author", count: { $sum: 1 } } },
  { $sort: { count: -1 } },
  { $limit: 1 }
])

//Group books by publication decade and count them
db.books.aggregate([
  { $project: { decade: { $floor: { $divide: ["$published_year", 10] } } } },
  { $group: { _id: "$decade", count: { $sum: 1 } } },
  { $sort: { _id: 1 } }
])


//Task 5:
//create an index on the title field
db.books.createIndex({ title: 1 })

//Create a compound index on author and published_year
db.books.createIndex({ author: 1, published_year: 1 })

//Use explain() to analyze index performance
db.books.find({ title: "The Hobbit" }).explain("executionStats")
