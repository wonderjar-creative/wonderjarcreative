import Image from 'next/image';
import { CoreSiteLogoBlock } from '@/types/coreBlockTypes';
import { getBlockBaseClass, getBlockClasses, getBlockStyleAttr } from '@/utils/blockStyles';
import { getMediaSize, getSizesAttribute } from '@/utils/mediaSizes';

const SiteLogo: React.FC<CoreSiteLogoBlock> = ({
  attributes,
  isDynamic,
  dynamicContent,
  saveContent,
  mediaItem
}) => {
  console.log('SiteLogo attributes:', attributes);
  console.log('SiteLogo mediaItem', mediaItem );
  console.log('isDynamic:', isDynamic);
  return (
    <p>Image here</p>
    // <Image
    //   src={attributes?.metadata?.url}
    //   alt={attributes?.alt}
    //   className={getBlockClasses(attributes)}
    //   style={getBlockStyleAttr(attributes)}
    //   sizes={getSizesAttribute(attributes)}
    //   layout="responsive"
    //   width={getMediaSize(attributes, 'width')}
    //   height={getMediaSize(attributes, 'height')}
    // />
  );
}

export default SiteLogo;