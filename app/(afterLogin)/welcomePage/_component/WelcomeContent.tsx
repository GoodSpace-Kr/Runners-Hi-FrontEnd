"use client";

import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import Image from "next/image";
import TextType from "./TextType";
import styles from "../welcomePage.module.css";

type Character = "man" | "woman";

interface SignupData {
  email: string;
  password: string;
  name: string;
}

export default function WelcomeContent() {
  const [hovered, setHovered] = useState<Character | null>(null);
  const [selected, setSelected] = useState<Character | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [signupData, setSignupData] = useState<SignupData | null>(null);
  const router = useRouter();

  const isActive = (c: Character) => hovered === c || selected === c;

  // 회원가입 데이터 불러오기
  useEffect(() => {
    const data = sessionStorage.getItem("signupData");
    if (!data) {
      // 회원가입 데이터가 없으면 회원가입 페이지로 리다이렉트
      alert("잘못된 접근입니다. 회원가입 페이지로 이동합니다.");
      router.push("/localSignup");
      return;
    }
    setSignupData(JSON.parse(data));
  }, [router]);

  const handleSelectCharacter = async () => {
    if (!selected || !signupData) return;

    setIsLoading(true);

    try {
      const response = await fetch("https://runners-hi.site/api/v1/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: signupData.email,
          password: signupData.password,
          name: signupData.name,
          sex: selected === "man" ? "MALE" : "FEMALE",
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "회원가입에 실패했습니다.");
      }

      // 회원가입 성공 - sessionStorage 정리
      sessionStorage.removeItem("signupData");
      alert("회원가입이 완료되었습니다. 로그인 페이지로 이동합니다.");
      router.push("/localLogin");
    } catch (err: unknown) {
      console.error("회원가입 오류:", err);
      alert(err instanceof Error ? err.message : "회원가입 중 오류가 발생했습니다.");
    } finally {
      setIsLoading(false);
    }
  };

  // 데이터 로딩 중
  if (!signupData) {
    return null;
  }

  return (
    <>
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
        <button className={styles.selectButton} disabled={!selected || isLoading} onClick={handleSelectCharacter}>
          {isLoading ? "회원가입 중..." : "회원가입"}
        </button>
      </footer>
    </>
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
