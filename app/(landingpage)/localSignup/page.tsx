// app/localSignup/page.tsx

import Image from "next/image";
import Link from "next/link";
import SignupForm from "./_component/SignupForm";
import styles from "./LocalSignup.module.css";

export default function LocalSignupPage() {
  return (
    <div className={styles.page}>
      <div className={styles.container}>
        {/* 로고 */}
        <div className={styles.logo_section}>
          <Image src="/RunnersHiLogo.png" alt="logo" fill priority style={{ objectFit: "contain" }} />
        </div>

        {/* 회원가입 영역 */}
        <div className={styles.signup_section}>
          <h1 className={styles.signup_title}>회원가입</h1>

          <SignupForm />

          <div className={styles.bottom_buttons}>
            <Link href="/localLogin" className={styles.back_button}>
              돌아가기
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
