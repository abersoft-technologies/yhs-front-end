import styles from './Buttons.module.scss';

interface IPropsButton {
  text: string;
  width?: string;
  color?: 'primary' | 'primary-dark';
  onClick?: () => void;
  iconRight?: JSX.Element;
}

const setColorClass = (color: string | undefined) => {
  if (!color) return styles.primary_color_btn;

  switch (color) {
    case 'primary':
      return styles.primary_color_btn;
      break;
    case 'primary-dark':
      return styles.primary_color_btn;
    default:
      break;
  }
};

export const FilledButton = ({ text, onClick, color, width }: IPropsButton) => {
  return (
    <button
      onClick={onClick}
      style={width ? { width: width } : { width: 'auto' }}
      className={`${styles.button} ${styles.button_filled} ${setColorClass(
        color
      )}`}
    >
      {text}
    </button>
  );
};

export const OutlinedButton = ({
  text,
  onClick,
  color,
  width,
  iconRight
}: IPropsButton) => {
  return (
    <button
      onClick={onClick}
      style={width ? { width: width } : { width: 'auto' }}
      className={`${styles.button} ${iconRight ? styles.button_icon : ''} ${styles.button_outlined} ${setColorClass(
        color
      )}`}
    >
      {text}
      {iconRight ? iconRight : null}
    </button>
  );
};
