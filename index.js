import express from "express"
import mongoose from "mongoose"
import dotenv from "dotenv"
import cookieParser from "cookie-parser"
import cors from "cors"

dotenv.config()

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("Connected to mongoDB")
  })
  .catch((err) => {
    console.log(err)
  })

const app = express()

// to make input as json
app.use(express.json())
app.use(cookieParser())

// Configure CORS to allow requests from your frontend origin
app.use(cors({
  origin: ["https://noteappfrontend-6.onrender.com/"],
  credentials: true, // Allows cookies to be sent with requests
}))

// Default route
app.get('/', (req, res) => {
  res.send('Welcome to the Note App Backend!') // You can customize this message
});

// Import routes
import authRouter from "./routes/auth.route.js"
import noteRouter from "./routes/note.route.js"

app.use("/api/auth", authRouter)
app.use("/api/note", noteRouter)

// Error handling
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500
  const message = err.message || "Internal Server Error"

  return res.status(statusCode).json({
    success: false,
    statusCode,
    message,
  })
})

app.listen(3000, () => {
  console.log("Server is running on port 3000")
})
