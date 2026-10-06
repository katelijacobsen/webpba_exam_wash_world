import Icon from "@/app/global/components/Icon";
import Button from "@/app/global/components/Button";
import type { Location } from "../hooks/useFilterLocations";
import AvailabilityStrip from "./AvailabilityStrip";
import { directionsUrl, formatDistance, locationAvailability } from "../utils/location";

interface CardProps {
  location: Location;
  // Only known when the user has shared their position
  distanceKm?: number;
  headingLevel?: "h2" | "h3";
}

// Figma "carwashCard/Default"
const Card = ({ location, distanceKm, headingLevel: Heading = "h2" }: CardProps) => {
  const { insideClean, carWash } = locationAvailability(location);

  return (
    <article className="group flex flex-col h-full rounded-2 border border-grey-100 bg-surface-2 overflow-hidden hover:border-primary-100 hover:shadow-card">
      <AvailabilityStrip insideClean={insideClean} carWash={carWash} />

      <div className="flex items-start justify-between gap-12 px-12 pt-16 pb-4">
        <div className="flex items-start gap-6 min-w-0">
          <Icon iconName="location" style="mt-[-2px] text-text" />
          <div className="flex flex-col gap-6 min-w-0">
            <Heading className="text-lg font-bold uppercase leading-none text-trim">
              {location.location_city}
            </Heading>
            <p className="text-sm font-bold uppercase leading-snug text-text/80 break-words">
              {location.location_address}
            </p>
          </div>
        </div>
        {distanceKm !== undefined && (
          <p className="shrink-0 text-sm font-bold uppercase whitespace-nowrap pt-2">
            <span className="sr-only">Afstand: </span>
            {formatDistance(distanceKm)}
          </p>
        )}
      </div>

      <div className="mt-auto grid grid-cols-[1fr_auto] gap-12 px-12 pt-20 pb-12">
        <Button
          elementType="link"
          linkHref={`/locationlist/${location.location_pk}`}
          buttonName="Vælg vaskehal"
          ariaLabel={`Vælg vaskehal: ${location.location_title}`}
          size="lg"
          type="primary"
        />
        <Button
          elementType="link"
          external
          linkHref={directionsUrl(location)}
          buttonName="Find vej"
          ariaLabel={`Find vej til ${location.location_title} (åbner Google Maps i nyt vindue)`}
          size="sm"
          type="secondary"
        />
      </div>
    </article>
  );
};

export default Card;
