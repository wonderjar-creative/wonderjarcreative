import Image from 'next/image';
import { Maybe, CoreImageBlockAttributes, CoreImageBlockToMediaItemConnectionEdge } from '@/gql/graphql';
import { getBlockClasses, getBlockStyleAttr, stripOuterTag } from '@/utils/getBlockComponents';

type ImageProps = {
  attributes: CoreImageBlockAttributes;
  mediaItem?: Maybe<CoreImageBlockToMediaItemConnectionEdge> | undefined;
};

const ImageComponent = ({
  attributes,
  mediaItem
}: ImageProps) => {
  const { url, alt, anchor, style, width, height, id, sizeSlug } = attributes;
  const blockClasses = getBlockClasses(attributes, 'wp-block-image');
  const blockStyleAttr = getBlockStyleAttr(style);
  
  // WordPress often provides width/height in attributes
  console.log('Image attributes:', { width, height, id, sizeSlug });
  console.log('Media item:', mediaItem);
  
  // Use provided dimensions or fallback to intrinsic sizing
  const imageWidth = width ? (typeof width === 'string' ? parseInt(width, 10) : width) : undefined;
  const imageHeight = height ? (typeof height === 'string' ? parseInt(height, 10) : height) : undefined;
  
  return (
    <figure
      {...(anchor && { id: anchor })}
      className={blockClasses}
      {...(style && { style: blockStyleAttr })}
    >
      <Image
        src={url || ''}
        alt={alt || ''}
        width={imageWidth || 0} // fallback width
        height={imageHeight || 0} // fallback height
        className="wp-image"
        {...(!imageWidth && !imageHeight && { fill: true })} // Use fill if no dimensions
      />
    </figure>
  );
};

export default ImageComponent;