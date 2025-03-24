"use client";

import axios from 'axios';
import { useEffect, useState } from 'react';
import LoginUI from './_components/loginInput';
import { supabase } from '../api/lib/util/supabaseClient.ts';
import { useRouter } from 'next/navigation';

export default function Login() {
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorText, setErrorText] = useState('');

  async function login(user, pass){
    const { data, error } = await supabase
      .from('users')
      .select('username', 'password')
      .match({ username: user, password: pass })
      if (error || data.length != 1){
        setErrorText("Login Failed!");
      } else {
        setErrorText("Login Successful!");
      }
  }

  useEffect(() => {
    if (errorText == "Login Successful!"){
      router.push("/dashboard");
    }
  })

  return (
    <div>
      <LoginUI username={username} password={password} setUsername={setUsername} setPassword={setPassword} login={login} errorText={errorText}/>
    </div>
  );
}