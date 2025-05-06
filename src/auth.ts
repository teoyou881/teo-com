// import NextAuth from 'next-auth'
// import CredentialsProvider from "next-auth/providers/credentials";
// import {NextResponse} from "next/server";
//
// export const {
//   handlers:{GET, POST},
//   auth,
// } = NextAuth({
//   secret: process.env.AUTH_SECRET,
//   pages: {
//     signIn: '/login',
//   },
//   basePath: '/api/auth',
//   callbacks: {
//     async session({ session, token }) {
//       return session;
//     },
//     async jwt({ token, user }) {
//       if (user) {
//         token.user = user;
//       }
//       return token;
//     }
//   },
//   providers: [
//     CredentialsProvider({
//       credentials: {
//         id: { label: 'Username', type: 'text' },
//         password: { label: 'Password', type: 'password' },
//       },
//       async authorize(credentials,req) {
//         const authResponse = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/login`, {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//           },
//           body: JSON.stringify(credentials),
//         })
//
//         if (!authResponse.ok) {
//           return null
//         }
//
//         const user = await authResponse.json()
//         return user;
//       },
//
//     }),
//   ]
// });

import NextAuth from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials';


//NextAuth v5에서는 인증 관련 다양한 기능들을 분리하여 제공합니다:
// - **handlers**: API 라우트 처리
// - **auth**: 현재 세션 정보 접근 및 미들웨어 기능
// - **signIn**: 프로그래밍 방식의 로그인 기능
// 이러한 구조는 더 모듈화된 방식으로 인증 로직을 구현할 수 있게 해주며, 서버 컴포넌트와 클라이언트 컴포넌트 모두에서 인증 관련 기능을 쉽게 사용할 수 있도록 합니다.
export const {
  handlers:{GET, POST},
  auth,
  signIn,
} = NextAuth({
  pages    :{
    signIn :'/i/flow/login',
    newUser:'/i/flow/signup',
  },
  providers:[
    CredentialsProvider({
      // credentials에 id랑 password가 들어있다.
      // 그런데 username과 password로 고정이 되어있다.
      // 아래 body 부분에서 id, password로 바꿔치기 해준다.
      async authorize(credentials) {
        const authResponse = await fetch(
            `${process.env.NEXT_PUBLIC_BASE_URL}/api/login`, {
              method :'POST',
              headers:{
                'Content-Type':'application/json',
              },
              body   :JSON.stringify({
                id      :credentials.username,
                password:credentials.password,
              }),
            })
        if (!authResponse.ok) {
          return null
        }
        const user = await authResponse.json()
        console.log('user', user);

        return user;

      },
    }),
  ],
});