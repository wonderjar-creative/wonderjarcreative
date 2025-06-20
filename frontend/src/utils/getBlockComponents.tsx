import React from 'react';
import dynamic from 'next/dynamic';
import {
  Maybe,
  Block,
  CoreColumnsBlock,
  CoreColumnsBlockAttributes,
  CoreColumnBlock,
  CoreColumnBlockAttributes,
  CoreCoverBlock,
  CoreCoverBlockAttributes,
  CoreGroupBlock,
  CoreGroupBlockAttributes,
  CoreHeadingBlock,
  CoreHeadingBlockAttributes,
  CoreParagraphBlock,
  CoreParagraphBlockAttributes,
  NodeWithFeaturedImageToMediaItemConnectionEdge
} from '@/gql/graphql';
import { randomInt } from 'crypto';
import { console } from 'inspector';

const getParsedBlocks = (blocksJSON: string) => {
  try {
    return JSON.parse(blocksJSON);
  } catch (error) {
    console.error("Error parsing blocksJSON:", error);
    return [];
  }
};

const generateRandomId = (length = 8) => {
  return Math.random().toString(36).substring(2, 2 + length);
}

const convertPreset = (value: string) => {
  // Converts "var:preset|spacing|40" to "var(--spacing--40)"
  if (typeof value === 'string' && value.startsWith('var:preset|')) {
    return 'var(--' + value.replace(/var:preset\|/g, '').replace(/\|/g, '-') + ')';
  }
  return value;
}

/**
 * Asynchronously retrieves and renders block components based on the provided blocks JSON.
 * @param blocksJSON JSON string representing the blocks to render
 * @param featuredImage Optional featured image data for blocks that require it
 * @param stylesCollector Optional array to collect styles for the blocks
 * @returns Promise resolving to an array of React nodes representing the rendered blocks
 */
export async function getBlockComponents(
  blocksJSON: string,
  featuredImage?: NodeWithFeaturedImageToMediaItemConnectionEdge | null,
  stylesCollector?: string[]
): Promise<React.ReactNode[]> {
  const parsedBlocks = getParsedBlocks(blocksJSON);

  return Promise.all(parsedBlocks.map(async (block: Block, index: number) => {
    // console.log('block', block);
    
    // Recursively process innerBlocks if present
    let innerBlocks: Maybe<React.ReactNode[]> = [];
    if (block.innerBlocks && block.innerBlocks.length > 0) {
      // Recursively render innerBlocks as React nodes
      innerBlocks = (await getBlockComponents(JSON.stringify(block.innerBlocks), featuredImage, stylesCollector)).map((innerBlock, innerIndex) => (
        <React.Fragment key={innerIndex}>
          {React.isValidElement(innerBlock) ? innerBlock : null}
        </React.Fragment>
      ));
    }

    // Collect styles if provided
    const blockAttributes = (block as any).attributes;
    // console.log('blockAttributes', blockAttributes);
    const blockId = stylesCollector && blockAttributes?.style?.elements
      ? (() => {
        const id = generateRandomId();
        stylesCollector.push(styleElementsToCSS(blockAttributes.style.elements, id));
        blockAttributes.className = blockAttributes.className ? `${blockAttributes.className} wp-block-${id}` : `wp-block-${id}`;
        return id;
      })()
      : null;

    // Dynamically import the block component based on its name
    switch (block.name) {
      case 'core/cover': {
        const Cover = dynamic(() => import('@/components/Blocks/Core/Cover/Cover'));
        const { attributes } = block as CoreCoverBlock;
        const safeAttributes = (attributes ?? {}) as CoreCoverBlockAttributes
      
        return (
          <Cover
            {...block}
            attributes={safeAttributes}
            innerBlocks={innerBlocks}
            featuredImage={featuredImage}
          />
        )
      }
      case 'core/group': {
        const Group = dynamic(() => import('@/components/Blocks/Core/Group/Group'));
        const { attributes } = block as CoreGroupBlock;
        const safeAttributes = (attributes ?? {}) as CoreGroupBlockAttributes;

        return (
          <Group
            {...block}
            attributes={safeAttributes}
            innerBlocks={innerBlocks}
          />
        );
      }
      case 'core/columns': {
        const Columns = dynamic(() => import('@/components/Blocks/Core/Columns/Columns'));
        const { attributes } = block as CoreColumnsBlock;
        const safeAttributes = (attributes ?? {}) as CoreColumnsBlockAttributes;

        return (
          <Columns
            {...block}
            attributes={safeAttributes}
            innerBlocks={innerBlocks}
          />
        );
      }
      case 'core/column': {
        const Column = dynamic(() => import('@/components/Blocks/Core/Column/Column'));
        const { attributes } = block as CoreColumnBlock;
        const safeAttributes = (attributes ?? {}) as CoreColumnBlockAttributes;

        return (
          <Column
            {...block}
            attributes={safeAttributes}
            innerBlocks={innerBlocks}
          />
        );
      }
      case 'core/heading': {
        const Heading = dynamic(() => import('@/components/Blocks/Core/Heading/Heading'));
        const { attributes } = block as CoreHeadingBlock;
        const safeAttributes = (attributes ?? {}) as CoreHeadingBlockAttributes;

        return (
          <Heading
            {...block}
            attributes={safeAttributes}
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
            attributes={attributes}
            innerBlocks={innerBlocks}
          />
        );
      }
    }
  }));
}


type BlockAttributes = Record<string, any>;
/**
 * Gets CSS classes for a block based on its attributes.
 * @param attributes Block attributes object
 * @param baseClass Base CSS class to prepend to the block classes
 * @returns CSS class string for the block
 */
export function getBlockClasses(attributes: BlockAttributes, baseClass: string = ''): string {
  const {
    align,
    backgroundColor,
    borderColor,
    className,
    dimRatio,
    direction,
    dropCap,
    fontFamily,
    fontSize,
    gradient,
    id,
    level,
    tagName,
    textAlign,
    textColor,
    sizeSlug,
    style,
    verticalAlignment,
    // add more as needed
  } = attributes;

  // Determine vertical alignment class based on block type
  let verticalAlignClass = '';
  if (verticalAlignment) {
    if (baseClass?.includes('wp-block-columns')) {
      // For columns block
      verticalAlignClass = `items-${verticalAlignment}`;
    } else if (baseClass?.includes('wp-block-column')) {
      // For column block
      verticalAlignClass = `self-${verticalAlignment}`;
    } else {
      // Fallback for other blocks
      verticalAlignClass = `self-${verticalAlignment}`;
    }
  }

  const classes = [
    baseClass,
    align ? `align${align}` : '',
    backgroundColor ? `has-background has-${backgroundColor}-background-color` : '',
    borderColor ? `has-border-color has-${borderColor}-border-color` : '',
    className || '',
    dimRatio ? `opacity-${dimRatio || '50'}` : '',
    direction ? `has-text-direction-${direction}` : '',
    dropCap ? 'has-drop-cap' : '',
    fontFamily ? `has-${fontFamily}` : '',
    fontSize ? `has-${fontSize}-font-size` : '',
    gradient ? `has-${gradient}` : '',
    id ? `wp-image-${id}` : '',
    sizeSlug ? `size-${sizeSlug}` : '',
    textColor ? `has-text-color has-text-color-${textColor}` : '',
    verticalAlignClass,
  ];

  // Handle classes from style object
  if (style) {
    if (style?.color?.background || style?.color?.gradient) {
      classes.push('has-background');
    }
  }

  return classes.filter(Boolean).join(' ');
}

/**
 * Gets CSS styles from a block's style attributes.
 * @param styleObj The style object from a block's attributes
 * @returns React.CSSProperties object with CSS styles
 */
export function getBlockStyleAttr(styleObj: any): React.CSSProperties {
  const result: React.CSSProperties = {};

  if (!styleObj || typeof styleObj !== 'object') return result;

  // Handle spacing (padding, margin)
  if (styleObj.spacing) {
    const { padding, margin } = styleObj.spacing;
    if (padding) {
      if (padding.top) result.paddingTop = convertPreset(padding.top);
      if (padding.right) result.paddingRight = convertPreset(padding.right);
      if (padding.bottom) result.paddingBottom = convertPreset(padding.bottom);
      if (padding.left) result.paddingLeft = convertPreset(padding.left);
    }
    if (margin) {
      if (margin.top) result.marginTop = convertPreset(margin.top);
      if (margin.right) result.marginRight = convertPreset(margin.right);
      if (margin.bottom) result.marginBottom = convertPreset(margin.bottom);
      if (margin.left) result.marginLeft = convertPreset(margin.left);
    }
  }

  // Handle border
  if (styleObj.border) {
    if (styleObj.border.width) result.borderWidth = styleObj.border.width;
    if (styleObj.border.color) result.borderColor = styleObj.border.color;
    if (styleObj.border.radius) {
      const r = styleObj.border.radius;
      if (r.topLeft) result.borderTopLeftRadius = r.topLeft;
      if (r.topRight) result.borderTopRightRadius = r.topRight;
      if (r.bottomLeft) result.borderBottomLeftRadius = r.bottomLeft;
      if (r.bottomRight) result.borderBottomRightRadius = r.bottomRight;
    }
  }

  // Handle color
  if (styleObj.color) {
    if (styleObj.color.background) result.background = styleObj.color.background;
    if (styleObj.color.gradient) result.background = styleObj.color.gradient;
    if (styleObj.color.text) result.color = styleObj.color.text;
  }

  // Handle typography
  if (styleObj.typography) {
    const t = styleObj.typography;
    if (t.fontStyle) result.fontStyle = t.fontStyle;
    if (t.fontWeight) result.fontWeight = t.fontWeight;
    if (t.lineHeight) result.lineHeight = t.lineHeight;
    if (t.letterSpacing) result.letterSpacing = t.letterSpacing;
    if (t.textDecoration) result.textDecoration = t.textDecoration;
    if (t.writingMode) result.writingMode = t.writingMode;
    if (t.textTransform) result.textTransform = t.textTransform;
  }

  // Handle minHeight
  if (styleObj.minHeight) {
    const value = styleObj.minHeight;
    const unit = styleObj.minHeightUnit || 'px'; // Default to 'px' if no unit is provided
    result.minHeight = `${value}${unit}`;
  }

  // You can add more mappings as needed for your use case

  return result;
}

/**
 * Converts style elements from a block's attributes to a CSS string.
 * @param elements The style elements object from a block's attributes
 * @param blockId The unique identifier for the block, used to scope the CSS
 * @returns CSS string for the <style> tag
 */
export const styleElementsToCSS = (elements: any, blockId: string): string => {
  if (!elements || typeof elements !== 'object') return '';

  const css = Object.entries(elements).reduce((acc, [selector, properties]) => {
    // Build CSS property string
    const cssProps = Object.entries(properties as Record<string, any>)
      .map(([prop, value]) => {
        if (typeof value === 'object' && value !== null) {
          // Handle nested objects (e.g., color: { text: ... })
          return Object.entries(value as Record<string, any>)
            .map(([subProp, subValue]) => {
              const cssPropName =
                prop === 'color' && subProp === 'text'
                  ? 'color'
                  : `${prop}-${subProp}`.replace(/[A-Z]/g, m => '-' + m.toLowerCase());
              
                console.log('propname', cssPropName);
                const cssValue =
                typeof subValue === 'string' && subValue.startsWith('var:')
                  ? convertPreset(subValue)
                  : subValue;
              return `${cssPropName}: ${cssValue};`;
            })
            .join(' ');
        } else {
          const cssPropName = prop.replace(/[A-Z]/g, m => '-' + m.toLowerCase());
          console.log('else propname:', cssPropName);
          const cssValue =
            typeof value === 'string' && value.startsWith('var:')
              ? convertPreset(value)
              : value;
          return `${cssPropName}: ${cssValue};`;
        }
      })
      .join(' ');

    // Special case: "link" selector should be "a"
    let cssSelector = '';
    switch (selector) {
      case 'link':
        cssSelector = 'a';
        break;
      case 'heading':
        cssSelector = '.wp-block-heading';
        break;
      default:
        cssSelector = selector;
        break;
    }
    return acc + `.wp-block-${blockId} ${cssSelector} { ${cssProps} }\n`;
  }, '');

  return css ? `/* Styles for ${blockId} */\n${css}` : '';
};