import {
  Maybe,
  Block,
  Page,
  CoreButtonBlockAttributes,
  CoreButtonsBlockAttributes,
  CoreColumnBlockAttributes,
  CoreColumnsBlockAttributes,
  CoreCoverBlockAttributes,
  CoreGroupBlockAttributes,
  CoreHeadingBlockAttributes,
  CoreImageBlockAttributes,
  CoreNavigationBlockAttributes,
  CoreNavigationLinkBlockAttributes,
  CoreParagraphBlockAttributes,
  CorePostTitleBlockAttributes,
  CoreSiteTitleBlockAttributes,
  CorePostContentBlockAttributes,
  CoreTemplatePartBlockAttributes,
  NodeWithFeaturedImageToMediaItemConnectionEdge,
  CorePatternBlockAttributes,
  CoreSiteLogoBlockAttributes
} from '@/gql/graphql';
import React from 'react';

export interface MediaItem {
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
}

export interface EnrichedBlock extends Block {
  attributes?: Record<string, any>;
  mediaItem?: MediaItem;
}

export type FrontendBlock = {
  name: string;
  attributes?: Record<string, any>;
  dynamicContent?: Maybe<string>;
  saveContent?: Maybe<string>;
  isDynamic?: boolean;
  innerBlocks?: React.ReactNode;
  mediaItem?: MediaItem;
  [key: string]: any; // For extra flexibility
}

export interface CoreButtonBlock extends FrontendBlock {
  attributes?: CoreButtonBlockAttributes;
}

export interface CoreButtonsBlock extends FrontendBlock {
  attributes?: CoreButtonsBlockAttributes;
}

export interface CoreColumnBlock extends FrontendBlock {
  attributes?: CoreColumnBlockAttributes;
}

export interface CoreColumnsBlock extends FrontendBlock {
  attributes?: CoreColumnsBlockAttributes;
}

export interface CoreCoverBlock extends FrontendBlock {
  attributes?: CoreCoverBlockAttributes;
  featuredImage?: Maybe<NodeWithFeaturedImageToMediaItemConnectionEdge>;
}

export interface CoreGroupBlock extends FrontendBlock {
  attributes?: CoreGroupBlockAttributes;
}

export interface CoreHeadingBlock extends FrontendBlock {
  attributes?: CoreHeadingBlockAttributes;
}

export interface CoreImageBlock extends FrontendBlock {
  attributes?: CoreImageBlockAttributes;
}

export interface CoreNavigationBlock extends FrontendBlock {
  attributes?: CoreNavigationBlockAttributes;
}

export interface CoreNavigationLinkBlock extends FrontendBlock {
  attributes?: CoreNavigationLinkBlockAttributes;
}

export interface CoreParagraphBlock extends FrontendBlock {
  attributes?: CoreParagraphBlockAttributes;
}

export interface CorePatternBlock extends FrontendBlock {
  attributes?: CorePatternBlockAttributes;
  page: Maybe<Page>;
}

export interface CorePostContentBlock extends FrontendBlock {
  attributes?: CorePostContentBlockAttributes;
  page: Maybe<Page>;
}

export interface CorePostTitleBlock extends FrontendBlock {
  attributes?: CorePostTitleBlockAttributes;
};

export interface CoreSiteTitleBlock extends FrontendBlock {
  attributes?: CoreSiteTitleBlockAttributes;
}

export interface CoreSiteLogoBlock extends FrontendBlock {
  attributes?: CoreSiteLogoBlockAttributes;
}

export interface CoreTemplatePartBlock extends FrontendBlock {
  attributes?: CoreTemplatePartBlockAttributes;
}