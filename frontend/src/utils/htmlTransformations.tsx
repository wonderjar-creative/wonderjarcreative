import Link from 'next/link';
import parse, { domToReact, DOMNode } from 'html-react-parser';
import { Maybe } from '@/gql/graphql';

export const stripOuterTag = (
  html: string,
  tagToStrip: string = 'div'
) => {
  return html.replace(new RegExp(`<${tagToStrip}[^>]*>(.*)<\\/${tagToStrip}>`, 's'), '$1');
}

const transformHTMLToNext = (node: DOMNode) => {
  if (node.type === 'tag' && node.name === 'a') {
    const { class: className, href, target, rel } = node.attribs;
    // Check if it's an internal link
    if (href && href.startsWith('/')) {
      return (
        <Link className={`${className} is-next-link _transformed`} href={href} target={target} rel={rel}>
          {domToReact(node.children as DOMNode[])}
        </Link>
      );
    }
  }
};

export const getTransformedHTML = (
   html: string | Element | Element[] | Maybe<string> | undefined
): React.ReactNode => {
  if (!html) return;
  return <>{parse(html.toString(), { replace: transformHTMLToNext })}</>;
}