import { useState } from "react";
import styles from "../CorporateList.module.scss"
import { CorpCardInfo } from "../CorpInfo/CorpCardInfo";
import { Redirect } from '../../../../src/globalFunctions/redirect';
import { useRouter } from 'next/router';


interface ICorporateCardProps {
    name: string;
    tags: string[];
    branch?: string;
    info: string;
    id: string;
}

const CorporateCard = ({name, tags, info, id, branch }: ICorporateCardProps) => {
  const router = useRouter();

  const createInfoText = (): string => {
    if(!info) return "Ingen info anget";
    if(info.length > 20) return info.slice(0, 20) + "...";
    return info;
  }

  return (
    <article id={id} className={styles.corporate_card} onClick={(e) => router.push(`/kontakter/foretag/${name}/${e.currentTarget.id}`)}>
      <div>{name}</div>
      <div>{tags ? tags[0] : "Ingar taggar"}</div>
      <div>{branch ? branch : "Ingen branch"}</div>
      <div>{createInfoText()}</div>
    </article>
  )
};

export default CorporateCard;