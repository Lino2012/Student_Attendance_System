import api from './api'

export const listSubjects = () => api.get('/subjects/').then(res => res.data)
export const createSubject = (payload) => api.post('/subjects/', payload).then(res => res.data)
export const updateSubject = (id, payload) => api.put(`/subjects/${id}/`, payload).then(res => res.data)
export const deleteSubject = (id) => api.delete(`/subjects/${id}/`)