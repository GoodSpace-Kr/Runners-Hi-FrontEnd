"use client";

import { useState } from "react";
import MyRecordSection from "./myrecordSection";
import RecordDetailSheet, { RecordSection } from "./recordDetailSheet";
import styles from "../myrecordpage.module.css";

interface MyRecordContentProps {
  sections: RecordSection[];
}

export default function MyRecordContent({ sections }: MyRecordContentProps) {
  const [selectedRecord, setSelectedRecord] = useState<RecordSection | null>(null);

  return (
    <>
      <div className={styles.body}>
        <div className={styles.filter_box}>
          {["주간", "월간", "전체"].map((item) => (
            <div key={item} className={styles.filter_box_item}>
              {item}
            </div>
          ))}
        </div>

        <div className={styles.body_section}>
          {sections.map((section) => (
            <MyRecordSection key={section.id} title={section.title} onClick={() => setSelectedRecord(section)} />
          ))}
        </div>
      </div>

      {selectedRecord && <RecordDetailSheet record={selectedRecord} onClose={() => setSelectedRecord(null)} />}
    </>
  );
}
