import styles from "./LocalSignup.module.css";
import Image from "next/image";
import Link from "next/link";

export default function LocalSignupPage() {
  return (
    <div className={styles.container}>
      <div className={styles.logo_section}>
        <Image src="/RunnersHiLogo.png" alt="logo" fill style={{ objectFit: "cover" }} />
      </div>

      <div className={styles.signup_section}>
        <h1 className={styles.signup_title}>회원가입</h1>

        <form className={styles.signup_form}>
          <input type="email" placeholder="이메일" className={styles.input} />
          <input type="password" placeholder="비밀번호" className={styles.input} />
          <input type="password" placeholder="비밀번호 확인" className={styles.input} />
          <input type="text" placeholder="이름" className={styles.input} />

          <button type="submit" className={styles.signup_button}>
            회원가입
          </button>
        </form>

        <div className={styles.bottom_buttons}>
          <Link href="/localLogin" className={styles.back_button}>
            돌아가기
          </Link>
        </div>
      </div>
    </div>
  );
}
