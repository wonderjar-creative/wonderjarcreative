import { Maybe, CoreHeadingBlockAttributes } from '@/gql/graphql';
import { getBlockClasses, getBlockStyleAttr } from '@/utils/getBlockComponents';

type HeadingProps = {
  attributes: CoreHeadingBlockAttributes;
  dynamicContent?: Maybe<string> | undefined;
  originalContent?: Maybe<string> | undefined;
  saveContent?: Maybe<string> | undefined;
}

export default function Heading({
  attributes,
  dynamicContent,
  originalContent,
  saveContent,
}: HeadingProps) {
  const { level, anchor, style, textAlign } = attributes;
  const blockClasses = getBlockClasses(attributes, 'wp-block-heading');
  const blockStyleAttr = getBlockStyleAttr(style);
  const Tag = `h${level}` as keyof JSX.IntrinsicElements;

  return (
    <Tag
      {...(anchor && { id: anchor })}
      className={blockClasses}
      {...(style && { style: blockStyleAttr })}
    >
      {(dynamicContent || originalContent || saveContent)?.replace(/<[^>]+>/g, '')}
    </Tag>
  );
}