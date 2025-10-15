import React from 'react';
import dynamic from 'next/dynamic';
import {
  Maybe,
  CoreButtonBlockAttributes,
  CoreButtonsBlockAttributes,
  CoreColumnBlockAttributes,
  CoreGroupBlockAttributes,
  CoreImageBlockAttributes,
  CoreCoverBlockAttributes,
  CoreHeadingBlockAttributes,
  CoreNavigationBlockAttributes,
  CoreNavigationLinkBlockAttributes,
  CoreParagraphBlockAttributes,
  CorePostTitleBlockAttributes,
  CoreSiteTitleBlockAttributes,
  CoreSiteLogoBlockAttributes,
  CoreColumnsBlockAttributes,
  Page,
  NodeWithFeaturedImageToMediaItemConnectionEdge
} from '@/gql/graphql';
import renderTemplatePart from './renderTemplatePart';
import renderPattern from './renderPattern';
import { enrichBlocksWithMedia } from '@/utils/blockMedia';
import { EnrichedBlock } from '@/types/coreBlockTypes';
import { styleElementsToCSS } from '@/utils/blockStyles';

const generateRandomId = (length = 8) => {
  return Math.random().toString(36).substring(2, 2 + length);
}

const getBlockComponents = async (
  enrichedBlocks: EnrichedBlock[],
  page: Maybe<Page>,
  stylesCollector?: string[],
): Promise<React.ReactNode[]> => {
  if (!enrichedBlocks || enrichedBlocks.length === 0) {
    console.log('No blocks to render.');
    return [];
  }

  const featuredImage: Maybe<NodeWithFeaturedImageToMediaItemConnectionEdge> = page?.featuredImage || null;

  return Promise.all(enrichedBlocks.map(async (block: EnrichedBlock, index: number) => {
    
    // Handle template parts - resolve to actual blocks
    if (block.name === 'core/template-part' && block.attributes?.slug) {
      return await renderTemplatePart(block.attributes.slug, page, stylesCollector, index);
    }

    // Handle patterns - resolve to actual blocks  
    if (block.name === 'core/pattern' && block.attributes?.slug) {
      return await renderPattern(block.attributes.slug, page, stylesCollector, index);
    }

    let innerBlocks: Maybe<React.ReactNode[]> = [];
    
    // Handle nested blocks recursively
    if (block.innerBlocks && block.innerBlocks.length > 0) {
      innerBlocks = await getBlockComponents(
        await enrichBlocksWithMedia(block.innerBlocks as EnrichedBlock[]),
        page,
        stylesCollector
      );
    }

    // Collect block styles if provided
    const blockAttributes = block.attributes;
    const blockId = stylesCollector && blockAttributes?.style?.elements
      ? (() => {
        const id = generateRandomId();
        stylesCollector.push(styleElementsToCSS(id, blockAttributes.style, blockAttributes.layout));
        blockAttributes.className = blockAttributes.className ? `${blockAttributes.className} wp-block-${id}` : `wp-block-${id}`;
        return id;
      })()
      : null;

    switch (block.name) {      
      case 'core/button': {
        const Button = dynamic(() => import('@/components/Blocks/Core/Button/Button'), { ssr: true });

        return (
          <Button
            key={index}
            name={block.name}
            attributes={block.attributes as CoreButtonBlockAttributes}
            saveContent={block.saveContent}
          />
        );
      }
      case 'core/buttons': {
        const Buttons = dynamic(() => import('@/components/Blocks/Core/Buttons/Buttons'), { ssr: true });

        return (
          <Buttons
            key={index}
            name={block.name}
            attributes={block.attributes as CoreButtonsBlockAttributes}
            innerBlocks={innerBlocks}
          />
        );
      }
      case 'core/column': {
        const Column = dynamic(() => import('@/components/Blocks/Core/Column/Column'), { ssr: true });

        return (
          <Column
            key={index}
            name={block.name}
            attributes={block.attributes as CoreColumnBlockAttributes}
            innerBlocks={innerBlocks}
          />
        );
      }
      case 'core/columns': {
        const Columns = dynamic(() => import('@/components/Blocks/Core/Columns/Columns'), { ssr: true });

        return (
          <Columns
            key={index}
            name={block.name}
            attributes={block.attributes as CoreColumnsBlockAttributes}
            innerBlocks={innerBlocks}
          />
        );
      }
      case 'core/cover': {
        const Cover = dynamic(() => import('@/components/Blocks/Core/Cover/Cover'), { ssr: true });

        return (
          <Cover
            key={index}
            name={block.name}
            attributes={block.attributes as CoreCoverBlockAttributes}
            featuredImage={featuredImage}
            mediaItem={block.mediaItem}
            innerBlocks={innerBlocks}
          />
        );
      }
      case 'core/group': {
        const Group = dynamic(() => import('@/components/Blocks/Core/Group/Group'), { ssr: true });

        return (
          <Group
            key={index}
            name={block.name}
            attributes={block.attributes as CoreGroupBlockAttributes}
            mediaItem={block.mediaItem}
            innerBlocks={innerBlocks}
          />
        );
      }
      case 'core/heading': {
        const Heading = dynamic(() => import('@/components/Blocks/Core/Heading/Heading'), { ssr: true });

        return (
          <Heading
            key={index}
            name={block.name}
            attributes={block.attributes as CoreHeadingBlockAttributes}
            saveContent={block.saveContent}
          />
        );
      }
      case 'core/image': {
        const Image = dynamic(() => import('@/components/Blocks/Core/Image/Image'), { ssr: true });

        return (
          <Image
            key={index}
            name={block.name}
            attributes={block.attributes as CoreImageBlockAttributes}
            mediaItem={block.mediaItem}
          />
        );
      }
      case 'core/navigation': {
        const Navigation = dynamic(() => import('@/components/Blocks/Core/Navigation/Navigation'), { ssr: true });

        return (
          <Navigation
            key={index}
            name={block.name}
            attributes={block.attributes as CoreNavigationBlockAttributes}
            saveContent={block.saveContent}
          />
        );
      }
      case 'core/navigation-link': {
        const NavigationLink = dynamic(() => import('@/components/Blocks/Core/NavigationLink/NavigationLink'), { ssr: true });

        return (
          <NavigationLink
            key={index}
            name={block.name}
            attributes={block.attributes as CoreNavigationLinkBlockAttributes}
            saveContent={block.saveContent}
          />
        );
      }
      case 'core/paragraph': {
        const Paragraph = dynamic(() => import('@/components/Blocks/Core/Paragraph/Paragraph'), { ssr: true });

        return (
          <Paragraph
            key={index}
            name={block.name}
            attributes={block.attributes as CoreParagraphBlockAttributes}
            saveContent={block.saveContent}
          />
        );
      }
      case 'core/post-content': {
        const PostContent = dynamic(() => import('@/components/Blocks/Core/PostContent/PostContent'), { ssr: true });

        return (
          <PostContent
            key={index}
            name={block.name}
            attributes={block.attributes}
            page={page ?? null}
          />
        );
      }
      case 'core/post-title': {
        const PostTitle = dynamic(() => import('@/components/Blocks/Core/PostTitle/PostTitle'), { ssr: true });

        return (
          <PostTitle
            key={index}
            name={block.name}
            attributes={block.attributes as CorePostTitleBlockAttributes}
            isDynamic={block.isDynamic}
            dynamicContent={block.dynamicContent}
            saveContent={block.saveContent}
          />
        );
      }
      case 'core/site-title': {
        const SiteTitle = dynamic(() => import('@/components/Blocks/Core/SiteTitle/SiteTitle'), { ssr: true });
        
        return (
          <SiteTitle
            key={index}
            name={block.name}
            attributes={block.attributes as CoreSiteTitleBlockAttributes}
            isDynamic={block.isDynamic}
            dynamicContent={block.dynamicContent}
            saveContent={block.saveContent}
          />
        );
      }
      case 'core/site-logo': {
        const SiteLogo = dynamic(() => import('@/components/Blocks/Core/SiteLogo/SiteLogo'), { ssr: true });

        return (
          <SiteLogo
            key={index}
            name={block.name}
            attributes={block.attributes as CoreSiteLogoBlockAttributes}
            isDynamic={block.isDynamic}
            dynamicContent={block.dynamicContent}
            saveContent={block.saveContent}
            mediaItem={block.mediaItem}
          />
        );
      }
      default: {
        const Default = dynamic(() => import('@/components/Blocks/Core/Default'), { ssr: true });
        const { attributes } = block as any;

        return (
          <Default
            key={index}
            name={block.name}
            attributes={attributes}
            dynamicContent={block.dynamicContent}
            saveContent={block.saveContent}
            innerBlocks={innerBlocks}
          />
        );
      }
    }
  }));
};

export default getBlockComponents;