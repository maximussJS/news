import {request} from './request'

export const dologin = async data => await request('post','/login', data)

export const register = async data => await request('post','/register',data)

export const getNewsArray = async () => await request('get','/')

export const getUser = async () => await request('get','/user')