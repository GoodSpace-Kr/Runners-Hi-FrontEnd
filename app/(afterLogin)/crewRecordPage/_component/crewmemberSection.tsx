import styles from "./crewmemberSection.module.css";

const DUMMY_CREW_MEMBERS = [
  { id: 1, name: "정상화", level: 5 },
  { id: 2, name: "전병주", level: 5 },
  { id: 3, name: "김준", level: 5 },
  { id: 4, name: "김태우", level: 5 },
  { id: 5, name: "김선호", level: 5 },
];

export default function CrewMemberSection() {
  return (
    <div className={styles.crew_member_section}>
      {DUMMY_CREW_MEMBERS.map((member, index) => (
        <div key={member.id} className={styles.crew_member_section_item}>
          {/* 왼쪽 정보 영역 */}
          <div className={styles.crew_member_section_item_info}>
            <div className={styles.crew_member_section_item_number}>{index + 1}</div>

            <div className={styles.crew_member_section_item_person}>
              <div className={styles.person_name}>{member.name}</div>
              <div className={styles.person_level}>LV. {member.level}</div>
            </div>
          </div>

          {/* 오른쪽: 프로필 버튼 */}
          <button className={styles.profile_button}>프로필</button>
        </div>
      ))}
    </div>
  );
}
