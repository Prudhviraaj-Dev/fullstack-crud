const express = require('express')
const dotEnv = require('dotenv')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const router = require('./routes/userRoute')
const core = require('cors')

const app = express()
const PORT = process.env.PORT || 5000

dotEnv.config()
app.use(bodyParser.json())
app.use(core())

mongoose.connect(process.env.db_link,{ connectTimeoutMS: 50000 } )
.then(()=> {
    console.log("MongoDB is connected")
}).catch((error)=> {
    console.log("Failed to Connect MongoDB ")
    console.log(error, error.message)
})

app.use('/Ecommerce', router)

app.listen(PORT, ()=>{
    console.log(`server started and running at ${PORT}`)
})