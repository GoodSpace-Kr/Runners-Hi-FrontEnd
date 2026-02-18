// components/OtherProfileContent.tsx

"use client";

import { useRouter } from "next/navigation";
import Image from "next/image";
import NProgress from "nprogress";
import { IoChevronBack } from "react-icons/io5";
import AnimatedLayeredCharacter from "./AnimatedLayeredCharacter";
import styles from "../otherprofilepage.module.css";

interface UserStats {
  totalExp: number;
  totalRuns: number;
  totalDistance: string;
  totalTime: string;
  avgPace: string;
  crew: string;
}

interface UserData {
  name: string;
  level: number;
  stats: UserStats;
}

interface AnimationLayers {
  base: string;
  hair: string;
  top: string;
  bottom: string;
  shoes: string;
  head?: string;
}

interface OtherProfileContentProps {
  userData: UserData;
  animationLayers: AnimationLayers;
}

export default function OtherProfileContent({ userData, animationLayers }: OtherProfileContentProps) {
  const router = useRouter();

  const handleProfileClick = () => {
    NProgress.start();
    router.push("/crewRecordPage");
  };

  // 경로에서 아이템 ID와 카테고리 추출
  const extractItemInfo = (path: string, slotType: string) => {
    const parts = path.split("/");

    // "item"으로 시작하는 부분 찾기
    let itemId = "";
    let itemIndex = -1;

    for (let i = parts.length - 1; i >= 0; i--) {
      if (parts[i].startsWith("item")) {
        itemId = parts[i];
        itemIndex = i;
        break;
      }
    }

    // head의 경우 카테고리(sunglass, hairband 등) 포함
    if (slotType === "head" && itemIndex > 0) {
      const category = parts[itemIndex - 1]; // "sunglass", "hairband" 등
      return { category, itemId };
    }

    return { category: null, itemId };
  };

  // 아이템 이미지 경로 생성 함수
  const getItemImagePath = (animationPath: string, slotType: string): string => {
    const { category, itemId } = extractItemInfo(animationPath, slotType);

    if (slotType === "head" && category) {
      // head는 카테고리 폴더 포함
      return `/character/itemImg/${slotType}/${category}/${itemId}.png`;
    } else {
      // 나머지는 바로
      return `/character/itemImg/${slotType}/${itemId}.png`;
    }
  };

  // 장착된 아이템 정보 (4개만: 악세서리, 상의, 하의, 신발)
  const equippedItems = {
    head: {
      name: "악세서리",
      icon: getItemImagePath(animationLayers.head!, "head"),
    },
    top: {
      name: "상의",
      icon: getItemImagePath(animationLayers.top, "top"),
    },
    bottom: {
      name: "하의",
      icon: getItemImagePath(animationLayers.bottom, "bottom"),
    },
    shoes: {
      name: "신발",
      icon: getItemImagePath(animationLayers.shoes, "shoes"),
    },
  };

  return (
    <>
      <div className={styles.header}>
        <IoChevronBack className={styles.logo} onClick={handleProfileClick} />
      </div>

      <div className={styles.body_top}>
        <div className={styles.body_top_section}>
          {/* 장착 아이템 + 캐릭터 영역 */}
          <div className={styles.equipment_container}>
            {/* 왼쪽 장착 슬롯 */}
            <div className={styles.equipment_side}>
              <div className={styles.equipment_slot}>
                <div className={styles.slot_icon}>
                  <Image
                    src={equippedItems.head.icon}
                    alt={equippedItems.head.name}
                    fill
                    sizes="64px"
                    style={{ objectFit: "contain" }}
                    className={styles.slot_image}
                  />
                </div>
                <div className={styles.slot_label}>{equippedItems.head.name}</div>
              </div>
              <div className={styles.equipment_slot}>
                <div className={styles.slot_icon}>
                  <Image
                    src={equippedItems.top.icon}
                    alt={equippedItems.top.name}
                    fill
                    sizes="64px"
                    style={{ objectFit: "contain" }}
                    className={styles.slot_image}
                  />
                </div>
                <div className={styles.slot_label}>{equippedItems.top.name}</div>
              </div>
            </div>

            {/* 중앙 캐릭터 */}
            <div className={styles.character_center}>
              <div className={styles.character_img}>
                <AnimatedLayeredCharacter
                  layers={animationLayers}
                  frameCount={4}
                  frameRate={8}
                  cropTop={15}
                  cropBottom={20}
                />
              </div>
            </div>

            {/* 오른쪽 장착 슬롯 */}
            <div className={styles.equipment_side}>
              <div className={styles.equipment_slot}>
                <div className={styles.slot_icon}>
                  <Image
                    src={equippedItems.bottom.icon}
                    alt={equippedItems.bottom.name}
                    fill
                    sizes="64px"
                    style={{ objectFit: "contain" }}
                    className={styles.slot_image}
                  />
                </div>
                <div className={styles.slot_label}>{equippedItems.bottom.name}</div>
              </div>
              <div className={styles.equipment_slot}>
                <div className={styles.slot_icon}>
                  <Image
                    src={equippedItems.shoes.icon}
                    alt={equippedItems.shoes.name}
                    fill
                    sizes="64px"
                    style={{ objectFit: "contain" }}
                    className={styles.slot_image}
                  />
                </div>
                <div className={styles.slot_label}>{equippedItems.shoes.name}</div>
              </div>
            </div>
          </div>

          {/* 유저 정보 */}
          <div className={styles.user_info}>
            <div className={styles.user_name}>{userData.name}</div>
            <div className={styles.user_level}>LV. {userData.level}</div>
          </div>
        </div>
      </div>

      <div className={styles.body_bottom}>
        <div className={styles.body_bottom_section}>
          <div className={styles.info_box}>
            <div className={styles.info_item}>
              <div className={styles.info_item_name}>총 경험치</div>
              <div className={styles.info_item_value}>{userData.stats.totalExp}</div>
            </div>
            <div className={styles.info_item}>
              <div className={styles.info_item_name}>총 달린 횟수</div>
              <div className={styles.info_item_value}>{userData.stats.totalRuns}번</div>
            </div>
          </div>
          <div className={styles.info_box}>
            <div className={styles.info_item}>
              <div className={styles.info_item_name}>총 달린 거리</div>
              <div className={styles.info_item_value}>{userData.stats.totalDistance}</div>
            </div>
            <div className={styles.info_item}>
              <div className={styles.info_item_name}>총 달린 시간</div>
              <div className={styles.info_item_value}>{userData.stats.totalTime}</div>
            </div>
          </div>
          <div className={styles.info_box}>
            <div className={styles.info_item}>
              <div className={styles.info_item_name}>평균 페이스</div>
              <div className={styles.info_item_value}>{userData.stats.avgPace}</div>
            </div>
            <div className={styles.info_item}>
              <div className={styles.info_item_name}>가입한 크루</div>
              <div className={styles.info_item_value}>{userData.stats.crew}</div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
