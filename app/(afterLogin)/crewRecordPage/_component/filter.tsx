import styles from "./filter.module.css";

export default function FilterBox() {
  return (
    <div className={styles.filter_box}>
      {["전체", "이번 주", "이번 달", "올해"].map((item) => (
        <div key={item} className={styles.filter_box_item}>
          {item}
        </div>
      ))}
    </div>
  );
}
