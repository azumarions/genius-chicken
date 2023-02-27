import React, { useContext, useState } from 'react'
import { useRouter } from 'next/router'
import Cookie from 'universal-cookie'
import { createProf, getProf, getMyProf } from '../../api/account'
import { AUTH, SnackbarMessage } from '@/types'
import { SubmitHandler, useForm, useFormState } from 'react-hook-form'
import CssBaseline from '@mui/material/CssBaseline'
import {
  IconButton,
  Snackbar,
  Avatar,
  Button,
  TextField,
  Box,
  Typography,
  CircularProgress,
} from '@mui/material'
import LoginIcon from '@mui/icons-material/Login'
import CloseIcon from '@mui/icons-material/Close'
import { AuthContext } from '@/context/auth'
import PermIdentityIcon from '@mui/icons-material/PermIdentity'
import { Email } from '@mui/icons-material'
import { ProfileContext } from '@/context/profile'

const cookie = new Cookie()

const Auth = () => {
  const router = useRouter()
  const [isLogin, setIsLogin] = useState<boolean>(false)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const { myProfile, setMyProfile } = useContext(ProfileContext)
  const { isAuth, setIsAuth } = useContext(AuthContext) //global stateにする
  const [open, setOpen] = React.useState(false)
  const [snackPack, setSnackPack] = React.useState<readonly SnackbarMessage[]>(
    []
  )
  const [messageInfo, setMessageInfo] = React.useState<
    SnackbarMessage | undefined
  >(undefined)
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<AUTH>({ mode: 'onChange' })

  React.useEffect(() => {
    if (snackPack.length && !messageInfo) {
      setMessageInfo({ ...snackPack[0] })
      setSnackPack((prev) => prev.slice(1))
      setOpen(true)
    } else if (snackPack.length && messageInfo && open) {
      setOpen(false)
    }
  }, [snackPack, messageInfo, open])

  const handleBarClose = (
    event: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === 'clickaway') {
      return
    }
    setOpen(false)
  }

  const handleExited = () => {
    setMessageInfo(undefined)
  }

  const gestLogin = async () => {
    setIsLoading(true)
    try {
      await fetch(`${process.env.NEXT_PUBLIC_RESTAPI_URL}/authen/jwt/create/`, {
        method: 'POST',
        body: JSON.stringify({
          email: 'gestUser@gmail.com',
          password: 'gestUserPassword',
        }),
        headers: {
          'Content-Type': 'application/json',
        },
      })
        .then((res) => {
          if (res.status === 401) {
            setSnackPack((prev) => [
              ...prev,
              {
                message: 'メールかパスワードが違います。',
                key: new Date().getTime(),
              },
            ])
            setIsLoading(false)
          } else if (res.ok) {
            return res.json()
          }
        })
        .then((data) => {
          const options = { path: '/' }
          cookie.set('access_token', data.access, options)
          setIsLogin(true)
          setIsAuth(true)
          setIsLoading(false)
          // getProf();
        })
      router.push('/task')
      setSnackPack((prev) => [
        ...prev,
        { message: 'ゲストログインしました！', key: new Date().getTime() },
      ])
    } catch (err) {
      // alert(err);
    }
  }

  const login = async (data: AUTH) => {
    const { email, password } = data
    try {
      await fetch(`${process.env.NEXT_PUBLIC_RESTAPI_URL}/authen/jwt/create/`, {
        method: 'POST',
        body: JSON.stringify({ email: email, password: password }),
        headers: {
          'Content-Type': 'application/json',
        },
      })
        .then((res) => {
          if (res.status === 401) {
            setSnackPack((prev) => [
              ...prev,
              {
                message: 'メールかパスワードが違います。',
                key: new Date().getTime(),
              },
            ])
          } else if (res.ok) {
            return res.json()
          }
        })
        .then((data) => {
          const options = { path: '/' }
          cookie.set('access_token', data.access, options)
          setIsLogin(true)
          setIsAuth(true)
          setIsLoading(false)
        })
      router.push('/account')
      setSnackPack((prev) => [
        ...prev,
        { message: 'ログインしました！', key: new Date().getTime() },
      ])
    } catch (err) {
      // alert(err);
    }
  }

  const onSubmit: SubmitHandler<AUTH> = async (data) => {
    if (isLogin === true) {
      login(data)
    } else {
      try {
        await fetch(`${process.env.NEXT_PUBLIC_RESTAPI_URL}/api/register/`, {
          method: 'POST',
          body: JSON.stringify({ email: data.email, password: data.password }),
          headers: {
            'Content-Type': 'application/json',
          },
        }).then((res) => {
          if (res.status === 400) {
            setSnackPack((prev) => [
              ...prev,
              {
                message:
                  'すでに登録されているメールアドレスです。ログインしてください。',
                key: new Date().getTime(),
              },
            ])
          }
        })
        await createProf()
        await login(data)
      } catch (err) {
        // alert(err);
      }
    }
  }

  return (
    <Box>
      <Box
        sx={{
          mt: { xs: 9, sm: 11, md: 12, lg: 14 },
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        {isLogin ? (
          <Avatar
            sx={{
              width: { xs: 140, sm: 160, md: 180, lg: 200 },
              height: { xs: 140, sm: 160, md: 180, lg: 200 },
              margin: 1,
            }}
            src="/home3.jpeg"
            alt="icon"
          />
        ) : (
          <Avatar
            sx={{
              width: { xs: 140, sm: 160, md: 180, lg: 200 },
              height: { xs: 140, sm: 160, md: 180, lg: 200 },
              margin: 1,
            }}
            src="/home4.jpeg"
            alt="icon"
          />
        )}
        <Box
          sx={{
            fontFamily: 'serif',
            fontSize: { xs: 22, sm: 24, md: 26, lg: 30 },
            m: 1,
          }}
        >
          {isLogin ? 'LOGIN' : 'SIGN UP'}
        </Box>
        <Box
          component="form"
          onSubmit={handleSubmit(onSubmit)}
          method="POST"
          sx={{ width: '80%' }}
        >
          <Box sx={{ mt: 1 }}>
            <TextField
              {...register('email', { required: true })}
              type="email"
              fullWidth
              placeholder="メールアドレス"
              variant="outlined"
              size="small"
              autoFocus
            />
            {errors.email && (
              <Box component="p" sx={{ fontSize: 10, color: 'red' }}>
                メールアドレスは必須です
              </Box>
            )}
          </Box>
          <Box sx={{ mt: 1 }}>
            <TextField
              {...register('password', { required: true })}
              type="password"
              fullWidth
              placeholder="パスワード"
              variant="outlined"
              size="small"
            />
            {errors.email && (
              <Box component="p" sx={{ fontSize: 10, color: 'red' }}>
                パスワードは必須です
              </Box>
            )}
          </Box>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            disabled={!isValid}
            color="success"
            sx={{ mt: 2, mb: 1, fontFamily: 'serif' }}
          >
            {isLogin ? 'ログイン' : '新規登録'}
            {isLoading ? (
              <CircularProgress
                size={20}
                sx={{ color: 'white', ml: 1, top: '50%', left: '50%' }}
              />
            ) : null}
          </Button>
        </Box>
        <Snackbar
          key={messageInfo ? messageInfo.key : undefined}
          open={open}
          anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
          autoHideDuration={5000}
          onClose={handleBarClose}
          TransitionProps={{ onExited: handleExited }}
        >
          <Button
            variant="contained"
            color="error"
            fullWidth
            onClick={handleBarClose}
          >
            {messageInfo?.message}
          </Button>
        </Snackbar>
        <Box>
          <Button
            sx={{ mt: 1, mb: 3, fontFamily: 'serif' }}
            color="success"
            onClick={() => setIsLogin(!isLogin)}
          >
            {isLogin ? '新規登録へ' : 'ログインへ'}
            <LoginIcon />
          </Button>
        </Box>
        <Button
          onClick={gestLogin}
          variant="contained"
          color="success"
          sx={{ mt: 2, mb: 1, fontFamily: 'serif' }}
        >
          <PermIdentityIcon />
          ゲストログイン
          {isLoading ? (
            <CircularProgress
              size={20}
              sx={{ color: 'white', ml: 1, top: '50%', left: '50%' }}
            />
          ) : null}
        </Button>
      </Box>
    </Box>
  )
}

export default Auth
