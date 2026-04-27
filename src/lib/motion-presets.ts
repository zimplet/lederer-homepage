export const stagger = {
  cascade: { each: 0.08, from: "start" as const },
  cascadeFast: { each: 0.04, from: "start" as const },
  centerOut: { each: 0.06, from: "center" as const },
  wave: { each: 0.05, from: "edges" as const },
  random: { each: 0.04, from: "random" as const },
  grid: (cols: number) => ({
    each: 0.05,
    grid: [cols, "auto"] as [number, string],
    from: "center" as const,
  }),
} as const;

export const timing = {
  instant: 0.1,
  fast: 0.3,
  moderate: 0.5,
  smooth: 0.8,
  dramatic: 1.2,
  cinematic: 1.8,
} as const;
