"use client";

import styles from "./footer.module.css";
import { IoClipboardOutline, IoChatbubbleOutline } from "react-icons/io5";
import { HiOutlineHome } from "react-icons/hi2";
import { PiRankingThin } from "react-icons/pi";
import Link from "next/link";
import NProgress from "nprogress";
import { usePathname } from "next/navigation";

export default function Footer() {
  const pathname = usePathname();

  const handleClick = () => {
    NProgress.start();
  };

  const isActive = (href: string) => {
    return pathname === href || pathname.startsWith(href);
  };

  const footerItems = [
    { href: "/homePage", icon: HiOutlineHome, label: "홈" },
    { href: "/crewRecordPage", icon: IoClipboardOutline, label: "크루 기록" },
    { href: "/communityPage", icon: IoChatbubbleOutline, label: "커뮤니티" },
    { href: "/rankingPage", icon: PiRankingThin, label: "랭킹" },
  ];

  return (
    <div className={styles.footer}>
      <div className={styles.footer_button_section}>
        {footerItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            onClick={handleClick}
            className={`${styles.footer_button_item} ${isActive(item.href) ? styles.active : ""}`}
          >
            <item.icon className={styles.footer_button_item_logo} />
            {item.label}
          </Link>
        ))}
      </div>
    </div>
  );
}
