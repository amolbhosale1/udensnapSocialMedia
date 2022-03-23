const express = require('express');
const dotenv = require('dotenv');
const cookieParser=require("cookie-parser");

dotenv.config({ path: './DB/config.env' })

const app = express();

require('./DB/dbConnection');
app.use(express.json({ extends: false }));
app.use(cookieParser());

const PORT = process.env.PORT || 3000;

//app.get('/',(req,res)=>{ res.send("kfs")})
app.use('/api', require('./routes/api/users'));
app.use('/api/profile',require('./routes/api/profile'));
app.use('/api/post',require('./routes/api/post'));
app.listen(PORT, () => { console.log(`Server is ruuning at port ${PORT}`) })