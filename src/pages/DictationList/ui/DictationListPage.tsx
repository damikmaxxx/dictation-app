import React, { useState, useMemo } from 'react';
import { Typography, Segmented } from 'antd';
import { useGetDictationsQuery, useGetPublicDictationsQuery } from 'entities/dictation';
// import { useAppSelector } from 'app/store/hooks';
import styles from './DictationListPage.module.scss';

import { DictationSidebarFilters } from 'features/dictation-filters';
import { DictationListWidget } from 'widgets/DictationList';
import { Loader } from 'shared/ui';

const { Title } = Typography;

export const DictationListPage: React.FC = () => {
  // const myUserId = useAppSelector((state) => state.user.user?.id);

  const [activeTab, setActiveTab] = useState<'my' | 'public'>('my');
  const [language, setLanguage] = useState<string | null>(null);
  const {
    data: myDictations,
    isLoading: isMyLoading
  } = useGetDictationsQuery(undefined, { skip: activeTab !== 'my' });

  const {
    data: publicDictations,
    isLoading: isPublicLoading
  } = useGetPublicDictationsQuery(undefined, { skip: activeTab !== 'public' });

  const currentData = activeTab === 'my' ? myDictations : publicDictations;
  const isLoading = activeTab === 'my' ? isMyLoading : isPublicLoading;

  const filteredList = useMemo(() => {
    if (!currentData) return [];

    return currentData.filter((d) => {
      if (language && d.language !== language) return false;
      return true;
    });
  }, [currentData, language]);

  return (
    <div className={styles.pageWrapper}>

      <aside className={styles.sidebar}>
        <DictationSidebarFilters
          language={language}
          onChangeLanguage={setLanguage}
        />
      </aside>

      <main className={styles.content}>

        <div className={styles.header}>
          <Title level={2}>Библиотека</Title>
          <Segmented
            options={[
              { label: 'Ваши диктанты', value: 'my' },
              { label: 'Пользователей', value: 'public' },
            ]}
            value={activeTab}
            onChange={(val) => setActiveTab(val as 'my' | 'public')}
            size="large"
          />
        </div>

        {isLoading ? <Loader /> : (
          <DictationListWidget
            items={filteredList}
            mode={activeTab}
            isLoading={isLoading}
          />
        )}
      </main>

    </div>
  );
};