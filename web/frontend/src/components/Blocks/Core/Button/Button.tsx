import Link from 'next/link';
import { CoreButtonBlock } from '@/types/coreBlockTypes';
import { getBlockBaseClass, getBlockClasses, getBlockStyleAttr } from '@/utils/blockStyles';
import { stripOuterTag, getTransformedHtml } from '@/utils/htmlTransformations';

const Button: React.FC<CoreButtonBlock> = ({ name, attributes, saveContent }) => {
  const { anchor, linkTarget, rel, style, url } = attributes || {};
  const blockClasses = getBlockClasses(attributes || {}, getBlockBaseClass(name));
  const blockStyleAttr = getBlockStyleAttr(style);
  const linkClasses = 'wp-block-button__link inline-block px-6 py-4 rounded-lg bg-deep-black font-semibold text-center text-soft-cream transition-colors hover:bg-charcoal-gray';
  const content = saveContent || '';
  const strippedDiv = stripOuterTag(content, 'div');
  const strippedA = stripOuterTag(strippedDiv, 'a');
  
  return (
    <div
      {...(anchor && { id: anchor })}
      className={blockClasses}
      {...(style && { style: blockStyleAttr })}
    >
      {url && (url.startsWith('/') || (process.env.NEXT_PUBLIC_BASE_URL && url.startsWith(process.env.NEXT_PUBLIC_BASE_URL))) ? (
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