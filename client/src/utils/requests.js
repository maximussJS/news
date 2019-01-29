import {request,requestFile} from './request'

export const login = async data => await request('POST','/login', data)

export const register = async data => await request('POST','/auth/register',data)

export const getNewsArray = async () => await request('GET','/news/')

export const getUser = async () => await request('GET','/users/user')

export const updateUser = async data => await request('PUT','/users/edit',data)

export const deleteUser = async () => await request('DELETE','/users/delete')

export const createNew = async data => await request('POST','/news/create', data)

export const uploadNewImage = async file => await requestFile('POST','/upload', file)