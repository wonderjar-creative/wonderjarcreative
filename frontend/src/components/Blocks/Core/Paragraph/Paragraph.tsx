import { Maybe, CoreParagraphBlockAttributes } from '@/gql/graphql';
import { getBlockClasses, getBlockStyleAttr, stripOuterTag } from '@/utils/getBlockComponents';

type ParagraphProps = {
  attributes: CoreParagraphBlockAttributes;
  dynamicContent?: Maybe<string> | undefined;
  originalContent?: Maybe<string> | undefined;
  saveContent?: Maybe<string> | undefined;
};

export default function Paragraph({
  attributes,
  dynamicContent,
  originalContent,
  saveContent
}: ParagraphProps) {
  const { anchor, style } = attributes;
  const blockClasses = getBlockClasses(attributes, 'wp-block-paragraph');
  const blockStyleAttr = getBlockStyleAttr(style);
  const html = stripOuterTag(
    dynamicContent || saveContent || originalContent || '',
    'p'
  );

  return (
    <p
      {...(anchor && { id: anchor })}
      className={blockClasses}
      {...(style && { style: blockStyleAttr })}
      dangerouslySetInnerHTML={{
        __html: html
      }}
    />
  );
}