import styles from "./ActorCardSkeleton.module.css";

export default function ActorCardSkeleton() {
  return (
    <div className={styles.actorCardSkeleton}>
      <div className={styles.skeletonImage}></div>
      <div className={styles.skeletonOverlay}>
        <div className={styles.skeletonTitle}></div>
      </div>
      <div className={styles.skeletonPopularity}></div>
    </div>
  );
}
