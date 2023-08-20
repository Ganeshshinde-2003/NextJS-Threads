"use client"

import Link from "next/link";
import Image from "next/image";
import { sidebarLinks } from "@/constants";
import { usePathname} from "next/navigation";

function Bottombar() {
  const pathName = usePathname();

  return (
    <section className="bottombar">
      <div className="bottombar_container">
          {sidebarLinks.map((link) => {
            const isActive =
              (pathName.includes(link.route) && link.route.length > 1) ||
              pathName === link.route;
  
            return (
              <Link
                href={link.route}
                key={link.label}
                className={`bottombar_link ${isActive && "bg-primary-500 "}`}
              >
                <Image
                  src={link.imgURL}
                  alt={link.label}
                  width={24}
                  height={24}
                />
  
                <p className="text-subtle-medium text-light-1 max-sm:hidden">{link.label.split(/\s+./)[0]}</p>
              </Link>
            );
          })}
      </div>
    </section>
  )
}

export default Bottombar