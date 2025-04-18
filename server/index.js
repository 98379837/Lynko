const express = require('express');
const dotenv = require('dotenv').config()
const cors = require('cors');
const {mongoose} = require('mongoose')
const app = express();
const cookieParser = require('cookie-parser')

//DB Connect
mongoose.connect(process.env.MONGO_URL)
.then(()=>console.log('DB Success')) //IF DB IS CONNECTED SUCCESSFULLY IT WILL PRINT 'DB SUCCESS' IN CONSOLE
.catch(()=> console.log('DB Not Connected', err)) // IF DB IS NOT CONNECTED PROPERLY

//Middleware
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({extended: false}))

app.use('/', require('./routes/authRoutes.js'))

const port = 8000;
app.listen(port, ()=> console.log(`Server is running on ${port}`))