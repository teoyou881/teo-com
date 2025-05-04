import {redirect} from 'next/navigation';
import BackButton from './BackButton';
import style from './signup.module.css';
import Form from 'next/form';

function validateFormData(formData: FormData) {
  // 필수 필드 목록과 관련 오류 메시지 정의
  const requiredFields = [
    {name:'id', message:'아이디를 입력해주세요.'},
    {name:'name', message:'이름을 입력해주세요.'},
    {name:'password', message:'비밀번호를 입력해주세요.'},
    {name:'image', message:'이미지를 업로드해주세요.'},
  ];

  // 누락된 필드 찾기
  const missingFields = requiredFields.filter(
      field => !formData.get(field.name));

  // 누락된 필드가 있으면 첫 번째 오류 메시지 반환
  if (missingFields.length > 0) {
    return {success:false, message:missingFields[0].message};
  }

  // 추가 유효성 검사 (예: 비밀번호 형식 등)
  const password = formData.get('password') as string;
  if (password.length < 8) {
    return {success:false, message:'비밀번호는 8자 이상이어야 합니다.'};
  }

  // 모든 유효성 검사 통과
  return {success:true};
}

export default function SignupModal() {

  const submit = async (formData: FormData) => {
    'use server';

    const data = validateFormData(formData);
    if (data.success === false) {
      return data.message;
    }

    let shouldRedirect = false;
    try {
      const response = await fetch(
          `http://localhost:3000/api/users`, {
            method     :'POST',
            body       :formData,
            credentials:'include',
          });
      console.log(response.status);
      if (response.status === 403) {
        console.log('user_exists');
        return {message:'user_exists'}
      }
      if (response.status === 404) {
        console.log('not_found');
        return {message:'not_found'}
      }
      shouldRedirect = true;
    } catch (err) {
      console.log(err);
      return;
    }
    if (shouldRedirect) {
      redirect('/home')
    }
  }

  return (
      <>
        <div className={style.modalBackground}>
          <div className={style.modal}>
            <div className={style.modalHeader}>
              <BackButton/>
              <div>Create your account</div>
            </div>
            <Form action={submit}>
              <div className={style.modalBody}>
                <div className={style.inputDiv}>
                  <label className={style.inputLabel} htmlFor="id">Id</label>
                  <input id="id" name="id" className={style.input} type="text"
                         placeholder=""
                         required
                  />
                </div>
                <div className={style.inputDiv}>
                  <label className={style.inputLabel}
                         htmlFor="name">Nickname</label>
                  <input id="name" name="name" className={style.input}
                         type="text"
                         placeholder=""
                         required
                  />
                </div>
                <div className={style.inputDiv}>
                  <label className={style.inputLabel}
                         htmlFor="password">Password</label>
                  <input id="password" name="password" className={style.input}
                         type="password" placeholder=""
                         required
                  />
                </div>
                <div className={style.inputDiv}>
                  <label className={style.inputLabel}
                         htmlFor="image">Profile</label>
                  <input id="image" name="image" className={style.input}
                         type="file" accept="image/*"
                         required
                  />
                </div>
              </div>
              <div className={style.modalFooter}>
                <button className={style.actionButton}>Register</button>
              </div>
            </Form>
          </div>
        </div>
      </>
  )
}
