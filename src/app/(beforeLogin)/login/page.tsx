'use client';

// 서버 컴포넌트와 클라이언트 컴포넌트가 redirect를 처리하는 방식이 다르다.
import {useRouter} from 'next/navigation';
import {useEffect} from 'react';
import Main from '@/app/(beforeLogin)/_component/Main';
import { useSession } from 'next-auth/react';

export default function Login() {
  const router = useRouter();
  const { data: session }  = useSession();
  /*
  * useEffect 훅을 사용하는 이유

  초기 렌더링 후 실행: useEffect 훅은 컴포넌트가 처음 렌더링된 후에 실행됩니다. 이는 리디렉션과 같은 작업을 수행하기에 적절한 시점입니다.

  상태 업데이트 후 실행: useEffect는 특정 상태 변수가 변경될 때에도 실행될 수 있습니다. 이는 상태 변화에 따라 리디렉션을 수행해야 하는 경우에 유용합니다.

  비동기 작업 처리: useEffect는 비동기 작업을 처리하는 데 적합합니다. 라우팅 작업이 비동기적으로 처리될 수 있으므로, useEffect 내에서 이를 수행하는 것이 안전합니다.

  useEffect 훅 없이 router.replace를 사용하는 경우의 문제점

  컴포넌트 함수 내에서 직접 router.replace를 호출하면 다음과 같은 문제가 발생할 수 있습니다.

  렌더링 중 상태 변경: React는 컴포넌트가 렌더링되는 동안에는 상태를 변경하는 것을 허용하지 않습니다. router.replace는 내부적으로 상태를 변경할 수 있으므로, 렌더링 과정에서 호출하면 오류가 발생할 수 있습니다.

  예측 불가능한 동작: 컴포넌트 함수는 여러 번 호출될 수 있으며, 이로 인해 router.replace가 의도치 않게 여러 번 호출될 수 있습니다. 이는 예기치 않은 동작을 초래할 수 있습니다.
  * */
  useEffect(() => {
    if(session?.user) return (
      router.replace('/home')
    )
    router.replace('/i/flow/login');
  }, [router, session]);
  return <Main/>;

  // redirect('/i/flow/login');
}

//push와 replace의 차이점: 뒤로가기 했을 때 다르다.

//rouget.push
//localhost:3001 -> localhost:3001/login -> localhost:3001/i/flow/login

//login에서 redirect로 /i/flow/login으로 넘어갔다면,
//history가 localhost:3001 -> localhost:3001/i/flow/login 이렇게 바뀐다.
//router.replace
//localhost:3001 -> localhost:3001/login -> localhost:3001/i/flow/login
/**/