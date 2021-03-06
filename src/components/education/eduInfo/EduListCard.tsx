import styles from "./EduInfo.module.scss"

interface IEduCardProps {
    name?: string;
    shortName?: string;
    type?: string;
    managementList?: string[];
    person?: string;
    place?: string;
    _id?: string;
}

const EduListCard = ({
    place,
    shortName,
    type,
    person
  }: IEduCardProps) => {
    return (<>
    <article className={styles.edu_card} >
      <div>{shortName}</div>
      <div>{type}</div>
      <div>{person ? person : "Ingen"}</div>
      <div>{place ? place : "Ingen ort"}</div>
    </article>
    </>)
  };

  export default EduListCard;