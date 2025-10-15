import { Maybe, Page } from "@/gql/graphql";
import { fetchTemplatePartWithISR } from "./isrFetchers";
import { enrichBlocksWithMedia } from "./blockMedia";
import getBlockComponents from "./getBlockComponents";

const getSemanticTag = (slug: string): keyof JSX.IntrinsicElements => {
  if (slug === 'header') return 'header';
  if (slug === 'footer') return 'footer';
  if (slug === 'sidebar') return 'aside';
  return 'div';
};

const renderTemplatePart = async (
  slug: string,
  page: Maybe<Page>,
  stylesCollector?: string[],
  index?: number
) => {
  try {
    const part = await fetchTemplatePartWithISR(slug);
    if (part) {
      const partBlocks = JSON.parse(part.blocksJSON || '[]');
      const enrichedBlocks = await enrichBlocksWithMedia(partBlocks);
      const components = await getBlockComponents(enrichedBlocks, page, stylesCollector);
      
      const TagName = getSemanticTag(slug);
      return (
        <TagName
          key={`template-part-${slug}-${index}`}
          className={`wp-block-template-part wp-block-template-part-${slug}`}
        >
          {components}
        </TagName>
      );
    }
    return null;
  } catch (error) {
    console.error(`Error rendering template part: ${slug}`, error);
    return null;
  }
}

export default renderTemplatePart;
