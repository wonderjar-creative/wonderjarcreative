import Image from 'next/image';
import { Maybe, CoreCoverBlockAttributes, NodeWithFeaturedImageToMediaItemConnectionEdge } from '@/gql/graphql';
import { getBlockClasses, getBlockStyleAttr } from '@/utils/getBlockComponents';

type CoverProps = {
  attributes: CoreCoverBlockAttributes;
  dynamicContent?: Maybe<string> | undefined;
  featuredImage?: Maybe<NodeWithFeaturedImageToMediaItemConnectionEdge> | '';
  innerBlocks?: React.ReactNode[];
  originalContent?: Maybe<string> | undefined;
  saveContent?: Maybe<string> | undefined;
}

export default function Cover({
  attributes,
  dynamicContent,
  featuredImage,
  innerBlocks,
  originalContent,
  saveContent
}: CoverProps) {
  const {
    anchor,
    alt,
    backgroundType,
    contentPosition,
    customOverlayColor,
    dimRatio,
    gradient,
    id,
    isDark,
    minHeight,
    minHeightUnit,
    overlayColor,
    sizeSlug,
    style,
    tagName,
    url,
    useFeaturedImage,
    ...wrapperAttributes
  } = attributes;

  const Tag = tagName || 'div';
  const TagComponent = Tag as keyof JSX.IntrinsicElements;
  
  const align = contentPosition ? [contentPosition.split(' ')[0]].map((verticalAlign) => {
    switch (verticalAlign) {
      case 'top':
        return 'items-start';
      case 'center':
        return 'items-center';
      case 'bottom':
        return 'items-end';
      default:
        return 'items-center';
    }
  }).join(' ') : 'items-center';
  const justify = contentPosition ? [contentPosition.split(' ')[1]].map((horizontalAlign) => {
    switch (horizontalAlign) {
      case 'left':
        return 'justify-start';
      case 'center':
        return 'justify-center';
      case 'right':
        return 'justify-end';
      default:
        return 'justify-center';
    }
  }).join(' ') : 'justify-center';

  // Exclude background-related attributes from blockClasses
  const blockClasses = getBlockClasses(
    wrapperAttributes,
    `wp-block-cover relative overflow-hidden ${!minHeight ? 'min-h-[430px]' : ''}${isDark ? ' is-dark' : ' is-light'}`
  );
  const blockStyleAttr = getBlockStyleAttr({
    ...style,
    minHeight: minHeight || null,
    minHeightUnit: minHeightUnit || 'px',
  });

  const backgroundColor = overlayColor;
  const overlayClasses = getBlockClasses(
    { backgroundColor, dimRatio, gradient, style },
    `wp-block-cover__background absolute top-0 left-0 w-full h-full${!backgroundColor && !customOverlayColor ? ' has-background has-deep-black-background-color ' : ' '}${!dimRatio ? ' opacity-50 ' : ''}`
  );

  const imageClasses = getBlockClasses(
    { id, sizeSlug },
    'wp-block-cover__image-background absolute top-0 left-0 w-full h-auto object-center'
  );

  const innerContainerClasses = getBlockClasses(
    {},
    `wp-block-cover__inner-container relative z-10 w-full flex ${align} ${justify}${!style?.spacing?.padding ? ' p-8' : ''}`
  );

  const image = useFeaturedImage && featuredImage ? (
    <Image
      alt={featuredImage?.node?.altText || 'Cover Image'}
      className={imageClasses}
      src={featuredImage?.node?.sourceUrl || ''}
      style={{
        objectFit: 'cover'
      }}
      width={featuredImage?.node?.mediaDetails?.width || 1600}
      height={featuredImage?.node?.mediaDetails?.height || 900}
    />
  ) : (
    <Image
      alt={alt || 'Cover Image'}
      className={imageClasses}
      src={url || ''}
      style={{
        objectFit: 'cover'
      }}
      width={1600}
      height={900}
    />
  ); 

  return (
    <TagComponent
      {...(anchor && { id: anchor })}
      className={blockClasses}
      {...(style && { style: blockStyleAttr })}
    >
      {url || useFeaturedImage ? image : null}
      <span
        aria-hidden="true"
        className={overlayClasses}
        style={{
          ...(customOverlayColor && { backgroundColor: customOverlayColor }),
          opacity: dimRatio ? dimRatio / 100 : undefined,
        }}
      ></span>
      <div className={innerContainerClasses}>
        {innerBlocks}
      </div>
    </TagComponent>
  );
}