const express = require('express');
const cors = require('cors');
const mongoose=require('mongoose')
const bodyParser=require('body-parser');
const path=require('path')

const userRouter=require('./router/user')
const adminRouter=require('./router/admin')


const app = express();

app.use(express.json())
// Enable CORS for all routes
app.use(cors());

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }));

//dataBaseConection
mongoose.connect('mongodb://127.0.0.1:27017/userDB')
.then(response=>{
 console.log('mongodb connected');
}).catch(err=>{
 console.log(`error happened when connecting mongodb : ${err}`);
})

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use('/',userRouter)
app.use('/admin',adminRouter)

app.listen(3001, () => console.log('Server has started to run...'));
