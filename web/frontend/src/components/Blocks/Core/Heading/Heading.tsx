import { CoreHeadingBlock } from '@/types/coreBlockTypes';
import { getBlockBaseClass, getBlockClasses, getBlockStyleAttr } from '@/utils/blockStyles';
import { stripOuterTag, getTransformedHtml } from '@/utils/htmlTransformations';

const Heading: React.FC<CoreHeadingBlock> = ({ name, attributes, saveContent }) => {
  const { anchor, level, style } = attributes || {};
  const blockClasses = getBlockClasses(attributes || {}, getBlockBaseClass(name));
  const blockStyleAttr = getBlockStyleAttr(style);
  const Tag = `h${level}` || 'h2';
  const content = stripOuterTag(saveContent || '', Tag);
  const html = getTransformedHtml(content || '');

  return (
    <Tag
      {...(anchor && { id: anchor })}
      className={blockClasses}
      {...(style && { style: blockStyleAttr })}
    >
      {html}
    </Tag>
  );
};

export default Heading;