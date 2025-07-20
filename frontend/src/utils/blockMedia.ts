import { Maybe, Block } from "@/gql/graphql";

interface ExtendedBlock extends Block {
  attributes?: {
    id?: number;
  };
  innerBlocks?: ExtendedBlock[];
  mediaItem?: {
    node?: {
      sourceUrl?: string;
      altText?: string;
      mediaDetails?: {
        width?: number;
        height?: number;
        sizes?: Record<string, { sourceUrl: string; width: number; height: number }>;
      }
    }
  };
}

const collectMediaIds = (blocks: ExtendedBlock[]): number[] => {
  const ids = new Set<number>();
  function walk(blocks: any[]) {
    for (const block of blocks) {
      const id = block?.attributes?.id;
      if (typeof id === "number") ids.add(id);
      if (block.innerBlocks && block.innerBlocks.length > 0) walk(block.innerBlocks);
    }
  }
  walk(blocks);
  return Array.from(ids);
}

const fetchMediaDetailsByIds = async (mediaIds: number[]): Promise<Record<number, any>> => {
  const results = await Promise.all(
    mediaIds.map(id =>
      fetch(`${process.env.NEXT_PUBLIC_WORDPRESS_API_URL || ""}/wp-json/wp/v2/media/${id}`)
        .then(res => res.ok ? res.json() : null)
        .then(data => [id, data])
    )
  );
  return Object.fromEntries(results.filter(([, data]) => data));
}

const enrichBlocks = (blocks: ExtendedBlock[], mediaMap: Record<number, any>): any[] => {
  return blocks.map(block => {
    let enriched = { ...block };
    const id = block?.attributes?.id;
    if (id && mediaMap[id]) {
      // console.log(`Enriching block ${block.name} with ID ${id} using media data`);
      const media = mediaMap[id];
      enriched.mediaItem = {
        node: {
          sourceUrl: media.source_url,
          altText: media.alt_text,
          mediaDetails: {
            width: media.media_details?.width,
            height: media.media_details?.height,
            sizes: media.media_details?.sizes,
          },
        },
      };
    }
    if (block.innerBlocks && block.innerBlocks.length > 0) {
      enriched.innerBlocks = enrichBlocks(block.innerBlocks, mediaMap);
    }
    return enriched;
  });
}

export const enrichBlocksWithMedia = async (
  blocks: ExtendedBlock[]
): Promise<Block[]> => {
  const mediaIds = collectMediaIds(blocks);
  if (mediaIds.length === 0) return blocks;
  const mediaMap = await fetchMediaDetailsByIds(mediaIds);
  return enrichBlocks(blocks, mediaMap);
}

type MediaSizesProps = {
  [key: string]: {
    sourceUrl: string;
    width: number;
    height: number;
  };
}

export const getMediaSize = (
  sizeSlug: Maybe<string> | undefined,
  sizes: MediaSizesProps | undefined
) => {
  if (!sizeSlug || !sizes) return undefined;
  return sizes[sizeSlug];
}

export const getSizesAttribute = (
  sizeSlug: Maybe<string> | undefined,
  sizes: MediaSizesProps | undefined
) => {
  if (!sizeSlug || !sizes) return undefined;
  const size = sizes[sizeSlug];
  return size ? { ...size } : undefined;
}
