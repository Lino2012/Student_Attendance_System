import api from './api'

export const listFaculty = () => api.get('/faculty/').then(res => res.data)
export const createFaculty = (payload) => api.post('/faculty/', payload).then(res => res.data)
export const updateFaculty = (id, payload) => api.put(`/faculty/${id}/`, payload).then(res => res.data)
export const deleteFaculty = (id) => api.delete(`/faculty/${id}/`)