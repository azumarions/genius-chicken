import React, { useContext, useState } from "react"
import { useRouter } from "next/router"
import Cookie from "universal-cookie"
import { createProf, getProf, getMyProf } from "../../api/account";
import { AUTH, SnackbarMessage } from "@/types";
import { SubmitHandler, useForm, useFormState } from "react-hook-form";
import CssBaseline from '@mui/material/CssBaseline';
import { IconButton, Snackbar, Avatar, Button, TextField, Box, Typography, } from "@mui/material";
import LoginIcon from '@mui/icons-material/Login';
import CloseIcon from '@mui/icons-material/Close';
import { AuthContext } from "@/context/auth";

const cookie = new Cookie();

const Auth = () => {
  const router = useRouter();
  const [isLogin, setIsLogin] = useState<boolean>(false);
  const { isAuth, setIsAuth } = useContext(AuthContext); //global stateにする
  const [open, setOpen] = React.useState(false);
  const [snackPack, setSnackPack] = React.useState<readonly SnackbarMessage[]>([]);
  const [messageInfo, setMessageInfo] = React.useState<SnackbarMessage | undefined>(undefined,);
  const {register, handleSubmit, formState: { errors, isValid },} = useForm<AUTH>({mode: "onChange"});

  React.useEffect(() => {
    if (snackPack.length && !messageInfo) {
      setMessageInfo({ ...snackPack[0] });
      setSnackPack((prev) => prev.slice(1));
      setOpen(true);
    } else if (snackPack.length && messageInfo && open) {
      setOpen(false);
    }
  }, [snackPack, messageInfo, open]);

  const handleClose = (event: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };

  const handleExited = () => {
    setMessageInfo(undefined);
  };

  const login = async (data: AUTH) => {
    const { email, password } = data
    try {
      await fetch(
        `${process.env.NEXT_PUBLIC_RESTAPI_URL}/authen/jwt/create/`,
        {
          method: 'POST',
          body: JSON.stringify({ email: email, password: password }),
          headers: {
            'Content-Type': 'application/json',
          },
        }
      ).then((res) => {
          if (res.status === 401) {
            setSnackPack((prev) => [...prev, { message: "メールかパスワードが違います。", key: new Date().getTime() }]);
          } else if (res.ok) {
            return res.json();
          }
        }
      ).then((data) => {
        const options = { path: '/' };
        cookie.set('access_token', data.access, options);
        setIsLogin(true)
        setIsAuth(true)
        // getProf();
      });
      router.push('/task');
    } catch (err) {
      // alert(err);
    }
  };

  const onSubmit: SubmitHandler<AUTH> = async (data) => {
    if (isLogin === true) {
      login(data);
    } else {
      try {
        await fetch(`${process.env.NEXT_PUBLIC_RESTAPI_URL}/api/register/`, {
          method: 'POST',
          body: JSON.stringify({ email: data.email, password:data.password }),
          headers: {
            'Content-Type': 'application/json',
          },
        }).then((res) => {
          if (res.status === 400) {
            setSnackPack((prev) => [...prev, { message: "すでに登録されているメールアドレスです。ログインしてください。", key: new Date().getTime() }]);
          }
        });
        await login(data);
        await createProf();
      } catch (err) {
        // alert(err);
      }
    }
  }

  return (
    <Box>
      <Box
        sx={{
          marginTop: 2,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        {isLogin ? <Avatar sx={{ m: 1, width: 150, height: 150 }} src="/auth_icon1.jpeg" alt="icon">
        </Avatar> : <Avatar sx={{ m: 1, width: 150, height: 150 }} src="/auth_icon2.jpeg" alt="icon">
        </Avatar> }
        <Typography component="h1" variant="h5" fontFamily="serif">
          {isLogin? 'Log in' : 'Sign up'}
        </Typography>
        <Box component="form" onSubmit={handleSubmit(onSubmit)} method="POST" sx={{ width: "80%"}}>
          <Box sx={{ mt: 1 }}>
            <TextField
              {...register("email", { required: true })}
              type="email"
              fullWidth
              placeholder="メールアドレス"
              variant="outlined"
              size="small"
              autoFocus
            />
            {errors.email && (
            <Box component="p" sx={{ fontSize: 10, color: "red"}}>
              メールアドレスは必須です
            </Box>)}
          </Box>
          <Box sx={{ mt: 1 }}>
            <TextField   
            {...register("password", { required: true })}
            type="password"
            fullWidth
            placeholder="パスワード"
            variant="outlined"
            size="small"
            />
            {errors.email && (
            <Box component="p" sx={{ fontSize: 10, color: "red"}}>
              パスワードは必須です
            </Box>)}
          </Box>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            disabled={!isValid}
            color="secondary"
            sx={{ mt: 2, mb: 1, }}
          >
            {isLogin ? 'ログイン' : '新規登録'}
          </Button>  
        </Box>
        <Snackbar
          ContentProps={{sx: {
            background: "orange"
          }}}
          key={messageInfo ? messageInfo.key : undefined}
          open={open}
          anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
          autoHideDuration={10000}
          onClose={handleClose}
          TransitionProps={{ onExited: handleExited }}
          action={
            <React.Fragment>
              <Button color="inherit" size="small" onClick={handleClose}>
                {messageInfo?.message}
              </Button>
              <IconButton
                aria-label="close"
                color="inherit"
                sx={{ p: 0.1 }}
                onClick={handleClose}
              >
                <CloseIcon />
              </IconButton>
            </React.Fragment>
          }
        />
        <Box>
          <Button sx={{ mt: 1, mb: 3, textAlign: "right" }} onClick={() => setIsLogin(!isLogin)}>
            {isLogin ? '新規登録へ' : 'ログインへ'}<LoginIcon />
          </Button>
        </Box>
      </Box>
    </Box>
  )
}

export default Auth