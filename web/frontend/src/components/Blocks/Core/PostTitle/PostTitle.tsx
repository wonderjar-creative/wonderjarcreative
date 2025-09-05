import { CorePostTitleBlock } from '@/utils/blockTypes';
import { getBlockBaseClass, getBlockClasses, getBlockStyleAttr } from '@/utils/blockStyles';
import { stripOuterTag } from '@/utils/htmlTransformations';
import React from 'react';

const PostTitle: React.FC<CorePostTitleBlock> = ({ name, attributes, isDynamic, dynamicContent, saveContent }) => {
  const { level, style } = attributes || {};
  const blockClasses = getBlockClasses(attributes || {}, getBlockBaseClass(name));
  const blockStyleAttr = getBlockStyleAttr(attributes || {});
  const Tag = `h${level}` || 'h2';
  const TagComponent = Tag as keyof JSX.IntrinsicElements;
  const content = dynamicContent || saveContent;
  const html = stripOuterTag(content || '', Tag);

  return (
    <TagComponent
      className={blockClasses}
      style={blockStyleAttr}
      dangerouslySetInnerHTML={{
        __html: html || ''
      }}
    />
  );
};

export default PostTitle;
