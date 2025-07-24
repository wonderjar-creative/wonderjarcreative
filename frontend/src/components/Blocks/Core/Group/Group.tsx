import { CoreGroupBlock } from '@/utils/blockTypes';
import { getBlockBaseClass, getBlockClasses, getBlockStyleAttr } from '@/utils/blockStyles';

const Group: React.FC<CoreGroupBlock> = ({ name, attributes, innerBlocks }) => {
  const { anchor, style, tagName } = attributes || {};
  const blockClasses = getBlockClasses(attributes || {}, getBlockBaseClass(name));
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