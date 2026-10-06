import "../styles/loader.css"

type Props = { label?: string };

export default function Loader({ label = "Indlæser…" }: Props) {
  return (
    <span role="status" className="inline-flex flex-col items-center gap-12">
      <span className="loader" aria-hidden="true"></span>
      <span className="sr-only">{label}</span>
    </span>
  );
}
