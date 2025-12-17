import { useState } from "react";
import styles from "./recordDetailSheet.module.css";

export interface RunRecord {
  date: string;
  place: string;
  distance: string;
  time: string;
  pace: string;
}

export interface RecordSection {
  id: number;
  title: string;
  detail: RunRecord[];
}

interface RecordDetailSheetProps {
  record: RecordSection;
  onClose: () => void;
}

export default function RecordDetailSheet({ record, onClose }: RecordDetailSheetProps) {
  const [isMobile] = useState(() => {
    if (typeof window === "undefined") return true;
    const userAgent = navigator.userAgent.toLowerCase();
    return /android|iphone|ipad|ipod|mobile/i.test(userAgent);
  });

  return (
    <div className={`${styles.overlay} ${isMobile ? styles.mobile : styles.desktop}`} onClick={onClose}>
      <div className={styles.sheet} onClick={(e) => e.stopPropagation()}>
        <div className={styles.handle} />

        <div className={styles.header}>
          <h3 className={styles.title}>{record.title}</h3>
          <div className={styles.total_count}>{record.detail.length}회</div>
        </div>

        <div className={styles.run_list}>
          {record.detail.map((run, i) => (
            <div key={i} className={styles.run_card}>
              <div className={styles.run_header}>
                <div className={styles.run_date}>{run.date}</div>
                <div className={styles.run_place}>{run.place}</div>
              </div>
              <div className={styles.run_stats}>
                <div className={styles.stat_item}>
                  <div className={styles.stat_label}>거리</div>
                  <div className={styles.stat_value}>{run.distance}</div>
                </div>
                <div className={styles.stat_divider} />
                <div className={styles.stat_item}>
                  <div className={styles.stat_label}>시간</div>
                  <div className={styles.stat_value}>{run.time}</div>
                </div>
                <div className={styles.stat_divider} />
                <div className={styles.stat_item}>
                  <div className={styles.stat_label}>페이스</div>
                  <div className={styles.stat_value}>{run.pace}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
