const express = require("express")
const nodemon = require("nodemon")
const dotenv = require("dotenv")
const {Pool} = require("pg")

//Load env variables
dotenv.config()

const app = express()
app.use(express.json())

//Postgresql connection
const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
})

//Home route
app.get('/', async (req, res) => {
  return res.send('Postgresql is connected')
})

