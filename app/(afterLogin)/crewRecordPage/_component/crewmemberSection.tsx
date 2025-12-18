"use client";

import Link from "next/link";
import styles from "./crewmemberSection.module.css";
import NProgress from "nprogress";
import ProgressBar from "@/app/(afterLogin)/_component/ProgressBar";

const DUMMY_CREW_MEMBERS = [
  { id: 1, name: "정상화", level: 5, contributedExp: 120 },
  { id: 2, name: "전병주", level: 5, contributedExp: 80 },
  { id: 3, name: "김준", level: 5, contributedExp: 40 },
  { id: 4, name: "김태우", level: 5, contributedExp: 30 },
  { id: 5, name: "김선호", level: 5, contributedExp: 20 },
];

const TOTAL_CREW_EXP = 290;

export default function CrewMemberSection() {
  const handleClick = () => {
    NProgress.start();
  };

  return (
    <div className={styles.crew_member_section}>
      {DUMMY_CREW_MEMBERS.map((member, index) => {
        const percent = (member.contributedExp / TOTAL_CREW_EXP) * 100;

        return (
          <div key={member.id} className={styles.crew_member_section_item}>
            <div className={styles.crew_member_section_item_info}>
              <div className={styles.crew_member_section_item_number}>{index + 1}</div>

              <div className={styles.crew_member_section_item_person}>
                <div className={styles.person_name}>{member.name}</div>
                <div className={styles.person_level}>LV. {member.level}</div>
              </div>
              {/* 기여도 바 */}
              <div className={styles.contribution_wrapper}>
                <ProgressBar value={percent} />
                <div className={styles.contribution_text}>EXP {member.contributedExp} 기여</div>
              </div>
            </div>

            <Link href="/otherprofilePage" onClick={handleClick} className={styles.profile_button}>
              프로필
            </Link>
          </div>
        );
      })}
    </div>
  );
}
