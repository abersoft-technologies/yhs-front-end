import React from 'react';

/* SCSS module import */
import styles from './Milestones.module.scss';

/* Component imports */
import ProgressBar from './progressbar/ProgressBar';

const Milestones = () => {
  return (
    <div className={styles.milestones_container}>
      <div>
        <div className={styles.months_container}>
          <div>Januari</div>
          <div>Februari</div>
          <div>Mars</div>
          <div>April</div>
          <div>Maj</div>
          <div>Juni</div>
        </div>
        <div className={styles.progress_svg_container}>
          <ProgressBar />
        </div>
        <div className={styles.month_description_container}>
          <div>Årsbeked och nytt år</div>
          <div>Mörkret är ännu kvar</div>
          <div>Korta kurser lämnas in</div>
          <div>Påsk är runt hörnet</div>
          <div>Maj maj måne, kan lura dig till Skåne</div>
          <div>Inlämning av ansökan</div>
        </div>
      </div>
    </div>
  );
};

export default Milestones;
