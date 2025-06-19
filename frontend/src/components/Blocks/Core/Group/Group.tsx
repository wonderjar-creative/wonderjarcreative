import { Maybe, CoreGroupBlockAttributes } from '@/gql/graphql';
import { getBlockClasses, getBlockStyleAttr } from '@/utils/getBlockComponents';

type GroupProps = {
  attributes: CoreGroupBlockAttributes;
  dynamicContent?: Maybe<string> | undefined;
  innerBlocks?: React.ReactNode[];
  originalContent?: Maybe<string> | undefined;
  saveContent?: Maybe<string> | undefined;
}

export default function Group({
  attributes,
  innerBlocks,
  originalContent,
  saveContent,
  dynamicContent
}: GroupProps) {
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