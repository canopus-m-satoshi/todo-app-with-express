import express, { Express, Request, Response } from 'express'
import { PrismaClient } from '../generated/prisma'
import cors from 'cors'

const app: Express = express()
app.use(cors())
app.use(express.json())

const PORT = 8080

const prisma = new PrismaClient()

app.get('/getAllTodos', async (req: Request, res: Response) => {
  const getAllTodos = await prisma.todo.findMany()

  return res.json(getAllTodos)
})

app.post('/createTodo', async (req: Request, res: Response) => {
  try {
    const { title } = req.body

    const createTodo = await prisma.todo.create({
      data: {
        title,
      },
    })

    return res.json(createTodo)
  } catch (e) {
    console.log(e)

    return res.status(500).json({
      message: 'Error creating todo',
      error: e,
    })
  }
})

app.put('/editTodo/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params
    const { title, isCompleted } = req.body

    const editTodo = await prisma.todo.update({
      where: {
        id: parseInt(id),
      },
      data: {
        title,
        isCompleted,
      },
    })

    return res.json(editTodo)
  } catch (e) {
    console.log(e)

    return res.status(500).json({
      message: 'Error editing todo',
      error: e,
    })
  }
})

app.delete('/deleteTodo/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params

    const deleteTodo = await prisma.todo.delete({
      where: {
        id: parseInt(id),
      },
    })

    return res.json(deleteTodo)
  } catch (e) {
    console.log(e)

    return res.status(500).json({
      message: 'Error deleting todo',
      error: e,
    })
  }
})

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})
