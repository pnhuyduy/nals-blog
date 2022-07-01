import { getFormData } from './helpers'
import axios from '@/libs/axios'

interface LoginPayload {
  email: string
  password: string
  remember_me?: boolean
}

interface RegisterPayload {
  name: string
  email: string
  password: string
  avatar?: string
}

interface UpdateMePayload {
  name?: string
  email?: string
  password?: string
  avatar?: string
}

interface UserResponse {
  data: User
}

export const register = async (user: RegisterPayload) => {
  const payload = getFormData(user)
  return await axios.put<UserResponse>('api/v2/users', payload, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  })
}
export const login = async (payload: LoginPayload) => await axios.post<LoginPayload>('api/v2/login', payload)
export const logout = async () => await axios.delete('api/v2/logout')
export const getMe = async () => await axios.get('api/v2/me')
export const updateMe = async (updatePayload: UpdateMePayload) => {
  const payload = getFormData(updatePayload)
  await axios.put('api/v2/me', payload, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  })
}
