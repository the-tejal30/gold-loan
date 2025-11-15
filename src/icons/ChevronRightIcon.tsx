export const ChevronRightIcon = ({className = '', stroke = '#000000'}) => (
  <svg
    width="20px"
    height="20px"
    viewBox="0 0 48 48"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <rect width={48} height={48} fill="white" fillOpacity={0.01} />
    <path
      d="M19 12L31 24L19 36"
      stroke={stroke}
      strokeWidth={5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);
