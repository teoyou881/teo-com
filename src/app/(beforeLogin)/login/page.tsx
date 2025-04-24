'use client';

// 서버 컴포넌트와 클라이언트 컴포넌트가 redirect를 처리하는 방식이 다르다.
import {useRouter} from 'next/navigation';
import {useEffect} from 'react';
import Main from "@/app/(beforeLogin)/_component/Main";

export default function Login() {
  const router = useRouter();
  router.replace('/i/flow/login');
  return <Main />;

  // redirect('/i/flow/login');
}

//push와 replace의 차이점: 뒤로가기 했을 때 다르다.

//rouget.push
//localhost:3001 -> localhost:3001/login -> localhost:3001/i/flow/login

//login에서 redirect로 /i/flow/login으로 넘어갔다면,
//history가 localhost:3001 -> localhost:3001/i/flow/login 이렇게 바뀐다.
//router.replace
//localhost:3001 -> localhost:3001/login -> localhost:3001/i/flow/login
