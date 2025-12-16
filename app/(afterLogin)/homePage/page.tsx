import styles from "./homepage.module.css";
import Header from "../_component/header";
import Footer from "../_component/footer";
import CharacterSection from "./_component/characterSection";
import FunctionSection from "./_component/functionSection";
import ActivitySection from "./_component/activitySection";

export default function HomePage() {
  return (
    <div className={styles.container}>
      <Header />
      <div className={styles.body}>
        <div className={styles.body_section}>
          <CharacterSection />
          <FunctionSection />
          <ActivitySection />
        </div>
      </div>
      <Footer />
    </div>
  );
}
