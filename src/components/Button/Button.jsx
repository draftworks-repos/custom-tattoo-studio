import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import { TransitionLink } from '../TransitionLink/TransitionLink.jsx';
import './Button.css';

export const Button = ({
  children,
  to,
  href,
  onClick,
  variant = 'primary', // 'primary' | 'secondary'
  showArrow = true,
  className = '',
  type = 'button',
  ...props
}) => {
  const content = (
    <>
      <span className="btn__text">{children}</span>
      {showArrow && (
        <span className="btn__icon" aria-hidden="true">
          <ArrowUpRight size={18} />
        </span>
      )}
    </>
  );

  const classes = `btn btn--${variant} ${className}`;

  if (to) {
    return (
      <TransitionLink to={to} className={classes} {...props}>
        {content}
      </TransitionLink>
    );
  }

  if (href) {
    return (
      <a href={href} className={classes} {...props}>
        {content}
      </a>
    );
  }

  return (
    <button type={type} onClick={onClick} className={classes} {...props}>
      {content}
    </button>
  );
};
