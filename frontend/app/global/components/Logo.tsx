import Link from "next/link";

type Props = {
  href?: string;
  tone?: "light" | "dark";
  className?: string;
};

// Simple wordmark: green "W" tile + name. tone = colour of the text.
export default function Logo({ href = "/dashboard", tone = "dark", className = "" }: Props) {
  return (
    <Link
      href={href}
      className={`inline-flex items-center gap-10 font-extrabold uppercase tracking-[0.04em] ${
        tone === "light" ? "text-white" : "text-text"
      } ${className}`}
    >
      <span
        aria-hidden="true"
        className="grid place-items-center w-40 h-40 rounded-2 bg-primary-400 text-bg-dark text-lg leading-none bevel"
      >
        W
      </span>
      <span className="text-base leading-none">
        Wash <span className="text-primary-400">World</span>
      </span>
    </Link>
  );
}
