import { useState } from "react";
import styles from "../CorporateList.module.scss"
import { CorpCardInfo } from "../CorpInfo/CorpCardInfo";
import { Redirect } from '../../../../src/globalFunctions/redirect';
import { useRouter } from 'next/router';


interface ICorporateCardProps {
    name: string;
    tags: string[];
    info: string;
    id: string;
}

const CorporateCard = ({name, tags, info, id }: ICorporateCardProps) => {
  const router = useRouter();

  return (
    <article id={id} className={styles.corporate_card} onClick={(e) => router.push(`/kontakter/foretag/${name}/${e.currentTarget.id}`)}>
      <div>{name}</div>
      <div>{tags ? tags[0] : "Ingar taggar"}</div>
      <div>{info ? info : "Ingen info anget"}</div>
    </article>
  )
};

export default CorporateCard;