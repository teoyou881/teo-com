import Link from "next/link";
import style from './trend.module.css';
export default function Trend() {
  return (
      <Link href={`/search?q=trend`} className={style.container}>
        <div className={style.count}>trend</div>
        <div className={style.title}>Neal</div>
        <div className={style.count}>134 posts</div>
      </Link>
  )
}