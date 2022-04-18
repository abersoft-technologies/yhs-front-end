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
    place
  }: IEduCardProps) => {
    return (<>
    <article className={styles.edu_contact_card} >
      <div>{name}</div>
      <div>{place}</div>
      <div>{email}</div>
      <div>{phone}</div>
    </article>
    </>)
  };

  export default ManagementListCard;