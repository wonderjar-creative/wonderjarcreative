import { CoreColumnsBlock } from '@/utils/blockTypes';
import { getBlockBaseClass, getBlockClasses, getBlockStyleAttr } from '@/utils/blockStyles';

const Columns: React.FC<CoreColumnsBlock> = ({ name, attributes, innerBlocks }) => {
  const { style } = attributes || {};

  return (
    <div
      className={getBlockClasses(attributes || {}, `${getBlockBaseClass(name)} flex flex-wrap flex-col md:flex-row md:items-center`)}
      style={getBlockStyleAttr(style)}
    >
      {innerBlocks}
    </div>
  );
}

export default Columns;