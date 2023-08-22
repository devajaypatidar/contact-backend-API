const express = require('express');
const dotenv = require('dotenv').config();
const app = express();
const contactRoutes = require('./routes/contactRoutes')
const port = process.env.PORT || 80;
const errorHandler = require('./middleware/errorHandler');
const ConnectDb = require('./config/dbConnection');
const userRoutes = require('./routes/userRoutes');
ConnectDb();
//middle ware to body parse the data from client to server
app.use(express.json());


app.use("/api/contacts",contactRoutes);
app.use("/api/users",userRoutes);
app.use(errorHandler);
app.listen(port,()=>{
    console.log("The server is running on the localhost: " + port);
});