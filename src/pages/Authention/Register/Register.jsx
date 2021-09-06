import React from 'react'
import { Controller, useForm } from 'react-hook-form'
import { Link, useHistory } from 'react-router-dom'
import { Button } from 'src/assets/styles/until'
import InputPassword from 'src/components/InputPassword/InputPassword'
import InputText from 'src/components/InputText/InputText'
import { path } from 'src/constants/path'
import { rule } from 'src/constants/rule'
import * as sly from './register.stlyed'
import ErrMessage from 'src/components/ErrMessage/ErrMessage'
// import http from 'src/utils/http'
import { register } from '../authention.slice'
import { unwrapResult } from '@reduxjs/toolkit'
import { useDispatch } from 'react-redux'

function Register() {
  const {
    control,
    handleSubmit,
    getValues,
    setError,
    formState: { errors }
  } = useForm({
    defaultValues: {
      email: '',
      password: '',
      confilmpassword: ''
    }
  })

  const dispatch = useDispatch()
  const history = useHistory()

  const handleRegister = async data => {
    const body = {
      email: data.email,
      password: data.password
    }
    try {
      const res = await dispatch(register(body))

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
          <sly.Title>Đăng Ký</sly.Title>
          <sly.Form onSubmit={handleSubmit(handleRegister)} noValidate>
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
            <sly.FormControl>
              <Controller
                name="confilmpassword"
                control={control}
                rules={{
                  ...rule.confirmpass,
                  validate: {
                    samePassword: v => v === getValues('password') || 'Mật khẩu không khớp'
                  }
                }}
                render={({ field }) => (
                  <InputPassword
                    placeholder="Nhập lại mật khẩu"
                    name="confilmpassword"
                    onChange={field.onChange}
                    value={getValues('confilmpassword')}
                  ></InputPassword>
                )}
              />
              <ErrMessage errors={errors} name="confilmpassword" />
            </sly.FormControl>
            <sly.FormButton>
              <Button type="submit">Đăng Ký</Button>
            </sly.FormButton>
          </sly.Form>
          <sly.FormFooter>
            <span>Bạn đã có tài khoản ? </span>
            <Link to={path.login} className="Link">
              Đăng Nhập
            </Link>
          </sly.FormFooter>
        </sly.FormWrapper>
      </sly.Container>
    </sly.RegisterStyled>
  )
}
export default Register
