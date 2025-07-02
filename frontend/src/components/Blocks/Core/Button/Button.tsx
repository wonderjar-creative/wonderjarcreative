import { Maybe, CoreButtonBlockAttributes } from '@/gql/graphql';
import { getBlockClasses, getBlockStyleAttr, stripOuterTags } from '@/utils/getBlockComponents';

type ButtonProps = {
  attributes: CoreButtonBlockAttributes;
  dynamicContent?: Maybe<string> | undefined;
  originalContent?: Maybe<string> | undefined;
  saveContent?: Maybe<string> | undefined;
};

export default function Button({
  attributes,
  dynamicContent,
  originalContent,
  saveContent
}: ButtonProps) {
  const { anchor, style, url, target, rel } = attributes;
  const blockClasses = getBlockClasses(attributes, 'wp-block-button');
  const blockStyleAttr = getBlockStyleAttr(style);
  const html = stripOuterTags(dynamicContent || saveContent || originalContent);

  return (
    <div
      {...(anchor && { id: anchor })}
      className={blockClasses}
      {...(style && { style: blockStyleAttr })}
    >
      <a
        href={url || '#'}
        className="wp-block-button__link"
        {...(target && { target })}
        {...(rel && { rel })}
        dangerouslySetInnerHTML={{ __html: html || '' }}
      />
    </div>
  );
}