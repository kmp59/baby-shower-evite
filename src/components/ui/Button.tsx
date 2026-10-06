import type { AnchorHTMLAttributes, ButtonHTMLAttributes } from 'react';
import './Button.css';

type Variant = 'primary' | 'secondary';

type ButtonProps = { variant?: Variant; fullWidth?: boolean } & (
  | ({ href: string } & AnchorHTMLAttributes<HTMLAnchorElement>)
  | ({ href?: undefined } & ButtonHTMLAttributes<HTMLButtonElement>)
);

/** A pill button. Renders a link when `href` is given, otherwise a <button>. */
export function Button({ variant = 'primary', fullWidth, className = '', ...props }: ButtonProps) {
  const classes = `btn btn--${variant} ${fullWidth ? 'btn--full' : ''} ${className}`;

  if (props.href !== undefined) {
    const { href, ...anchorProps } = props;
    const isExternal = /^https?:/.test(href);
    return (
      <a
        className={classes}
        href={href}
        {...(isExternal && { target: '_blank', rel: 'noopener noreferrer' })}
        {...anchorProps}
      />
    );
  }
  return <button className={classes} {...props} />;
}
