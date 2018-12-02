import decode from 'jwt-decode'

export const Authenticate = token => localStorage.setItem('token', token)

export const Deauthenticate = () => localStorage.removeItem('token')

export const getToken = () => localStorage.getItem('token')

export const isAuthenticated = () => localStorage.getItem('token') !== null

export const getUser = () => decode(getToken()).user