import express from "express"
import mysql from "mysql"
import cors from "cors";

const app = express()

const db = mysql.createConnection({
    host    :'localhost',
    user:"root",
    password:"1234",
    port    :'3300',
    database:"test"
})

// If there is a auth problem
// ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'password';

// u can use this in the MySql Workbench. https://stackoverflow.com/questions/50093144/mysql-8-0-client-does-not-support-authentication-protocol-requested-by-server

app.use(express.json());  // It allows u to send any json file using client (postman or frontend)
app.use(cors());

db.connect(error => {
    if (error) throw error;
    console.log("Connected to the database.");
  });
  

app.get("/", (req,res) => {
    res.json("hello this is the backend")
})

app.get("/books", (req,res) => { // meka veda karanne ne
    const q = "SELECT * FROM test.books"
    db.query(q, (err,data) => {
        if(err) return res.json(err)
        return res.json(data)
    })
})  

app.post("/books", (req,res) => {
    const q = "INSERT INTO books (`title`, `desc`, `price`, `cover`) VALUES (?)"
    const values = [
        req.body.title,
        req.body.desc,
        req.body.price,
        req.body.cover
    ];

    db.query(q, [values], (err, data) => {
        if(err) return res.json(err)
        return res.json(`Book has been created successfully. ${data}`)
    })
})

app.delete("/books/:id", (req, res) => {
    const bookId = req.params.id;
    const q = "DELETE FROM books WHERE id = ?"

    db.query(q, [bookId], (err, data) => {
        if(err) return res.json(err);
        return res.json("Book has been deleted successfully.")
    })
})

app.put("/books/:id", (req, res) => {
    const bookId = req.params.id;
    const q = "UPDATE books SET `title` = ?, `desc` = ?, `price` = ?, `cover` = ? WHERE id = ?";

    const values = [
        req.body.title,
        req.body.desc,
        req.body.price,
        req.body.cover,
    ]

    // console.log(bookId);
    // console.log(values)

    db.query(q, [...values, bookId], (err, data) => {
        if(err) return res.json(err);
        return res.json("Book has been updated successfully.")
    })
})

app.listen(8800, () => {
    console.log("Connected to backend!")
})