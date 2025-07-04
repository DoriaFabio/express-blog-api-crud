import mysql from "mysql2";

const connection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DATABASE,
});

connection.connect((err) => {
    if (err) {
        console.error("Errore connessione DB:", err.message);
        process.exit(1);
    }
    console.log("Connected to MySQL Database");
});

export default connection;