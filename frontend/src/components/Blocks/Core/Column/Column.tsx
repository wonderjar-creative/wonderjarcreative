import { Maybe, CoreColumnBlockAttributes } from '@/gql/graphql';
import { getBlockClasses, getBlockStyleAttr } from '@/utils/getBlockComponents';

type ColumnProps = {
  attributes: CoreColumnBlockAttributes;
  dynamicContent?: Maybe<string> | undefined;
  innerBlocks?: React.ReactNode[];
  originalContent?: Maybe<string> | undefined;
  saveContent?: Maybe<string> | undefined;
}

export default function Column({
  attributes,
  dynamicContent,
  innerBlocks,
  originalContent,
  saveContent,
}: ColumnProps) {
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
      className={getBlockClasses(attributes, 'wp-block-column')}
      style={{
        ...getBlockStyleAttr(style),
        backgroundColor: backgroundColor || undefined,
        color: textColor || undefined,
        verticalAlign: verticalAlignment || undefined,
        width: width || undefined,
      }}
    >
      {innerBlocks}
    </div>
  );
}