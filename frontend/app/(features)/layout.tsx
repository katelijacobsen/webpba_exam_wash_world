import Featurelayout from "@/app/global/components/Featurelayout"
import Menu from "@/app/global/components/Menu";

export default function FeatureLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      {/* Nav comes first in the DOM so it matches the sidebar's visual order on desktop;
          the skip link jumps past it */}
      <Menu />
      <div id="main-content" tabIndex={-1} className="min-h-dvh lg:pl-[var(--sidebar-w)] outline-none">
        <Featurelayout>{children}</Featurelayout>
      </div>
    </>
  );
}
