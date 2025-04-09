import {
  GET_ENDPOINT,
  POST_ENDPOINT,
  EDIT_ENDPOINT,
  DELETE_ENDPOINT,
} from '../constants'

type RequestOptions = {
  method: 'GET' | 'POST' | 'PUT' | 'DELETE'
  headers?: Record<string, string>
  body?: string
}

const fetchApi = async (endpoint: string, options: RequestOptions) => {
  const response = await fetch(endpoint, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
  })

  return response.json()
}

export const getTodosApi = () => fetchApi(GET_ENDPOINT, { method: 'GET' })

export const createTodoApi = (data: { title: string }) =>
  fetchApi(POST_ENDPOINT, {
    method: 'POST',
    body: JSON.stringify(data),
  })

export const editTodoApi = (id: number, data: { title: string }) =>
  fetchApi(`${EDIT_ENDPOINT}/${id}`, {
    method: 'PUT',
    body: JSON.stringify(data),
  })

export const toggleCompleteTodoApi = (id: number, isCompleted: boolean) =>
  fetchApi(`${EDIT_ENDPOINT}/${id}`, {
    method: 'PUT',
    body: JSON.stringify({ isCompleted }),
  })

export const deleteTodoApi = (id: number) =>
  fetchApi(`${DELETE_ENDPOINT}/${id}`, {
    method: 'DELETE',
  })
