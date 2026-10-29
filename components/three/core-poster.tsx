export default function CorePoster() {
  return (
    <svg
      viewBox="0 0 700 700"
      className="core-poster"
      role="img"
      aria-label="Sculptural cybernetic core with titanium rings and cyan energy channels"
    >
      <defs>
        <radialGradient id="coreGlow">
          <stop stopColor="#00f0ff" stopOpacity=".19" />
          <stop offset="1" stopColor="#00f0ff" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="metal" x1="0" y1="0" x2="1" y2="1">
          <stop stopColor="#d8edf3" />
          <stop offset=".18" stopColor="#465b68" />
          <stop offset=".48" stopColor="#0d1924" />
          <stop offset=".72" stopColor="#7a939f" />
          <stop offset="1" stopColor="#14232d" />
        </linearGradient>
        <linearGradient id="edge" x1="0" y1="0" x2="1" y2="1">
          <stop stopColor="#5c8293" />
          <stop offset=".5" stopColor="#101c24" />
          <stop offset="1" stopColor="#00f0ff" />
        </linearGradient>
        <filter id="glow">
          <feGaussianBlur stdDeviation="5" />
        </filter>
      </defs>
      <circle cx="350" cy="350" r="290" fill="url(#coreGlow)" />
      <g transform="translate(350 350) rotate(-28)">
        <ellipse
          rx="245"
          ry="184"
          fill="none"
          stroke="#00f0ff"
          strokeOpacity=".2"
          strokeWidth="1"
          strokeDasharray="2 10"
        />
        <ellipse
          rx="218"
          ry="158"
          fill="none"
          stroke="url(#metal)"
          strokeWidth="23"
        />
        <ellipse
          rx="218"
          ry="158"
          fill="none"
          stroke="#00f0ff"
          strokeWidth="2"
          strokeDasharray="210 1150"
        />
        <ellipse
          rx="218"
          ry="158"
          fill="none"
          stroke="#a5c2cf"
          strokeOpacity=".6"
          strokeWidth="1"
        />
        {Array.from({ length: 24 }, (_, i) => (
          <path
            key={i}
            transform={`rotate(${i * 15})`}
            d="M204 -5 L226 -5 L226 5 L204 5 Z"
            fill={i % 4 === 0 ? "#00b8ca" : "#28404e"}
            stroke="#7593a3"
            strokeWidth=".5"
          />
        ))}
      </g>
      <g transform="translate(350 350) rotate(34)">
        <ellipse
          rx="166"
          ry="220"
          fill="none"
          stroke="url(#metal)"
          strokeWidth="30"
        />
        <ellipse
          rx="166"
          ry="220"
          fill="none"
          stroke="#00eaff"
          strokeOpacity=".5"
          strokeWidth="2"
          strokeDasharray="180 900"
        />
      </g>
      <g transform="translate(350 350)">
        <path
          d="M0 -126 L109 -63 L109 63 L0 126 L-109 63 L-109 -63Z"
          fill="#0d1821"
          stroke="url(#metal)"
          strokeWidth="15"
        />
        <path
          d="M0 -98 L85 -49 L85 49 L0 98 L-85 49 L-85 -49Z"
          fill="#111f29"
          stroke="#395662"
          strokeWidth="2"
        />
        <path
          d="M0 -78 L68 -39 L68 39 L0 78 L-68 39 L-68 -39Z"
          fill="#071318"
          stroke="#00f0ff"
          strokeWidth="3"
        />
        <path
          d="M0 -78 L68 -39 L68 39 L0 78 L-68 39 L-68 -39Z"
          fill="none"
          stroke="#00f0ff"
          strokeWidth="7"
          filter="url(#glow)"
        />
        <path
          d="M0 -45 L39 -22 L39 22 L0 45 L-39 22 L-39 -22Z"
          fill="#123440"
          stroke="#8feff4"
          strokeWidth="1"
        />
        <path
          d="M-15 15 L0 -20 L15 15 M-8 2 H8"
          fill="none"
          stroke="#00f0ff"
          strokeWidth="3"
        />
        {Array.from({ length: 6 }, (_, i) => (
          <g key={i} transform={`rotate(${i * 60})`}>
            <path
              d="M-14 -133 L-14 -172 L14 -172 L14 -133"
              fill="#182b36"
              stroke="#526d7c"
            />
            <path d="M-4 -141 L-4 -165" stroke="#00f0ff" strokeWidth="3" />
          </g>
        ))}
      </g>
    </svg>
  );
}
