import { Maybe, CorePostTitleBlockAttributes } from '@/gql/graphql';
import { getBlockClasses, getBlockStyleAttr, stripOuterTag } from '@/utils/getBlockComponents';
import parse from 'html-react-parser';

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
  const Tag = `h${level}` as keyof JSX.IntrinsicElements;
  const content = stripOuterTag(dynamicContent || saveContent || originalContent);
  const html = parse(content ?? '');
  
  return (
    <Tag className={blockClasses} style={blockStyleAttr}>
      {html || <span className="text-gray-500">No title available</span>}
    </Tag>
  );
};

export default PostTitle;
