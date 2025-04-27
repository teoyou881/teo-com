import style from './post.module.css';
import Link from "next/link";
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import 'dayjs/locale/ko';
import ActionButtons from "@/app/(afterLogin)/_component/ActionButtons";

dayjs.extend(relativeTime)

export default function Post() {
  const target = {
    User: {
      id: 'elonmusk',
      nickname: 'teo',
      image: 'whoru.jpg',
    },
    content: 'react',
    createdAt: new Date(2024, 10, 1),
    Images: [
      { url: 'https://cdn.pixabay.com/photo/2016/12/15/20/21/texture-1909992_1280.jpg' }
    ],
  }
  return (
      <article className={style.post}>
        <div className={style.postWrapper}>
          <div className={style.postUserSection}>
            <Link href={`/${target.User.id}`} className={style.postUserImage}>
              <img src={target.User.image} alt={target.User.nickname}/>
              <div className={style.postShade} />
            </Link>
          </div>
          <div className={style.postBody}>
            <div className={style.postMeta}>
              <Link href={`/${target.User.id}`}>
                <span className={style.postUserName}>{target.User.nickname}</span>
                &nbsp;
                <span className={style.postUserId}>@{target.User.id}</span>
                &nbsp;
                ·
                &nbsp;
              </Link>
              <span className={style.postDate}>{dayjs(target.createdAt).fromNow(true)}</span>
            </div>
            <div>{target.content}</div>
            <div className={style.postImageSection}>
              {target.Images.map((image, index) => (
                <img key={index} src={image.url} alt="Post image" />
              ))}
            </div>
            <ActionButtons />
          </div>
        </div>
      </article>
  )
}
