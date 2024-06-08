import pkg from "pg"
import { exec } from "child_process"

const { Pool } = pkg

const DB_NAME = process.env.DB_NAME || "your_database_name"
const DB_USER = process.env.DB_USER || "kaoethan"
const DB_HOST = process.env.DB_HOST || "localhost"
const DB_PASSWORD = process.env.DB_PASSWORD || "your_password"
const DB_PORT = parseInt(process.env.DB_PORT, 10) || 5432

const pool = new Pool({
  user: DB_USER,
  host: DB_HOST,
  database: DB_NAME,
  password: DB_PASSWORD,
  port: DB_PORT,
})

const setupDatabase = async () => {
  try {
    const client = await pool.connect()

    const res = await client.query(`SELECT datname FROM pg_catalog.pg_database WHERE datname = $1`, [DB_NAME])

    if (res.rowCount === 0) {
      console.log(`${DB_NAME} database not found, creating it.`)
      await client.query(`CREATE DATABASE "${DB_NAME}" OWNER "${DB_USER}";`)
      console.log(`Created database ${DB_NAME}.`)
    } else {
      console.log(`${DB_NAME} database already exists.`)
    }

    client.release()
  } catch (error) {
    console.error("Failed to setup database:", error)
  }
}

setupDatabase()

// Example of how to use the pool for other queries
const queryDatabase = async (query, params) => {
  try {
    const client = await pool.connect()
    const res = await client.query(query, params)
    client.release()
    return res
  } catch (error) {
    console.error("Database query failed:", error)
  }
}

// Example usage of queryDatabase function
queryDatabase("SELECT NOW()", [])
  .then((res) => console.log("Current time:", res.rows[0]))
  .catch((err) => console.error("Error executing query", err))
