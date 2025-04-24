import styles from "@/app/(beforeLogin)/_component/main.module.css";
import Image from "next/image";
import tLogo from '@/../public/tLogo.png'
import Link from "next/link";

export default function Main() {
  return (
      <>
        <div className={styles.left}>
          {/*next의 Image ==> 최적화 해준다.*/}
          <Image src={tLogo} alt="logo" />
        </div>
        <div className={styles.right}>
          <h1>Happening now</h1>
          <h2>Join today.</h2>
          <Link href="/i/flow/signup" className={styles.signup}>Create account</Link>
          <h3>Already have an account?</h3>
          <Link href="/login" className={styles.login}>Sign in</Link>
        </div>
      </>
  )
}