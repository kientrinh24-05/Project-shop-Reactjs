import { unwrapResult } from '@reduxjs/toolkit'
import React from 'react'
import { Controller, useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import ErrMessage from 'src/components/ErrMessage/ErrMessage'
import InputPassword from 'src/components/InputPassword/InputPassword'
import { rule } from 'src/constants/rule'
import { updateMe } from 'src/pages/Authention/authention.slice'
import * as sly from '../Profile/Profile.styled'
import { PasswordContent } from './Password.styled'
export default function Password() {
  const profile = useSelector(state => state.auth.profile)
  const {
    control,
    handleSubmit,
    getValues,
    formState: { errors },
    setError
  } = useForm({
    defaultValues: {
      password: '',
      new_password: '',
      confirmed_new_password: ''
    }
  })
  const dispatch = useDispatch()
  const update = async data => {
    const body = {
      password: data.password,
      new_password: data.new_password
    }
    try {
      await dispatch(updateMe(body)).then(unwrapResult)

      toast.success('Đã đổi mật khẩu thành công', {
        position: 'top-right'
      })
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
    <div>
      <sly.Profile>
        <sly.ProfileHeader>
          <sly.ProfileHeaderTitle>Đổi mật khẩu</sly.ProfileHeaderTitle>
          <sly.ProfileHeaderSubTitle>
            Để bảo mật tài khoản, vui lòng không chia sẻ mật khẩu cho người khác
          </sly.ProfileHeaderSubTitle>
        </sly.ProfileHeader>
        <PasswordContent onSubmit={handleSubmit(update)}>
          <sly.InputLabel>
            <sly.InputLabelLabel>Mât khẩu cũ</sly.InputLabelLabel>
            <sly.InputLabelContent>
              <Controller
                name="password"
                control={control}
                rules={rule.password}
                render={({ field }) => (
                  <InputPassword
                    name="password"
                    onChange={field.onChange}
                    value={getValues('password')}
                  ></InputPassword>
                )}
              />
              <ErrMessage errors={errors} name="password"></ErrMessage>
            </sly.InputLabelContent>
          </sly.InputLabel>
          <sly.InputLabel>
            <sly.InputLabelLabel>Mât khẩu mới</sly.InputLabelLabel>
            <sly.InputLabelContent>
              <Controller
                name="new_password"
                control={control}
                rules={rule.password}
                render={({ field }) => (
                  <InputPassword
                    name="new_password"
                    onChange={field.onChange}
                    value={getValues('new_password')}
                  ></InputPassword>
                )}
              />
              <ErrMessage errors={errors} name="new_password"></ErrMessage>
            </sly.InputLabelContent>
          </sly.InputLabel>
          <sly.InputLabel>
            <sly.InputLabelLabel>Nhập lại mật khẩu</sly.InputLabelLabel>
            <sly.InputLabelContent>
              <Controller
                name="confirmed_new_password"
                control={control}
                rules={{
                  ...rule.password,
                  validate: {
                    samePassword: v => v === getValues('new_password') || 'Mật khẩu nhập lại không khớp'
                  }
                }}
                render={({ field }) => (
                  <InputPassword
                    name="confirmed_new_password"
                    onChange={field.onChange}
                    value={getValues('confirmed_new_password')}
                  ></InputPassword>
                )}
              />
              <ErrMessage errors={errors} name="confirmed_new_password"></ErrMessage>
            </sly.InputLabelContent>
          </sly.InputLabel>
          <sly.Submit>
            <sly.ButtonSubmit type="submit">Lưu</sly.ButtonSubmit>
          </sly.Submit>
        </PasswordContent>
      </sly.Profile>
    </div>
  )
}
