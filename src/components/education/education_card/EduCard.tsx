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
    <article className={styles.corporate_card} onClick={openInfoCard}>
      <div>{name}</div>
      <div>{shortName}</div>
      <div>{type}</div>
      <div>{managementList[0] ? managementList[0] : "Ingen ledningsgrupp"}</div>
      <div>{place ? place : "Ingen ort"}</div>
    </article>
    </>
  );

  export default EduCard;