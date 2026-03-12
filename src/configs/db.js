import mysql from "mysql2/promise";


/** 
- This db connect
- with aiven mySql database
- and comment localstorage database
*/ 
export const db = mysql.createPool({
//   host: "localhost",
//   user: "root",
//   password: "01806116522",
//   database: "testproject",
  //   waitForConnections: true,
  //   connectionLimit: 10,
  //   queueLimit: 0

    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    
});

try {
  const connection = await db.getConnection();
  console.log("✅ Database Connection Successful");
  connection.release();
} catch (error) {
    console.error("❌ Database Connection Failed")
    process.exit(1)
}
