import prisma from "../config/prisma.config.js";

export default async function(signal) {
  console.log(`\nReceive ${signal}, shutting down`)
  try {
    await prisma.$disconnect()
    console.log('Prisma disconnect')
  } catch (err) {
    console.log("Error when disconnect", err)
  } finally {
    process.exit(0)
  }
  
}