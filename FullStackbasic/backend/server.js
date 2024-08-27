// const express = require('express')
// require('dotenv').config()
import express from 'express';

const app = express();
// console.log(app)
app.use(express.static('dist'))
// app.get('/', (req,res) => {
//     res.send('Server is ready');
// });

app.get('/api/jokes',(req,res) => {
    const jokes = [
        {
            id: 1,
            title: 'Why did the scarecrow win an award?',
            content: 'Because he was outstanding in his field!'
        },
        {
            id: 2,
            title: 'What do you call fake spaghetti?',
            content: 'An impasta!'
        },
        {
            id: 3,
            title: 'Why don’t scientists trust atoms?',
            content: 'Because they make up everything!'
        },
        {
            id: 4,
            title: 'What did one wall say to the other wall?',
            content: 'I’ll meet you at the corner!'
        },
        {
            id: 5,
            title: 'Why did the bicycle fall over?',
            content: 'Because it was two-tired!'
        }
    ];
    res.send(jokes)
})

const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`Server at https://localhost:${port}`);
});

//CORS - doosre ko ghar k andar enter nhi krne denge 
//Solution - proxy y SERVER k andar white listing
// Tell backend deveoper to whitelist the everry port number - github-api mein personal personal data dete hai - yaa domain white list - etc
// or use cors and proxy package