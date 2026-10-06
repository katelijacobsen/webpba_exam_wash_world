import Link from "next/link";
import Icon from "@/app/global/components/Icon";
import type { IconNameType } from "@/app/global/components/IconMap";

const actions: { href: string; label: string; description: string; iconName: IconNameType }[] = [
  { href: "/locationlist", label: "Find vask", description: "Ledige haller nær dig", iconName: "location" },
  { href: "/mycar", label: "Mine biler", description: "Tilføj eller se dine biler", iconName: "car" },
  { href: "/profile", label: "Profil", description: "Oplysninger og betaling", iconName: "user" },
];

export default function QuickActions() {
  return (
    <nav aria-label="Genveje">
      <ul className="grid gap-12">
        {actions.map((action) => (
          <li key={action.href}>
            <Link
              href={action.href}
              className="group flex items-center gap-12 p-12 rounded-4 border border-grey-100 bg-surface-2 hover:border-primary-100 hover:shadow-card"
            >
              <span className="grid place-items-center w-48 h-48 rounded-2 bg-primary-50 text-primary-800 group-hover:bg-primary-400 group-hover:text-bg-dark shrink-0">
                <Icon iconName={action.iconName} />
              </span>
              <span className="flex-1 flex flex-col gap-2 min-w-0">
                <span className="font-bold uppercase">{action.label}</span>
                <span className="text-sm text-grey-200 truncate">{action.description}</span>
              </span>
              <Icon iconName="next" size="sm" style="text-primary-800 transition-transform group-hover:translate-x-4" />
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
