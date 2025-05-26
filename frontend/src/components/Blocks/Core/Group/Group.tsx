import { Maybe, CoreGroupBlockAttributes } from '@/gql/graphql';
import { getBlockClasses, getBlockStyle } from '@/utils/getBlockComponents';

type GroupProps = {
  attributes: CoreGroupBlockAttributes;
  dynamicContent?: Maybe<string> | undefined;
  innerBlocks?: React.ReactNode[];
  key: number;
  originalContent?: Maybe<string> | undefined;
  saveContent?: Maybe<string> | undefined;
}

export default function Group({ attributes, innerBlocks, originalContent, saveContent, dynamicContent }: GroupProps) {
  const { anchor, style, tagName } = attributes;
  const blockClasses = getBlockClasses(attributes, 'wp-block-paragraph');
  const blockStyle = getBlockStyle(style);
  const Tag = tagName || 'div';
  const TagComponent = Tag as keyof JSX.IntrinsicElements;

  return (
    <TagComponent
      {...(anchor && { id: anchor })}
      className={blockClasses}
      {...(style && { style: blockStyle })}
    >
      {innerBlocks}
    </TagComponent>
  );
}