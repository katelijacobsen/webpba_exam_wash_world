// Must be written literally so Next.js inlines it into the browser bundle
const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

// Bygger den korrekte billede-URL for et uploadet filnavn.
// null = intet billede → komponenten viser en placeholder i stedet for et brudt billede.
export function uploadSrc(file?: string | null): string | null {
  if (!file) return null;
  if (file.startsWith("blob:")) return file;               // optimistisk preview
  return `${BACKEND_URL}/static/uploads/${file}`;          // rigtig fil på Flask
}

// Bruges både på "Mine Biler"-siden og på enkelt-bil-siden.
export function carImgSrc(car_image: string): string | null {
  return uploadSrc(car_image);
}
