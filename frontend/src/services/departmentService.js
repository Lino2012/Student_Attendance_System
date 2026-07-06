import api from './api'

export const listDepartments = () => api.get('/departments/').then(res => res.data)
export const createDepartment = (payload) => api.post('/departments/', payload).then(res => res.data)
export const updateDepartment = (id, payload) => api.put(`/departments/${id}/`, payload).then(res => res.data)
export const deleteDepartment = (id) => api.delete(`/departments/${id}/`)