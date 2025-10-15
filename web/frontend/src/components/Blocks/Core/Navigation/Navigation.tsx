import { CoreNavigationBlock } from "@/types/coreBlockTypes";
import { getBlockBaseClass, getBlockClasses, getBlockStyleAttr } from "@/utils/blockStyles";
import Link from "next/link";

interface NavigationData {
  id: number;
  title: string;
  blocks: any[];
}

const fetchNavigationData = async (ref: number | undefined): Promise<NavigationData | null> => {
  if (!ref) return null;

  try {
    // Fetch from our Next.js API route which proxies the WordPress REST API
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';
    const response = await fetch(`${baseUrl}/wp-json/template-structure/v1/navigation/${ref}`, {
      next: { revalidate: 3600 }
    });

    console.log(`${baseUrl}/wp-json/template-structure/v1/navigation/${ref}`);

    if (!response.ok) {
      console.error('Navigation fetch failed:', response.status, response.statusText);
      return null;
    }

    const data: NavigationData = await response.json();
    console.log('Navigation data received:', data);
    
    return data;
  } catch (error) {
    console.error('Error fetching navigation:', error);
    return null;
  }
};

const Navigation: React.FC<CoreNavigationBlock> = async ({ name, attributes, innerBlocks }) => {
  const { ref } = attributes || {};

  console.log('Navigation Block Attributes:', attributes);
  console.log('Inner Blocks:', innerBlocks);

  // Get the navigation object from GraphQL if ref is provided
  const navData = await fetchNavigationData(ref as number | undefined);

  console.log('Navigation Data:', navData);
  
  const blockClasses = getBlockClasses(attributes || {}, getBlockBaseClass(name));
  const blockStyleAttr = getBlockStyleAttr(attributes?.style);

  // Fallback if no navigation data
  if (!navData) {
    return (
      <nav className={blockClasses} style={blockStyleAttr}>
        <ul>
          <li>
            <Link href="/">Home (fallback)</Link>
          </li>
        </ul>
      </nav>
    );
  }

  // Render the navigation blocks
  return (
    <nav className={blockClasses} style={blockStyleAttr} aria-label={navData.title}>
      <ul>
        {navData.blocks.map((block, index) => {
          // Each block should be a core/navigation-link
          if (block.name === 'core/navigation-link') {
            const { label, url, kind, type } = block.attributes || {};
            return (
              <li key={index}>
                <Link href={url || '/'}>
                  {label || 'Link'}
                </Link>
              </li>
            );
          }
          return null;
        })}
      </ul>
    </nav>
  );
};

export default Navigation;