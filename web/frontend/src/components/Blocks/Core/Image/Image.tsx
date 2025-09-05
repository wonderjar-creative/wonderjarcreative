import Image from 'next/image';
import { CoreImageBlockAttributes } from '@/gql/graphql';
import { CoreImageBlock } from '@/utils/blockTypes';
import { getBlockBaseClass, getBlockClasses, getBlockStyleAttr } from '@/utils/blockStyles';
import { getMediaSize, getSizesAttribute } from '@/utils/blockMedia';
import { stripOuterTag } from '@/utils/htmlTransformations';

const ImageComponent: React.FC<CoreImageBlock> = ({ name, attributes, mediaItem }) => {
  const { url, align, alt, anchor, aspectRatio, style, width, height, scale, sizeSlug, ...imageAttributes } = attributes || {};
  const { sizes } = mediaItem?.node?.mediaDetails || {};

  const blockClasses = getBlockClasses(attributes || {}, `${getBlockBaseClass(name)} ${width || height ? 'is-resized' : '' }`);
  const blockStyleAttr = getBlockStyleAttr(style);
  const imageClasses = getBlockClasses(imageAttributes, `wp-image ${align === 'center' ? 'mx-auto' : ''}`);

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
        // sizes={} // Dynamic sizes
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