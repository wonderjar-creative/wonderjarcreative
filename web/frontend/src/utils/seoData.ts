import { Page } from "@/gql/graphql";

/**
 * Parse Rank Math robots meta directive array
 * Example: ["index", "follow"] or ["noindex", "nofollow"]
 */
const parseRobotsDirective = (robots?: Array<string | null> | null) => {
  if (!robots || robots.length === 0) return { index: true, follow: true };

  const directives = robots.filter((r): r is string => r !== null).map(d => d.toLowerCase());

  return {
    index: !directives.includes('noindex'),
    follow: !directives.includes('nofollow'),
  };
};

export const setSeoData = ({ seo }: { seo: Page["seo"] }) => {
  if (!seo) return {};

  const robotsDirective = parseRobotsDirective(seo.robots);

  return {
    metadataBase: new URL(`${process.env.NEXT_PUBLIC_BASE_URL}`),
    title: seo.title || "",
    description: seo.description || "",
    robots: robotsDirective,
    openGraph: {
      title: seo.openGraph?.title || seo.title || "",
      description: seo.openGraph?.description || seo.description || "",
      url: seo.openGraph?.url || "",
      siteName: seo.openGraph?.siteName || "",
      images: seo.openGraph?.image?.url ? [
        {
          url: seo.openGraph.image.url,
          width: seo.openGraph.image.width || 1200,
          height: seo.openGraph.image.height || 630,
          alt: "",
        },
      ] : [],
      locale: seo.openGraph?.locale || "da_DK",
      type: (seo.openGraph?.type as any) || "website",
      ...(seo.openGraph?.articleMeta?.publishedTime && {
        publishedTime: seo.openGraph.articleMeta.publishedTime,
      }),
      ...(seo.openGraph?.articleMeta?.modifiedTime && {
        modifiedTime: seo.openGraph.articleMeta.modifiedTime,
      }),
    },
    twitter: {
      card: (seo.openGraph?.twitterMeta?.card as any) || "summary_large_image",
      title: seo.openGraph?.twitterMeta?.title || seo.openGraph?.title || seo.title || "",
      description: seo.openGraph?.twitterMeta?.description || seo.openGraph?.description || seo.description || "",
      images: seo.openGraph?.twitterMeta?.image ? [seo.openGraph.twitterMeta.image] : [],
    },
  };
};
