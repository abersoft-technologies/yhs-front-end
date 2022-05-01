import styles from "../EduList.module.scss"
import { useRouter } from 'next/router';

interface ICorporateCardProps {
    name?: string;
    shortName: string;
    type: string;
    managementList?: string[];
    branch?: string;
    place: string;
    _id: string;
}

const EduCard = ({
    name,
    place,
    shortName,
    type,
    managementList,
    branch,
    _id
  }: ICorporateCardProps) => {
    const router = useRouter();

    const createManagementText = (): string => {
      if(managementList && managementList.length) {
        if(managementList.length === 1) return managementList.length + " person"
        else return managementList.length + " personer"
      }


      return "Ingen ledningsgrupp";
    }

    return (<>
    <article className={styles.edu_card} onClick={() => router.push(`/kontakter/utbildningar/${_id}`)}>
      <div>{name}</div>
      <div>{shortName}</div>
      <div>{type}</div>
      <div>{createManagementText()}</div>
      <div>{branch ? branch : "Ingen branch"}</div>
      <div>{place ? place : "Ingen ort"}</div>
    </article>
    </>)
  };

  export default EduCard;