const API_URL = process.env.NEXT_PUBLIC_API_URL

export const GET_ENDPOINT = `${API_URL}/getAllTodos`
export const POST_ENDPOINT = `${API_URL}/createTodo`
export const EDIT_ENDPOINT = `${API_URL}/editTodo`
export const DELETE_ENDPOINT = `${API_URL}/deleteTodo`
