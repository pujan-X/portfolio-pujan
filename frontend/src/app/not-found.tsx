export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] font-mono text-center">
      <h1 className="text-[var(--accent)] text-6xl font-bold mb-4">404</h1>
      <p className="text-[var(--muted)] text-xl mb-8">Route not found</p>
      <div className="p-4 bg-[var(--surface)] border border-[var(--border)] rounded max-w-md w-full text-left">
        <div className="text-red-400 mb-2">Error: Page compilation failed</div>
        <div className="text-[var(--muted)] text-sm">
          {">"} The requested resource could not be found on this server.
          <br />
          {">"} Please check the URL or navigate back to the root directory.
        </div>
      </div>
      <a href="/" className="mt-8 text-[var(--accent)] hover:underline">{"cd /home"}</a>
    </div>
  );
}
