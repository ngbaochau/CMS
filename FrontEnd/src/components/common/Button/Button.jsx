import React from 'react';
import styles from './Button.module.css';

const Button = ({
  children,
  variant = 'contained',
  color = 'primary',
  size = 'medium',
  type = 'button',
  disabled = false,
  fullWidth = false,
  onClick,
  className = '',
  ...props
}) => {
  const buttonClasses = [
    styles.button,
    styles[variant],
    styles[color],
    styles[size],
    fullWidth ? styles.fullWidth : '',
    disabled ? styles.disabled : '',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <button type={type} className={buttonClasses} disabled={disabled} onClick={onClick} {...props}>
      {children}
    </button>
  );
};

export default Button;
