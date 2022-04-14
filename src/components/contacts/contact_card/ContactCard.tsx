import styles from '../Contactlist.module.scss';
import { useRouter } from "next/router"

interface IContactCardProps {
  firstName: string;
  lastName: string;
  company: string;
  role?: string;
  district?: string;
  status: string;
  email?: string;
  phoneNumber?: string;
  id?: string;
}

interface IStatusBoxProps {
  status: string;
}

const StatusBox = ({ status }: IStatusBoxProps) => {
  function setClassName() {
    switch (status) {
      case 'AF Bekräftad':
        return styles.green_box;
      case 'Dementerad':
        return styles.red_box;
      case 'Möte bokat':
        return styles.yellow_box;
      case 'Ny kontakt':
        return styles.blue_box;
      case 'AF skriven':
        return styles.green_box;
      default:
        break;
    }
  }
  function setTxt() {
    switch (status) {
      case 'confirmed':
        return 'AF Bekräftad';
      case 'denied':
        return 'Dementerad';
      case 'meeting':
        return 'Möte bokat';
      case 'new':
        return 'Ny kontakt';
      default:
        break;
    }
  }

  return (
    <div className={styles.status_box_container}>
      <div className={`${styles.status_box} ${setClassName()}`}>
        <span>{status}</span>
      </div>
    </div>
  );
};

const ContactCard = ({
  firstName,
  lastName,
  company,
  role,
  district,
  status,
  email,
  id
}: IContactCardProps) => {
  const router = useRouter();

  return (
  <article className={styles.contact_card} onClick={() => router.push(`kontakter/${id}`)}>
    <div>{firstName ? firstName + ' ' + lastName : 'Namn kan inte hittas'}</div>
    <div>
      <div>{company ? company : 'Ej angivet'}</div>
      <div>{role ? role : 'Ej angivet'}</div>
    </div>
    <div>{district ? district : 'Ej angivet'}</div>
    <StatusBox status={status} />
    <div>{email ? email : 'Ingen assosierad email'}</div>
  </article>
  )
};

export default ContactCard;
