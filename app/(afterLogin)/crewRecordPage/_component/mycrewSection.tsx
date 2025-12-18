import styles from "./mycrewSection.module.css";
import { AiOutlineTeam } from "react-icons/ai";
import ProgressBar from "@/app/(afterLogin)/_component/ProgressBar";

export default function MyCrewSection() {
  const crew = {
    name: "크루 명",
    level: 5,
    currentExp: 60,
    maxExp: 200,
    memberCount: 5,
  };

  const expPercent = (crew.currentExp / crew.maxExp) * 100;

  return (
    <div className={styles.my_crew_section}>
      <div className={styles.my_crew_section_header}>
        <div>나의 크루</div>
        <div className={styles.my_crew_count}>크루 인원 {crew.memberCount}명</div>
      </div>

      <div className={styles.my_crew_section_detail}>
        <div className={styles.my_crew_circle}>
          <AiOutlineTeam className={styles.my_crew_circle_logo} />
        </div>

        <div className={styles.my_crew_info}>
          <div className={styles.my_crew_name}>{crew.name}</div>
          {/* 크루 EXP 바 */}
          <ProgressBar value={expPercent} />
          <div className={styles.my_crew_level}>
            LV. {crew.level} | {crew.currentExp}/{crew.maxExp} EXP
          </div>
        </div>
      </div>
    </div>
  );
}
