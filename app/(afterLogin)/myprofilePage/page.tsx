import Footer from "../_component/footer";
import MyProfileContent from "./_component/MyProfileContent";
import styles from "./myprofilepage.module.css";

// 더미 데이터 (서버 컴포넌트에서 정의)
const userData = {
  name: "유저명",
  level: 5,
  stats: {
    totalExp: 2450,
    totalRuns: 8,
    totalDistance: "25.2 km",
    totalTime: "32h 24m",
    avgPace: "7'25\"",
    crew: "굿스페이스",
  },
};

// 애니메이션 레이어 경로 설정
const animationLayers = {
  base: "/character/animations/base",
  hair: "/character/animations/hair/man/base",
  top: "/character/animations/top/item3",
  bottom: "/character/animations/bottom/item3",
  shoes: "/character/animations/shoes/item2",
  head: "/character/animations/head/sunglass/item3",
};

export default function MyProfilePage() {
  return (
    <div className={styles.container}>
      <MyProfileContent userData={userData} animationLayers={animationLayers} />
      <Footer />
    </div>
  );
}
