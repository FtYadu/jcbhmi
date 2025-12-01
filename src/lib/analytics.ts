export type UTMParams = {
  source?: string;
  medium?: string;
  campaign?: string;
  content?: string;
  term?: string;
};

export function buildUtmUrl(url: string, utm: UTMParams = {}) {
  const target = new URL(url);
  Object.entries(utm).forEach(([key, value]) => {
    if (value) {
      target.searchParams.set(`utm_${key}`, value);
    }
  });
  return target.toString();
}

export type AnalyticsEvent = {
  name: string;
  props?: Record<string, string | number | boolean | null | undefined>;
};

/**
 * Placeholder tracker; wire to GA4/Meta as needed.
 */
export function trackEvent(event: AnalyticsEvent) {
  if (process.env.NODE_ENV === "development") {
    console.debug("[analytics]", event);
  }
}
