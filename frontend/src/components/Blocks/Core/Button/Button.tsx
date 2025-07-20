import Link from 'next/link';
import { Maybe, CoreButtonBlockAttributes } from '@/gql/graphql';
import { getBlockClasses, getBlockStyleAttr } from '@/utils/blockStyles';
import { stripOuterTag, getTransformedHtml } from '@/utils/htmlTransformations';

interface ButtonProps {
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

const Button: React.FC<ButtonProps> = ({ attributes, dynamicContent, originalContent, saveContent }) => {
  const { anchor, linkTarget, rel, style, url } = attributes;
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
        <Link
          className={`${linkClasses} is-next-link _direct`}
          href={url}
          {...(linkTarget && { target: linkTarget })}
          {...(rel && { rel })}
        >
          {getTransformedHtml(strippedA || '')}
        </Link>
      ) : (
        getTransformedHtml(strippedDiv || '')
      )}
    </div>
  );
};

export default Button;