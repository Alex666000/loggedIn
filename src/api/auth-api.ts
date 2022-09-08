import axios, {AxiosResponse} from 'axios'
import {instance, ResponseType} from './todolists-api';

// api
export const authAPI = {
    login(data: LoginParamsType) {
        return instance.post<LoginParamsType,AxiosResponse<ResponseType<{userId: number}>>> ('auth/login', data)
    }
}



// types
export type LoginParamsType = {
    email: string
    password: string
    rememberMe: boolean
    captcha?: string
}
