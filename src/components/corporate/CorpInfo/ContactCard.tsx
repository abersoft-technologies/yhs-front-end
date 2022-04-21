import styles from './CorpCardInfo.module.scss';
import Link from "next/link"

interface IContactCardProps {
  firstName?: string;
  lastName?: string;
  role?: string;
  district?: string;
  email?: string;
  id?: string;
}

const ContactCard = ({
  firstName,
  lastName,
  role,
  district,
  email,
  id
}: IContactCardProps) => {
  return (<Link href={`/kontakter/${id}`}><article className={styles.contact_card}>
    <div>{firstName ? firstName + ' ' + lastName : 'Namn kan inte hittas'}</div>
    <div>{role ? role : 'Ej angivet'}</div>
    <div>{district ? district : 'Ej angivet'}</div>
    <div>{email ? email : 'Ingen assosierad email'}</div>
  </article></Link>)
};

export default ContactCard;
