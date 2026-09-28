import Link from "next/link";

export default function NotFound() {
  return (
    <main
      id="main"
      className="min-h-[100dvh] bg-bg text-text-primary flex flex-col items-center justify-center p-6 text-center"
    >
      <p className="label-over">Missing page</p>
      <h1 className="font-display text-3xl font-medium mt-2">This pass is not on file</h1>
      <p className="text-sm text-text-secondary mt-2 max-w-[36ch]">
        The page you asked for is not in this café. Return home or open the floor dashboard.
      </p>
      <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
        <Link
          href="/"
          className="h-11 px-5 rounded-full bg-primary text-bg text-sm font-semibold flex items-center btn-press"
        >
          Back to entry
        </Link>
        <Link
          href="/home"
          className="h-11 px-5 rounded-full border border-sage text-text-primary text-sm font-semibold flex items-center btn-press"
        >
          Customer home
        </Link>
      </div>
    </main>
  );
}
