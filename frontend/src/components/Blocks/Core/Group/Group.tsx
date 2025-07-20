import { Maybe, CoreGroupBlockAttributes } from '@/gql/graphql';
import { getBlockClasses, getBlockStyleAttr } from '@/utils/blockStyles';

interface GroupProps {
  attributes: CoreGroupBlockAttributes;
  innerBlocks?: React.ReactNode[];
}

const Group: React.FC<GroupProps> = ({ attributes, innerBlocks }) => {
  const { anchor, style, tagName } = attributes;
  const blockClasses = getBlockClasses(attributes, 'wp-block-group');
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