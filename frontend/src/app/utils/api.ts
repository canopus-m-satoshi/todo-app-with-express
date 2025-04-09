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

export const getTodos = () => fetchApi(GET_ENDPOINT, { method: 'GET' })

export const createTodo = (data: { title: string }) =>
  fetchApi(POST_ENDPOINT, {
    method: 'POST',
    body: JSON.stringify(data),
  })

export const editTodo = (id: number, data: { title: string }) =>
  fetchApi(`${EDIT_ENDPOINT}/${id}`, {
    method: 'PUT',
    body: JSON.stringify(data),
  })

export const deleteTodo = (id: number) =>
  fetchApi(`${DELETE_ENDPOINT}/${id}`, {
    method: 'DELETE',
  })
