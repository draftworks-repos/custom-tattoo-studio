import React from 'react';
import { MessageCircle, PenTool, Zap, HeartPulse } from 'lucide-react';
import './ProcessStep.css';

const iconMap = {
  MessageCircle,
  PenTool,
  Zap,
  HeartPulse,
};

export const ProcessStep = ({
  num,
  title,
  desc,
  iconName,
  stepIndex = 0,
  className = '',
}) => {
  const Icon = iconMap[iconName] || MessageCircle;

  return (
    <article className={`process-step ${className}`} data-reveal>
      {/* Big faded number watermark in the background */}
      <span className="process-step__bg-num" aria-hidden="true">
        {stepIndex + 1}
      </span>

      <div className="process-step__top">
        <div className="process-step__icon" aria-hidden="true">
          <Icon size={24} />
        </div>
      </div>

      <div className="process-step__body">
        <h3 className="process-step__title">{title}</h3>
        <p className="process-step__desc">{desc}</p>
      </div>
    </article>
  );
};
