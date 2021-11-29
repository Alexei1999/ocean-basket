export function Eclipse({ className }: { className?: string }) {
  return (
    <div className={className}>
      <svg
        width="40"
        height="5"
        viewBox="0 0 5 5"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle cx="-15" cy="2.5" r="2.5" fill="#C4C4C4" />
        <circle cx="0" cy="2.5" r="2.5" fill="#C4C4C4" />
        <circle cx="15" cy="2.5" r="2.5" fill="#C4C4C4" />
      </svg>
    </div>
  );
}
