const express = require('express');
const app = express();
const path = require('path');
const {  logMiddleware } = require('./middleware/logEvent');
const cors = require('cors');
const { errorHandler } = require('./middleware/errorHandler');
const userRouter = require('./routes/userRouter');
const port = process.env.PORT || 3000;

// Using middlewares

// custome middleware for loggingEvents 
app.use(logMiddleware)

// handling cross origin resource origins
const whiteList = ['https://www.google.com', 'http://localhost:3000']
const corsOptions = {
    origin: (origin,callback) => {
        if (whiteList.indexOf(origin)!== -1 || !origin) {
            console.log(origin)
            callback(null, true)
        } else { 
            callback(new Error('Not allowed by CORS...'));
        }
    } ,
    optionsSuccessStatus: 200
}
app.use(cors(corsOptions))

// use build in middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public'))); // using static files

// Home page
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'views' , 'index.html'));
})

// Using router
app.use('/users', userRouter)
app.get('/users/:id',userRouter)


// Handling errors
app.use(errorHandler)

app.listen(port,() => console.log("server is listening on port " + port))