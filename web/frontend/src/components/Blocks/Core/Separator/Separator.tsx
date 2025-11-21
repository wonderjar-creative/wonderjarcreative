import { CoreSeparatorBlockAttributes } from '@/gql/graphql';
import { getBlockBaseClass, getBlockClasses, getBlockStyleAttr } from '@/utils/blockStyles';

interface SeparatorProps {
  name: string;
  attributes?: CoreSeparatorBlockAttributes;
}

const Separator: React.FC<SeparatorProps> = ({ name, attributes }) => {
  const { anchor, style, ...separatorAttributes } = attributes || {};

  const blockClasses = getBlockClasses(separatorAttributes, getBlockBaseClass(name));
  const blockStyleAttr = getBlockStyleAttr(style);

  return (
    <hr
      {...(anchor && { id: anchor })}
      className={blockClasses}
      {...(blockStyleAttr && { style: blockStyleAttr })}
    />
  );
};

export default Separator;
