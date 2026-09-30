"use client";

import { useMemo, useRef, useState } from "react";

const WIDTH = 640;
const HEIGHT = 220;
const PAD = { top: 16, right: 16, bottom: 28, left: 16 };
const LINE_COLOR = "#E8A33D";

export default function RequestsChart({ data }) {
  const svgRef = useRef(null);
  const [hoverIndex, setHoverIndex] = useState(null);

  const { points, path, maxVal, minVal } = useMemo(() => {
    const values = data.map((d) => d.count);
    const maxVal = Math.max(...values);
    const minVal = 0;
    const innerW = WIDTH - PAD.left - PAD.right;
    const innerH = HEIGHT - PAD.top - PAD.bottom;

    const points = data.map((d, i) => {
      const x = PAD.left + (innerW * i) / (data.length - 1);
      const y = PAD.top + innerH * (1 - (d.count - minVal) / (maxVal - minVal));
      return { x, y, ...d };
    });

    const path = points
      .map((p, i) => `${i === 0 ? "M" : "L"} ${p.x.toFixed(1)} ${p.y.toFixed(1)}`)
      .join(" ");

    return { points, path, maxVal, minVal };
  }, [data]);

  function handleMove(e) {
    const rect = svgRef.current.getBoundingClientRect();
    const relX = ((e.clientX - rect.left) / rect.width) * WIDTH;
    let closest = 0;
    let minDist = Infinity;
    points.forEach((p, i) => {
      const dist = Math.abs(p.x - relX);
      if (dist < minDist) {
        minDist = dist;
        closest = i;
      }
    });
    setHoverIndex(closest);
  }

  const active = hoverIndex !== null ? points[hoverIndex] : null;

  return (
    <div className="relative">
      <svg
        ref={svgRef}
        viewBox={`0 0 ${WIDTH} ${HEIGHT}`}
        className="w-full h-auto"
        onMouseMove={handleMove}
        onMouseLeave={() => setHoverIndex(null)}
        role="img"
        aria-label={`Requests handled per day, ranging from ${minVal} to ${maxVal}`}
      >
        {/* baseline */}
        <line
          x1={PAD.left}
          y1={HEIGHT - PAD.bottom}
          x2={WIDTH - PAD.right}
          y2={HEIGHT - PAD.bottom}
          stroke="rgba(243,239,231,0.14)"
          strokeWidth="1"
        />

        {/* day labels, every other day to avoid crowding */}
        {points.map((p, i) =>
          i % 2 === 0 ? (
            <text
              key={i}
              x={p.x}
              y={HEIGHT - 8}
              textAnchor="middle"
              fontSize="10"
              fill="#A79FAE"
            >
              {p.day}
            </text>
          ) : null
        )}

        {/* line */}
        <path d={path} fill="none" stroke={LINE_COLOR} strokeWidth="2" strokeLinecap="round" />

        {/* crosshair + point */}
        {active && (
          <>
            <line
              x1={active.x}
              y1={PAD.top}
              x2={active.x}
              y2={HEIGHT - PAD.bottom}
              stroke="rgba(243,239,231,0.2)"
              strokeWidth="1"
            />
            <circle cx={active.x} cy={active.y} r="4" fill={LINE_COLOR} stroke="#1C1A22" strokeWidth="2" />
          </>
        )}
      </svg>

      {active && (
        <div
          className="absolute pointer-events-none bg-kavya-bg border border-kavya-line rounded px-2.5 py-1.5 text-xs whitespace-nowrap"
          style={{
            left: `${(active.x / WIDTH) * 100}%`,
            top: `${(active.y / HEIGHT) * 100}%`,
            transform: "translate(-50%, -130%)",
          }}
        >
          <div className="text-kavya-muted">{active.day}</div>
          <div className="font-semibold">{active.count} requests</div>
        </div>
      )}
    </div>
  );
}
