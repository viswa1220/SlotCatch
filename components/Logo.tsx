// Custom SlotCatch logo mark: chat bubble + calendar rings + checkmark.
export default function Logo({ size = 22 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M7 9.5C7 8.12 8.12 7 9.5 7h13C23.88 7 25 8.12 25 9.5v11c0 1.38-1.12 2.5-2.5 2.5h-4.2l-3.1 2.7c-.5.43-1.28.08-1.28-.58V23H9.5C8.12 23 7 21.88 7 20.5v-11z"
        fill="white"
      />
      <rect x="10.5" y="5" width="2" height="4" rx="1" fill="white" />
      <rect x="19.5" y="5" width="2" height="4" rx="1" fill="white" />
      <path
        d="M11.8 15.4l2.6 2.6 5.4-5.8"
        stroke="#2563EB"
        strokeWidth="2.3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
