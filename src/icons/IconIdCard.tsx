export const IconIdCard = ({ className = "w-7 h-7" }: { className?: string }) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <rect
      x="2"
      y="5"
      width="20"
      height="14"
      rx="2"
      stroke="currentColor"
      strokeWidth="2"
    />
    <circle cx="8" cy="12" r="2.5" stroke="currentColor" strokeWidth="1.5" />
    <path
      d="M14 10H19M14 14H19"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
    />
  </svg>
);
