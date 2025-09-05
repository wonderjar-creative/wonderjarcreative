import React from 'react';
import dynamic from 'next/dynamic';
import { Maybe, CoreButtonBlockAttributes, CoreButtonsBlockAttributes, CoreColumnBlockAttributes, CoreGroupBlockAttributes, CoreImageBlockAttributes, CoreCoverBlockAttributes, CoreHeadingBlockAttributes, CoreParagraphBlockAttributes, CorePostTitleBlockAttributes, NodeWithFeaturedImageToMediaItemConnectionEdge, CoreColumnsBlockAttributes } from '@/gql/graphql';
import { EnrichedBlock, FrontendBlock } from '@/utils/blockTypes';
import { styleElementsToCSS } from '@/utils/blockStyles';

export const getBlockComponents = async (
  enrichedBlocks: EnrichedBlock[],
  featuredImage?: Maybe<NodeWithFeaturedImageToMediaItemConnectionEdge>,
  stylesCollector?: string[],
): Promise<React.ReactNode[]> => {

  return Promise.all(enrichedBlocks.map(async (block: EnrichedBlock, index: number) => {

    let innerBlocks: Maybe<React.ReactNode[]> = [];
    
    // Handle nested blocks recursively
    if (block.innerBlocks && block.innerBlocks.length > 0) {
      innerBlocks = await getBlockComponents(
        block.innerBlocks,
        featuredImage, 
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
    
    // Now block.parentNode is readily available when needed
    switch (block.name) {      
      case 'core/button': {
        const Button = dynamic(() => import('@/components/Blocks/Core/Button/Button'));
        
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
        const Buttons = dynamic(() => import('@/components/Blocks/Core/Buttons/Buttons'));
        
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
        const Column = dynamic(() => import('@/components/Blocks/Core/Column/Column'));
        
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
        const Columns = dynamic(() => import('@/components/Blocks/Core/Columns/Columns'));
        
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
        const Cover = dynamic(() => import('@/components/Blocks/Core/Cover/Cover'));
        
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
        const Group = dynamic(() => import('@/components/Blocks/Core/Group/Group'));
        
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
        const Heading = dynamic(() => import('@/components/Blocks/Core/Heading/Heading'));
       
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
        const Image = dynamic(() => import('@/components/Blocks/Core/Image/Image'));

        return (
          <Image
            key={index}
            name={block.name}
            attributes={block.attributes as CoreImageBlockAttributes}
            mediaItem={block.mediaItem}
          />
        );
      }
      case 'core/paragraph': {
        const Paragraph = dynamic(() => import('@/components/Blocks/Core/Paragraph/Paragraph'));
        
        return (
          <Paragraph
            key={index}
            name={block.name}
            attributes={block.attributes as CoreParagraphBlockAttributes}
            saveContent={block.saveContent}
          />
        );
      }
      case 'core/post-title': {
        const PostTitle = dynamic(() => import('@/components/Blocks/Core/PostTitle/PostTitle'));
        
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
      default: {
        const Default = dynamic(() => import('@/components/Blocks/Core/Default'));
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
}

const generateRandomId = (length = 8) => {
  return Math.random().toString(36).substring(2, 2 + length);
}