import styles from "../CorporateList.module.scss"

interface ICorporateCardProps {
    name: string;
    tags: string[];
    info: string;
}

const CorporateCard = ({
    name,
    tags,
    info,
  }: ICorporateCardProps) => (
    <article className={styles.corporate_card}>
      <div>{name}</div>
      <div>{tags ? tags[0] : "Ingar taggar"}</div>
      <div>{info ? info : "Ingen info anget"}</div>
      {/* <div>
        <div>{company ? company : 'Ej angivet'}</div>
        <div>{role ? role : 'Ej angivet'}</div>
      </div> */}
      {/* <div>{district ? district : 'Ej angivet'}</div> */}
      {/* <StatusBox status={status} /> */}
      {/* <div>{email ? email : 'Ingen assosierad email'}</div> */}
    </article>
  );

  export default CorporateCard;