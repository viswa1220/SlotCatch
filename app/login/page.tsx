import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Owner Login",
  description:
    "Sign in to your SlotCatch dashboard to manage bookings, reviews, schedule gaps, and retention.",
  robots: { index: false, follow: false },
};

// The dashboard/login lives on the SlotCatch backend. Set NEXT_PUBLIC_BACKEND_URL
// in your environment (e.g. https://api.slotcatch.com). The form posts directly
// to the backend, which sets the session cookie and redirects to the dashboard.
const BACKEND =
  process.env.NEXT_PUBLIC_BACKEND_URL?.replace(/\/$/, "") ||
  "https://api.slotcatch.com";

export default function LoginPage() {
  return (
    <main className="min-h-screen flex items-center justify-center px-5 py-16 bg-bg text-ink">
      {/* soft cyan/blue glow to match the landing page */}
      <div
        className="pointer-events-none fixed inset-0 -z-10"
        style={{
          background:
            "radial-gradient(ellipse 70% 50% at 50% 0%, rgba(59,130,246,0.12), transparent 60%), radial-gradient(ellipse 50% 40% at 50% 100%, rgba(34,211,238,0.10), transparent 60%)",
        }}
      />

      <div className="w-full max-w-[400px]">
        <div className="mb-8 text-center">
          <Link
            href="/"
            className="inline-flex items-center gap-1 text-xl font-bold tracking-tight no-underline text-ink"
          >
            SlotCatch
            <span className="text-brand-cyan">●</span>
          </Link>
          <h1 className="mt-6 text-2xl font-bold">Owner login</h1>
          <p className="mt-2 text-sm text-dim">
            Manage your bookings, reviews, schedule gaps, and retention.
          </p>
        </div>

        <form
          method="POST"
          action={`${BACKEND}/dashboard/login`}
          className="rounded-2xl border border-line bg-surface p-7 backdrop-blur"
        >
          <label className="block text-[13px] text-dim mb-1.5" htmlFor="username">
            Username
          </label>
          <input
            id="username"
            name="username"
            autoComplete="username"
            required
            className="w-full rounded-lg border border-line bg-black/30 px-3.5 py-2.5 text-[15px] text-ink outline-none focus:border-brand-cyan focus:ring-2 focus:ring-brand-cyan/30"
          />

          <label
            className="block text-[13px] text-dim mb-1.5 mt-5"
            htmlFor="password"
          >
            Password
          </label>
          <input
            id="password"
            name="password"
            type="password"
            autoComplete="current-password"
            required
            className="w-full rounded-lg border border-line bg-black/30 px-3.5 py-2.5 text-[15px] text-ink outline-none focus:border-brand-cyan focus:ring-2 focus:ring-brand-cyan/30"
          />

          <button
            type="submit"
            className="mt-7 w-full rounded-lg bg-gradient-to-b from-brand-cyan to-brand-blue py-3 text-[15px] font-semibold text-[#04121a] shadow-glow transition-transform hover:-translate-y-0.5"
          >
            Sign in
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-dim">
          New to SlotCatch?{" "}
          <Link href="/#apply" className="text-brand-cyan no-underline hover:underline">
            Apply to get set up
          </Link>
        </p>
      </div>
    </main>
  );
}
