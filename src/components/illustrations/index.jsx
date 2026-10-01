const INK = "#26323f", TEAL = "#4a7f7a", OCHRE = "#cdb07a", WASH = "#e3ece9";
const line = { fill: "none", stroke: INK, strokeWidth: 2.5, strokeLinecap: "round", strokeLinejoin: "round" };

/** Hand-drawn logo mark: a wobbly price tag. */
export function Logo({ className = "h-8 w-8" }) {
  return (
    <svg viewBox="0 0 40 40" className={className} aria-hidden="true">
      <path d="M6 20 L20 6 L34 7 L33 21 L19 35 Z" fill={WASH} {...line} strokeWidth={2.2} />
      <circle cx="26.5" cy="13.5" r="2.3" fill={INK} />
      <path d="M13 24 Q17 18 22 22" {...line} stroke={TEAL} strokeWidth={2} />
    </svg>
  );
}

/** Wavy hand-drawn divider. */
export function Squiggle({ className = "w-40" }) {
  return (
    <svg viewBox="0 0 160 12" className={className} aria-hidden="true">
      <path d="M2 7 C14 1 22 11 34 6 S56 2 68 7 S92 11 104 6 S130 2 158 7" {...line} stroke={OCHRE} strokeWidth={3} />
    </svg>
  );
}

/** Campus shop scene: storefront, student holding a discount tag, stacked books. */
export function HeroIllustration({ className }) {
  return (
    <svg viewBox="0 0 480 360" className={className} role="img" aria-label="A student holding a discount tag outside a neighbourhood shop">
      <path d="M18 320 C120 311 230 326 340 317 S440 314 464 319" {...line} />
      {/* shop */}
      <path d="M72 160 L74 318 L252 316 L250 162" fill="#fff" {...line} />
      <path d="M56 160 Q160 128 266 160 L266 188 Q160 170 56 188 Z" fill={OCHRE} {...line} />
      <path d="M92 150 Q96 176 100 178 M130 142 Q133 170 136 172 M168 140 Q170 168 174 170 M206 142 Q208 170 212 172 M242 150 Q244 176 247 178" {...line} strokeWidth={1.8} />
      <path d="M130 318 L131 238 Q160 224 190 238 L191 317" fill={WASH} {...line} />
      <path d="M84 214 L84 262 L116 261 L117 215 Z" fill={WASH} {...line} />
      <path d="M205 214 L206 262 L238 261 L238 214 Z" fill={WASH} {...line} />
      <path d="M150 90 Q160 82 172 90 L174 118 L148 119 Z" fill={WASH} {...line} />
      <text x="161" y="112" textAnchor="middle" fontFamily="Caveat, cursive" fontSize="20" fill={INK}>open</text>
      {/* student */}
      <circle cx="342" cy="206" r="21" fill="#fff" {...line} />
      <path d="M318 196 L342 182 L366 196 L342 208 Z" fill={TEAL} {...line} />
      <path d="M362 198 L365 222" {...line} stroke={OCHRE} />
      <path d="M335 212 q3 3 6 0 M346 212 q3 3 6 0 M338 220 q5 4 10 0" {...line} strokeWidth={1.8} />
      <path d="M316 318 L320 246 Q342 232 364 246 L368 318" fill={TEAL} {...line} />
      <path d="M364 256 Q392 244 398 218" {...line} />
      <path d="M398 218 L420 214 L430 236 L408 242 Z" fill="#fff" {...line} />
      <circle cx="414" cy="222" r="2.5" fill={INK} />
      <text x="416" y="236" textAnchor="middle" fontFamily="Caveat, cursive" fontSize="17" fill={INK}>-15%</text>
      <path d="M316 262 Q300 270 304 300 L318 300" fill={OCHRE} {...line} />
      {/* books */}
      <path d="M396 318 L396 304 L452 304 L452 318" fill={WASH} {...line} />
      <path d="M402 304 L402 292 L446 290 L446 304" fill={OCHRE} {...line} />
      <path d="M408 290 L408 280 L440 281 L440 290" fill="#fff" {...line} />
      {/* doodles */}
      <path d="M404 70 v26 M391 83 h26 M396 75 l16 16 M412 75 l-16 16" {...line} stroke={OCHRE} strokeWidth={2} />
      <path d="M60 78 q10 -22 32 -14 q18 -14 34 2 q18 2 12 20 H66 q-14 0 -6 -8Z" fill="#fff" {...line} strokeWidth={2} />
      <path d="M262 168 C290 150 300 190 322 200" {...line} strokeDasharray="2 9" strokeWidth={3} />
    </svg>
  );
}

/** Small open-box doodle for empty states. */
export function EmptyDoodle({ className = "h-20 w-20" }) {
  return (
    <svg viewBox="0 0 80 80" className={className} aria-hidden="true">
      <path d="M12 34 L40 22 L68 34 L68 60 L40 72 L12 60 Z" fill={WASH} {...line} strokeWidth={2.2} />
      <path d="M12 34 L40 46 L68 34 M40 46 V72" {...line} strokeWidth={2.2} />
      <path d="M40 8 v8 M28 12 l4 6 M52 12 l-4 6" {...line} stroke={OCHRE} strokeWidth={2.2} />
    </svg>
  );
}
