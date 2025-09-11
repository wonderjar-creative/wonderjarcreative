import { CoreTemplatePartBlock } from '@/types/coreBlockTypes';
import { getBlockBaseClass } from '@/utils/blockStyles';

const TemplatePart: React.FC<CoreTemplatePartBlock> = ({ name, attributes, innerBlocks }) => {
  return (
    <div className={`${getBlockBaseClass(name)} ${attributes?.slug ? `wp-template-part-${attributes.slug}` : ''}`}>
      {/* Render the template part content */}
      {innerBlocks}
    </div>
  );
};

export default TemplatePart;