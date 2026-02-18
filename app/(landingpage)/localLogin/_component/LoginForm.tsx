"use client";

import { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";
import { FcGoogle } from "react-icons/fc";
import styles from "../LocalLogin.module.css";

export default function LoginForm() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");

    // 필수 입력 검증
    if (!formData.email || !formData.password) {
      setError("이메일과 비밀번호를 모두 입력해주세요.");
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch("https://runners-hi.site/api/v1/auth/login/web", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
        }),
      });

      if (!response.ok) {
        if (response.status === 401) {
          throw new Error("이메일 또는 비밀번호가 올바르지 않습니다.");
        }
        throw new Error("로그인에 실패했습니다.");
      }

      const data = await response.json();

      // 토큰 저장 (accessToken만 저장, refreshToken은 HttpOnly Cookie로 자동 저장됨)
      if (data.accessToken) {
        localStorage.setItem("accessToken", data.accessToken);
      }

      // 로그인 성공 - 홈페이지로 이동
      router.push("/homePage");
    } catch (err: unknown) {
      console.error("로그인 오류:", err);
      setError(err instanceof Error ? err.message : "로그인 중 오류가 발생했습니다.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleGoogleLogin = () => {
    // Google 로그인 로직 구현
    console.log("Google 로그인");
  };

  return (
    <>
      <form className={styles.login_form} onSubmit={handleSubmit}>
        <input
          type="email"
          name="email"
          placeholder="이메일"
          className={styles.input}
          value={formData.email}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="비밀번호"
          className={styles.input}
          value={formData.password}
          onChange={handleChange}
          required
        />

        {error && <p className={styles.error_message}>{error}</p>}

        <button type="submit" className={styles.login_button} disabled={isLoading}>
          {isLoading ? "로그인 중..." : "로그인"}
        </button>
      </form>

      <button className={styles.google_login_button} onClick={handleGoogleLogin}>
        <FcGoogle />
        Google 로그인
      </button>
    </>
  );
}
