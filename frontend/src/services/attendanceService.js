import api, { normalizeList } from './api'

// Attendance Sessions
export const listSessions = (params) => api.get('/attendance-sessions/', { params }).then(res => normalizeList(res.data))
export const getSession = (id) => api.get(`/attendance-sessions/${id}/`).then(res => res.data)
export const createSession = (payload) => api.post('/attendance-sessions/', payload).then(res => res.data)
export const updateSession = (id, payload) => api.put(`/attendance-sessions/${id}/`, payload).then(res => res.data)
export const deleteSession = (id) => api.delete(`/attendance-sessions/${id}/`)

// Attendance Records
export const listRecords = (params) => api.get('/attendance-records/', { params }).then(res => normalizeList(res.data))
export const getRecord = (id) => api.get(`/attendance-records/${id}/`).then(res => res.data)
export const createRecord = (payload) => api.post('/attendance-records/', payload).then(res => res.data)
export const updateRecord = (id, payload) => api.put(`/attendance-records/${id}/`, payload).then(res => res.data)
export const deleteRecord = (id) => api.delete(`/attendance-records/${id}/`)

// Bulk create records for a session
export const bulkCreateRecords = (records) => api.post('/attendance-records/bulk/', records).then(res => res.data)
