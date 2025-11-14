const ChevronLeftIcon = ({ className = '' }) => (
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
            d="M31 36L19 24L31 12"
            stroke="#FFFFFFB3"
            strokeWidth={4}
            strokeLinecap="round"
            strokeLinejoin="round"
        />
    </svg>
);
export default ChevronLeftIcon;
