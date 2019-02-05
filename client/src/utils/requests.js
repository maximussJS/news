import {request,requestFile} from './request'

export const login = async data => await request('POST','/login', data)

export const register = async data => await request('POST','/register',data)

export const getNewsArray = async () => await request('GET','/')

export const getNew = async url => await request('GET', `/new?url=${url}`)

export const getUser = async email => await request('GET', `/user?email=${email}`)

export const updateUser = async data => await request('PUT','/user', data)

export const deleteUser = async () => await request('DELETE','/user')

export const createNew = async data => await request('POST','/new', data)

export const deleteNew = async title => await request('DELETE', `/new?title=${title}`)

export const editNew = async data => await request('PUT', '/new', data)

export const getNewComments = async title => await request('GET', `/comments?title=${title}`)

export const createComment = async data => await request('POST', '/comments', data)

export const uploadNewImage = async file => await requestFile('POST','/upload', file)