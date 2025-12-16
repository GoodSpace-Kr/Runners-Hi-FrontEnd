import styles from "./mycrewSection.module.css";
import { AiOutlineTeam } from "react-icons/ai";

export default function MyCrewSection() {
  return (
    <div className={styles.my_crew_section}>
      <div className={styles.my_crew_section_header}>
        <div>나의 크루</div>
        <div>LV. 5 | 60/200 EXP</div>
      </div>

      <div className={styles.my_crew_section_detail}>
        <div className={styles.my_crew_circle}>
          <AiOutlineTeam className={styles.my_crew_circle_logo} />
        </div>

        <div className={styles.my_crew_info}>
          <div className={styles.my_crew_name}>크루 명</div>
          <div className={styles.my_crew_count}>크루 인원 수</div>
        </div>
      </div>
    </div>
  );
}
