import { Maybe, CoreButtonsBlockAttributes } from '@/gql/graphql';
import { getBlockClasses, getBlockStyleAttr } from '@/utils/blockStyles';

interface ButtonsProps {
  attributes: CoreButtonsBlockAttributes;
  innerBlocks?: React.ReactNode[];
};

const Buttons: React.FC<ButtonsProps> = ({ attributes, innerBlocks }) => {
  const { anchor, style } = attributes;
  const blockClasses = getBlockClasses(attributes, 'wp-block-buttons');
  const blockStyleAttr = getBlockStyleAttr(style);

  return (
    <div
      {...(anchor && { id: anchor })}
      className={blockClasses}
      {...(style && { style: blockStyleAttr })}
    >
      {innerBlocks}
    </div>
  );
}

export default Buttons;