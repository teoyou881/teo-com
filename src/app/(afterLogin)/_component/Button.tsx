"use client"
import style from './post.module.css';
import cx from 'classnames';

type ButtonProps = {
  type: 'comment' | 'repost' | 'heart';
  onClick: () => void;
  count: number;
  isActive: boolean;
  children: React.ReactNode;
};

export default function Button({ type, onClick, count, isActive, children }: ButtonProps) {
  const getButtonClassName = () => {
    switch (type) {
      case 'comment':
        return cx(style.commentButton, { [style.commented]: isActive });
      case 'repost':
        return cx(style.repostButton, { [style.reposted]: isActive });
      case 'heart':
        return cx(style.heartButton, { [style.liked]: isActive });
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