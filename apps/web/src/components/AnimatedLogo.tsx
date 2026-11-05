"use client";

export function AnimatedLogo({ className }: { className?: string }) {
  return (
    <div className="relative flex items-center justify-center p-6">

      {/* 2. Logótipo no centro */}
      <svg
        viewBox="0 0 294 451"
        className={className}
        role="img"
        aria-label="Bisno"
      >
        {/* Primeira barra */}
        <path
          d="M0 0H85V351A85 85 0 0 1 0 266Z"
          fill="currentColor"
          className="animate-fade-in [animation-delay:100ms]"
          style={{ animationDuration: "600ms", animationFillMode: "backwards" }}
        />
        {/* Segunda barra */}
        <path
          d="M104 99A86 86 0 0 1 190 185V451A86 86 0 0 1 104 365Z"
          fill="currentColor"
          className="animate-fade-in [animation-delay:250ms]"
          style={{ animationDuration: "600ms", animationFillMode: "backwards" }}
        />
        {/* Terceira barra */}
        <path
          d="M208 112A86 86 0 0 1 294 198V266A86 86 0 0 1 208 352Z"
          fill="currentColor"
          className="animate-fade-in [animation-delay:400ms]"
          style={{ animationDuration: "600ms", animationFillMode: "backwards" }}
        />
      </svg>
    </div>
  );
}