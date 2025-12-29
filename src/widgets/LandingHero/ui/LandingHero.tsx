import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from 'shared/ui';
import { ROUTES } from 'shared/config';
import { useAppSelector } from 'app/store/hooks';
import styles from './LandingHero.module.scss';
import { useTranslation } from 'react-i18next';
export const LandingHero: React.FC = () => {
  const navigate = useNavigate();
  const isAuth = useAppSelector((state) => state.user.isAuth);
  const { t } = useTranslation('landing'); 
  const handleStart = () => {
    if (isAuth) {
      navigate(ROUTES.DICTATION_LIST);
    } else {
      navigate(ROUTES.LOGIN);
    }
  };

  return (
    <section className={styles.section}>
      <div className={styles.content}>
        <h1 className={styles.title}>
          {t('hero.title')}
        </h1>
        <p className={styles.description}>
          {t('hero.description')}
        </p>
        
        <Button 
          type="primary" 
          size='large'
          className={styles.button} 
          onClick={handleStart}
        >
          {t('hero.start_button')}
        </Button>
      </div>

      <div className={styles.imageWrapper}>
      </div>
    </section>
  );
};