import React from 'react'
import * as sly from '../Register/register.stlyed'
import { Controller, useForm } from 'react-hook-form'
import { Link, useHistory } from 'react-router-dom'
import InputPassword from 'src/components/InputPassword/InputPassword'
import InputText from 'src/components/InputText/InputText'
import { Button } from 'src/assets/styles/until'
import ErrMessage from 'src/components/ErrMessage/ErrMessage'
import { path } from 'src/constants/path'
import { rule } from 'src/constants/rule'
import { useDispatch } from 'react-redux'
import { login } from '../authention.slice'
import { unwrapResult } from '@reduxjs/toolkit'
function Login() {
  const {
    control,
    handleSubmit,
    getValues,
    setError,
    formState: { errors }
  } = useForm({
    defaultValues: {
      email: '',
      password: ''
    }
  })
  const dispatch = useDispatch()
  const history = useHistory()
  const handleLogin = async data => {
    const body = {
      email: data.email,
      password: data.password
    }
    try {
      const res = await dispatch(login(body))
      // dùng app dụng lỗi trong Thunk , nêu k có sẽ k xuất hiện Err
      unwrapResult(res)
      history.push(path.home)
    } catch (error) {
      if (error.status === 422) {
        for (const key in error.data) {
          setError(key, {
            type: 'server',
            message: error.data[key]
          })
        }
      }
    }
  }
  return (
    <sly.RegisterStyled>
      <sly.Container className="container">
        <sly.Banner src="https://nitrocdn.com/TTFwBYZjhtYzxRaCfCvlkWvfvtgcTgBL/assets/static/optimized/rev-500138b/wp-content/uploads/2020/03/Going-Beyond.png"></sly.Banner>
        <sly.FormWrapper>
          <sly.Title>Đăng Nhập</sly.Title>
          <sly.Form onSubmit={handleSubmit(handleLogin)} noValidate>
            <sly.FormControl>
              <Controller
                name="email"
                control={control}
                rules={rule.email}
                render={({ field }) => (
                  <InputText
                    type="email"
                    name="email"
                    placeholder="qweaxzxc@gmail.com"
                    onChange={field.onChange}
                    value={getValues('email')}
                  ></InputText>
                )}
              />
              <ErrMessage errors={errors} name="email" />
            </sly.FormControl>
            <sly.FormControl>
              <Controller
                name="password"
                control={control}
                rules={rule.password}
                render={({ field }) => (
                  <InputPassword
                    placeholder="Mật khẩu"
                    name="password"
                    onChange={field.onChange}
                    value={getValues('password')}
                  ></InputPassword>
                )}
              />
              <ErrMessage errors={errors} name="password" />
            </sly.FormControl>

            <sly.FormButton>
              <Button type="submit">Đăng Nhập</Button>
            </sly.FormButton>
          </sly.Form>
          <sly.FormFooter>
            <span>Bạn chưa có tài khoản ? </span>
            <Link to={path.register} className="Link">
              Đăng Nhập
            </Link>
          </sly.FormFooter>
        </sly.FormWrapper>
      </sly.Container>
    </sly.RegisterStyled>
  )
}
export default Login
