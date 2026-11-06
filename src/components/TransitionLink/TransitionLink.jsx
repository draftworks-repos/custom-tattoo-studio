import React from 'react';
import { usePageTransition } from '../PageTransition/PageTransition.jsx';
import './TransitionLink.css';

export const TransitionLink = ({
  to,
  children,
  className = '',
  onClick,
  ...props
}) => {
  const { navigateWithTransition } = usePageTransition();

  const handleClick = (e) => {
    // Let browser handle new tabs (cmd/ctrl click, middle click)
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.button !== 0) {
      return;
    }

    e.preventDefault();
    if (onClick) onClick(e);
    navigateWithTransition(to);
  };

  return (
    <a
      href={`#${to.startsWith('/') ? to : `/${to}`}`}
      onClick={handleClick}
      className={`transition-link ${className}`}
      {...props}
    >
      {children}
    </a>
  );
};
