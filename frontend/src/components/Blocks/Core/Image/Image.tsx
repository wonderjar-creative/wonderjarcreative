import Image from 'next/image';
import { CoreImageBlockAttributes } from '@/gql/graphql';
import { getBlockClasses, getBlockStyleAttr } from '@/utils/blockStyles';
import { getMediaSize, getSizesAttribute } from '@/utils/blockMedia';
import { stripOuterTag } from '@/utils/htmlTransformations';

interface ImageProps {
  attributes: CoreImageBlockAttributes;
  name: string;
  mediaItem?: {
    node?: {
      sourceUrl?: string;
      altText?: string;
      mediaDetails?: {
        width?: number;
        height?: number;
        sizes?: Record<string, { 
          sourceUrl: string;
          width: number;
          height: number;
        }>;
      }
    }
  };
};

const ImageComponent: React.FC<ImageProps> = ({ attributes, name, mediaItem }) => {
  const { url, alt, anchor, aspectRatio, style, width, height, id, scale, sizeSlug } = attributes;
  const { sizes } = mediaItem?.node?.mediaDetails || {};

  const blockClasses = getBlockClasses(attributes, 'wp-block-image');
  const blockStyleAttr = getBlockStyleAttr(style);
  const imageClasses = `wp-block-image__img${id ? ` wp-image-${id}` : ''}`;

  const sizeObj = getMediaSize(sizeSlug, sizes);
  const imageSrc = sizeObj?.sourceUrl || url || mediaItem?.node?.sourceUrl || '';
  const imageWidth = sizeObj?.width || mediaItem?.node?.mediaDetails?.width || 0;
  const imageHeight = sizeObj?.height || mediaItem?.node?.mediaDetails?.height || 0;

  return (
    <figure
      {...(anchor && { id: anchor })}
      className={blockClasses}
      {...(blockStyleAttr && { style: blockStyleAttr })}
    >
      <Image
        src={imageSrc}
        alt={alt || ''}
        width={imageWidth}
        height={imageHeight}
        className={imageClasses}
        // sizes={getSizesAttribute()} // Dynamic sizes
        {...(!imageWidth && !imageHeight && { fill: true })}
        style={{
          ...aspectRatio && { aspectRatio: `${aspectRatio}` },
          objectFit: scale === 'contain' ? 'contain' : 'cover',
          ...width && { width: `${width}` },
          ...height && { height: `${height}` }
        }}
      />
    </figure>
  );
};

export default ImageComponent;