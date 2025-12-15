import styles from "./LocalLogin.module.css";
import Image from "next/image";
import { FcGoogle } from "react-icons/fc";
import Link from "next/link";

export default function LocalLoginPage() {
  return (
    <div className={styles.container}>
      <div className={styles.logo_section}>
        <Image src="/RunnersHiLogo.png" alt="logo" fill style={{ objectFit: "cover" }} />
      </div>

      <div className={styles.login_section}>
        <h1 className={styles.login_title}>자체 로그인</h1>

        <form className={styles.login_form}>
          <input type="email" placeholder="이메일" className={styles.input} />
          <input type="password" placeholder="비밀번호" className={styles.input} />

          <button type="submit" className={styles.login_button}>
            로그인
          </button>
        </form>

        <button className={styles.google_login_button}>
          <FcGoogle />
          Google 로그인
        </button>

        <div className={styles.bottom_buttons}>
          <Link href="/localSignup" className={styles.signup_button}>
            회원가입
          </Link>
          <Link href="/" className={styles.back_button}>
            돌아가기
          </Link>
        </div>
      </div>
    </div>
  );
}
