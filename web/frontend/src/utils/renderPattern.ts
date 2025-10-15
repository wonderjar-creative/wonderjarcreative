import { Maybe, Page } from '@/gql/graphql';
import { fetchPatternWithISR } from './isrFetchers';
import { enrichBlocksWithMedia } from './blockMedia';
import getBlockComponents from './getBlockComponents';

const renderPattern = async (
  slug: string,
  page: Maybe<Page>,
  stylesCollector?: string[],
  index?: number
) => {
  try {
    const cleanSlug = slug.replace(/^[^/]+\//, '');
    const pattern = await fetchPatternWithISR(cleanSlug);
    if (pattern) {
      const patternBlocks = JSON.parse(pattern.blocksJSON || '[]');
      const enrichedBlocks = await enrichBlocksWithMedia(patternBlocks);
      const components = await getBlockComponents(enrichedBlocks, page, stylesCollector);
      
      return components;
    }
    return null;
  } catch (error) {
    console.error(`Error rendering pattern: ${slug}`, error);
    return null;
  }
}

export default renderPattern;