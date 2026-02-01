const BASE_URL = "http://127.0.0.1:8000/api";

export type Washroom = {
  id: string;
  name: string;
  lat: number;
  lng: number;
  score: number;
  verified: boolean;
  features: {
    clean: boolean;
    wheelchair_accessible: boolean;
    baby_changing: boolean;
    baby_changing_location: "family" | "public" | null;
    period_products: boolean;
    hygiene_supplies: boolean;
    gender_neutral: boolean;
  };
  review_count: number;
  avg_rating?: number;
};

export async function fetchWashrooms(filters: Record<string, boolean | undefined> = {}) {
  const params = new URLSearchParams();
  Object.entries(filters).forEach(([k, v]) => {
    if (v !== undefined) params.append(k, String(v));
  });

  const url = `${BASE_URL}/washrooms${params.toString() ? `?${params}` : ""}`;
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Failed to fetch washrooms: ${res.status}`);
  return (await res.json()) as Washroom[];
}
