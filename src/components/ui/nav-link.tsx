import Link from "next/link";
import { AnchorHTMLAttributes } from "react";

interface NavLinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
    href: string;
    children: React.ReactNode;
  }

const NavLink: React.FC<NavLinkProps> = ({ children, href, ...props }) => (
    <Link href={href} {...props} className={`py-2.5 px-4 text-center rounded-full duration-150 ${props?.className || ""}`}>
        {children}
    </Link>
)

export default NavLink