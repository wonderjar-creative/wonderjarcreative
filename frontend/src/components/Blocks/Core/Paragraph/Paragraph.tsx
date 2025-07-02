import { Maybe, CoreParagraphBlockAttributes } from '@/gql/graphql';
import { getBlockClasses, getBlockStyleAttr, stripOuterTags } from '@/utils/getBlockComponents';

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
  const html = dynamicContent || saveContent || originalContent;

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