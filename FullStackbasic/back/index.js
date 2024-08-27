import express from 'express'
const app = express()
const port = process.env.PORT || 3000

app.get('/',(req,res) => {
    res.send('Change the listen to see the top standup comdeian of India')
})

app.get('/detail/standup',(req,res) => {
    const standup = [
        {
            id: 1,
            Name: "Vir Das",
            age: 44
        },
        {
            id: 2,
            Name: "Kanan Gill",
            age: 34
        },
        {
            id: 3,
            Name: "Atul Khatri",
            age: 56
        },
        {
            id: 4,
            Name: "Neeti Palta",
            age: 45
        },
        {
            id: 5,
            Name: "Rahul Subramanian",
            age: 36
        }
    ];
    res.send(standup)    
})

app.listen(port, () => {
    console.log(`Listening on http://localhost:${port}/`)
})