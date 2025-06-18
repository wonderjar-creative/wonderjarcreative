import { Maybe, CoreColumnsBlockAttributes } from '@/gql/graphql';
import { getBlockClasses, getBlockStyleAttr } from '@/utils/getBlockComponents';

type ColumnsProps = {
  attributes: CoreColumnsBlockAttributes;
  dynamicContent?: Maybe<string> | undefined;
  innerBlocks?: React.ReactNode[];
  originalContent?: Maybe<string> | undefined;
  saveContent?: Maybe<string> | undefined;
}

export default function Columns({
  attributes,
  dynamicContent,
  innerBlocks,
  originalContent,
  saveContent,
}: ColumnsProps) {
  const {
    className,
    style,
    backgroundColor,
    layout,
    textColor,
    verticalAlignment,
  } = attributes;

  return (
    <div
      className={getBlockClasses(attributes, 'wp-block-columns')}
      style={{
        ...getBlockStyleAttr(style),
        backgroundColor: backgroundColor || undefined,
        color: textColor || undefined,
        verticalAlign: verticalAlignment || undefined,
      }}
    >
      {innerBlocks}
    </div>
  );
}