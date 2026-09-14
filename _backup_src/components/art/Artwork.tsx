import type { CSSProperties } from "react";
import { cn } from "@/lib/utils";

export type ArtworkVariant =
  | "soccer"
  | "cricket"
  | "basketball"
  | "baseball"
  | "ice-hockey"
  | "jersey"
  | "cricket-uniform"
  | "track-suit"
  | "hoodie"
  | "duffel"
  | "training";

const GLYPHS: Record<ArtworkVariant, React.ReactNode> = {
  soccer: (
    <g>
      <circle cx="100" cy="100" r="56" fill="none" stroke="currentColor" strokeWidth="2.5" />
      <circle cx="100" cy="100" r="30" fill="none" stroke="currentColor" strokeWidth="1.5" opacity="0.55" />
      <path d="M44 100 A56 56 0 0 1 100 44 A 20 20 0 0 1 120 62 L 154 90 A 20 20 0 0 1 156 110 L 126 144 A 20 20 0 0 1 100 156 A 56 56 0 0 1 44 100Z" fill="none" stroke="currentColor" strokeWidth="2.5" />
      <path d="M100 100 L126 144 M100 100 L154 90 M100 100 L120 62 M100 100 L44 100 M100 100 L122 86" stroke="currentColor" strokeWidth="1.5" opacity="0.6" />
    </g>
  ),
  cricket: (
    <g>
      <path d="M118 150 L66 40" stroke="currentColor" strokeWidth="7" strokeLinecap="round" />
      <path d="M66 40 L74 30 C78 25 86 27 88 33 L88 40 Z" fill="currentColor" opacity="0.9" />
      <path d="M74 30 L118 150" stroke="currentColor" strokeWidth="16" opacity="0.08" />
      <circle cx="150" cy="52" r="17" fill="none" stroke="currentColor" strokeWidth="2.5" />
      <path d="M150 52 m-12 0 a12 12 0 0 1 24 0" stroke="currentColor" strokeWidth="1.5" opacity="0.7" />
      <path d="M150 52 m-12 0 a12 12 0 0 0 24 0" stroke="currentColor" strokeWidth="1.5" opacity="0.7" />
    </g>
  ),
  basketball: (
    <g>
      <circle cx="100" cy="100" r="56" fill="none" stroke="currentColor" strokeWidth="2.5" />
      <path d="M56 66 C76 84 88 62 108 74 C124 83 132 94 144 100" fill="none" stroke="currentColor" strokeWidth="2.5" />
      <path d="M56 134 C76 116 88 138 108 126 C124 117 132 106 144 100" fill="none" stroke="currentColor" strokeWidth="2.5" />
      <path d="M100 44 C94 70 94 130 100 156 M100 44 C106 70 106 130 100 156" fill="none" stroke="currentColor" strokeWidth="2.5" opacity="0.8" />
    </g>
  ),
  baseball: (
    <g>
      <circle cx="100" cy="100" r="46" fill="none" stroke="currentColor" strokeWidth="2.5" />
      <path d="M62 88 C78 96 86 82 100 90 C114 98 110 74 128 78" fill="none" stroke="currentColor" strokeWidth="2.5" />
      <path d="M138 112 C122 104 114 118 100 110 C86 102 90 126 72 122" fill="none" stroke="currentColor" strokeWidth="2.5" />
      <path d="M152 68 L172 44 M48 132 L28 156 M140 150 L160 174" stroke="currentColor" strokeWidth="2" opacity="0.5" strokeLinecap="round" />
    </g>
  ),
  "ice-hockey": (
    <g>
      <ellipse cx="100" cy="130" rx="46" ry="14" fill="none" stroke="currentColor" strokeWidth="3" />
      <ellipse cx="100" cy="128" rx="46" ry="14" fill="currentColor" opacity="0.08" />
      <path d="M66 62 L66 118" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" />
      <path d="M66 96 L34 104 C28 106 26 112 30 114 L60 108" stroke="currentColor" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" fill="currentColor" opacity="0.9" />
      <path d="M148 52 L140 24 M158 58 L162 30" stroke="currentColor" strokeWidth="2" opacity="0.5" strokeLinecap="round" />
      <path d="M30 52 L38 24 M22 58 L18 30" stroke="currentColor" strokeWidth="2" opacity="0.35" strokeLinecap="round" />
    </g>
  ),
  jersey: (
    <g>
      <path
        d="M78 34 L122 34 L126 50 L148 54 L150 88 L132 120 L146 168 L112 172 L100 148 L88 172 L54 168 L68 120 L50 88 L52 54 L74 50 Z"
        fill="currentColor"
        opacity="0.1"
      />
      <path
        d="M78 34 L122 34 L126 50 L148 54 L150 88 L132 120 L146 168 L112 172 L100 148 L88 172 L54 168 L68 120 L50 88 L52 54 L74 50 Z"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinejoin="round"
      />
      <path d="M78 34 C84 44 116 44 122 34" fill="none" stroke="currentColor" strokeWidth="2.5" />
      <path d="M96 50 L96 148 M104 50 L104 148" stroke="currentColor" strokeWidth="1.5" opacity="0.45" />
      <path d="M100 74 L100 96 M54 76 L148 76" stroke="currentColor" strokeWidth="2.5" opacity="0.9" />
    </g>
  ),
  "cricket-uniform": (
    <g>
      <path
        d="M80 40 L120 40 L124 54 L144 58 L146 84 L132 110 L144 160 L114 164 L100 142 L86 164 L56 160 L68 110 L54 84 L56 58 L76 54 Z"
        fill="currentColor"
        opacity="0.1"
      />
      <path
        d="M80 40 L120 40 L124 54 L144 58 L146 84 L132 110 L144 160 L114 164 L100 142 L86 164 L56 160 L68 110 L54 84 L56 58 L76 54 Z"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinejoin="round"
      />
      <path d="M82 40 C86 48 114 48 118 40" fill="none" stroke="currentColor" strokeWidth="2.5" />
      <path d="M144 64 L152 170" stroke="currentColor" strokeWidth="1.5" opacity="0.4" strokeDasharray="6 6" />
      <circle cx="101" cy="90" r="13" fill="none" stroke="currentColor" strokeWidth="2" />
    </g>
  ),
  "track-suit": (
    <g>
      <rect x="58" y="52" width="84" height="34" rx="10" fill="currentColor" opacity="0.1" />
      <rect x="58" y="52" width="84" height="34" rx="10" fill="none" stroke="currentColor" strokeWidth="2.5" />
      <path d="M100 52 L100 86" stroke="currentColor" strokeWidth="2" opacity="0.8" />
      <rect x="58" y="98" width="84" height="64" rx="12" fill="currentColor" opacity="0.1" />
      <rect x="58" y="98" width="84" height="64" rx="12" fill="none" stroke="currentColor" strokeWidth="2.5" />
      <path d="M100 98 L100 162" stroke="currentColor" strokeWidth="2.5" opacity="0.8" />
      <path d="M58 130 C58 122 58 116 58 112 M142 130 C142 122 142 116 142 112" stroke="currentColor" strokeWidth="2.5" opacity="0.6" />
    </g>
  ),
  hoodie: (
    <g>
      <path
        d="M62 86 C62 66 78 50 100 50 C122 50 138 66 138 86 L146 128 L132 170 L68 170 L54 128 Z"
        fill="currentColor"
        opacity="0.1"
      />
      <path
        d="M62 86 C62 66 78 50 100 50 C122 50 138 66 138 86 L146 128 L132 170 L68 170 L54 128 Z"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinejoin="round"
      />
      <path d="M88 56 C88 44 112 44 112 56" fill="none" stroke="currentColor" strokeWidth="2.5" />
      <path d="M82 66 L92 74 L108 74 L118 66" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinejoin="round" />
      <path d="M100 82 L100 108 M95 100 L105 100" stroke="currentColor" strokeWidth="2" />
    </g>
  ),
  duffel: (
    <g>
      <rect x="38" y="96" width="124" height="54" rx="16" fill="currentColor" opacity="0.1" />
      <rect x="38" y="96" width="124" height="54" rx="16" fill="none" stroke="currentColor" strokeWidth="2.5" />
      <path d="M70 96 C70 72 130 72 130 96" fill="none" stroke="currentColor" strokeWidth="2.5" />
      <path d="M38 112 L38 138 M162 112 L162 138" stroke="currentColor" strokeWidth="2.5" opacity="0.7" />
      <path d="M100 96 L100 150" stroke="currentColor" strokeWidth="2" opacity="0.55" />
      <path d="M52 72 L44 52 M148 72 L156 52" stroke="currentColor" strokeWidth="2" opacity="0.4" strokeLinecap="round" />
    </g>
  ),
  training: (
    <g>
      <path
        d="M74 44 L126 44 L132 60 L150 66 L148 92 L134 116 L148 164 L116 166 L100 146 L84 166 L52 164 L66 116 L52 92 L50 66 L68 60 Z"
        fill="currentColor"
        opacity="0.1"
      />
      <path
        d="M74 44 L126 44 L132 60 L150 66 L148 92 L134 116 L148 164 L116 166 L100 146 L84 166 L52 164 L66 116 L52 92 L50 66 L68 60 Z"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinejoin="round"
      />
      <path d="M100 60 L100 150 M74 60 L74 100 M126 60 L126 100" stroke="currentColor" strokeWidth="2" opacity="0.5" />
      <path d="M56 96 L144 96" stroke="currentColor" strokeWidth="2.5" />
    </g>
  ),
};

type ArtworkProps = {
  variant: ArtworkVariant;
  color?: string;
  className?: string;
  style?: CSSProperties;
  glyphClassName?: string;
};

export function Artwork({
  variant,
  color = "#e30613",
  className,
  style,
  glyphClassName,
}: ArtworkProps) {
  const glyph = GLYPHS[variant];
  return (
    <svg
      viewBox="0 0 400 400"
      className={cn("block h-full w-full", className)}
      style={style}
      role="img"
      aria-hidden
    >
      <defs>
        <radialGradient id={`art-bg-${variant}`} cx="30%" cy="24%" r="90%">
          <stop offset="0%" stopColor={color} stopOpacity="0.14" />
          <stop offset="55%" stopColor={color} stopOpacity="0.04" />
          <stop offset="100%" stopColor={color} stopOpacity="0" />
        </radialGradient>
        <linearGradient id={`art-mesh-${variant}`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#131316" />
          <stop offset="100%" stopColor="#0a0a0b" />
        </linearGradient>
      </defs>
      <rect width="400" height="400" fill={`url(#art-mesh-${variant})`} />
      <rect width="400" height="400" fill={`url(#art-bg-${variant})`} />
      <g stroke={color} strokeOpacity="0.09" strokeWidth="1">
        <path d="M0 100 H400 M0 200 H400 M0 300 H400 M100 0 V400 M200 0 V400 M300 0 V400" />
      </g>
      <g transform="translate(100 100)" color={color} className={glyphClassName}>
        <g>
          <circle cx="100" cy="100" r="92" fill="none" stroke={color} strokeOpacity="0.14" strokeWidth="1.5" />
          {glyph}
        </g>
      </g>
      <g color={color} strokeOpacity="0.4" strokeLinecap="round">
        <path d="M330 52 L370 52 M344 44 L370 63" strokeWidth="6" />
        <path d="M330 348 L370 348" strokeWidth="4" opacity="0.5" />
      </g>
    </svg>
  );
}
