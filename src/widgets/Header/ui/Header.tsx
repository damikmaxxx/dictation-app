import React from 'react';
import { Link, useNavigate, NavLink } from 'react-router-dom';

import { useTranslation } from 'react-i18next';
import { LangSwitcher } from 'features/lang-switcher'; 

import { Button } from 'shared/ui';
import { ROUTES } from 'shared/config';
import { useAppDispatch, useAppSelector } from 'app/store/hooks';
import { logout } from 'entities/user';
import { baseApi } from 'shared/api/baseApi';
import classNames from 'classnames';
import styles from './Header.module.scss';

export const Header: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { isAuth, user } = useAppSelector((state) => state.user);
  const { t } = useTranslation('common'); 

  const handleLogout = () => {
    dispatch(logout());
    dispatch(baseApi.util.resetApiState());
    navigate(ROUTES.LOGIN);
  };

  const getLinkClass = ({ isActive }: { isActive: boolean }) => 
    classNames(styles.link, { [styles.active]: isActive });

  return (
    <header className={styles.header}>
      <Link to={ROUTES.HOME} className={styles.logo}>
        DictationApp
      </Link>

      {isAuth && (
        <nav className={styles.nav}>
          <NavLink to={ROUTES.DICTATION_LIST} className={getLinkClass} end>
            {t('header.library')} 
          </NavLink>

          <NavLink to={ROUTES.DICTATION_CREATE} className={getLinkClass}>
            {t('header.create')}
          </NavLink>

          <NavLink to={ROUTES.PROFILE} className={getLinkClass}>
            {t('header.profile')}
          </NavLink>
        </nav>
      )}

      <div className={styles.actions}>
        <LangSwitcher />

        {isAuth ? (
          <>
            <span>{user?.name || 'User'}</span>
            <Button size="large" onClick={handleLogout}>
              {t('header.logout')}
            </Button>
          </>
        ) : (
          <>
            <Link to={ROUTES.LOGIN}>
              <Button size="large">{t('header.login')}</Button>
            </Link>
            <Link to={ROUTES.REGISTER}>
              {/* Для регистрации ключа в JSON мы не добавили, давай пока оставим текст или добавь в JSON ключ "register" */}
              <Button type="primary" size="large">Регистрация</Button>
            </Link>
          </>
        )}
      </div>
    </header>
  );
};