export function ProductGridSkeleton() {
  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {Array.from({ length: 6 }, (_, index) => (
        <div
          key={`skeleton-${index + 1}`}
          className="flex flex-col overflow-hidden rounded-xl border border-border bg-card p-4 shadow-sm animate-pulse"
        >
          <div className="h-48 w-full rounded-lg bg-muted" />
          <div className="mt-4 h-6 w-3/4 rounded bg-muted" />
          <div className="mt-2 h-4 w-full rounded bg-muted" />
          <div className="mt-2 h-4 w-1/2 rounded bg-muted" />
          <div className="mt-6 flex items-center justify-between">
            <div className="h-6 w-1/4 rounded bg-muted" />
            <div className="h-9 w-28 rounded bg-muted" />
          </div>
        </div>
      ))}
    </div>
  );
}
