"use client";

import { useState } from "react";
import styles from "./rankingpage.module.css";
import Footer from "../_component/footer";
import PageHeader from "@/app/(afterLogin)/_component/pageheader";
import { TbShoe } from "react-icons/tb";

export default function RankingPage() {
  /* ===============================
     더미 데이터 (테스트용)
  =============================== */
  const DUMMY_RANKS = [
    {
      id: 1,
      name: "정상화",
      level: 5,
      region: "서울",
    },
    {
      id: 2,
      name: "전병주",
      level: 5,
      region: "서울",
    },
    {
      id: 3,
      name: "김준",
      level: 5,
      region: "서울",
    },
    {
      id: 4,
      name: "김태우",
      level: 5,
      region: "경기",
    },
    {
      id: 5,
      name: "김선호",
      level: 5,
      region: "경기",
    },
    {
      id: 6,
      name: "권민석",
      level: 6,
      region: "경기",
    },
  ];

  const [filter, setFilter] = useState("전체");

  const myName = "정상화";
  const myRegion = "서울";

  const filteredRanks = DUMMY_RANKS.filter((user) => {
    if (filter === "전체") return true;
    if (filter === "우리 지역") return user.region === myRegion;
    return true;
  });

  const myRank = filteredRanks.findIndex((user) => user.name === myName) + 1;

  return (
    <div className={styles.container}>
      <PageHeader mainTitle="랭킹" subTitle="러너스하이에선 많은 러너분들이 달리고 계십니다 !" />

      <div className={styles.body}>
        <div className={styles.body_section}>
          {/* 필터 */}
          <div className={styles.filter_box}>
            {["전체", "우리 지역"].map((item) => (
              <div key={item} className={styles.filter_box_item} onClick={() => setFilter(item)}>
                {item}
              </div>
            ))}
          </div>

          {/* 나의 순위 */}
          <div className={styles.my_rank_section}>
            <div className={styles.my_rank_section_header}>
              <div>나의 순위</div>
              <div>상위</div>
            </div>

            <div className={styles.my_rank_section_detail}>
              <div className={styles.my_rank_circle}>
                <TbShoe className={styles.my_rank_circle_logo} />
              </div>

              <div className={styles.my_rank_info}>
                <div className={styles.my_rank_grade}>{myRank > 0 ? `${myRank}위` : "-"}</div>
                <div className={styles.my_rank_sentence}>전체 {filteredRanks.length}명 중에서</div>
              </div>
            </div>
          </div>

          {/* 전체 랭킹 */}
          <div className={styles.entire_rank_section}>
            {filteredRanks.map((user, index) => (
              <div key={user.id} className={styles.entire_rank_section_item}>
                <div className={styles.entire_rank_section_item_info}>
                  <div className={styles.entire_rank_section_item_grade}>{index + 1}</div>

                  <div className={styles.entire_rank_section_item_person}>
                    <div className={styles.person_name}>{user.name}</div>
                  </div>
                </div>

                <div className={styles.person_level}>LV. {user.level}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
