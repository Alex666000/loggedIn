import React from 'react'
import Grid from '@mui/material/Grid';
import Checkbox from '@mui/material/Checkbox';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormGroup from '@mui/material/FormGroup';
import FormLabel from '@mui/material/FormLabel';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import {useFormik} from 'formik';
import {loginTC} from './authReducer';
import {useDispatch, useSelector} from 'react-redux';
import {AppRootStateType} from '../../app/store';
import {Navigate} from 'react-router-dom';

type FormikErrorType = {
    email?: string
    password?: string
    rememberMe?: boolean | undefined
}

export const Login = () => {

    const dispatch = useDispatch()
    const isLoggedIn = useSelector<AppRootStateType, boolean>(state => state.auth.isLoggedIn)

    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
            rememberMe: false
        },
        validate: (values) => {
            // в 28 строке говорим ошибка может быть в поле email password или rememberMe - пока создай пустой объект
            const errors: FormikErrorType = {};
            // валидации:
            if (!values.email) { // если email пустой
                errors.email = 'Пустое поле введите значение';
            } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
                errors.email = 'Invalid email address';
            }
            // валидация длинны пароля: если пароля тут нет то запиши в объект error свойство password и напиши
            if (!values.password) {
                errors.password = 'Пустое поле введите значение';
            } else if (values.password.length < 3) {
                errors.password = 'Пароль должен быть больше 3 символов';
            }
            return errors;
        },
        onSubmit: values => {
            // alert(JSON.stringify(values, null, 2));
            // formik.resetForm(); очистка не нужна так как будем Редирект делать
            dispatch(loginTC(values))
        },
    });

    if (isLoggedIn) {
        return <Navigate to={'/'} />
    }

    return <Grid container justifyContent={'center'}>
        <Grid item justifyContent={'center'}>
            <form onSubmit={formik.handleSubmit}>
                <FormControl>
                    <FormLabel>
                        <p>To log in get registered
                            <a href={'https://social-network.samuraijs.com/'}
                               target={'_blank'}> here
                            </a>
                        </p>
                        <p>or use common test account credentials:</p>
                        <p>Email: free@samuraijs.com</p>
                        <p>Password: free</p>
                    </FormLabel>
                    <FormGroup>
                        <TextField
                            label="Email"
                            margin="normal"
                            type="email"
                            // name="email"
                            // onChange={formik.handleChange}
                            // value={formik.values.email}
                            // onBlur={formik.handleBlur}
                            {...formik.getFieldProps('email')}

                        />
                        {formik.touched.email && formik.errors.email &&
                            <div style={{color: 'red'}}>{formik.errors.email}</div>}
                        <TextField
                            type="password"
                            label="Password"
                            margin="normal"
                            // name={'password'}
                            // onChange={formik.handleChange}
                            // value={formik.values.password}
                            // onBlur={formik.handleBlur}
                            {...formik.getFieldProps('password')}

                        />
                        {formik.touched.password && formik.errors.password &&
                            <div style={{color: 'red'}}>{formik.errors.password}</div>}
                        <FormControlLabel label={'Remember me'} control=
                            {<Checkbox checked={formik.values.rememberMe}
                                       {...formik.getFieldProps('rememberMe')}
                            />}
                        />
                        <Button type={'submit'} variant={'contained'} color={'primary'}>
                            Login
                        </Button>
                    </FormGroup>
                </FormControl>
            </form>
        </Grid>
    </Grid>
}