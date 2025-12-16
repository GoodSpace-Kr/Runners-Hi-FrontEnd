import styles from "./characterSection.module.css";
import Image from "next/image";

export default function CharacterSection() {
  return (
    <div className={styles.character_section}>
      <div className={styles.character_img}>
        <Image src="/man_character_1.png" alt="RunnersHi logo" fill priority style={{ objectFit: "contain" }} />
      </div>
      <div className={styles.character_state}>
        <div className={styles.character_state_title}>나의 캐릭터</div>
        <div className={styles.character_state_body}>
          <div className={styles.character_state_info}>
            <div>LV. 5</div>
            <div>경험치 60/100 EXP</div>
          </div>
          <div className={styles.character_state_name}>캐릭터명</div>
        </div>
      </div>
    </div>
  );
}
