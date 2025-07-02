import { Maybe, CoreButtonsBlockAttributes } from '@/gql/graphql';
import { getBlockClasses, getBlockStyleAttr } from '@/utils/getBlockComponents';

type ButtonsProps = {
  attributes: CoreButtonsBlockAttributes;
  dynamicContent?: Maybe<string> | undefined;
  innerBlocks?: React.ReactNode[];
  originalContent?: Maybe<string> | undefined;
  saveContent?: Maybe<string> | undefined;
};

export default function Buttons({
  attributes,
  innerBlocks,
  originalContent,
  saveContent,
  dynamicContent
}: ButtonsProps) {
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