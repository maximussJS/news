import {request,requestFile} from './request'

export const login = async data => await request('POST','/login', data)

export const register = async data => await request('POST','/register',data)

export const getNewsArray = async () => await request('GET','/')

export const getNew = async url => await request('GET', `/new?url=${url}`)

export const getUser = async () => await request('GET','/users/user')

export const updateUser = async data => await request('PUT','/users/edit',data)

export const deleteUser = async () => await request('DELETE','/users/delete')

export const createNew = async data => await request('POST','/new', data)

export const deleteNew = async title => await request('DELETE', `/new?title=${title}`)

export const uploadNewImage = async file => await requestFile('POST','/upload', file)