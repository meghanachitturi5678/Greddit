require("dotenv").config()

const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")

mongoose.set('strictQuery', false)

const userRoutes = require("./routes/userRoute")
const mysubgreddiitRoutes = require("./routes/mysubgreddiitRoute")
const subgreddiitRoutes = require("./routes/subgreddiitRoute")
const postRoutes = require("./routes/postRoute")

const app = express()
app.use(express.json())

app.use(cors())

app.use("/api/user", userRoutes)
app.use("/api/mysubgreddiit", mysubgreddiitRoutes)
app.use("/api/subgreddiit", subgreddiitRoutes)
app.use("/api/post", postRoutes)

mongoose.connect(process.env.MONGO_URI, {
    autoIndex: true
  })
  .then(() => {
    app.listen(process.env.PORT, () => console.log("server hosted on port: ", process.env.PORT))
  })
  .catch(err => console.log(err))