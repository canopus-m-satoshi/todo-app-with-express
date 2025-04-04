import express, { Express, Request, Response } from 'express'
import { PrismaClient } from '../generated/prisma'

const app: Express = express()
const PORT = 8080

const prisma = new PrismaClient()

app.get('/allTodos', async (req: Request, res: Response) => {
  const allTodos = await prisma.todo.findMany()

  return res.json(allTodos)
})

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})
