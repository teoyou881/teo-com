"use client"
import style from './post.module.css';
import cx from 'classnames';

type ButtonProps = {
  type: 'comment' | 'repost' | 'heart';
  onClick: () => void;
  count: number;
  isActive: boolean;
  children: React.ReactNode;
  white?: boolean;
};

export default function Button({ type, onClick, count, isActive, children, white }: ButtonProps) {
  const getButtonClassName = () => {
    switch (type) {
      case 'comment':
        return cx(style.commentButton, { [style.commented]: isActive, [style.white]:white});
      case 'repost':
        return cx(style.repostButton, { [style.reposted]: isActive, [style.white]:white});
      case 'heart':
        return cx(style.heartButton, { [style.liked]: isActive, [style.white]:white});
      default:
        return '';
    }
  };

  return (
    <div className={getButtonClassName()}>
      <button onClick={onClick}>
        {children}
      </button>
      <div className={style.count}>{count || ''}</div>
    </div>
  );
}