import { useNavigate } from "react-router-dom";
import { BaseLayout } from "@/shared/layouts/BaseLayout/BaseLayout";
import { privateRoutesMap } from "@/shared/navigation";
import styles from "./ErrorPage.module.css";

export const ErrorPage = () => {
  const navigate = useNavigate();

  const handleReload = () => {
    navigate(privateRoutesMap.analytics);
    window.location.reload();
  };

  return (
    <BaseLayout className={styles.layout}>
      <div className={styles.container}>
        {/* <img src={unknownError} width={320} alt="Unknown error" className={styles.image} /> */}
        <h1 className={styles.title}>Server Error</h1>
        <button
          className={styles.button}
          onClick={handleReload}
        >
          Reload
        </button>
      </div>
    </BaseLayout>
  );
};
