import { Maybe, CoreColumnBlockAttributes } from '@/gql/graphql';
import { getBlockClasses, getBlockStyleAttr } from '@/utils/blockStyles';

interface ColumnProps {
  attributes: CoreColumnBlockAttributes;
  innerBlocks?: React.ReactNode[];
}

const Column = ({ attributes, innerBlocks }: ColumnProps) => {
  const {
    className,
    style,
    backgroundColor,
    layout,
    textColor,
    verticalAlignment,
    width,
  } = attributes;

  return (
    <div
      className={getBlockClasses(attributes, 'wp-block-column flow flex-grow break-words md:flex-1')}
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