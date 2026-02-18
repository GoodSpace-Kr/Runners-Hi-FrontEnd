import Footer from "../_component/footer";
import PageHeader from "@/app/(afterLogin)/_component/pageheader";
import RankingContent from "./_component/RankingContent";
import styles from "./rankingpage.module.css";

// 더미 데이터 (서버 컴포넌트에서 정의)
const DUMMY_RANKS = [
  {
    id: 1,
    name: "정상화",
    level: 5,
    region: "서울",
  },
  {
    id: 2,
    name: "전병주",
    level: 5,
    region: "서울",
  },
  {
    id: 3,
    name: "김준",
    level: 5,
    region: "서울",
  },
  {
    id: 4,
    name: "김태우",
    level: 5,
    region: "경기",
  },
  {
    id: 5,
    name: "김선호",
    level: 5,
    region: "경기",
  },
  {
    id: 6,
    name: "권민석",
    level: 6,
    region: "경기",
  },
];

export default function RankingPage() {
  const myName = "정상화";
  const myRegion = "서울";

  return (
    <div className={styles.container}>
      <PageHeader mainTitle="랭킹" subTitle="러너스하이에선 많은 러너분들이 달리고 계십니다 !" />

      <RankingContent ranks={DUMMY_RANKS} myName={myName} myRegion={myRegion} />

      <Footer />
    </div>
  );
}
