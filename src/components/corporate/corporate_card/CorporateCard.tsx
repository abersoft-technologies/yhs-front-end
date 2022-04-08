import { useState } from "react";
import styles from "../CorporateList.module.scss"
import { CorpCardInfo } from "../CorpInfo/CorpCardInfo";
import { Redirect } from '../../../../src/globalFunctions/redirect';

interface ICorporateCardProps {
    name: string;
    tags: string[];
    info: string;
}

const CorporateCard = ({name, tags, info }: ICorporateCardProps) => {

  return (
    <article className={styles.corporate_card} onClick={() => Redirect("/kontakter/foretag/foretagInfo")}>
      <div>{name}</div>
      <div>{tags ? tags[0] : "Ingar taggar"}</div>
      <div>{info ? info : "Ingen info anget"}</div>
    </article>
  )
};

export default CorporateCard;