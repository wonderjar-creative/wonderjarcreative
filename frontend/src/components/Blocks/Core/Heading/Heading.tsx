import { Maybe, CoreHeadingBlockAttributes } from '@/gql/graphql';
import { getBlockClasses, getBlockStyleAttr, stripOuterTag } from '@/utils/getBlockComponents';
import parse from 'html-react-parser';

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
  const content = stripOuterTag(dynamicContent || saveContent || originalContent || '', Tag as string);
  const html = parse(content ?? '');

  return (
    <Tag
      {...(anchor && { id: anchor })}
      className={blockClasses}
      {...(style && { style: blockStyleAttr })}
    >
      {html}
    </Tag>
  );
}