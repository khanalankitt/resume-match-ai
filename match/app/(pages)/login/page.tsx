export const dynamic = "force-static";

import Link from "next/link";

export default function LoginPage() {
  return (
    <div className="flex min-h-screen flex-col">
      {/* Nav */}
      <nav className="border-b border-ink/10 px-4 py-3 sm:px-6 sm:py-4">
        <div className="mx-auto max-w-5xl">
          <Link
            href="/"
            className="font-display text-lg font-semibold tracking-tight sm:text-xl"
          >
            AI Resume Match
          </Link>
        </div>
      </nav>

      <main className="flex flex-1 items-center justify-center px-4 py-12 sm:px-6 sm:py-16">
        <div className="w-full max-w-sm text-center">
          <h1 className="font-display text-xl font-semibold tracking-tight sm:text-2xl">
            Log in to get started
          </h1>
          <p className="mt-2 text-sm text-ink/60">
            Analyze your resume against any job description in seconds.
          </p>

          <button
            type="button"
            className="mt-6 flex w-full items-center justify-center gap-3 rounded border border-ink/20 bg-white py-3 text-sm font-medium shadow-paper-sm transition-colors hover:border-ink/30 sm:mt-8"
          >
            <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" />
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
            </svg>
            Continue with Google
          </button>

          <p className="mt-8 text-xs text-ink/40 sm:mt-10">
            By continuing, you agree to our terms of service.
          </p>
        </div>
      </main>
    </div>
  );
}
