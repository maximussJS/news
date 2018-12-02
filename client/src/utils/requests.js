import {request} from './request'

export const login = async data => await request('post','/login', data)

export const register = async data => await request('post','/register',data)

export const getNewsArray = async () => await request('get','/')

export const getUser = async () => await request('get','/user')

export const updateUser = async data => await request('put','/update',data)