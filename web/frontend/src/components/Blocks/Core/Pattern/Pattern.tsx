import { CorePatternBlockAttributes } from '@/gql/graphql';
import { CorePatternBlock } from '@/types/coreBlockTypes';
import getPattern from '@/utils/getPattern';
import getBlockComponents from '@/utils/getBlockComponents';

const Pattern: React.FC<CorePatternBlock> = async ({ name, attributes, page }: CorePatternBlock) => {
  const { slug } = attributes || {};

  // Fetch the pattern structure based on the slug
  const pattern = getPattern(slug || '');

  if (!pattern) {
    return <div className="pattern-not-found">Pattern not found: {slug}</div>;
  }

  // Parse the blocks from the pattern
  const blocks = JSON.parse(pattern.blocksJSON || '[]');

  // Render the blocks using getBlockComponents
  return <>{await getBlockComponents(blocks, page, [])}</>;
}

export default Pattern;