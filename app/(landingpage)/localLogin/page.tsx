import Image from "next/image";
import Link from "next/link";
import LoginForm from "./_component/LoginForm";
import styles from "./LocalLogin.module.css";

export default function LocalLoginPage() {
  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <div className={styles.logo_section}>
          <Image src="/RunnersHiLogo.png" alt="logo" fill priority style={{ objectFit: "contain" }} />
        </div>

        <div className={styles.login_section}>
          <h1 className={styles.login_title}>로그인</h1>
          <LoginForm />
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
    </div>
  );
}
