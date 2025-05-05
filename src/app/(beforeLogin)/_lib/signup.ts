// "use server"
//
// import { redirect } from "next/navigation";
//
// function validateFormData(formData: FormData) {
//   // 필수 필드 목록과 관련 오류 메시지 정의
//   const requiredFields = [
//     {name:'id', message:'아이디를 입력해주세요.'},
//     {name:'name', message:'이름을 입력해주세요.'},
//     {name:'password', message:'비밀번호를 입력해주세요.'},
//     {name:'image', message:'이미지를 업로드해주세요.'},
//   ];
//
//   // 누락된 필드 찾기
//   const missingFields = requiredFields.filter(
//       field => !formData.get(field.name));
//
//   // 누락된 필드가 있으면 첫 번째 오류 메시지 반환
//   if (missingFields.length > 0) {
//     return {success:false, message:missingFields[0].message};
//   }
//
//   // 추가 유효성 검사 (예: 비밀번호 형식 등)
//   const password = formData.get('password') as string;
//   if (password.length < 8) {
//     return {success:false, message:'비밀번호는 8자 이상이어야 합니다.'};
//   }
//
//   // 모든 유효성 검사 통과
//   return {success:true, message:null};
// }
//
//
//
// export default async (prevState:{message: string|null}, formData: FormData)=>{
//   const data = validateFormData(formData);
//   if (data.success === false) {
//     return data.message;
//   }
//
//   let shouldRedirect = false;
//   try {
//     const response = await fetch(
//         `${process.env.NEXT_PUBLIC_BASE_URL}/api/users`, {
//           method     :'POST',
//           body       :formData,
//           credentials:'include',
//         });
//     console.log(response.status);
//     if (response.status === 403) {
//       console.log('user_exists');
//       return {message:'user_exists'}
//     }
//     if (response.status === 404) {
//       console.log('not_found');
//       return {message:'not_found'}
//     }
//     shouldRedirect = true;
//   } catch (err) {
//     console.log(err);
//     return {message:null}
//   }
//   if (shouldRedirect) {
//     redirect('/home')
//   }
//   return {message:null}
// }


"use server";

import {redirect} from "next/navigation";

export default async (prevState: { message: string | null }, formData: FormData) => {
  const id = formData.get('id') as string;
  const name = formData.get('name') as string;
  const password = formData.get('password') as string;
  const image = formData.get('image') as File;


  if (!formData.get('id') || !(formData.get('id') as string)?.trim()) {
    return { message: 'no_id', id, name, password };
  }
  if (!formData.get('name') || !(formData.get('name') as string)?.trim()) {
    return { message: 'no_name', id, name, password };
  }
  if (!formData.get('password') || !(formData.get('password') as string)?.trim()) {
    return { message: 'no_password', id, name, password };
  }
  if (!formData.get('image')) {
    return { message: 'no_image', id, name, password };
  }

  let shouldRedirect = false;

  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/users`, {
      method: 'post',
      body: formData,
      credentials: 'include',
    })
    console.log(response.status);
    if (response.status === 403) {
      return { message: 'user_exists' };
    }
    // console.log(await response.json())
    console.log(response);
    shouldRedirect = true;
  } catch (err) {
    console.error(err);
    return { message: null };
  }

  if (shouldRedirect) {
    redirect('/home'); // try/catch문 안에서 X
  }
  return { message: null };
}