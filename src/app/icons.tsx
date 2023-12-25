
export const CrossCircle = (props: React.SVGProps<SVGSVGElement>) => {
  return (
    <svg
      viewBox="0 0 21 21"
      fill="currentColor"
      height="1em"
      width="1em"
      {...props}
    >
      <g
        fill="none"
        fillRule="evenodd"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        transform="translate(2 2)"
      >
        <path d="M16.5 8.5 A8 8 0 0 1 8.5 16.5 A8 8 0 0 1 0.5 8.5 A8 8 0 0 1 16.5 8.5 z" />
        <path d="M5.5 5.5l6 6M11.5 5.5l-6 6" />
      </g>
    </svg>
  );
}

export const CheckCircle = (props: React.SVGProps<SVGSVGElement>) => {
  return (
    <svg fill="none" viewBox="0 0 15 15" height="1em" width="1em" {...props}>
      <path
        stroke="currentColor"
        d="M4 7.5L7 10l4-5m-3.5 9.5a7 7 0 110-14 7 7 0 010 14z"
      />
    </svg>
  );
};