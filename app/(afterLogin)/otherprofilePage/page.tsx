"use client";

import styles from "./otherprofilepage.module.css";
import { IoChevronBack } from "react-icons/io5";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Footer from "../_component/footer";
import NProgress from "nprogress";

export default function OtherProfilePage() {
  const router = useRouter();

  const handleProfileClick = () => {
    NProgress.start();
    router.push("/homePage");
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <IoChevronBack className={styles.logo} onClick={handleProfileClick} />
      </div>
      <div className={styles.body_top}>
        <div className={styles.body_top_section}>
          <div className={styles.character_img}>
            <Image src="/man_character.gif" alt="character gif" fill priority style={{ objectFit: "contain" }} />
          </div>
          <div className={styles.user_info}>
            <div className={styles.user_name}>유저명</div>
            <div className={styles.user_level}>LV. 5</div>
          </div>
        </div>
      </div>
      <div className={styles.body_bottom}>
        <div className={styles.body_bottom_section}>
          <div className={styles.info_box}>
            <div className={styles.info_item}>
              <div className={styles.info_item_name}>총 경험치</div>
              <div className={styles.info_item_value}>2450</div>
            </div>
            <div className={styles.info_item}>
              <div className={styles.info_item_name}>총 달린 횟수</div>
              <div className={styles.info_item_value}>8번</div>
            </div>
          </div>
          <div className={styles.info_box}>
            <div className={styles.info_item}>
              <div className={styles.info_item_name}>총 달린 거리</div>
              <div className={styles.info_item_value}>25.2 km</div>
            </div>
            <div className={styles.info_item}>
              <div className={styles.info_item_name}>총 달린 시간</div>
              <div className={styles.info_item_value}>32h 24m</div>
            </div>
          </div>
          <div className={styles.info_box}>
            <div className={styles.info_item}>
              <div className={styles.info_item_name}>평균 페이스</div>
              <div className={styles.info_item_value}>7&apos;25&quot;</div>
            </div>
            <div className={styles.info_item}>
              <div className={styles.info_item_name}>가입한 크루</div>
              <div className={styles.info_item_value}>굿스페이스</div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
