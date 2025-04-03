import express, { Express, Request, Response } from 'express'

const app: Express = express()
const PORT = 8080

app.get('/allTodos', (req: Request, res: Response) => {
  return res.send('Todos')
})

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})
