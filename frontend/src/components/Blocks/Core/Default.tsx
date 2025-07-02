import { Maybe } from '@/gql/graphql';
import { getBlockClasses, getBlockStyleAttr } from '@/utils/getBlockComponents';

type DefaultProps = {
  attributes: Record<string, any>;
  dynamicContent?: Maybe<string> | undefined;
  innerBlocks?: React.ReactNode[];
  originalContent?: Maybe<string> | undefined;
  saveContent?: Maybe<string> | undefined;
};

export default function Default({
  attributes,
  dynamicContent,
  innerBlocks,
  originalContent,
  saveContent
}: DefaultProps) {
  const { anchor, style, tagName } = attributes as any;
  const blockClasses = getBlockClasses(attributes, 'wp-block-default');
  const blockStyleAttr = getBlockStyleAttr(style);
  const Tag = tagName || 'div';
  const TagComponent = Tag as keyof JSX.IntrinsicElements;
  const hasInnerBlocks = Array.isArray(innerBlocks) && innerBlocks.length > 0;
  const html = dynamicContent || saveContent || originalContent;

  if (hasInnerBlocks) {
    // If you want to wrap innerBlocks in the tag:
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

  if (html) {
    // If html already includes the root tag, render as-is:
    return <div dangerouslySetInnerHTML={{ __html: html }} />;
  }

  return null;
}