const express = require("express")
const dotenv = require("dotenv")
const usersRouter = require("./routes/users")

//Load env variables
dotenv.config()

const app = express()
app.use(express.json())


//Home route
app.get('/api/v1', async (req, res) => {
  return res.send('Postgresql is connected')
})

app.use('/api/v1/users', usersRouter);

//404 handler for unknown routes
app.use((req, res) => {
  res.status(404).json({ success: false, error: 'Route not found' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
})

