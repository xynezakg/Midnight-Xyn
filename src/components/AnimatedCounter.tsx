import React from 'react';
import { useScrollReveal, useCountUp } from '../hooks/useScrollReveal';

interface AnimatedCounterProps {
  end: number;
  prefix?: string;
  suffix?: string;
  duration?: number;
  className?: string;
  staticText?: string;
}

export const AnimatedCounter: React.FC<AnimatedCounterProps> = ({
  end,
  prefix = '',
  suffix = '',
  duration = 1600,
  className = '',
  staticText,
}) => {
  const { ref, isVisible } = useScrollReveal<HTMLSpanElement>(0.1);
  const count = useCountUp(end, isVisible, duration);

  if (staticText) {
    return <span ref={ref} className={className}>{staticText}</span>;
  }

  return (
    <span ref={ref} className={className}>
      {prefix}
      {count.toLocaleString()}
      {suffix}
    </span>
  );
};

interface RevealOnScrollProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}

export const RevealOnScroll: React.FC<RevealOnScrollProps> = ({
  children,
  className = '',
  delay = 0,
}) => {
  const { ref, isVisible } = useScrollReveal<HTMLDivElement>(0.1);

  return (
    <div
      ref={ref}
      style={{
        transitionDelay: `${delay}ms`,
      }}
      className={`transition-all duration-700 ease-out transform ${
        isVisible
          ? 'opacity-100 translate-y-0'
          : 'opacity-0 translate-y-6 pointer-events-none'
      } ${className}`}
    >
      {children}
    </div>
  );
};
