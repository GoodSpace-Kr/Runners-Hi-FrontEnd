import PageHeader from "../_component/pageheader";
import Footer from "../_component/footer";
import MyRecordContent from "./_component/MyRecordContent";
import styles from "./myrecordpage.module.css";
import { RunRecord, RecordSection } from "./_component/recordDetailSheet";

// Mock 데이터 (서버 컴포넌트에서 정의)
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

export default function MyRecordPage() {
  const sections: RecordSection[] = [
    { id: 1, title: "이번 주", detail: mockRuns },
    { id: 2, title: "저번 주", detail: mockRuns },
    { id: 3, title: "3주 전", detail: mockRuns },
  ];

  return (
    <div className={styles.container}>
      <PageHeader mainTitle="나의 기록" subTitle="열심히 달린 기록을 확인하고 점검해보세요!" />

      <MyRecordContent sections={sections} />

      <Footer />
    </div>
  );
}
