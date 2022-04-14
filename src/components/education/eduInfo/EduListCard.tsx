import styles from "./EduInfo.module.scss"

interface ICorporateCardProps {
    name?: string;
    shortName?: string;
    type?: string;
    managementList?: string[];
    place?: string;
    _id?: string;
}

const EduListCard = ({
    place,
    shortName,
    type,
  }: ICorporateCardProps) => {
    return (<>
    <article className={styles.edu_card} >
      <div>{shortName}</div>
      <div>{type}</div>
      <div>{place ? place : "Ingen ort"}</div>
    </article>
    </>)
  };

  export default EduListCard;