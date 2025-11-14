export default function SendButton({className = ''}) {
	return (
	<svg 
      width="20" 
      height="20" 
      viewBox="0 0 24 24" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      className="cursor-pointer"
      onClick={() => console.log('Send clicked')}
    >
      <path 
        d="M22 2L11 13M22 2L15 22L11 13M22 2L2 9L11 13" 
        stroke="currentColor" 
        strokeWidth="2" 
        strokeLinecap="round" 
        strokeLinejoin="round"
      />
    </svg>
	);
}