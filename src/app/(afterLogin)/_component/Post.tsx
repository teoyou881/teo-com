import ActionButtons from '@/app/(afterLogin)/_component/ActionButtons';
import {faker} from '@faker-js/faker'
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import Link from 'next/link';
import style from './post.module.css';
import PostArticle from './PostArticle';
import PostImages from './PostImages';

dayjs.extend(relativeTime)

type Props = {
  noImage?: boolean;
}

export default function Post({noImage}: Props) {
  const target = {
    postId   :1,
    User     :{
      id      :'elonmusk',
      nickname:'teo',
      image   :'/whoru.jpg',
    },
    content  :'react',
    createdAt:new Date(2024, 10, 1),
    Images   :[] as any[],
  }

  if (Math.random() > 0.5 && !noImage) {
    target.Images.push(
        {imageId:1, link:faker.image.urlLoremFlickr()},
    )
    target.Images.push(
        {imageId:2, link:faker.image.urlLoremFlickr()},
    )
    target.Images.push(
        {imageId:3, link:faker.image.urlLoremFlickr()},
    )
    target.Images.push(
        {imageId:4, link:faker.image.urlLoremFlickr()},
    )
  }

  return (
      <PostArticle post={target}>
        <div className={style.postWrapper}>
          <div className={style.postUserSection}>
            <Link href={`/${target.User.id}`} className={style.postUserImage}>
              <img src={target.User.image} alt={target.User.nickname}/>
              <div className={style.postShade}/>
            </Link>
          </div>
          <div className={style.postBody}>
            <div className={style.postMeta}>
              <Link href={`/${target.User.id}`}>
                <span
                    className={style.postUserName}>{target.User.nickname}</span>
                &nbsp;
                <span className={style.postUserId}>@{target.User.id}</span>
                &nbsp;
                ·
                &nbsp;
              </Link>
              <span className={style.postDate}>{dayjs(target.createdAt).
                  fromNow(true)}</span>
            </div>
            <div>{target.content}</div>
            <div className={style.postImageSection}>
              <PostImages post={target}/>
            </div>
            <ActionButtons/>
          </div>
        </div>
      </PostArticle>
  );
}
