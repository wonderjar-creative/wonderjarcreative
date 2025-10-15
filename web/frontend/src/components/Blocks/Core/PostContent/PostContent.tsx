import { CorePostContentBlock } from '@/types/coreBlockTypes';
import { getBlockBaseClass, getBlockClasses } from '@/utils/blockStyles';
import getBlockComponents from '@/utils/getBlockComponents';

const PostContent: React.FC<CorePostContentBlock> = async ({ name, attributes, page }) => {
  return (
    <div className={`${getBlockClasses(attributes || {}, getBlockBaseClass(name))}`}>
      {await getBlockComponents(
        JSON.parse(page?.blocksJSON || '[]'),
        page ?? null,
        []
      )}
    </div>
  );
};

export default PostContent;
