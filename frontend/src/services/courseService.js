import api, { normalizeList } from './api'

export const listCourses = () => api.get('/courses/').then(res => normalizeList(res.data))
export const getCourse = (id) => api.get(`/courses/${id}/`).then(res => res.data)
export const createCourse = (payload) => api.post('/courses/', payload).then(res => res.data)
export const updateCourse = (id, payload) => api.put(`/courses/${id}/`, payload).then(res => res.data)
export const deleteCourse = (id) => api.delete(`/courses/${id}/`)
