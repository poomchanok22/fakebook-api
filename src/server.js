import dotenv from 'dotenv'
import app from './app.js'
import shutdown from './utills/shutdown.utill.js'
import prisma from './config/prisma.config.js'
dotenv.config()

const PORT = process.env.PORT || 8000





app.listen(PORT, ()=>console.log("Server is runnig on :", PORT))


// process.on("SIGINT", ()=> {prisma.$disconect().then(()=> {
//   console.log("prisma Shutting down")
// })
// })

process.on("SIGINT", ()=> shutdown("SIGINT"))
process.on("SIGTERM", ()=> shutdown("SIGTERM"))

process.on("uncaughtException", ()=> shutdown("uncaughtException"))
process.on("unhandledRejection", ()=> shutdown("unhandledRejection"))