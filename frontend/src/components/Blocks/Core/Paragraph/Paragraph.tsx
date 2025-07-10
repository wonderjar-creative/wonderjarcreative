import { Maybe, CoreParagraphBlockAttributes } from '@/gql/graphql';
import { getBlockClasses, getBlockStyleAttr, stripOuterTag } from '@/utils/getBlockComponents';

type ParagraphProps = {
  attributes: CoreParagraphBlockAttributes;
  saveContent?: Maybe<string> | undefined;
};

export default function Paragraph({
  attributes,
  saveContent
}: ParagraphProps) {
  const { anchor, style } = attributes;
  const blockClasses = getBlockClasses(attributes, 'wp-block-paragraph');
  const blockStyleAttr = getBlockStyleAttr(style);
  const html = stripOuterTag(
    saveContent || '',
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