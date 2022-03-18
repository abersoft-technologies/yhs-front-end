import styles from '../Contactlist.module.scss';

interface IContactCardProps {
  i: number;
  name: string;
  company: string;
  role?: string;
  district?: string;
  status: string;
  contact_information?: { email: string; phone_number: string };
}

interface IStatusBoxProps {
  status: string;
}

const StatusBox = ({ status }: IStatusBoxProps) => {
  function setClassName() {
    switch (status) {
      case 'confirmed':
        return styles.green_box;
      case 'denied':
        return styles.red_box;
      case 'meeting':
        return styles.yellow_box;
      case 'new':
        return styles.blue_box;
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
        <span>{setTxt()}</span>
      </div>
    </div>
  );
};

const ContactCard = ({
  name,
  company,
  role,
  district,
  status,
  contact_information,
}: IContactCardProps) => (
  <article className={styles.contact_card}>
    <div>{name ? name : 'Namn kan  inte hittas'}</div>
    <div>
      <div>{company ? company : 'Ej angivet'}</div>
      <div>{role ? role : 'Ej angivet'}</div>
    </div>
    <div>{district ? district : 'Ej angivet'}</div>
    <StatusBox status={status} />
    <div>
      {contact_information?.email
        ? contact_information.email
        : 'Ingen assosierad email'}
    </div>
  </article>
);

export default ContactCard;
