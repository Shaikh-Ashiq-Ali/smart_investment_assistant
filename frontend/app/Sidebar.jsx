import React from 'react';
import sidebar from "./page.module.css";
import {
  ListGroup,
  ListGroupItem,
} from "react-bootstrap";
import Link from "next/link";
import { usePathname } from 'next/navigation';

const NavLinks = [
  { name: "Dashboard", href: "/dashboard" },
  { name: "Predict Trend", href: "/predict_trend" },
  { name: "Summary Generator", href: "/summary" },
];

export default function Sidebar() {
  const pathname = usePathname();
  return (
    <div className={sidebar.sidebar}>
      <ListGroup variant="flush">
        {NavLinks.map((links) => {
          const isActive = pathname === links.href || (pathname.startsWith(links.href)) && links.href !== "/";
          return (
            <ListGroupItem className={isActive ? "bg-white border-top" : "border-white"} key={links.name}>
              <Link href={links.href} className="d-block py-2">
                {links.name}
              </Link>
            </ListGroupItem>
          )
        })}
      </ListGroup>
    </div>
  )
}
