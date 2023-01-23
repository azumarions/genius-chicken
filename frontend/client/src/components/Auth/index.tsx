import React, { useState } from "react"
import { useRouter } from "next/router"
import Cookie from "universal-cookie"
import { createProf, getProf, getMyProf } from "../../api/account";

const cookie = new Cookie();

const Auth = () => {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLogin, setIsLogin] = useState<boolean>(true);

  const login = async () => {
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
      )
      .then((res) => {
        if (res.status === 400) {
          throw 'authlization failed';
        } else if (res.ok) {
          return res.json();
        }
      })
      .then((data) => {
        const options = { path: '/' };
        cookie.set('access_token', data.access, options);
        // getProf();
      });
      router.push('/home');
    } catch (err) {
      alert(err);
    }
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isLogin) {
      login();
    } else {
      try {
        await fetch(`${process.env.NEXT_PUBLIC_RESTAPI_URL}/api/register/`, {
          method: 'POST',
          body: JSON.stringify({ email: email, password: password }),
          headers: {
            'Content-Type': 'application/json',
          },
        }).then((res) => {
          if (res.status === 400) {
            throw 'すでに登録されているメールアドレスです。ログインしてください。';
          }
        });
        await login();
        await createProf();
      } catch (err) {
        alert(err);
      }
    }
  }

  

  return (
    <div>hello</div>
  )
}

export default Auth