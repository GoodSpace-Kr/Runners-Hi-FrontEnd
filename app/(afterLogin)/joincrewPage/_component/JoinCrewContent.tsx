// components/JoinCrewContent.tsx

"use client";

import { useState } from "react";
import ButtonSection from "./buttonSection";
import SearchSection from "./searchSection";
import CreateSection from "./createSection";

export default function JoinCrewContent() {
  const [activeTab, setActiveTab] = useState("search");

  return (
    <>
      <ButtonSection activeTab={activeTab} setActiveTab={setActiveTab} />

      {activeTab === "search" && <SearchSection />}
      {activeTab === "create" && <CreateSection />}
    </>
  );
}
