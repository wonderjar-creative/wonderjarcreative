import { print } from 'graphql/language/printer';
import { ContentNode, Page } from '@/gql/graphql';
import { fetchGraphQL } from '@/utils/fetchGraphQL';
import { PageQuery } from './PageQuery';
import { EnrichedBlock } from '@/utils/blockTypes';
import { enrichBlocksWithMedia } from '@/utils/blockMedia';
import { getBlockComponents } from '@/utils/blockComponents';

interface TemplateProps {
  node: ContentNode;
}

export default async function PageTemplate({ node }: TemplateProps) {
  const { page } = await fetchGraphQL<{ page: Page }>(print(PageQuery), {
    id: node.databaseId,
  });
  const { blocksJSON, featuredImage, title } = page;

  const parsedBlocks = JSON.parse(blocksJSON || '[]');
  const enrichedBlocks: EnrichedBlock[] = await enrichBlocksWithMedia(parsedBlocks);
  const stylesCollector: string[] = [];
  
  const blockComponents = await getBlockComponents(
    enrichedBlocks,
    featuredImage,
    stylesCollector
  );

  return (
    <main className="py-8 md:py-12">
      {stylesCollector.length > 0 && <style>{stylesCollector.join('\n')}</style>}
      <header className="container mx-auto mb-8 has-global-padding">
        <h1 className="alignwide text-3xl md:text-4xl lg:text-6xl">{title}</h1>
      </header>
      { blockComponents && blockComponents.length > 0 ? (
        <div className="entry-content has-global-padding">
          {blockComponents}
        </div>
      ) : (
        <p className="text-center text-lg text-gray-500">No content available.</p>
      )}
    </main>
  );
}
