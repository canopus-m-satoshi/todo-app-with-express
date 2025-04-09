import { useState } from 'react'
import { EDIT_ENDPOINT, DELETE_ENDPOINT } from '../constants'

type Props = {
  id: number
  title: string
  isCompleted: boolean
  mutateTodos: () => void
}

const Todo = ({ id, title, isCompleted, mutateTodos }: Props) => {
  const [isEditing, setIsEditing] = useState(false)
  const [editedTitle, setEditedTitle] = useState(title)

  const deleteTodo = async (id: number) => {
    const response = await fetch(`${DELETE_ENDPOINT}/${id}`, {
      method: 'DELETE',
    })

    return response.json()
  }

  const editTodo = async (id: number, title: string) => {
    const response = await fetch(`${EDIT_ENDPOINT}/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ title }),
    })

    console.log(response)

    return response.json()
  }

  const handleEdit = async (id: number) => {
    if (isEditing) {
      await editTodo(id, editedTitle)
      mutateTodos()
    }

    setIsEditing(!isEditing)
  }

  const handleDelete = async (id: number) => {
    await deleteTodo(id)
    mutateTodos()
  }

  return (
    <div>
      <li className="py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <input
              id="todo1"
              name="todo1"
              type="checkbox"
              className="h-4 w-4 text-teal-600 focus:ring-teal-500
                border-gray-300 rounded"
            />
            <label className="ml-3 block text-gray-900">
              {isEditing ? (
                <input
                  type="text"
                  value={editedTitle}
                  onChange={(e) => setEditedTitle(e.target.value)}
                  className="border rounded py-1 px-2"
                />
              ) : (
                <span className="text-lg font-medium mr-2">{title}</span>
              )}
            </label>
          </div>
          <div className="flex items-center space-x-2">
            <button
              className="duration-150 bg-green-600 hover:bg-green-700 text-white font-medium py-1 px-2 rounded cursor-pointer"
              onClick={() => handleEdit(id)}>
              {isEditing ? 'Save' : 'Edit'}
            </button>
            <button
              className="bg-red-500 hover:bg-red-600 text-white font-medium py-1 px-2 rounded"
              onClick={() => handleDelete(id)}>
              ✖
            </button>
          </div>
        </div>
      </li>
    </div>
  )
}
export default Todo
