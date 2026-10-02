import { cn } from "@/lib/cn";

/**
 * Abstract system architecture map.
 *
 * Renders the four disciplines as a stacked architecture with signal paths
 * between them. Pure SVG and CSS — no client JavaScript, so it costs nothing on
 * the critical path. Every animation is suppressed under reduced motion.
 */

type NodeSpec = {
  id: string;
  label: string;
  caption: string;
  y: number;
};

const LAYERS: NodeSpec[] = [
  { id: "hardware", label: "Hardware", caption: "Sensors · Firmware · Devices", y: 40 },
  { id: "infra", label: "Infrastructure", caption: "Runtime · Data · Networks", y: 138 },
  { id: "intelligence", label: "Intelligence", caption: "Retrieval · Agents · Eval", y: 236 },
  { id: "software", label: "Software", caption: "Services · APIs · Interfaces", y: 334 },
];

const VIEW_W = 460;
const VIEW_H = 420;
const BOX_X = 30;
const BOX_W = 400;
const BOX_H = 76;

const SPINE_X = 230;

export function SystemMap({
  className,
  tone = "light",
}: {
  className?: string;
  tone?: "light" | "dark";
}) {
  const dark = tone === "dark";
  const stroke = dark ? "rgb(0 0 0 / 0.16)" : "rgb(255 255 255 / 0.14)";
  const strokeStrong = dark ? "rgb(0 0 0 / 0.42)" : "rgb(212 255 63 / 0.55)";
  const accent = dark ? "#d4ff3f" : "#0a0a0a";
  const textStrong = dark ? "#ffffff" : "#0a0a0a";
  const textMuted = dark ? "rgb(255 255 255 / 0.55)" : "rgb(10 10 10 / 0.55)";

  return (
    <div className={cn("relative", className)}>
      <svg
        viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
        role="img"
        aria-label="System map: hardware, infrastructure, intelligence and software connected by a shared signal spine."
        className="h-auto w-full"
      >
        <defs>
          <linearGradient id="sm-spine" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={accent} stopOpacity="0.15" />
            <stop offset="50%" stopColor={accent} stopOpacity="0.55" />
            <stop offset="100%" stopColor={accent} stopOpacity="0.15" />
          </linearGradient>
          <linearGradient id="sm-node" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor={dark ? "#151515" : "#ffffff"} stopOpacity="1" />
            <stop offset="100%" stopColor={dark ? "#0a0a0a" : "#f0f0f2"} stopOpacity="1" />
          </linearGradient>
        </defs>

        {/* signal spine */}
        <line
          x1={SPINE_X}
          y1={LAYERS[0].y + BOX_H / 2}
          x2={SPINE_X}
          y2={LAYERS[LAYERS.length - 1].y + BOX_H / 2}
          stroke="url(#sm-spine)"
          strokeWidth="1"
        />

        {LAYERS.map((layer, index) => {
          const cy = layer.y + BOX_H / 2;

          return (
            <g key={layer.id}>
              {/* connector from spine into the node */}
              <line
                x1={SPINE_X}
                y1={cy}
                x2={BOX_X + 14}
                y2={cy}
                stroke={strokeStrong}
                strokeWidth="1"
                strokeDasharray="2 4"
              />
              <circle cx={SPINE_X} cy={cy} r="3" fill={accent} />

              <rect
                x={BOX_X}
                y={layer.y}
                width={BOX_W}
                height={BOX_H}
                rx="16"
                fill="url(#sm-node)"
                stroke={stroke}
                strokeWidth="1"
              />

              {/* index marker */}
              <text
                x={BOX_X + 20}
                y={layer.y + 27}
                fill={accent}
                fontFamily="var(--font-mono)"
                fontSize="9"
                letterSpacing="1.4"
              >
                {String(index + 1).padStart(2, "0")}
              </text>

              <text
                x={BOX_X + 44}
                y={layer.y + 28}
                fill={textStrong}
                fontFamily="var(--font-sans)"
                fontSize="15"
                letterSpacing="-0.01em"
              >
                {layer.label}
              </text>

              <text
                x={BOX_X + 44}
                y={layer.y + 50}
                fill={textMuted}
                fontFamily="var(--font-mono)"
                fontSize="9.5"
                letterSpacing="0.6"
              >
                {layer.caption}
              </text>
            </g>
          );
        })}

        {/* animated signal pulses travelling the spine */}
        {[0, 1, 2].map((index) => (
          <circle
            key={`pulse-${index}`}
            className="sm-pulse"
            cx={SPINE_X}
            cy={LAYERS[0].y + BOX_H / 2}
            r="2.6"
            fill={accent}
            style={{ animationDelay: `${index * 1.55}s` }}
          />
        ))}
      </svg>

      <span className="sr-only">
        A layered architecture diagram with four labelled layers connected along
        a single vertical spine.
      </span>
    </div>
  );
}
