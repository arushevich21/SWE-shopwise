'use client';

import axios from 'axios';
import { useEffect, useState } from 'react';
import RegistrationUI from './_components/registrationInput';
import { supabase } from '../api/lib/util/supabaseClient.ts';
import { useRouter } from 'next/navigation';

export default function Register() {
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorText, setErrorText] = useState('');

  async function register(user, pass){
    const { error } = await supabase
      .from('users')
      .insert({ username: user, password: pass })
      if (error){
        setErrorText("Registration Failed!");
      } else {
        setErrorText("Registration Successful!");
      }
  }

  useEffect(() => {
    if (errorText == "Registration Successful!"){
      router.push("/login");
    }
  })

  return (
    <div>
      <RegistrationUI username={username} password={password} setUsername={setUsername} setPassword={setPassword} register={register} errorText={errorText}/>
    </div>
  );
}