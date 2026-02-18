"use client";
import styles from "./LandingPage.module.css";
import Image from "next/image";
import { FcGoogle } from "react-icons/fc";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function LandingPage() {
  const router = useRouter();

  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <div className={styles.logo_section}>
          <Image src="/RunnersHiLogo.png" alt="logo" fill priority style={{ objectFit: "contain" }} />
        </div>

        <div className={styles.intro_section}>
          <div className={styles.main_title_section}>
            <p className={styles.main_title_sentence}>매일의 한 걸음이 쌓여</p>
            <p className={styles.main_title_sentence}>함께가 되다</p>
          </div>

          <div className={styles.sub_title_section}>
            <p className={styles.sub_title_sentence}>
              혼자의 러닝에서 시작해 함께 성장하는,
              <br />
              작은 실천들의 모임
            </p>
          </div>

          <div className={styles.button_section}>
            <button className={styles.local_login_button} onClick={() => router.push("/homePage")}>
              로그인
            </button>
            <button className={styles.google_login_button} onClick={() => router.push("/homePage")}>
              <FcGoogle />
              Google 로그인
            </button>
          </div>

          {/*<div className={styles.sub_title_section}>
            <p className={styles.sub_title_sentence}>러너스하이에서 귀여운 러너 캐릭터와 함께</p>
            <p className={styles.sub_title_sentence}>오늘의 러닝을 시작하세요</p>
          </div>*/}

          <div className={styles.sub_title_section}>
            <p className={styles.sub_title_sentence}>
              이 사이트는 현재 개발중인 데모 버전입니다.
              <br />
              로그인 및 회원가입은 실제 인증 없이 구현되어 있습니다.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
