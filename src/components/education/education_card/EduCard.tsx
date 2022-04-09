import styles from "../EduList.module.scss"

interface ICorporateCardProps {
    name: string;
    place: string[];
}

const EduCard = ({
    name,
    place,
  }: ICorporateCardProps) => (
    <article className={styles.corporate_card}>
      <div>{name}</div>
      <div>{place ? place[0] : "Ingen ort"}</div>
    </article>
  );

  export default EduCard;