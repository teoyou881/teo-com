"use client";

import style from './signup.module.css';
import onSubmit from '../_lib/signup';
import BackButton from "@/app/(beforeLogin)/_component/BackButton";
import { useFormStatus, useFormState } from 'react-dom';

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
  const [state, formAction] = useFormState(onSubmit, { message: null });
  const { pending } = useFormStatus();

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
                         required
                  />
                </div>
                <div className={style.inputDiv}>
                  <label className={style.inputLabel} htmlFor="name">Nickname</label>
                  <input id="name" name="name" className={style.input} type="text" placeholder=""
                         required
                  />
                </div>
                <div className={style.inputDiv}>
                  <label className={style.inputLabel} htmlFor="password">Password</label>
                  <input id="password" name="password" className={style.input} type="password" placeholder=""
                         required
                  />
                </div>
                <div className={style.inputDiv}>
                  <label className={style.inputLabel} htmlFor="image">Profile</label>
                  <input id="image" name="image" required className={style.input} type="file" accept="image/*"
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