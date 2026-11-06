import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import { TransitionLink } from '../TransitionLink/TransitionLink.jsx';
import './ServiceRow.css';

export const ServiceRow = ({
  num,
  name,
  description,
  meta,
  to = '/contact',
  className = '',
}) => {
  return (
    <TransitionLink
      to={to}
      className={`service-row ${className}`}
      data-reveal
    >
      <div className="service-row__num text-accent">{num}</div>
      <div className="service-row__name">{name}</div>
      <div className="service-row__desc">{description}</div>
      <div className="service-row__meta">{meta}</div>
      <div className="service-row__icon" aria-hidden="true">
        <ArrowUpRight size={22} />
      </div>
    </TransitionLink>
  );
};
