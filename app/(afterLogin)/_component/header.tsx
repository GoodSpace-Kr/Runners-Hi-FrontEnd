"use client";

import Image from "next/image";
import styles from "./header.module.css";
import { useRouter } from "next/navigation";
import { IoPersonSharp } from "react-icons/io5";
import NProgress from "nprogress";

export default function Header() {
  const router = useRouter();

  const handleProfileClick = () => {
    NProgress.start();
    router.push("/myprofilePage");
  };

  return (
    <div className={styles.header}>
      <div className={styles.logo}>
        <Image src="/RunnersHiLogo.png" alt="RunnersHi logo" fill priority style={{ objectFit: "contain" }} />
      </div>

      <div className={styles.profile}>
        <IoPersonSharp className={styles.profile_logo} onClick={handleProfileClick} />
      </div>
    </div>
  );
}
