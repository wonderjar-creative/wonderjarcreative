import { Maybe, CorePostTitleBlockAttributes } from '@/gql/graphql';
import { getBlockClasses, getBlockStyleAttr } from '@/utils/blockStyles';
import { stripOuterTag } from '@/utils/htmlTransformations';
import React from 'react';

interface PostTitleProps {
  attributes: CorePostTitleBlockAttributes;
  dynamicContent?: Maybe<string> | undefined;
  originalContent?: Maybe<string> | undefined;
  saveContent?: Maybe<string> | undefined;
};

const PostTitle: React.FC<PostTitleProps> = ({ attributes, dynamicContent, originalContent, saveContent }) => {
  const { level, style } = attributes;
  const blockClasses = getBlockClasses(attributes, 'wp-block-post-title');
  const blockStyleAttr = getBlockStyleAttr(attributes);
  const Tag = `h${level}` || 'h2';
  const TagComponent = Tag as keyof JSX.IntrinsicElements;
  const html = stripOuterTag(dynamicContent || saveContent || originalContent || '', Tag);

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
