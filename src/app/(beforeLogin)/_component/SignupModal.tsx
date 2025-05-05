"use client";

import style from './signup.module.css';
import onSubmit from '../_lib/signup';
import BackButton from "@/app/(beforeLogin)/_component/BackButton";
import { useFormStatus } from 'react-dom';
import { useActionState, useEffect } from 'react';

function showMessage(message: string | null | undefined) {
  if (message === 'no_id') {
    return 'Please enter your ID.';
  }
  if (message === 'no_name') {
    return 'Please enter your nickname.';
  }
  if (message === 'no_password') {
    return 'Please enter your password.';
  }
  if (message === 'no_image') {
    return 'Please upload an image.';
  }
  if (message === 'user_exists') {
    return 'This ID is already in use.';
  }
  return '';
}

export default function SignupModal() {
  const [state, formAction] = useActionState(onSubmit, { message: null });
  const { pending } = useFormStatus();

  // useEffect를 사용하여 state가 변경될 때 input 값 업데이트
  useEffect(() => {
    if (state) {
      if (state.id) {
        const idInput = document.getElementById('id') as HTMLInputElement;
        if (idInput) idInput.value = state.id;
      }
      if (state.name) {
        const nameInput = document.getElementById('name') as HTMLInputElement;
        if (nameInput) nameInput.value = state.name;
      }
      if (state.password) {
        const passwordInput = document.getElementById('password') as HTMLInputElement;
        if (passwordInput) passwordInput.value = state.password;
      }
      // File input은 value를 직접 설정할 수 없습니다.
      // 사용자가 다시 파일을 선택하도록 유도하거나, 다른 방식으로 처리해야 합니다.
      // 여기서는 간단하게 초기화만 합니다.
      const imageInput = document.getElementById('image') as HTMLInputElement;
      if (imageInput) imageInput.value = '';
    }
  }, [state]);

  return (
      <>
        <div className={style.modalBackground}>
          <div className={style.modal}>
            <div className={style.modalHeader}>
              <BackButton />
              <div>Create your account.</div>
            </div>
            <form action={formAction}>
              <div className={style.modalBody}>
                <div className={style.inputDiv}>
                  <label className={style.inputLabel} htmlFor="id">ID</label>
                  <input id="id" name="id" className={style.input} type="text" placeholder=""

                  />
                </div>
                <div className={style.inputDiv}>
                  <label className={style.inputLabel} htmlFor="name">Nickname</label>
                  <input id="name" name="name" className={style.input} type="text" placeholder=""

                  />
                </div>
                <div className={style.inputDiv}>
                  <label className={style.inputLabel} htmlFor="password">Password</label>
                  <input id="password" name="password" className={style.input} type="password" placeholder=""

                  />
                </div>
                <div className={style.inputDiv}>
                  <label className={style.inputLabel} htmlFor="image">Profile</label>
                  <input id="image" name="image"  className={style.input} type="file" accept="image/*"
                  />
                </div>
              </div>
              <div className={style.modalFooter}>
                <button type="submit" className={style.actionButton} disabled={pending}>Sign Up</button>
                <div className={style.error}>{showMessage(state?.message)}</div>
              </div>
            </form>
          </div>
        </div>
      </>)
}