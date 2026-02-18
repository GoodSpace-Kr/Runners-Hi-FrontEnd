import Image from "next/image";
import WelcomeContent from "./_component/WelcomeContent";
import styles from "./welcomePage.module.css";

export default function WelcomePage() {
  return (
    <div className={styles.page}>
      {/* 상단 로고 */}
      <header className={styles.header}>
        <div className={styles.logo}>
          <Image src="/RunnersHiLogo.png" alt="RunnersHi logo" fill priority style={{ objectFit: "contain" }} />
        </div>
      </header>

      {/* 메인 콘텐츠 - 클라이언트 컴포넌트 */}
      <WelcomeContent />
    </div>
  );
}
