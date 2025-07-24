import { FrontendBlock } from '@/utils/blockTypes';
import { getBlockClasses, getBlockStyleAttr } from '@/utils/blockStyles';

const Default: React.FC<FrontendBlock> = ({ attributes, dynamicContent, saveContent, innerBlocks }) => {
  const { anchor, style, tagName } = attributes || {};
  const blockClasses = getBlockClasses(attributes || {}, 'wp-block-default');
  const blockStyleAttr = getBlockStyleAttr(style);
  const Tag = tagName || 'div';
  const TagComponent = Tag as keyof JSX.IntrinsicElements;
  const hasInnerBlocks = Array.isArray(innerBlocks) && innerBlocks.length > 0;
  const html = dynamicContent || saveContent || '';

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

export default Default;