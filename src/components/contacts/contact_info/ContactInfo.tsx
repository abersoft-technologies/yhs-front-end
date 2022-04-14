import InfoLayout from '../../../layout/infoLayout';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { useRouter } from 'next/router';

import styles from './ContactInfo.module.scss';

import LetterOfIntent from './LetterOfIntent';
import { ContactInfoCard } from './ContactInfoCard';
import { getContactRedux } from '../../../store/slice/contact';

const ContactInfo = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    if (!id) return;
    dispatch(getContactRedux(id));
  }, [id, dispatch, getContactRedux]);

  return (
    <InfoLayout>
      <div className={styles.info_canvas}>
        <LetterOfIntent />
      </div>
    </InfoLayout>
  );
};

export default ContactInfo;
