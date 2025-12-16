import styles from "./crewrecordpage.module.css";

import PageHeader from "../_component/pageheader";
import Footer from "../_component/footer";
import MyCrewSection from "./_component/mycrewSection";
import CrewMemberSection from "./_component/crewmemberSection";
import FilterBox from "./_component/filter";
import MemberRecordSection from "./_component/membersRecordSection";

export default function CrewRecordPage() {
  return (
    <div className={styles.container}>
      <PageHeader mainTitle="크루 기록" subTitle="크루의 모든 멤버 기록을 확인해보세요!" />
      <div className={styles.body}>
        <div className={styles.body_section}>
          <MyCrewSection />
          <CrewMemberSection />
          <FilterBox />
          <MemberRecordSection />
        </div>
      </div>
      <Footer />
    </div>
  );
}
