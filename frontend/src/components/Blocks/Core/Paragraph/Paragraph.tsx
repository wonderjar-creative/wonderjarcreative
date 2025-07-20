import { Maybe, CoreParagraphBlockAttributes } from '@/gql/graphql';
import { getBlockClasses, getBlockStyleAttr } from '@/utils/blockStyles';
import { stripOuterTag } from '@/utils/htmlTransformations';

interface ParagraphProps {
  attributes: CoreParagraphBlockAttributes;
  saveContent?: Maybe<string> | undefined;
};

const Paragraph: React.FC<ParagraphProps> = ({ attributes, saveContent }) => {
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

export default Paragraph;