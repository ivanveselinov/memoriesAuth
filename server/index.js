import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';

import postRoutes from './routes/posts.js' // Import postsRoutes -> posts.js
import userRoutes from './routes/Users.js' // Import UsersRoutes -> users.js

const app = express();
dotenv.config();

app.use(bodyParser.json({ limit: '30mb', extended: true }));    // Set Limit to 30mb 
app.use(bodyParser.urlencoded({ limit: '30mb', extended: true })); // Set limit to 30mb
app.use(cors());

app.use('/posts', postRoutes); // posts.js routes is now setuped localhost:4000/posts
app.use('/user',userRoutes);    // user.js routes is not setuped localhost:4000/posts

//Heroku Things
app.get('/', (req, res) => {
    res.send('Hello to memories API');
});

//connection to db
const PORT = process.env.PORT || 4000; // Add port 

mongoose.connect(process.env.CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true })
.then(() => app.listen(PORT, () => console.log(`Server running on port ${PORT}`))) // if succesfull 
.catch((error) => console.log(error.message)); // if not successfull


