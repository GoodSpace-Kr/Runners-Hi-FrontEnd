"use client";

import { useState } from "react";
import styles from "./myrecordpage.module.css";

import PageHeader from "../_component/pageheader";
import Footer from "../_component/footer";
import MyRecordSection from "./_component/myrecordSection";
import RecordDetailSheet, { RunRecord, RecordSection } from "./_component/recordDetailSheet";

export default function MyRecordPage() {
  const [selectedRecord, setSelectedRecord] = useState<RecordSection | null>(null);

  const sections: RecordSection[] = [
    { id: 1, title: "이번 주", detail: mockRuns },
    { id: 2, title: "저번 주", detail: mockRuns },
    { id: 3, title: "3주 전", detail: mockRuns },
  ];

  return (
    <div className={styles.container}>
      <PageHeader mainTitle="나의 기록" subTitle="열심히 달린 기록을 확인하고 점검해보세요!" />

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

      <Footer />

      {selectedRecord && <RecordDetailSheet record={selectedRecord} onClose={() => setSelectedRecord(null)} />}
    </div>
  );
}

const mockRuns: RunRecord[] = [
  {
    date: "2024-10-12",
    place: "한강공원",
    distance: "5.2km",
    time: "28:40",
    pace: "5'30\"",
  },
  {
    date: "2024-10-14",
    place: "동네 트랙",
    distance: "7.1km",
    time: "39:10",
    pace: "5'31\"",
  },
  {
    date: "2024-10-12",
    place: "한강 공원",
    distance: "5.0km",
    time: "27:45",
    pace: "5'33\"",
  },
  {
    date: "2024-10-15",
    place: "동네 트랙",
    distance: "10.0km",
    time: "54:20",
    pace: "5'26\"",
  },
  {
    date: "2024-10-16",
    place: "숲길 코스",
    distance: "6.5km",
    time: "36:10",
    pace: "5'33\"",
  },
];
