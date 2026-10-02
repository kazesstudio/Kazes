import { cn } from "@/lib/cn";

/**
 * Deterministic abstract technical figures.
 *
 * Case studies must not show fabricated product screenshots, so the visual
 * weight of each page is carried by generated schematics instead. Every figure
 * is derived from a seeded PRNG keyed on the study slug, so a given project
 * always renders identically across builds, and the result is unmistakably a
 * diagram rather than a photo of somebody's product.
 */

type Seeded = { next: () => number };

function makeRandom(seedText: string): Seeded {
  let state = 2166136261;
  for (let index = 0; index < seedText.length; index += 1) {
    state ^= seedText.charCodeAt(index);
    state = Math.imul(state, 16777619);
  }
  let value = state >>> 0;

  return {
    next() {
      value ^= value << 13;
      value >>>= 0;
      value ^= value >> 17;
      value ^= value << 5;
      value >>>= 0;
      return value / 0xffffffff;
    },
  };
}

export type FigureKind = "pipeline" | "topology" | "board" | "sequence";

const CAPTIONS: Record<FigureKind, string> = {
  pipeline: "Data path, end to end.",
  topology: "Service topology and trust boundaries.",
  board: "Board-level layout and signal routing.",
  sequence: "Request lifecycle and timing budget.",
};

export function TechnicalFigure({
  kind,
  seed,
  className,
  tone = "dark",
  classNameOverride,
}: {
  kind: FigureKind;
  seed: string;
  className?: string;
  tone?: "light" | "dark";
  classNameOverride?: string;
}) {
  const dark = tone === "dark";
  const line = dark ? "rgb(0 0 0 / 0.16)" : "rgb(255 255 255 / 0.14)";
  const lineStrong = dark ? "rgb(0 0 0 / 0.42)" : "rgb(212 255 63 / 0.55)";
  const accent = dark ? "#d4ff3f" : "#0a0a0a";
  const surface = dark ? "rgb(0 0 0 / 0.04)" : "rgb(21 21 21 / 0.8)";

  return (
    <figure
      className={cn(
        "relative isolate overflow-hidden rounded-card border",
        dark
          ? "border-cream/10 bg-espresso shadow-card"
          : "border-rule-soft bg-taupe/30 shadow-soft",
        classNameOverride ?? className,
      )}
    >
      <div aria-hidden="true" className="hairline-grid absolute inset-0 opacity-60" />

      <svg
        viewBox="0 0 640 420"
        className="relative block h-auto w-full"
        role="img"
        aria-label={`Schematic: ${CAPTIONS[kind]}`}
      >
        {kind === "pipeline" ? <Pipeline seed={seed} line={line} lineStrong={lineStrong} accent={accent} surface={surface} /> : null}
        {kind === "topology" ? <Topology seed={seed} line={line} lineStrong={lineStrong} accent={accent} surface={surface} /> : null}
        {kind === "board" ? <Board seed={seed} line={line} lineStrong={lineStrong} accent={accent} surface={surface} /> : null}
        {kind === "sequence" ? <Sequence seed={seed} line={line} lineStrong={lineStrong} accent={accent} surface={surface} /> : null}
      </svg>

      <figcaption
        className={cn(
          "tech-label absolute bottom-4 left-5 flex items-center gap-2",
          dark ? "text-cream/40" : "text-ink-faint",
        )}
      >
        <span
          aria-hidden="true"
          className={cn("size-1 rounded-full", dark ? "bg-cream/40" : "bg-mocha/70")}
        />
        {CAPTIONS[kind]}
        <span className="sr-only">
          . This is a generated schematic, not a product screenshot.
        </span>
      </figcaption>
    </figure>
  );
}

/* -------------------------------------------------------------------------- */

type FigureProps = {
  seed: string;
  line: string;
  lineStrong: string;
  accent: string;
  surface: string;
};

function Pipeline({ seed, line, lineStrong, accent, surface }: FigureProps) {
  const random = makeRandom(seed);
  const stages = 6;
  const width = 78;
  const gap = (640 - stages * width) / (stages - 1 + 2);

  return (
    <g>
      <line x1={28} y1={210} x2={612} y2={210} stroke={line} strokeWidth="1" />
      {Array.from({ length: stages }, (_, index) => {
        const x = 28 + index * (width + gap);
        const amplitude = 26 + random.next() * 44;
        const phase = random.next() * Math.PI;
        const barWidth = 3;
        const bars = 9;

        return (
          <g key={index}>
            <rect
              x={x}
              y={150}
              width={width}
              height={120}
              rx="10"
              fill={surface}
              stroke={line}
            />
            <text
              x={x + 10}
              y={170}
              fill={accent}
              fontFamily="var(--font-mono)"
              fontSize="8"
              letterSpacing="1.2"
            >
              {String(index + 1).padStart(2, "0")}
            </text>

            {Array.from({ length: bars }, (_, barIndex) => {
              const barX = x + 10 + barIndex * ((width - 20) / (bars - 1));
              const barHeight =
                amplitude *
                (0.45 + 0.55 * Math.abs(Math.sin(phase + barIndex * 0.8)));
              return (
                <rect
                  key={barIndex}
                  x={barX}
                  y={250 - barHeight}
                  width={barWidth}
                  height={barHeight}
                  rx={barWidth / 2}
                  fill={barIndex === bars - 1 ? accent : lineStrong}
                />
              );
            })}
          </g>
        );
      })}
    </g>
  );
}

function Topology({ seed, line, lineStrong, accent, surface }: FigureProps) {
  const random = makeRandom(seed);
  const nodeCount = 11;
  const nodes = Array.from({ length: nodeCount }, (_, index) => {
    const angle = (index / nodeCount) * Math.PI * 2 + random.next() * 0.4;
    const radius = 120 + random.next() * 70;
    return {
      x: 320 + Math.cos(angle) * radius * 1.45,
      y: 210 + Math.sin(angle) * radius * 0.85,
      r: 6 + random.next() * 9,
      hub: index === 0,
    };
  });

  const [hub, ...rest] = nodes;

  return (
    <g>
      {rest.map((node, index) => (
        <line
          key={`edge-${index}`}
          x1={hub.x}
          y1={hub.y}
          x2={node.x}
          y2={node.y}
          stroke={index % 3 === 0 ? lineStrong : line}
          strokeWidth="1"
        />
      ))}
      {rest.map((node, index) => {
        if (index === 0) return null;
        const previous = rest[index - 1];
        return (
          <line
            key={`peer-${index}`}
            x1={previous.x}
            y1={previous.y}
            x2={node.x}
            y2={node.y}
            stroke={line}
            strokeWidth="1"
            strokeDasharray="2 5"
          />
        );
      })}
      {nodes.map((node, index) => (
        <g key={`node-${index}`}>
          {node.hub ? (
            <circle cx={node.x} cy={node.y} r={node.r + 12} fill={surface} stroke={accent} strokeWidth="1" />
          ) : null}
          <circle
            cx={node.x}
            cy={node.y}
            r={node.r}
            fill={node.hub ? accent : surface}
            stroke={node.hub ? accent : lineStrong}
            strokeWidth="1"
          />
        </g>
      ))}
      <text x={28} y={40} fill={accent} fontFamily="var(--font-mono)" fontSize="8" letterSpacing="1.4">
        TRUST BOUNDARY
      </text>
      <rect
        x={20}
        y={52}
        width={600}
        height={316}
        rx={16}
        fill="none"
        stroke={lineStrong}
        strokeDasharray="6 6"
      />
    </g>
  );
}

function Board({ seed, line, lineStrong, accent, surface }: FigureProps) {
  const random = makeRandom(seed);
  const pads = Array.from({ length: 16 }, () => ({
    x: 90 + random.next() * 460,
    y: 70 + random.next() * 270,
    w: 16 + random.next() * 26,
    h: 12 + random.next() * 18,
  }));
  const traces = Array.from({ length: 22 }, () => {
    const startX = 80 + random.next() * 480;
    const startY = 60 + random.next() * 290;
    const midX = startX + (random.next() - 0.5) * 90;
    return { startX, startY, midX, endX: midX + (random.next() - 0.5) * 70, endY: startY + (random.next() - 0.5) * 60 };
  });

  return (
    <g>
      <rect x={40} y={40} width={560} height={340} rx={14} fill={surface} stroke={lineStrong} />
      {traces.map((trace, index) => (
        <path
          key={`trace-${index}`}
          d={`M ${trace.startX} ${trace.startY} L ${trace.midX} ${trace.startY} L ${trace.endX} ${trace.endY}`}
          fill="none"
          stroke={index % 5 === 0 ? accent : lineStrong}
          strokeWidth={index % 5 === 0 ? 1.4 : 0.9}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      ))}
      {pads.map((pad, index) => (
        <rect
          key={`pad-${index}`}
          x={pad.x}
          y={pad.y}
          width={pad.w}
          height={pad.h}
          rx={3}
          fill="none"
          stroke={index % 6 === 0 ? accent : line}
          strokeWidth="1"
        />
      ))}
      <circle cx={140} cy={300} r={44} fill="none" stroke={line} strokeWidth="1" />
      <circle cx={140} cy={300} r={26} fill="none" stroke={line} strokeDasharray="3 4" />
      <circle cx={140} cy={300} r={5} fill={accent} />
    </g>
  );
}

function Sequence({ seed, line, lineStrong, accent, surface }: FigureProps) {
  const random = makeRandom(seed);
  const rows = 6;
  const rowTop = 78;
  const rowHeight = 46;
  const trackX = 150;
  const trackW = 430;

  // Cumulative timing bars: each stage starts where the previous one ended,
  // which is what makes the figure read as a latency budget rather than a chart.
  const stages: { start: number; width: number }[] = [];
  let cursor = 0;
  for (let index = 0; index < rows; index += 1) {
    const width = 0.1 + random.next() * 0.2;
    const size = Math.min(width, 0.97 - cursor);
    stages.push({ start: cursor, width: size });
    cursor += size + 0.02;
  }

  return (
    <g>
      {/* time axis */}
      <line x1={trackX} y1={54} x2={trackX + trackW} y2={54} stroke={lineStrong} strokeWidth="1" />
      {Array.from({ length: 9 }, (_, index) => {
        const x = trackX + (trackW / 8) * index;
        return (
          <g key={`tick-${index}`}>
            <line x1={x} y1={50} x2={x} y2={58} stroke={lineStrong} />
            <text
              x={x}
              y={44}
              textAnchor="middle"
              fill={lineStrong}
              fontFamily="var(--font-mono)"
              fontSize="7"
              letterSpacing="0.8"
            >
              {`${index * 25}`}
            </text>
          </g>
        );
      })}
      <text
        x={trackX + trackW + 4}
        y={44}
        fill={accent}
        fontFamily="var(--font-mono)"
        fontSize="7.5"
        letterSpacing="1"
      >
        MS
      </text>

      {/* budget line */}
      <line
        x1={trackX}
        y1={rowTop + rows * rowHeight}
        x2={trackX + trackW}
        y2={rowTop + rows * rowHeight}
        stroke={accent}
        strokeDasharray="4 5"
        opacity="0.5"
      />

      {stages.map((stage, index) => {
        const y = rowTop + index * rowHeight;
        const barX = trackX + stage.start * trackW;
        const barW = Math.max(stage.width * trackW, 6);
        const critical = index === rows - 1;

        return (
          <g key={`stage-${index}`}>
            <line x1={trackX - 12} y1={y} x2={trackX + trackW} y2={y} stroke={line} strokeWidth="0.5" />
            <text
              x={trackX - 22}
              y={y + 4}
              textAnchor="end"
              fill={lineStrong}
              fontFamily="var(--font-mono)"
              fontSize="8"
              letterSpacing="1.1"
            >
              {`0${index + 1}`}
            </text>
            <rect
              x={barX}
              y={y - 13}
              width={barW}
              height={26}
              rx={8}
              fill={critical ? accent : surface}
              stroke={critical ? accent : lineStrong}
              strokeWidth="1"
            />
            <line
              x1={barX}
              y1={y + 17}
              x2={barX + barW}
              y2={y + 17}
              stroke={critical ? accent : lineStrong}
              strokeWidth="1.5"
              opacity="0.6"
            />
          </g>
        );
      })}
    </g>
  );
}
