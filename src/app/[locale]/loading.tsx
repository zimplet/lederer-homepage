export default function Loading() {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-dark-deep"
      aria-label="Seite wird geladen"
    >
      <div className="flex flex-col items-center gap-[var(--space-md)]">
        {/* Animated yarn spinner */}
        <div className="relative h-12 w-12">
          <div className="absolute inset-0 animate-spin rounded-full border-2 border-transparent border-t-red" />
          <div className="absolute inset-2 rounded-full border border-red/20" />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="h-1.5 w-1.5 rounded-full bg-red" />
          </div>
        </div>
        <span className="font-body text-[var(--text-xs)] uppercase tracking-[0.3em] text-white/30">
          Lederer
        </span>
      </div>
    </div>
  );
}
