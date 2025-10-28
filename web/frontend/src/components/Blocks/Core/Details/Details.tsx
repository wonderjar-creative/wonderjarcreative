"use client";

import { CoreDetailsBlock } from "@/types/coreBlockTypes";
import { useState } from "react";
import { getBlockBaseClass, getBlockClasses, getBlockStyleAttr } from "@/utils/blockStyles";
import styles from "./Details.module.css";

const Details: React.FC<CoreDetailsBlock> = ({ name, attributes, innerBlocks, saveContent }) => {
  const { anchor, showContent, style } = attributes || {};
  const [isOpen, setIsOpen] = useState(showContent || false);

  const blockClasses = getBlockClasses(attributes || {}, getBlockBaseClass(name)) +
    ' transition-all duration-300 ease-in-out';
  const blockStyleAttr = getBlockStyleAttr(style);

  const toggleDetails = () => {
    setIsOpen(!isOpen);
  };

  // Extract summary content from saveContent HTML
  const getSummaryContent = () => {
    if (!saveContent) return 'Details';

    // Match content between <summary> tags
    const summaryMatch = saveContent.match(/<summary>(.*?)<\/summary>/);
    if (summaryMatch && summaryMatch[1]) {
      return summaryMatch[1].trim();
    }
    
    return 'Details';
  };

  const summaryHtml = getSummaryContent();
  const summaryClasses = [styles.summary, 'cursor-pointer'].join(' ');

  return (
    <details
      {...(anchor ? { id: anchor } : {})}
      className={blockClasses}
      style={blockStyleAttr}
      open={isOpen}
      onToggle={toggleDetails}
    >
      <summary 
        className={summaryClasses}
        dangerouslySetInnerHTML={{ __html: summaryHtml }} />
      {innerBlocks}
    </details>
  );
};

export default Details;
