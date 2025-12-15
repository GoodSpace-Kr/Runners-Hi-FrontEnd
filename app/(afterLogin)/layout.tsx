import { ReactNode } from "react";
import styles from "@/app/(afterLogin)/_component/main.module.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Runners's Hi",
  description: "안녕하세요, 러너스하이입니다",
};

export default function AfterLoginLayout({ children }: { children: ReactNode }) {
  return <div className={styles.container}>{children}</div>;
}
