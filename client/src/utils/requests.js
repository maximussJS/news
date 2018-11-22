import {request} from './request'

export const login = async data => await request('post','/login', data)

export const register = async data => await request('post','/register',data)
