import { CoreGroupBlock } from '@/utils/blockTypes';
import { getBlockClasses, getBlockStyleAttr } from '@/utils/blockStyles';

const Group: React.FC<CoreGroupBlock> = ({ attributes, innerBlocks }) => {
  const { anchor, style, tagName } = attributes || {};
  const blockClasses = getBlockClasses(attributes || {}, 'wp-block-group');
  const blockStyleAttr = getBlockStyleAttr(style);
  const Tag = tagName || 'div';
  const TagComponent = Tag as keyof JSX.IntrinsicElements;

  return (
    <TagComponent
      {...(anchor && { id: anchor })}
      className={blockClasses}
      {...(style && { style: blockStyleAttr })}
    >
      {innerBlocks}
    </TagComponent>
  );
}

export default Group;