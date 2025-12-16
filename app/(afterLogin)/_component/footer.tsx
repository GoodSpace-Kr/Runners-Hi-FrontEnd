import styles from "./footer.module.css";
import { IoClipboardOutline, IoChatbubbleOutline } from "react-icons/io5";
import { HiOutlineHome } from "react-icons/hi2";
import { PiRankingThin } from "react-icons/pi";

export default function Footer() {
  return (
    <div className={styles.footer}>
      <div className={styles.footer_button_section}>
        <div className={styles.footer_button_item}>
          <HiOutlineHome className={styles.footer_button_item_logo} />홈
        </div>
        <div className={styles.footer_button_item}>
          <IoClipboardOutline className={styles.footer_button_item_logo} />
          크루 기록
        </div>
        <div className={styles.footer_button_item}>
          <IoChatbubbleOutline className={styles.footer_button_item_logo} />
          커뮤니티
        </div>
        <div className={styles.footer_button_item}>
          <PiRankingThin className={styles.footer_button_item_logo} />
          랭킹
        </div>
      </div>
    </div>
  );
}
