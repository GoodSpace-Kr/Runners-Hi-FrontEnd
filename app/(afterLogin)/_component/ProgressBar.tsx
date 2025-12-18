"use client";

import * as Progress from "@radix-ui/react-progress";
import styles from "./ProgressBar.module.css";

interface ProgressBarProps {
  value: number; // 0 ~ 100
}

export default function ProgressBar({ value }: ProgressBarProps) {
  return (
    <Progress.Root className={styles.progress_root} value={value}>
      <Progress.Indicator className={styles.progress_indicator} style={{ transform: `translateX(-${100 - value}%)` }} />
    </Progress.Root>
  );
}
