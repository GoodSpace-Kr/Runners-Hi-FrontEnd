import styles from "./membersRecordSection.module.css";

export default function MemberRecordSection() {
  return (
    <div className={styles.members_record_section}>
      <div className={styles.date}>2026 - 01 - 01</div>
      <div className={styles.record_item}>
        <div className={styles.record_item_member}>
          <div className={styles.member_name}>전병주</div>
          <div className={styles.member_level}>LV. 5</div>
        </div>

        <div className={styles.record_item_result}>
          <div className={styles.record_item_result_left}>
            <div className={styles.result_circle} style={{ backgroundColor: "#B6EEF0" }}></div>
            장소
          </div>
          <div className={styles.record_item_result_right}>한강공원</div>
        </div>

        <div className={styles.record_item_result}>
          <div className={styles.record_item_result_left}>
            <div className={styles.result_circle} style={{ backgroundColor: "#DB80CE" }}></div>
            거리
          </div>
          <div className={styles.record_item_result_right}>18.5km</div>
        </div>

        <div className={styles.record_item_result}>
          <div className={styles.record_item_result_left}>
            <div className={styles.result_circle} style={{ backgroundColor: "#F3CBA3" }}></div>
            시간
          </div>
          <div className={styles.record_item_result_right}>1h 55m</div>
        </div>

        <div className={styles.record_item_result}>
          <div className={styles.record_item_result_left}>
            <div className={styles.result_circle} style={{ backgroundColor: "#83B4C1" }}></div>
            페이스
          </div>
          <div className={styles.record_item_result_right}>6&apos;18</div>
        </div>
      </div>
    </div>
  );
}
