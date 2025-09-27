export const GhostIcon = ({ className = "w-16 h-16" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M100 40C70 40 50 60 50 90V140C50 150 55 155 60 150L70 140L80 150C85 155 95 155 100 150L110 140L120 150C125 155 135 155 140 150L150 140C155 145 160 150 150 140V90C150 60 130 40 100 40Z"
      fill="currentColor"
      opacity="0.4"
    />
    <circle cx="80" cy="80" r="8" fill="currentColor" opacity="0.8" />
    <circle cx="120" cy="80" r="8" fill="currentColor" opacity="0.8" />
    <ellipse cx="100" cy="105" rx="8" ry="12" fill="currentColor" opacity="0.6" />
    <circle cx="60" cy="60" r="2" fill="currentColor" opacity="0.3" />
    <circle cx="140" cy="65" r="1.5" fill="currentColor" opacity="0.3" />
    <circle cx="170" cy="90" r="1" fill="currentColor" opacity="0.3" />
  </svg>
);
