import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../store/store';
import { useEffect } from 'react';
import { useRouter } from 'next/router';

import styles from './ContactInfo.module.scss';

import InfoLayout from '../../../layout/infoLayout';
import LetterOfIntent from './LetterOfIntent';
import { ContactInfoCard } from './ContactInfoCard';
import { getContactRedux } from '../../../store/slice/contact';

const ContactInfo = () => {
  const contact = useSelector(
    (state: RootState) => state.contactReducer.result
  );
  const dispatch = useDispatch();
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    if (!id) return;
    dispatch(getContactRedux(id));
  }, [id, dispatch, getContactRedux]);

  const getInitails = () => {
    return `${
      contact?.firstName?.substring(0, 1).toLocaleUpperCase() +
      ' ' +
      contact?.lastName?.substring(0, 1).toLocaleUpperCase()
    }`;
  };
  const getFormatedName = () => {
    if (!contact?.firstName) return;
    let firstName = contact?.firstName?.toLocaleLowerCase();
    let lastName = contact?.lastName?.toLocaleLowerCase();
    const fullName =
      firstName[0].toLocaleUpperCase() +
      firstName.substring(1) +
      ' ' +
      lastName[0].toLocaleUpperCase() +
      lastName.substring(1);
    return fullName;
  };

  return (
    <InfoLayout
      title={getInitails()}
      subTitle={getFormatedName()}
      place={[contact.company + ' - ' + contact.role]}
      // tags={[contact.email ? contact.email : '']}
      contact={contact}
    >
      <div className={styles.info_canvas}>
        <LetterOfIntent />
      </div>
    </InfoLayout>
  );
};

export default ContactInfo;
