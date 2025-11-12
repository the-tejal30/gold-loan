// components/SocialIcons.tsx
import React from "react";

export const SocialIcons = {
  Phone: (props: React.SVGProps<SVGSVGElement>) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      className={props.className}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M2.25 6.75c0 8.284 6.716 15 15 15h1.125a2.25 2.25 0 002.25-2.25v-1.533a1.125 1.125 0 00-.869-1.096l-3.747-.937a1.125 1.125 0 00-1.261.517l-.845 1.41a12.04 12.04 0 01-5.302-5.302l1.41-.845a1.125 1.125 0 00.517-1.261l-.937-3.747a1.125 1.125 0 00-1.096-.869H4.5A2.25 2.25 0 002.25 6.75v0z"
      />
    </svg>
  ),
  Mail: (props: React.SVGProps<SVGSVGElement>) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      className={props.className}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M3 8l9 6 9-6M21 8v8a2 2 0 01-2 2H5a2 2 0 01-2-2V8m18 0l-9 6-9-6"
      />
    </svg>
  ),
  Facebook: (props: React.SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={props.className}>
      <path d="M22 12.07C22 6.48 17.52 2 11.93 2S1.86 6.48 1.86 12.07c0 4.94 3.62 9.03 8.33 9.87v-6.99H7.9v-2.88h2.29V9.84c0-2.26 1.34-3.51 3.4-3.51.98 0 2 .18 2 .18v2.21h-1.13c-1.12 0-1.47.69-1.47 1.4v1.67h2.5l-.4 2.88h-2.1v6.99c4.71-.84 8.33-4.93 8.33-9.87z" />
    </svg>
  ),
  Twitter: (props: React.SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={props.className}>
      <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z" />
    </svg>
  ),
  Instagram: (props: React.SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={props.className}>
      <path d="M7.75 2h8.5A5.75 5.75 0 0122 7.75v8.5A5.75 5.75 0 0116.25 22h-8.5A5.75 5.75 0 012 16.25v-8.5A5.75 5.75 0 017.75 2zM12 7a5 5 0 100 10 5 5 0 000-10zm6.5-1a1 1 0 100 2 1 1 0 000-2z" />
    </svg>
  ),
  Linkedin: (props: React.SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={props.className}>
      <path d="M19 0h-14C2.23 0 0 2.23 0 5v14c0 2.77 2.23 5 5 5h14c2.77 0 5-2.23 5-5V5c0-2.77-2.23-5-5-5zm-11.25 20H4.75V9h3v11zm-1.5-12.25a1.75 1.75 0 110-3.5 1.75 1.75 0 010 3.5zM20 20h-3v-5.5c0-1.1-.9-2-2-2s-2 .9-2 2V20h-3V9h3v1.4c.7-.9 1.9-1.4 3.2-1.4 2.2 0 4 1.8 4 4V20z" />
    </svg>
  ),
};
