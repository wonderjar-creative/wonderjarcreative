import React from 'react';
import dynamic from 'next/dynamic';
import {
  Maybe,
  Block,
  ContentNode,
  NodeWithFeaturedImageToMediaItemConnectionEdge
} from '@/gql/graphql';
import parse, { domToReact, DOMNode } from 'html-react-parser';
import Link from 'next/link';
import { json } from 'stream/consumers';

const generateRandomId = (length = 8) => {
  return Math.random().toString(36).substring(2, 2 + length);
}

// Update getBlockComponents signature
export const getBlockComponents = async (
  enrichedBlocks: any[], // Pre-merged blocks with parentNode data
  featuredImage?: Maybe<NodeWithFeaturedImageToMediaItemConnectionEdge>,
  stylesCollector?: string[],
): Promise<React.ReactNode[]> => {

  return Promise.all(enrichedBlocks.map(async (block: any, index: any) => {

    // console.log('block', block);

    let innerBlocks: Maybe<React.ReactNode[]> = [];
    
    // Handle nested blocks recursively
    if (block.innerBlocks && block.innerBlocks.length > 0) {
      innerBlocks = await getBlockComponents(
        block.innerBlocks, // Already merged
        featuredImage, 
        stylesCollector
      );
    }
    
    // Now block.parentNode is readily available when needed
    switch (block.name) {
      case 'core/image': {
        const Image = dynamic(() => import('@/components/Blocks/Core/Image/Image'));
        
        return (
          <Image
            key={index}
            name={block.name}
            attributes={block.attributes}
            mediaItem={block.mediaItem}
          />
        );
      }
      
      case 'core/cover': {
        const Cover = dynamic(() => import('@/components/Blocks/Core/Cover/Cover'));
        
        return (
          <Cover
            key={index}
            name={block.name}
            attributes={block.attributes}
            featuredImage={featuredImage}
            mediaItem={block.mediaItem}
            parentNode={block.parentNode}
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
            attributes={block.attributes}
            innerBlocks={innerBlocks}
            saveContent={block.saveContent}
          />
        );
      }
      case 'core/column': {
        const Column = dynamic(() => import('@/components/Blocks/Core/Column/Column'));
        
        return (
          <Column
            {...block}
            key={index}
            attributes={block.attributes}
            innerBlocks={innerBlocks}
          />
        );
      }
      case 'core/button': {
        const Button = dynamic(() => import('@/components/Blocks/Core/Button/Button'));
        
        return (
          <Button
            {...block}
            key={index}
            attributes={block.attributes}
            dynamicContent={block.dynamicContent}
            saveContent={block.saveContent}
            originalContent={block.originalContent}
          />
        );
      }
      case 'core/buttons': {
        const Buttons = dynamic(() => import('@/components/Blocks/Core/Buttons/Buttons'));
        
        return (
          <Buttons
            {...block}
            key={index}
            attributes={block.attributes}
            innerBlocks={innerBlocks}
          />
        );
      }
      case 'core/heading': {
        const Heading = dynamic(() => import('@/components/Blocks/Core/Heading/Heading'));
       
        return (
          <Heading
            {...block}
            key={index}
            attributes={block.attributes}
          />
        );
      }
      case 'core/paragraph': {
        const Paragraph = dynamic(() => import('@/components/Blocks/Core/Paragraph/Paragraph'));
        const { attributes } = block as CoreParagraphBlock;
        const safeAttributes = (attributes ?? {}) as CoreParagraphBlockAttributes;
        
        return (
          <Paragraph
            {...block}
            key={index}
            attributes={safeAttributes}
          />
        );
      }
      case 'core/post-title': {
        const PostTitle = dynamic(() => import('@/components/Blocks/Core/PostTitle/PostTitle'));
        const { attributes } = block as CorePostTitleBlock;
        const safeAttributes = (attributes ?? {}) as CorePostTitleBlockAttributes;

        return (
          <PostTitle
            {...block}
            key={index}
            attributes={safeAttributes}
          />
        );
      }
      default: {
        const Default = dynamic(() => import('@/components/Blocks/Core/Default'));
        const { attributes } = block as any;

        return (
          <Default
            {...block}
            key={index}
            attributes={attributes}
            innerBlocks={innerBlocks}
          />
        );
      }
    }
  }));
}