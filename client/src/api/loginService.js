import api from './api'

export const login = async ({ username, password }) => {
  const response = await api.post('/login', { username, password })
  const user = response.data
  return user
}

export const signup = async ({ name, username, password }) => {
  const response = await api.post('/signup', { name, username, password })
  const user = response.data
  return { id: user.id, name: user.name, username: user.username, created_at: user.created_at }
}

