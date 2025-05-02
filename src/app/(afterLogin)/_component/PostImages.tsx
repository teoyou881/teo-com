import style from '@/app/(afterLogin)/_component/post.module.css'
import cx from 'classnames'
import Link from 'next/link';
import React from 'react'

type Props = {
  post: {
    postId: number;
    content: string,
    User: {
      id: string,
      nickname: string,
      image: string,
    },
    createdAt: Date,
    Images: any[],
  }
}

const PostImages = ({post}: Props) => {
  if (!post.Images || post.Images.length === 0) {
    return null;
  }

  // 이미지가 1개인 경우
  if (post.Images.length === 1) {
    return (
        <div
            className={cx(style.postImageSection, style.oneImage)}
        >
          <Link
              href={`/${post.User.id}/status/${post.postId}/photo/${post.Images[0].imageId}`}
              style={{
                backgroundImage:`url(${post.Images[0]?.link})`,
                backgroundSize :'contain',
              }}
          >
            <img src={post.Images[0]?.link} alt=""/>
          </Link>
        </div>
    )
  }
  if (post.Images.length === 2) {
    return (
        <div
            className={cx(style.postImageSection, style.twoImage)}
        >
          <Link
              href={`/${post.User.id}/status/${post.postId}/photo/${post.Images[0].imageId}`}
              style={{
                backgroundImage:`url(${post.Images[0]?.link})`,
                backgroundSize :'cover',
              }}>
          </Link>
          <Link
              href={`/${post.User.id}/status/${post.postId}/photo/${post.Images[1].imageId}`}
              style={{
                backgroundImage:`url(${post.Images[1]?.link})`,
                backgroundSize :'cover',
              }}>
          </Link>
        </div>
    )
  }
  if (post.Images.length === 3) {
    return (
        <div
            className={cx(style.postImageSection, style.threeImage)}
        >
          <Link
              href={`/${post.User.id}/status/${post.postId}/photo/${post.Images[0].imageId}`}
              style={{
                backgroundImage:`url(${post.Images[0]?.link})`,
                backgroundSize :'cover',
              }}>
          </Link>
          <div>
            <Link
                href={`/${post.User.id}/status/${post.postId}/photo/${post.Images[1].imageId}`}
                style={{
                  backgroundImage:`url(${post.Images[1]?.link})`,
                  backgroundSize :'cover',
                }}>
            </Link>
            <Link
                href={`/${post.User.id}/status/${post.postId}/photo/${post.Images[2].imageId}`}
                style={{
                  backgroundImage:`url(${post.Images[2]?.link})`,
                  backgroundSize :'cover',
                }}>
            </Link>
          </div>
        </div>
    )
  }
  if (post.Images.length === 4) {
    return (
        <div
            className={cx(style.postImageSection, style.fourImage)}
        >
          <Link
              href={`/${post.User.id}/status/${post.postId}/photo/${post.Images[0].imageId}`}
              style={{
                backgroundImage:`url(${post.Images[0]?.link})`,
                backgroundSize :'cover',
              }}>
          </Link>
          <Link
              href={`/${post.User.id}/status/${post.postId}/photo/${post.Images[1].imageId}`}
              style={{
                backgroundImage:`url(${post.Images[1]?.link})`,
                backgroundSize :'cover',
              }}>
          </Link>
          <Link
              href={`/${post.User.id}/status/${post.postId}/photo/${post.Images[2].imageId}`}
              style={{
                backgroundImage:`url(${post.Images[2]?.link})`,
                backgroundSize :'cover',
              }}>
          </Link>
          <Link
              href={`/${post.User.id}/status/${post.postId}/photo/${post.Images[3].imageId}`}
              style={{
                backgroundImage:`url(${post.Images[3]?.link})`,
                backgroundSize :'cover',
              }}>
          </Link>
        </div>
    )
  }
  return null;
}

export default PostImages;
