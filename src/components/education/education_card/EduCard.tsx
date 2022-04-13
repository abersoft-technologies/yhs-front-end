import styles from "../EduList.module.scss"
interface ICorporateCardProps {
    name: string;
    shortName: string;
    type: string;
    managementList: string[];
    place: string;
}

const openInfoCard = () => {

}

const EduCard = ({
    name,
    place,
    shortName,
    type,
    managementList
  }: ICorporateCardProps) => (
    <>
    <article className={styles.edu_card} onClick={openInfoCard}>
      <div>{name}</div>
      <div>{shortName}</div>
      <div>{type}</div>
      <div>{managementList.length ? managementList.length + " personer" : "Ingen ledningsgrupp"}</div>
      <div>{place ? place : "Ingen ort"}</div>
    </article>
    </>
  );

  export default EduCard;