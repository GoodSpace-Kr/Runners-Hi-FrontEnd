import styles from "./functionSection.module.css";

import { FaBook } from "react-icons/fa6";
import { BsFillPeopleFill } from "react-icons/bs";
import { HiDocumentText } from "react-icons/hi2";

export default function FunctionSection() {
  return (
    <div className={styles.function_section}>
      <div className={styles.quest_section}>
        <div className={styles.quest_section_item}>
          <FaBook className={styles.quest_logo} />
          <div className={styles.quest_box}>2 / 5</div>
        </div>

        <div className={styles.quest_section_item}>퀘스트</div>

        <div className={styles.quest_section_mission_box}>
          <div className={styles.quest_section_mission}>
            <div className={styles.quest_section_mission_name}>미션 이름</div>
            <div className={styles.quest_section_mission_exp}>획득 경험치</div>
          </div>
          <div className={styles.quest_section_mission}>
            <div className={styles.quest_section_mission_name}>미션 이름</div>
            <div className={styles.quest_section_mission_exp}>획득 경험치</div>
          </div>
          <div className={styles.quest_section_mission}>
            <div className={styles.quest_section_mission_name}>미션 이름</div>
            <div className={styles.quest_section_mission_exp}>획득 경험치</div>
          </div>
          <div className={styles.quest_section_mission}>
            <div className={styles.quest_section_mission_name}>미션 이름</div>
            <div className={styles.quest_section_mission_exp}>획득 경험치</div>
          </div>
          <div className={styles.quest_section_mission}>
            <div className={styles.quest_section_mission_name}>미션 이름</div>
            <div className={styles.quest_section_mission_exp}>획득 경험치</div>
          </div>
        </div>
      </div>

      <div className={styles.other_section}>
        <div className={styles.crew_join_section}>
          <BsFillPeopleFill className={styles.crew_logo} />
          크루 참여
        </div>
        <div className={styles.my_record_section}>
          <div className={styles.my_record_section_item}>
            <HiDocumentText className={styles.my_record_logo} />
            <div className={styles.my_record_box}>12 회</div>
          </div>
          <div className={styles.my_record_section_item}>나의 기록</div>
        </div>
      </div>
    </div>
  );
}
