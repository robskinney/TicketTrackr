import { Link } from "@remix-run/react";

export default function Navbar() {
  return (
    <nav className="sticky h-14 px-5 inset-x-0 top-0 z-30 w-full border-b border-gray-200 light:bg-white/75 backdrop-blur-lg transition-all">
      <div className="flex h-14 items-center align-middle justify-between border-b border-zinc-200">
        <div className="flex items-center gap-x-4">
          <Link to="/" className="flex z-40 font-semibold">
            <span>🎟️ TicketTrackr</span>
          </Link>
        </div>
      </div>
    </nav>
  );
}
