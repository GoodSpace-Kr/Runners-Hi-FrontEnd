import styles from "./myrecordSection.module.css";

export default function MyRecordSection({ title = "이번 주", onClick }: { title?: string; onClick: () => void }) {
  return (
    <div className={styles.my_record_section} onClick={onClick}>
      <div className={styles.record_item}>
        <div className={styles.my_name}>{title}</div>

        <div className={styles.record_item_result}>
          <div className={styles.record_item_result_left}>
            <div className={styles.result_circle} style={{ backgroundColor: "#B6EEF0" }} />
            달린 횟수
          </div>
          <div className={styles.record_item_result_right}>10번</div>
        </div>

        <div className={styles.record_item_result}>
          <div className={styles.record_item_result_left}>
            <div className={styles.result_circle} style={{ backgroundColor: "#DB80CE" }} />
            거리
          </div>
          <div className={styles.record_item_result_right}>18.5km</div>
        </div>

        <div className={styles.record_item_result}>
          <div className={styles.record_item_result_left}>
            <div className={styles.result_circle} style={{ backgroundColor: "#F3CBA3" }} />
            시간
          </div>
          <div className={styles.record_item_result_right}>1h 55m</div>
        </div>

        <div className={styles.record_item_result}>
          <div className={styles.record_item_result_left}>
            <div className={styles.result_circle} style={{ backgroundColor: "#83B4C1" }} />
            페이스
          </div>
          <div className={styles.record_item_result_right}>6&apos;18</div>
        </div>
      </div>
    </div>
  );
}
