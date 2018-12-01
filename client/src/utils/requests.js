import {request} from './request'

export const dologin = data => request('POST','/login', data)

export const register = async data => await request('post','/register',data)

export const getNewsArray = async () => await request('get','/')

export const getUser = async () => await request('get','/user')