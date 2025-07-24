import { CoreColumnBlock } from '@/utils/blockTypes';
import { getBlockBaseClass, getBlockClasses, getBlockStyleAttr } from '@/utils/blockStyles';

const Column: React.FC<CoreColumnBlock> = ({ name, attributes, innerBlocks }) => {
  const { style, width } = attributes || {};

  return (
    <div
      className={getBlockClasses(attributes || {}, `${getBlockBaseClass(name)} flow flex-grow break-words md:flex-1`)}
      style={{
        ...getBlockStyleAttr(style),
        flexBasis: width || undefined,
      }}
    >
      {innerBlocks}
    </div>
  );
}

export default Column;