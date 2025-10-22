import styles from "./MovieCardSkeleton.module.css";

export default function MovieCardSkeleton() {
  return (
    <div className={styles.movieCardSkeleton}>
      <div className={styles.skeletonImage}></div>
      <div className={styles.skeletonOverlay}>
        <div className={styles.skeletonTitle}></div>
      </div>
      <div className={styles.skeletonVote}></div>
    </div>
  );
}
