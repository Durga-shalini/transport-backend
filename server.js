
const express=require('express');
const cors=require('cors');
const connect=require('./config/db');

const app=express();
connect();

app.use(cors());
app.use(express.json());

app.use('/api/auth',require('./routes/auth'));
app.use('/api/load',require('./routes/load'));

app.listen(5000,()=>console.log('Server running'));
