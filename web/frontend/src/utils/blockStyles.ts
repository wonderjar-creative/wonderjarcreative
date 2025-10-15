export const getBlockBaseClass = (blockName: string): string => {
  // Convert block name to base class, e.g., 'core/paragraph' to 'wp-block-paragraph'
  return `wp-block-${blockName.replace('core/', '').replace(/\//g, '-')}`;
}

export const getBlockClasses = (
  attributes: Record<string, any>,
  baseClass: string = ''
): string => {
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
    isStackedOnMobile,
    layout,
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
    backgroundColor ? `bg-${backgroundColor}` : '',
    borderColor ? `border-${borderColor}` : '',
    className || '',
    dimRatio ? `opacity-${dimRatio || '50'}` : '',
    direction ? `text-direction-${direction}` : '',
    dropCap ? 'has-drop-cap' : '',
    fontFamily ? `font-${fontFamily}` : '',
    fontSize ? `text-${fontSize}` : '',
    gradient ? `has-${gradient}` : '',
    id ? `wp-image-${id}` : '',
    isStackedOnMobile ? 'is-stacked-on-mobile' : '',
    layout?.type ? `${layout.type}` : '',
    sizeSlug ? `size-${sizeSlug}` : '',
    textAlign ? `text-${textAlign}` : '',
    textColor ? `text-${textColor}` : '',
    verticalAlignClass,
    layout?.type === 'flex' && verticalAlignClass !== 'items-center' ? 'items-center' : '',
    layout?.type === 'constrained' ? 'has-global-padding' : '',
  ];

  // Handle classes from style object
  if (style) {
    if (style?.color?.background || style?.color?.gradient) {
      classes.push('has-background');
    }
  }

  return classes.filter(Boolean).join(' ');
}

const convertPreset = (value: string): string => {
  // Converts "var:preset|spacing|40" to "var(--spacing--40)"
  if (typeof value === 'string' && value.startsWith('var:preset|')) {
    value = 'var(--' + value.replace(/var:preset\|/g, '').replace(/\|/g, '-') + ')';
  }

  return value;
}

interface StyleProps {
  elements?: Record<string, Record<string, string>>;
  layout?: {
    contentSize?: string;
    [key: string]: any;
  };
  [key: string]: any;
};

export const getBlockStyleAttr = (styleObj: StyleProps): React.CSSProperties => {
  const result: React.CSSProperties = {};

  if (!styleObj || typeof styleObj !== 'object') return result;

  // console.log('styleObj', styleObj);

  // Handle spacing (padding, margin)
  if (styleObj.spacing) {
    const { margin, padding, blockGap } = styleObj.spacing;
    if (margin) {
      if (margin.top) result.marginTop = convertPreset(margin.top);
      if (margin.right) result.marginRight = convertPreset(margin.right);
      if (margin.bottom) result.marginBottom = convertPreset(margin.bottom);
      if (margin.left) result.marginLeft = convertPreset(margin.left);
    }
    if (padding) {
      if (padding.top) result.paddingTop = convertPreset(padding.top);
      if (padding.right) result.paddingRight = convertPreset(padding.right);
      if (padding.bottom) result.paddingBottom = convertPreset(padding.bottom);
      if (padding.left) result.paddingLeft = convertPreset(padding.left);
    }
    if (blockGap) {
      if (typeof blockGap === 'string') {
        result.gap = convertPreset(blockGap);
      } else if (typeof blockGap === 'object') {
        Array.from(Object.entries(blockGap)).forEach(([key, value]: [string, any]) => {
          if ('top' === key) {
            result.rowGap = convertPreset(value);
          } else if ('left' === key) {
            result.columnGap = convertPreset(value);
          }
        });
      }
    }
  }

  // Handle border
  if (styleObj.border) {
    if (styleObj.border.width) result.borderWidth = styleObj.border.width;
    if (styleObj.border.color) result.borderColor = styleObj.border.color;
    if (styleObj.border.radius) {
      const r = styleObj.border?.radius;
      if (typeof r === 'string') {
        result.borderRadius = r;
      } else if (typeof r === 'object') {
        if (r.topLeft) result.borderTopLeftRadius = `${r.topLeft}`;
        if (r.topRight) result.borderTopRightRadius = `${r.topRight}`;
        if (r.bottomRight) result.borderBottomRightRadius = `${r.bottomRight}`;
        if (r.bottomLeft) result.borderBottomLeftRadius = `${r.bottomLeft}`;
      }
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

  // Handle height
  if (styleObj.height) {
    const value = styleObj.height;
    const unit = styleObj.heightUnit || 'px'; // Default to 'px' if no unit is provided
    result.height = `${value}${unit}`;
  }

  // Handle width
  if (styleObj.width) {
    const value = styleObj.width;
    const unit = styleObj.widthUnit || 'px'; // Default to 'px' if no unit is provided
    result.width = `${value}${unit}`;
  }

  // Handle maxWidth
  if (styleObj.maxWidth) {
    const value = styleObj.maxWidth;
    const unit = styleObj.maxWidthUnit || 'px'; // Default to 'px' if no unit is provided
    result.maxWidth = `${value}${unit}`;
  }

  // You can add more mappings as needed for your use case

  return result;
}

export const styleElementsToCSS = (
  blockId: string,
  style: StyleProps,
  layout?: { contentSize?: string }
): string => {
  if (!style.elements && !layout) return '';

  let css = '';
  if (style.elements) {
    Object.entries(style.elements).forEach(([selector, styles]) => {
      let cssSelector = '';
      switch (selector) {
        case 'link':
          cssSelector = 'a';
          break;
        case 'heading':
          cssSelector = ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'].map(tag => {
            if (tag === 'h1') return 'h1';
            return `.wp-block-${blockId} ${tag}`;
          }).join(', ');
          break;
        default:
          cssSelector = selector;
          break;
      }
      css += `.wp-block-${blockId} ${cssSelector} {\n`;
      Object.entries(styles).forEach(([property, value]) => {
        if (typeof value === 'object' && value !== null) {
          // Handle nested objects (e.g., color: { text: ... })
          css += Object.entries(value as Record<string, any>)
            .map(([subProp, subValue]) => {
              const cssPropName =
                property === 'color' && subProp === 'text'
                  ? 'color'
                  : `${property}-${subProp}`.replace(/[A-Z]/g, m => '-' + m.toLowerCase());
              
                // console.log('propname', cssPropName);
                const cssValue =
                typeof subValue === 'string' && subValue.startsWith('var:')
                  ? convertPreset(subValue)
                  : subValue;
              return `  ${cssPropName}: ${cssValue};`;
            })
            .join(' ');
        } else {
          // const cssPropName = property.replace(/[A-Z]/g, m => '-' + m.toLowerCase());
          // console.log('else propname:', cssPropName);
          // const cssValue =
          //   typeof value === 'string' && value.startsWith('var:')
          //     ? convertPreset(value)
          //     : value;
          // css += `${cssPropName}: ${cssValue};`;
        }
      });
      css += '\n}\n';
    });
  }
  if (layout && layout.contentSize) {
    css += `.wp-block-${blockId} > * {\n`;
    css += `  max-width: ${layout.contentSize};\n`;
    css += '\n}\n';
  }

  return css ? `/* Styles for ${blockId} */\n${css}` : '';
};