import React, { ReactNode } from 'react';
import { Flex } from '../components/ui/Flex';

import styles from '../../styles/infoLayout.module.scss';
import { Text } from '../components/ui/text/Text';
import { IContactSchema } from '../types/global';

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
          <Flex direction='row'  class={styles.placeContainer}>
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
                ? tags.map((item, i) => {
                    return (
                      <Text
                        mX='x-small'
                        key={i}
                        text={item + ', '}
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
                <Text text={contact.phoneNumber} color='grey' />
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
