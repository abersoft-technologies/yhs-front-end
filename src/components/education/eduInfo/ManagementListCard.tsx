import Link from "next/link";
import styles from "./EduInfo.module.scss"

interface IEduCardProps {
    name?: string;
    phone?: string;
    email?: string,
    place?: string;
    _id?: string;
}

const ManagementListCard = ({
    name,
    phone,
    email,
    place,
    _id
  }: IEduCardProps) => {
    return (<Link href={`/kontakter/${_id}`} passHref={true}>
    <article className={styles.edu_contact_card} >
      <div>{name}</div>
      <div>{place}</div>
      <div>{email}</div>
      <div>{phone}</div>
    </article>
    </Link>)
  };

  export default ManagementListCard;