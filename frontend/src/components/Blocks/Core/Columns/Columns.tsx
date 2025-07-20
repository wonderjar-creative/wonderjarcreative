import { Maybe, CoreColumnsBlockAttributes } from '@/gql/graphql';
import { getBlockClasses, getBlockStyleAttr } from '@/utils/blockStyles';

interface ColumnsProps {
  attributes: CoreColumnsBlockAttributes;
  innerBlocks?: React.ReactNode[];
}

const Columns: React.FC<ColumnsProps> = ({ attributes, innerBlocks }) => {
  const { style } = attributes;

  return (
    <div
      className={getBlockClasses(attributes, 'wp-block-columns flex flex-wrap flex-col md:flex-row md:items-center')}
      style={getBlockStyleAttr(style)}
    >
      {innerBlocks}
    </div>
  );
}

export default Columns;