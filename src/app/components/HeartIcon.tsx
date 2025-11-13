type HeartIconProps = {
  filled?: boolean;
  className?: string;
};

export function HeartIcon({ filled = false, className }: HeartIconProps) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      width="24"
      height="24"
      aria-hidden="true"
      xmlns="http://www.w3.org/2000/svg"
      focusable="false"
      role="presentation"
    >
      <path
        d="M12 21s-6.308-4.232-9.053-8.24C.333 10.046.97 6.694 3.42 4.942 6.46 2.77 9.708 4.205 12 6.89c2.292-2.685 5.539-4.121 8.58-1.948 2.45 1.752 3.086 5.104.473 7.818C18.308 16.768 12 21 12 21Z"
        fill={filled ? 'currentColor' : 'none'}
        stroke="currentColor"
        strokeWidth={1.8}
        strokeLinecap="round"
        strokeLinejoin="round"
        vectorEffect="non-scaling-stroke"
      />
    </svg>
  );
}


