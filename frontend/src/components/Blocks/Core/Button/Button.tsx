import Link from 'next/link';
import { Maybe, CoreButtonBlockAttributes } from '@/gql/graphql';
import { getBlockClasses, getBlockStyleAttr, stripOuterTag, getTransformedHTML } from '@/utils/getBlockComponents';

type ButtonProps = {
  attributes: CoreButtonBlockAttributes;
    anchor?: Maybe<string> | undefined;
    style?: Maybe<Record<string, string>> | undefined;
    url?: Maybe<string> | undefined;
    target?: Maybe<string> | undefined;
    rel?: Maybe<string> | undefined;
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
  const linkClasses = 'wp-block-button__link inline-block px-6 py-4 rounded-lg bg-deep-black font-semibold text-center text-soft-cream transition-colors hover:bg-charcoal-gray';
  const content = dynamicContent || saveContent || originalContent || '';
  const strippedDiv = stripOuterTag(content, 'div');
  const strippedA = stripOuterTag(strippedDiv, 'a');
  return (
    <div
      {...(anchor && { id: anchor })}
      className={blockClasses}
      {...(style && { style: blockStyleAttr })}
    >
      {url && (url.startsWith('/') || url.startsWith('http://localhost:3000')) ? (
        <Link className={`${linkClasses} is-next-link _direct`} href={url} target={target} rel={rel}>
          {getTransformedHTML(strippedA || '')}
        </Link>
      ) : (
        getTransformedHTML(strippedDiv || '')
      )}
    </div>
  );
}