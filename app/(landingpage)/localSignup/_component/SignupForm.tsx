"use client";

import { useState, FormEvent, useEffect } from "react";
import { useRouter } from "next/navigation";
import styles from "../LocalSignup.module.css";

export default function SignupForm() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    passwordConfirm: "",
    name: "",
  });
  const [error, setError] = useState("");
  const [isLoading] = useState(false);

  // 중복 체크 상태
  const [emailCheck, setEmailCheck] = useState<{
    status: "idle" | "checking" | "available" | "duplicate";
    message: string;
  }>({ status: "idle", message: "" });

  const [nameCheck, setNameCheck] = useState<{
    status: "idle" | "checking" | "available" | "duplicate";
    message: string;
  }>({ status: "idle", message: "" });

  // 이메일 중복 체크 함수
  const checkEmailDuplicate = async (email: string) => {
    if (!email || !email.includes("@")) {
      setEmailCheck({ status: "idle", message: "" });
      return;
    }

    setEmailCheck({ status: "checking", message: "확인 중..." });

    try {
      const response = await fetch(
        `https://runners-hi.site/api/v1/auth/check-email?email=${encodeURIComponent(email)}`,
      );

      if (response.status === 204) {
        setEmailCheck({ status: "available", message: "사용 가능한 이메일입니다." });
      } else if (response.status === 409) {
        setEmailCheck({ status: "duplicate", message: "이미 사용 중인 이메일입니다." });
      } else {
        setEmailCheck({ status: "idle", message: "" });
      }
    } catch (err: unknown) {
      console.error("이메일 중복 체크 오류:", err);
      setEmailCheck({ status: "idle", message: "" });
    }
  };

  // 이름 중복 체크 함수
  const checkNameDuplicate = async (name: string) => {
    if (!name || name.trim().length === 0) {
      setNameCheck({ status: "idle", message: "" });
      return;
    }

    setNameCheck({ status: "checking", message: "확인 중..." });

    try {
      const response = await fetch(`https://runners-hi.site/api/v1/auth/check-name?name=${encodeURIComponent(name)}`);

      if (response.status === 204) {
        setNameCheck({ status: "available", message: "사용 가능한 이름입니다." });
      } else if (response.status === 409) {
        setNameCheck({ status: "duplicate", message: "이미 사용 중인 이름입니다." });
      } else {
        setNameCheck({ status: "idle", message: "" });
      }
    } catch (err: unknown) {
      console.error("이름 중복 체크 오류:", err);
      setNameCheck({ status: "idle", message: "" });
    }
  };

  // 디바운스를 위한 useEffect
  useEffect(() => {
    const timer = setTimeout(() => {
      if (formData.email) {
        checkEmailDuplicate(formData.email);
      }
    }, 500);
    return () => clearTimeout(timer);
  }, [formData.email]);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (formData.name) {
        checkNameDuplicate(formData.name);
      }
    }, 500);
    return () => clearTimeout(timer);
  }, [formData.name]);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");

    // 중복 체크 검증
    if (emailCheck.status === "duplicate") {
      setError("이메일이 중복됩니다. 다른 이메일을 사용해주세요.");
      return;
    }

    if (nameCheck.status === "duplicate") {
      setError("이름이 중복됩니다. 다른 이름을 사용해주세요.");
      return;
    }

    if (emailCheck.status !== "available") {
      setError("이메일 중복 확인이 필요합니다.");
      return;
    }

    if (nameCheck.status !== "available") {
      setError("이름 중복 확인이 필요합니다.");
      return;
    }

    // 비밀번호 확인 검증
    if (formData.password !== formData.passwordConfirm) {
      setError("비밀번호가 일치하지 않습니다.");
      return;
    }

    // 필수 입력 검증
    if (!formData.email || !formData.password || !formData.name) {
      setError("모든 필드를 입력해주세요.");
      return;
    }

    // 회원가입 정보를 sessionStorage에 저장하고 다음 페이지로 이동
    sessionStorage.setItem(
      "signupData",
      JSON.stringify({
        email: formData.email,
        password: formData.password,
        name: formData.name,
      }),
    );

    router.push("/welcomePage");
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <form className={styles.signup_form} onSubmit={handleSubmit}>
      {/* 이메일 입력 */}
      <div className={styles.input_wrapper}>
        <input
          type="email"
          name="email"
          placeholder="이메일"
          className={`${styles.input} ${
            emailCheck.status === "duplicate"
              ? styles.input_error
              : emailCheck.status === "available"
                ? styles.input_success
                : ""
          }`}
          value={formData.email}
          onChange={handleChange}
          required
        />
        {emailCheck.message && (
          <p
            className={`${styles.validation_message} ${
              emailCheck.status === "duplicate"
                ? styles.validation_error
                : emailCheck.status === "available"
                  ? styles.validation_success
                  : styles.validation_checking
            }`}
          >
            {emailCheck.message}
          </p>
        )}
      </div>

      <input
        type="password"
        name="password"
        placeholder="비밀번호"
        className={styles.input}
        value={formData.password}
        onChange={handleChange}
        required
      />
      <input
        type="password"
        name="passwordConfirm"
        placeholder="비밀번호 확인"
        className={styles.input}
        value={formData.passwordConfirm}
        onChange={handleChange}
        required
      />

      {/* 이름 입력 */}
      <div className={styles.input_wrapper}>
        <input
          type="text"
          name="name"
          placeholder="이름"
          className={`${styles.input} ${
            nameCheck.status === "duplicate"
              ? styles.input_error
              : nameCheck.status === "available"
                ? styles.input_success
                : ""
          }`}
          value={formData.name}
          onChange={handleChange}
          required
        />
        {nameCheck.message && (
          <p
            className={`${styles.validation_message} ${
              nameCheck.status === "duplicate"
                ? styles.validation_error
                : nameCheck.status === "available"
                  ? styles.validation_success
                  : styles.validation_checking
            }`}
          >
            {nameCheck.message}
          </p>
        )}
      </div>

      {error && <p className={styles.error_message}>{error}</p>}

      <button
        type="submit"
        className={styles.signup_button}
        disabled={isLoading || emailCheck.status !== "available" || nameCheck.status !== "available"}
      >
        {isLoading ? "처리중..." : "다음"}
      </button>
    </form>
  );
}
