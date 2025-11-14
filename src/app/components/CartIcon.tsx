type CartIconProps = {
  filled?: boolean;
  className?: string;
};

export function CartIcon({ filled = false, className }: CartIconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      width="20"
      height="20"
      aria-hidden="true"
      focusable="false"
      className={className}
    >
      <path
        d="M7 7.5V6.75C7 4.679 8.679 3 10.75 3h2.5C15.321 3 17 4.679 17 6.75V7.5"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
      <path
        d="M5.178 8.36A1.5 1.5 0 0 1 6.665 7h10.67a1.5 1.5 0 0 1 1.487 1.36l.867 9.204c.142 1.513-1.044 2.836-2.565 2.836H6.876c-1.521 0-2.707-1.323-2.565-2.836l.867-9.204Z"
        fill={filled ? 'currentColor' : 'none'}
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
      <circle cx="9.5" cy="11.5" r="0.75" fill={filled ? '#fff' : 'currentColor'} />
      <circle cx="14.5" cy="11.5" r="0.75" fill={filled ? '#fff' : 'currentColor'} />
    </svg>
  );
}


