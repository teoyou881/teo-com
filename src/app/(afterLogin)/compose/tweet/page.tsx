'use client'

import Home from "@/app/(afterLogin)/home/page";
import TweetModal from "@/app/(afterLogin)/@modal/(.)compose/tweet/page"; // 가상의 모달 컴포넌트
import { useEffect, useState } from "react";


export default function Page() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    setIsModalOpen(true); // 페이지 로드시 모달을 표시하도록 상태 설정
  }, []);

  return (
      <>
        <Home />
        {isModalOpen && <TweetModal />}
      </>
  );
}