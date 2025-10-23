import { CorePostTitleBlock } from '@/types/coreBlockTypes';
import { getBlockBaseClass, getBlockClasses, getBlockStyleAttr } from '@/utils/blockStyles';
import { stripOuterTag } from '@/utils/htmlTransformations';

const PostTitle: React.FC<CorePostTitleBlock> = ({ name, attributes, dynamicContent, saveContent, page }) => {
  const { level, style } = attributes || {};
  const blockClasses = getBlockClasses(attributes || {}, getBlockBaseClass(name));
  const blockStyleAttr = getBlockStyleAttr(style || {});
  const Tag = `h${level || 2}` as keyof JSX.IntrinsicElements;
  const { title } = page || {};
  const content = title || stripOuterTag(dynamicContent || saveContent || '', Tag.toString());

  return (
    <Tag
      className={blockClasses}
      style={blockStyleAttr}
    >
      {content}
    </Tag>
  );
};

export default PostTitle;
