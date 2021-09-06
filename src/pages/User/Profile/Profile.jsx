import React from 'react'
import InputText from '../../../components/InputText/InputText'
import * as sly from './Profile.styled'
import { getDate, getMonth, getYear, isExists } from 'date-fns'
// import { getDate, getMonth, getYear, isExists } from 'date-fns'
import { Controller, useForm } from 'react-hook-form'
import range from 'lodash/range'
import { rule } from 'src/constants/rule'
import ErrMessage from 'src/components/ErrMessage/ErrMessage'
import { useDispatch, useSelector } from 'react-redux'
import { updateMe } from 'src/pages/Authention/authention.slice'
import { unwrapResult } from '@reduxjs/toolkit'
import { toast } from 'react-toastify'
export default function Profile() {
  const profile = useSelector(state => state.auth.profile)
  const {
    control,
    handleSubmit,
    getValues,
    formState: { errors },
    setError
  } = useForm({
    defaultValues: {
      name: profile.name || '',
      phone: profile.phone || '',
      address: profile.address || '',
      date: profile.date_of_birth ? getDate(new Date(profile.date_of_birth)) : '',
      month: profile.date_of_birth ? getMonth(new Date(profile.date_of_birth)) : '',
      year: profile.date_of_birth ? getYear(new Date(profile.date_of_birth)) : ''
    }
  })
  const dispatch = useDispatch()
  const update = async data => {
    const body = {
      name: data.name,
      phone: data.phone,
      address: data.address,
      date_of_birth: new Date(data.year, data.month, data.date).toISOString()
    }
    try {
      const res = await dispatch(updateMe(body)).then(unwrapResult)
      toast.success(res.message, {
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
  const ValidateDate = () =>
    isExists(Number(getValues('year')), Number(getValues('month')), Number(getValues('date'))) || 'Ngày sinh không đúng'
  return (
    <sly.Profile>
      <sly.ProfileHeader>
        <sly.ProfileHeaderTitle>Hồ sơ của tôi</sly.ProfileHeaderTitle>
        <sly.ProfileHeaderSubTitle>Quản lý thông tin hồ sơ</sly.ProfileHeaderSubTitle>
      </sly.ProfileHeader>
      <sly.ProfileInfo>
        <sly.ProfileInfoLeft onSubmit={handleSubmit(update)}>
          <sly.InputLabel>
            <sly.InputLabelLabel>Email</sly.InputLabelLabel>
            <sly.InputLabelContent>
              <sly.InputLabelContentText>{profile.email}</sly.InputLabelContentText>
            </sly.InputLabelContent>
          </sly.InputLabel>
          <sly.InputLabel>
            <sly.InputLabelLabel>Tên</sly.InputLabelLabel>
            <sly.InputLabelContent>
              <Controller
                name="name"
                control={control}
                rules={rule.name}
                render={({ field }) => (
                  <InputText name="name" type="text" onChange={field.onChange} value={getValues('name')} />
                )}
              ></Controller>
              <ErrMessage name="name" errors={errors}></ErrMessage>
            </sly.InputLabelContent>
          </sly.InputLabel>
          <sly.InputLabel>
            <sly.InputLabelLabel>Số điện thoại</sly.InputLabelLabel>
            <sly.InputLabelContent>
              <Controller
                name="phone"
                control={control}
                rules={rule.phone}
                render={({ field }) => (
                  <InputText name="phone" type="number" onChange={field.onChange} value={getValues('phone')} />
                )}
              ></Controller>
              <ErrMessage name="phone" errors={errors}></ErrMessage>
            </sly.InputLabelContent>
          </sly.InputLabel>
          <sly.InputLabel>
            <sly.InputLabelLabel>Địa chỉ</sly.InputLabelLabel>
            <sly.InputLabelContent>
              <Controller
                name="address"
                control={control}
                rules={rule.address}
                render={({ field }) => (
                  <InputText name="address" type="address" onChange={field.onChange} value={getValues('address')} />
                )}
              ></Controller>
              <ErrMessage name="address" errors={errors}></ErrMessage>
            </sly.InputLabelContent>
          </sly.InputLabel>
          <sly.InputLabel>
            <sly.InputLabelLabel>Ngày sinh</sly.InputLabelLabel>
            <sly.InputLabelContent>
              <sly.DateSelect>
                <Controller
                  name="date"
                  control={control}
                  rules={{
                    validate: {
                      date: ValidateDate
                    }
                  }}
                  render={({ field }) => (
                    <sly.SelectDate
                      title="Ngày"
                      options={range(1, 32).map(items => ({
                        name: items,
                        value: items
                      }))}
                      onChange={field.onChange}
                      value={getValues('date')}
                    ></sly.SelectDate>
                  )}
                />
                <Controller
                  name="month"
                  control={control}
                  rules={{
                    validate: {
                      month: ValidateDate
                    }
                  }}
                  render={({ field }) => (
                    <sly.SelectDate
                      title="Tháng"
                      options={range(0, 12).map(items => ({
                        name: items + 1,
                        value: items
                      }))}
                      onChange={field.onChange}
                      value={getValues('month')}
                    ></sly.SelectDate>
                  )}
                />
                <Controller
                  name="year"
                  control={control}
                  rules={{
                    validate: {
                      year: ValidateDate
                    }
                  }}
                  render={({ field }) => (
                    <sly.SelectDate
                      title="Năm"
                      options={range(1900, 2021).map(items => ({
                        name: items,
                        value: items
                      }))}
                      onChange={field.onChange}
                      value={getValues('year')}
                    ></sly.SelectDate>
                  )}
                />
              </sly.DateSelect>
              <sly.ErrMeess>
                <ErrMessage name="date" errors={errors} />
              </sly.ErrMeess>
            </sly.InputLabelContent>
          </sly.InputLabel>
          <sly.Submit>
            <sly.ButtonSubmit type="submit">Lưu</sly.ButtonSubmit>
          </sly.Submit>
        </sly.ProfileInfoLeft>
        <sly.ProfileInfoRight>
          <sly.AvtUploader>
            <sly.Avatar>
              <img src="https://cf.shopee.vn/file/920828c0b76574a1567d37429f2d47ad" alt="" />
            </sly.Avatar>
            <sly.InputFile type="file" accept=".jpg,.jpeg,.png"></sly.InputFile>
            <sly.ButtonUpload>Chọn ảnh</sly.ButtonUpload>
            <sly.AvtUploadText>
              <div>Dụng lượng file tối đa 1 MB</div>
              <div>Định dạng:.JPEG, .PNG</div>
            </sly.AvtUploadText>
          </sly.AvtUploader>
        </sly.ProfileInfoRight>
      </sly.ProfileInfo>
    </sly.Profile>
  )
}
