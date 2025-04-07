'use client'

import useSWR from 'swr'
import Todo from './components/Todo'
import { TodoType } from './types'
import { useRef } from 'react'

const postEndpoint = 'http://localhost:8080/createTodo'
const getEndpoint = 'http://localhost:8080/allTodos'

async function fetcher(key: string): Promise<TodoType[]> {
  return await fetch(key).then((res) => res.json())
}

export default function Home() {
  const {
    data,
    error,
    isLoading,
    mutate: mutateTodos,
  } = useSWR<TodoType[]>(getEndpoint, fetcher)
  const inputRef = useRef<HTMLInputElement>(null)

  const createTodo = async (data: Omit<TodoType, 'id'>) => {
    const response = await fetch(postEndpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })

    return response.json()
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const inputValue = inputRef.current?.value

    if (!inputValue) return

    const newTodo = await createTodo({
      title: inputValue,
      isCompleted: false,
    })

    mutateTodos([...(data || []), newTodo])
  }

  if (isLoading) return <div>Loading...</div>

  if (error) return <div>データを取得できませんでした</div>

  return (
    <div className="max-w-md mx-auto bg-white shadow-lg rounded-lg overflow-hidden mt-32 py-4 px-4">
      <div className="px-4 py-2">
        <h1 className="text-gray-800 font-bold text-2xl uppercase">
          To-Do List
        </h1>
      </div>
      <form
        className="w-full max-w-sm mx-auto px-4 py-2"
        onSubmit={handleSubmit}>
        <div className="flex items-center border-b-2 border-teal-500 py-2">
          <input
            className="appearance-none bg-transparent
      border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight
      focus:outline-none"
            type="text"
            placeholder="Add a task"
            ref={inputRef}
          />
          <button
            className="duration-150 flex-shrink-0 bg-blue-500 hover:bg-blue-700 border-blue-500 hover:border-blue-700 text-sm border-4 text-white py-1 px-2 rounded"
            type="submit">
            Add
          </button>
        </div>
      </form>
      {data ? (
        <ul className="divide-y divide-gray-200 px-4">
          {data.map((todo) => (
            <Todo
              key={todo.id}
              title={todo.title}
              isCompleted={todo.isCompleted}
            />
          ))}
        </ul>
      ) : (
        <div>No data</div>
      )}
    </div>
  )
}
