import React from 'react';
import { SectionLabel } from '../../components/SectionLabel/SectionLabel.jsx';
import { ProcessStep } from '../../components/ProcessStep/ProcessStep.jsx';
import { processSteps } from '../../data/styles.js';
import './ProcessSection.css';

export const ProcessSection = () => {
  return (
    <section className="section process-section" aria-labelledby="process-title">
      <div className="container process__container">
        <div className="process__header" data-reveal>
          <SectionLabel number="03 /" text="HOW IT GOES" />
          <h2 id="process-title" className="process__title">
            FOUR STEPS. <span className="text-accent">NO STRESS</span>.
          </h2>
          <p className="process__subtitle">
            From the initial coffee chat to the final healing wrap, here is exactly how we take care of you.
          </p>
        </div>

        {/* Modern 4-Column Card Grid */}
        <div className="process__grid">
          {processSteps.map((step, idx) => (
            <ProcessStep
              key={step.num}
              num={step.num}
              title={step.title}
              desc={step.desc}
              iconName={step.iconName}
              stepIndex={idx}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
