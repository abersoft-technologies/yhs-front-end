import React, { ReactNode } from 'react';
import { Flex } from '../components/ui/Flex';
import { Text } from '../components/ui/text/Text';
import { IContactSchema } from '../types/global';
import { is } from 'immer/dist/internal';

import styles from '../../styles/infoLayout.module.scss';

interface IInfoLayoutProps extends ICorpProps, IEduProps {
  children: ReactNode;
  title?: string;
  subTitle?: string;
  info?: string;
  contact?: IContactSchema;
}

interface ICorpProps {
  place?: string[];
  tags?: string[];
}

interface IEduProps {
  shortName?: string;
}

const InfoLayout = ({
  children,
  info,
  subTitle,
  title,
  place,
  tags,
  shortName,
  contact,
}: IInfoLayoutProps) => {
  const formatPhoneNumber = () => {
    if (contact && contact.phoneNumber) {
      let number;
      if (contact.phoneNumber[0] === '0') {
        number = ('+46' + contact.phoneNumber.substring(1)).replace(/\s/g, '');
      } else {
        number = contact.phoneNumber.replace(/\s/g, '');
      }
      const finalFormat =
        number.substring(0, 3) +
        '-' +
        number.substring(3, 5) +
        ' ' +
        number.substring(5, 8) +
        ' ' +
        number.substring(8, 10) +
        ' ' +
        number.substring(10, 12);

      return finalFormat;

      // return contact.phoneNumber;
    }
    return 'Inget nummer angivet';
  };
  return (
    <Flex direction='row' class={styles.container}>
      <Flex direction='column' class={styles.sideLayout} align='center'>
        <Flex
          direction='column'
          justify='center'
          align='center'
          class={styles.topBox}
          gap='large'
        >
          <Flex
            direction='row'
            align='center'
            justify='center'
            class={styles.circleContainer}
          >
            <Text color='#363636' text={title ? title : ''} textSize='large' />
          </Flex>
          <Text text={subTitle ? subTitle : ''} textSize='medium' />
          <Flex direction='row' class={styles.placeContainer}>
            {place && place.length ? (
              place.map((item, i) => {
                return <Text mX='x-small' key={i} text={item} color='grey' />;
              })
            ) : (
              <Text
                mX='x-small'
                text={'Inga anknytta kontakter'}
                color='grey'
              />
            )}
          </Flex>
          {tags && (
            <Flex direction='row' wrap='wrap'>
              {tags
                ? tags.slice(0, 4).map((item, i) => {
                    let isLastI = false;
                    if (i === tags.length - 1) {
                      isLastI = true;
                    }
                    return (
                      <Text
                        mX='x-small'
                        key={i}
                        text={!isLastI ? item + ', ' : item}
                        color='grey'
                      />
                    );
                  })
                : null}
            </Flex>
          )}

          {(contact?.email || contact?.phoneNumber) && (
            <Flex
              direction='column'
              gap='medium'
              class={styles.email_number_container}
            >
              {contact.email && <Text text={contact.email} color='grey' />}
              {contact.phoneNumber && (
                <Text text={formatPhoneNumber()} color='grey' />
              )}
            </Flex>
          )}
        </Flex>
        <Flex
          class={styles.middleBox}
          direction='column'
          align='flex-start'
          width='full'
          gap='medium'
        >
          <Text text='Övrig information' textSize='large' />
          <Text text={info ? info : ''} color='grey' />
        </Flex>
        <Flex direction='column' class={styles.bottomBox} align='center'>
          <img src='/addPlusIcon.svg' alt='add button' width={'25px'} />
          <Text color='#464646' text='Lägg till text' />
        </Flex>
      </Flex>
      {children}
    </Flex>
  );
};

export default InfoLayout;
