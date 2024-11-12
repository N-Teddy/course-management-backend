require('dotenv').config()
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

mongoose.connect(process.env.DATABASE_URL)
    .then(connection => {
        const app = express();
        app.use(cors());
        app.use(express.json());
        // app.use(urlencoded({ extended: false }))
        app.use(cors({
            origin: 'http://localhost:3000',  // Allow only this origin (Next.js app)
            methods: ['GET', 'POST'],         // Specify the methods allowed
            credentials: true,                // Allow cookies and credentials
        }));

        //Routes
        const authRoute = require('./routes/auth.route');
        const userRoute = require('./routes/user.route');
        const courseRoute = require('./routes/course.route');
        const homeRoute = require('./routes/index.route');
        const indexRoute = require('./routes/index.route')

        app.use('/api/auth', authRoute);
        app.use('/api/user', userRoute);
        app.use('/api/course', courseRoute);
        app.use('/api/home', homeRoute);
        app.use('/index', indexRoute);


        // app.use((req, res, next) => {
        //     return res.status(404).json({
        //         status: 'not found',
        //         status_code: 404,
        //         message: 'requested resourse not found',
        //         data: {
        //             protocol: res.protocol,
        //             method: res.method.toUpperCase(),
        //             url: req.originalUrl
        //         }
        //     })
        //     next()
        // })

        // app.use((error, req, res, next) => { 
        //     const status_code = error.status || 500;
        //     return res.status(status_code).json({
        //         status: 'error',
        //         status_code: status_code,
        //         message: error.message,
        //         data: {
        //             error: error.stack,
        //             protocol: res.protocol,
        //             method: res.method.toUpperCase(),
        //             url: req.originalUrl
        //         }
        //     })
        //     next()
        // })

        app.listen(process.env.PORT, () => {
            console.log("listening on port " + process.env.PORT);
        })

    })
    .catch((error) => console.error('Error connecting to database: ' + error));