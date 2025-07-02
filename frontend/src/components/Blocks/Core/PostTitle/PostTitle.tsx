import { Maybe, CorePostTitleBlockAttributes } from '@/gql/graphql';
import { getBlockClasses, getBlockStyleAttr, stripOuterTags } from '@/utils/getBlockComponents';

type PostTitleProps = {
  attributes: CorePostTitleBlockAttributes;
  dynamicContent?: Maybe<string> | undefined;
  originalContent?: Maybe<string> | undefined;
  saveContent?: Maybe<string> | undefined;
};

const PostTitle: React.FC<PostTitleProps> = ({
  attributes,
  dynamicContent,
  originalContent,
  saveContent
}: PostTitleProps) => {
  const { level, style } = attributes;
  const blockClasses = getBlockClasses(attributes, 'wp-block-post-title');
  const blockStyleAttr = getBlockStyleAttr(attributes);
  const Tag = `h${level}` || 'h2';
  const TagComponent = Tag as keyof JSX.IntrinsicElements;
  const html = stripOuterTags(dynamicContent || saveContent || originalContent);
  
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
