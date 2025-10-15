import { CoreNavigationLinkBlock } from "@/types/coreBlockTypes";
import { getBlockBaseClass } from "@/utils/blockStyles";
import Link from "next/link";

const NavigationLink: React.FC<CoreNavigationLinkBlock> = ({ name, attributes }) => {
  const { label, type, id, url, kind, isTopLevelLink } = attributes || {};
  const blockClasses = getBlockBaseClass(name);

  return (
    <li className={blockClasses}>
      <Link href={url || "#"}>{label || "Link"}</Link>
    </li>
  );
};

export default NavigationLink;
