type LogoProps = {
  className?: string
}

export default function Logo({ className = "" }: LogoProps) {
  return (
    <svg
      width="160"
      height="44"
      viewBox="0 0 160 44"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="LotinUp"
      className={className}
    >
      <text x="2" y="31" fontFamily="Inter, sans-serif" fontSize="40" fontWeight="800" letterSpacing="-1.2" fill="#14B8A6">
        Lotin
      </text>
      <text x="90" y="31" fontFamily="Inter, sans-serif" fontSize="40" fontWeight="800" letterSpacing="-1.2" fill="#3B82F6">
        Up
      </text>
    </svg>
  )
}
