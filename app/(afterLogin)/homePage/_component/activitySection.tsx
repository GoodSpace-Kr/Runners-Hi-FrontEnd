import styles from "./activitySection.module.css";

export default function ActivitySection() {
  const days = [
    { label: "월", active: true },
    { label: "화", active: true },
    { label: "수", active: true },
    { label: "목", active: false },
    { label: "금", active: false },
    { label: "토", active: false },
    { label: "일", active: false },
  ];

  return (
    <div className={styles.activity_section}>
      <h3 className={styles.title}>이번 주 활동</h3>
      <div className={styles.week}>
        {days.map((day) => (
          <div key={day.label} className={styles.dayItem}>
            <span className={styles.dayLabel}>{day.label}</span>
            <div className={`${styles.badge} ${day.active ? styles.active : ""}`}>{day.active ? "🏅" : "—"}</div>
          </div>
        ))}
      </div>
      <p className={styles.message}>오늘도 열심히 달려보세요!</p>
    </div>
  );
}
