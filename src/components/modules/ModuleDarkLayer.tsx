import React from 'react';

import styles from './Module.module.scss';

interface ILayerProps {
  active: boolean;
}

const ModuleDarkLayer = ({ active }: ILayerProps) => {
  return (
    <div
      className={`${styles.module_dark_layer} ${
        active && styles.dark_layer_active
      }`}
    ></div>
  );
};

export default ModuleDarkLayer;
