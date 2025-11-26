import Image from 'next/image';
import { CoreImageBlock } from '@/types/coreBlockTypes';
import { getBlockBaseClass, getBlockClasses, getBlockStyleAttr } from '@/utils/blockStyles';
import { getMediaSize, getSizesAttribute } from '@/utils/mediaSizes';
import { BlastOffImage } from '@/components/Effects';

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

  if (attributes?.className?.includes('__blast-off-effect')) {
    return (
      <figure
        {...(anchor && { id: anchor })}
        className={blockClasses}
        {...(blockStyleAttr && { style: blockStyleAttr })}
      >
        <BlastOffImage
          src={imageSrc}
          alt={alt || ''}
          width={imageWidth || (width as any) || 400}
          height={imageHeight || (height as any) || 400}
          className={imageClasses}
          {...(!imageWidth && !imageHeight && { fill: true })}
        />
      </figure>
    );
  }

  const useFill = !imageWidth && !imageHeight;

  return (
    <figure
      {...(anchor && { id: anchor })}
      className={blockClasses}
      style={{
        ...blockStyleAttr,
        // When using fill, the figure needs position relative and a size
        ...(useFill && { position: 'relative' as const, width: width || '100%', height: height || '400px' })
      }}
    >
      <Image
        src={imageSrc}
        alt={alt || ''}
        {...(useFill ? { fill: true } : { width: imageWidth, height: imageHeight })}
        className={imageClasses}
        style={{
          ...aspectRatio && { aspectRatio: `${aspectRatio}` },
          objectFit: scale === 'contain' ? 'contain' : 'cover',
          // Only apply width/height styles when not using fill
          ...(!useFill && width && { width: `${width}` }),
          ...(!useFill && height && { height: `${height}` })
        }}
      />
    </figure>
  );
};

export default ImageComponent;