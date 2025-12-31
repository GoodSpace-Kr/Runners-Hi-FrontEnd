"use client";

import styles from "./characterSection.module.css";
import StaticLayeredCharacter from "./StaticLayeredCharacter";

// 캐릭터 레이어 타입 (폴더 경로)
interface CharacterLayers {
  base?: string;
  hair: string;
  top: string;
  bottom: string;
  shoes: string;
  head?: string;
}

// 남자/여자 기본 레이어 설정 (애니메이션 폴더 경로)
const DEFAULT_LAYERS = {
  man: {
    base: "/character/animations/base",
    hair: "/character/animations/hair/man/base",
    top: "/character/animations/top/man/base",
    bottom: "/character/animations/bottom/man/base",
    shoes: "/character/animations/shoes/man/base",
  },
  woman: {
    base: "/character/animations/base",
    hair: "/character/animations/hair/woman/base",
    top: "/character/animations/top/woman/base",
    bottom: "/character/animations/bottom/woman/base",
    shoes: "/character/animations/shoes/woman/base",
  },
};

interface CharacterSectionProps {
  gender?: "man" | "woman"; // 선택된 성별
  level?: number;
  exp?: number;
  maxExp?: number;
  characterName?: string;
  equippedItems?: Partial<CharacterLayers>; // 장착된 아이템 (선택적)
}

export default function CharacterSection({
  gender = "man", // 임시 기본값
  level = 5,
  exp = 60,
  maxExp = 100,
  characterName = "캐릭터명",
  equippedItems,
}: CharacterSectionProps) {
  // 현재 캐릭터 레이어 구성 (폴더 경로)
  const currentLayers: CharacterLayers = {
    ...DEFAULT_LAYERS[gender],
    ...equippedItems, // 장착된 아이템이 있으면 덮어쓰기
  };

  return (
    <div className={styles.character_section}>
      <div className={styles.character_img}>
        {/* frame1만 표시 (애니메이션 없음) */}
        <StaticLayeredCharacter layers={currentLayers} cropTop={30} cropBottom={35} />
      </div>
      <div className={styles.character_state}>
        <div className={styles.character_state_title}>나의 캐릭터</div>
        <div className={styles.character_state_body}>
          <div className={styles.character_state_info}>
            <div>LV. {level}</div>
            <div>
              경험치 {exp}/{maxExp} EXP
            </div>
          </div>
          <div className={styles.character_state_name}>{characterName}</div>
        </div>
      </div>
    </div>
  );
}
