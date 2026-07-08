import api, { normalizeList } from './api'

export const listStudents = () => api.get('/students/').then(res => normalizeList(res.data))
export const getStudent = (id) => api.get(`/students/${id}/`).then(res => res.data)
export const createStudent = (payload) => api.post('/students/', payload).then(res => res.data)
export const updateStudent = (id, payload) => api.put(`/students/${id}/`, payload).then(res => res.data)
export const deleteStudent = (id) => api.delete(`/students/${id}/`)