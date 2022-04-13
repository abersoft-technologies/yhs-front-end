import styles from "../EduList.module.scss"
import { useRouter } from 'next/router';

interface ICorporateCardProps {
    name?: string;
    shortName: string;
    type: string;
    managementList?: string[];
    place: string;
    _id: string;
}

const EduCard = ({
    name,
    place,
    shortName,
    type,
    managementList,
    _id
  }: ICorporateCardProps) => {
    const router = useRouter();

    return (<>
    <article className={styles.edu_card} onClick={() => router.push(`/kontakter/utbildningar/${_id}`)}>
      <div>{name}</div>
      <div>{shortName}</div>
      <div>{type}</div>
      <div>{managementList && managementList.length ? managementList.length + " personer" : "Ingen ledningsgrupp"}</div>
      <div>{place ? place : "Ingen ort"}</div>
    </article>
    </>)
  };

  export default EduCard;