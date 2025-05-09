"use client"

import { signOut, useSession } from "next-auth/react";
import style from "./logoutButton.module.css";
import { useRouter } from "next/navigation";

export default function LogoutButton() {

  const router = useRouter();
  const data = useSession();
  const me = { // 임시로 내 정보 있는것처럼
    id: 'suyou881',
    nickname: 'teo',
    image: 'whoru.jpg',
  }

  const onLogout = () => {
    signOut({redirect:false}).then(()=>{
      router.replace('/');
    })

  };

  console.log(data?.data);

  if (!data?.data?.user) {
    return null;
  }

  return (
      <button className={style.logOutButton} onClick={onLogout}>
        <div className={style.logOutUserImage}>
          <img src={me.image} alt={me.id}/>
        </div>
        <div className={style.logOutUserName}>
          <div>{me.nickname}</div>
          <div>@{me.id}</div>
        </div>
      </button>
  );
}