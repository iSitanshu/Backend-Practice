// import express from 'express'
// import cors from 'cors'
// import cookieParser from 'cookie-parser'

// const app = express();

// app.use(cors({
//     orgin: process.env.CORS_ORIGIN,
//     credentials: true
// }))

// app.use(express.json({limit: "16kb"}))
// app.use(express.urlencoded({extended: true,limit: "16kb"}))
// app.use(express.static("public"))
// app.use(cookieParser())

// export { app } 


import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'

const app = express()

app.use(cors({
    origin: process.env.COR_ORIGIN,
    credentials: true
}))

app.use(express.json({limit: "16kb"}))
app.use(express.urlencoded({extended: true,limit: "16kb"}))
app.use(express.static("public"))
app.use(cookieParser())

//routes import 
import userRouter from './routes/user.routes.js'

//routes declaration
app.use("/api/v1/users",userRouter); //koi bhi /user enter krvaega too user ka control de denge

export { app }