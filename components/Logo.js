export default function Logo({ variant = "dark", className = "" }) {
  const ring = variant === "light" ? "#ffffff" : "#0b2545";
  const fill = variant === "light" ? "#ffffff" : "#0b2545";

  return (
    <div className={`flex items-center gap-2.5 ${className}`}>
      <svg width="34" height="34" viewBox="0 0 34 34" fill="none">
        <rect x="1" y="1" width="32" height="32" rx="8" stroke={ring} strokeWidth="1.5" />
        <path
          d="M17 8L26 12.5V15.5L17 20L8 15.5V12.5L17 8Z"
          fill="#c9971c"
        />
        <path d="M11 16.8V21.5L17 24.5L23 21.5V16.8L17 20.3L11 16.8Z" fill={fill} />
      </svg>
      <span
        className={`font-display font-semibold tracking-tight text-lg ${
          variant === "light" ? "text-white" : "text-navy-900"
        }`}
      >
        IMT<span className="text-gold-500">Portal</span>
      </span>
    </div>
  );
}
