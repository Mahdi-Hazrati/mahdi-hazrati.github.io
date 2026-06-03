export function GridBackground() {
  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      <div className="absolute inset-0 bg-background" />
      <div
        className="absolute inset-0 opacity-[0.35]"
        style={{
          backgroundImage: `
            linear-gradient(to right, hsl(var(--grid-line)) 1px, transparent 1px),
            linear-gradient(to bottom, hsl(var(--grid-line)) 1px, transparent 1px)
          `,
          backgroundSize: "64px 64px",
        }}
      />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-accent/10 rounded-full blur-[120px]" />
      <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-glow-secondary/15 rounded-full blur-[100px]" />
    </div>
  );
}
