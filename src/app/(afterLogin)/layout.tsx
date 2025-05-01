import FollowRecommend from '@/app/(afterLogin)/_component/FollowRecommend';
import LogoutButton from '@/app/(afterLogin)/_component/LogoutButton';
import NavMenu from '@/app/(afterLogin)/_component/NavMenu';
import TrendSection from '@/app/(afterLogin)/_component/TrendSection';
import style from '@/app/(afterLogin)/layout.module.css';
import Image from 'next/image';
import Link from 'next/link';
import React, {ReactNode} from 'react';
import TLogo from '../../../public/tLogo.png';
import RightSearchZone from './_component/RightSearchZone';

type Props = {
  children: ReactNode;
  modal: ReactNode;
};

export default function AfterLoginLayout({children, modal}: Props) {
  return (
      <div className={style.container}>
        <header className={style.leftSectionWrapper}>
          <section className={style.leftSection}>
            <div className={style.leftSectionFixed}>
              <Link className={style.logo} href="/home">
                <div className={style.logoPill}>
                  <Image src={TLogo} alt="z.com로고" width={40} height={40}/>
                </div>
              </Link>
              <nav>
                <ul>
                  <NavMenu/>
                </ul>
                <Link href=" /compose/tweet"
                      className={style.postButton}>Post</Link>
              </nav>
              <LogoutButton/>
            </div>
          </section>
        </header>
        <div className={style.rightSectionWrapper}>
          <div className={style.rightSectionInner}>
            <main className={style.main}>{children}</main>
            <section className={style.rightSection}>
              <RightSearchZone/>
              <TrendSection/>
              <div className={style.followRecommend}>
                <h3>Who to follow</h3>
                <FollowRecommend/>
                <FollowRecommend/>
                <FollowRecommend/>
              </div>
            </section>
          </div>
        </div>
        {modal}
      </div>
  )
}