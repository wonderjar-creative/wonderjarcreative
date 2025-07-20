import { Maybe, CoreHeadingBlockAttributes } from '@/gql/graphql';
import { getBlockClasses, getBlockStyleAttr } from '@/utils/blockStyles';
import { stripOuterTag, getTransformedHtml } from '@/utils/htmlTransformations';

interface HeadingProps {
  attributes: CoreHeadingBlockAttributes;
  dynamicContent?: Maybe<string> | undefined;
  originalContent?: Maybe<string> | undefined;
  saveContent?: Maybe<string> | undefined;
}

const Heading: React.FC<HeadingProps> = ({ attributes, dynamicContent, originalContent, saveContent }) => {
  const { level, anchor, style, textAlign } = attributes;
  const blockClasses = getBlockClasses(attributes, 'wp-block-heading');
  const blockStyleAttr = getBlockStyleAttr(style);
  const Tag = `h${level}` as keyof JSX.IntrinsicElements;
  const content = stripOuterTag(dynamicContent || saveContent || originalContent || '', Tag as string);
  const html = getTransformedHtml(content || '');

  return (
    <Tag
      {...(anchor && { id: anchor })}
      className={blockClasses}
      {...(style && { style: blockStyleAttr })}
    >
      {html}
    </Tag>
  );
};

export default Heading;