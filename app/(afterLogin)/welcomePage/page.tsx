"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import styles from "./welcomePage.module.css";
import Image from "next/image";
import TextType from "./_component/TextType";

type Character = "man" | "woman";

export default function WelcomePage() {
  const [hovered, setHovered] = useState<Character | null>(null);
  const [selected, setSelected] = useState<Character | null>(null);
  const router = useRouter();
  const isActive = (c: Character) => hovered === c || selected === c;

  return (
    <div className={styles.page}>
      {/* 상단 로고 */}
      <header className={styles.header}>
        <div className={styles.logo}>
          <Image src="/RunnersHiLogo.png" alt="RunnersHi logo" fill priority style={{ objectFit: "contain" }} />
        </div>
      </header>

      {/* 메인 콘텐츠 */}
      <main className={styles.main}>
        <div className={styles.textBlock}>
          <TextType
            text={["함께 달릴 캐릭터를 선택해주세요"]}
            typingSpeed={75}
            pauseDuration={1500}
            showCursor
            cursorCharacter="|"
          />
        </div>

        <section className={styles.characterSection}>
          <CharacterCard
            type="man"
            active={isActive("man")}
            selected={selected === "man"}
            onHover={setHovered}
            onLeave={() => setHovered(null)}
            onClick={() => setSelected("man")}
          />
          <CharacterCard
            type="woman"
            active={isActive("woman")}
            selected={selected === "woman"}
            onHover={setHovered}
            onLeave={() => setHovered(null)}
            onClick={() => setSelected("woman")}
          />
        </section>
      </main>

      {/* 하단 고정 버튼 */}
      <footer className={styles.footer}>
        <button
          className={styles.selectButton}
          disabled={!selected}
          onClick={() => {
            if (!selected) return;
            router.push("/homePage");
          }}
        >
          선택하기
        </button>
      </footer>
    </div>
  );
}

/* 캐릭터 카드 */
function CharacterCard({
  type,
  active,
  selected,
  onHover,
  onLeave,
  onClick,
}: {
  type: Character;
  active: boolean;
  selected: boolean;
  onHover: (c: Character) => void;
  onLeave: () => void;
  onClick: () => void;
}) {
  return (
    <div
      className={`${styles.characterCard} ${selected ? styles.selected : ""}`}
      onMouseEnter={() => onHover(type)}
      onMouseLeave={onLeave}
      onClick={onClick}
    >
      <Image
        src={`/${type}_character.png`}
        alt={`${type} png`}
        fill
        className={`${styles.image} ${active ? styles.fadeOut : styles.fadeIn}`}
      />
      <Image
        src={`/${type}_character.gif`}
        alt={`${type} gif`}
        fill
        unoptimized
        className={`${styles.image} ${active ? styles.fadeIn : styles.fadeOut}`}
      />
    </div>
  );
}
