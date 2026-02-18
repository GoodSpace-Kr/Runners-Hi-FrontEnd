// app/joincrewpage/page.tsx

import PageHeader from "../_component/pageheader";
import Footer from "../_component/footer";
import JoinCrewContent from "./_component/JoinCrewContent";
import styles from "./joincrewpage.module.css";

export default function JoinCrewPage() {
  return (
    <div className={styles.container}>
      <PageHeader mainTitle="크루 참여" subTitle="나와 맞는 크루를 찾아보고 만들어보세요 !" />

      <div className={styles.body}>
        <div className={styles.body_section}>
          <JoinCrewContent />
        </div>
      </div>

      <Footer />
    </div>
  );
}
