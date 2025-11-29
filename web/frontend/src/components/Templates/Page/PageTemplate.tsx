import { ContentNode, Page } from '@/gql/graphql';
import { fetchGraphQL } from '@/utils/fetchGraphQL';
import { print } from 'graphql/language/printer';
import { PageQuery } from './PageQuery';
import { fetchTemplateWithISR } from '@/utils/isrFetchers';
import getTemplate from '@/utils/getTemplate';
import { enrichBlocksWithMedia } from '@/utils/blockMedia';
import getBlockComponents from '@/utils/getBlockComponents';
import { resolve } from 'path';

interface TemplateProps {
  node: ContentNode;
}

const PageTemplate = async ({ node }: TemplateProps) => {
  const { page } = await fetchGraphQL<{ page: Page }>(print(PageQuery), {
    id: node.databaseId,
  });

  const stylesCollector: string[] = [];

  console.log('Rendering page with template:', page.template);

  const lowerCaseTemplateName = page.template?.templateName?.toLowerCase() || 'page';
  const templateName = lowerCaseTemplateName === 'default' ? 'page' : lowerCaseTemplateName;
  
  // Try ISR first, fallback to static
  let template = await fetchTemplateWithISR(templateName);
  if (!template) {
    template = getTemplate(templateName) || { name: templateName, blocksJSON: page.blocksJSON };
  }

  // Parse template blocks (but don't resolve template parts/patterns yet)
  let blocks = [];
  try {
    blocks = JSON.parse(template.blocksJSON || '[]');
    if (!Array.isArray(blocks)) {
      blocks = [];
    }
  } catch (e) {
    console.error('Failed to parse template blocksJSON:', e);
    blocks = [];
  }

  // Enrich only the top-level template blocks
  const enrichedBlocks = await enrichBlocksWithMedia(blocks);

  // Render components (this will handle template parts/patterns recursively)
  const renderedComponents = await getBlockComponents(enrichedBlocks, page, stylesCollector);

  return (
    <>
      {stylesCollector.length > 0 && <style>{stylesCollector.join('\n')}</style>}
      {renderedComponents}
    </>
  );
};

export default PageTemplate;