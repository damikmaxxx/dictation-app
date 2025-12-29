import React from 'react';
import { useTranslation } from 'react-i18next';
import { Button, Dropdown, MenuProps } from 'antd';
import { GlobalOutlined } from '@ant-design/icons';

export const LangSwitcher: React.FC = () => {
  const { i18n } = useTranslation();

  // Функция смены языка
  const changeLanguage = (lang: string) => {
    i18n.changeLanguage(lang);
  };

  // Меню для дропдауна
  const items: MenuProps['items'] = [
    {
      key: 'ru',
      label: '🇷🇺 Русский',
      onClick: () => changeLanguage('ru'),
    },
    {
      key: 'en',
      label: '🇬🇧 English',
      onClick: () => changeLanguage('en'),
    },
  ];

  // Текущий язык (чтобы показать на кнопке)
  const currentLang = i18n.language.split('-')[0].toUpperCase(); // 'ru-RU' -> 'RU'

  return (
    <Dropdown menu={{ items }} placement="bottomRight" trigger={['click']} arrow>
      <Button icon={<GlobalOutlined />}>
        {currentLang}
      </Button>
    </Dropdown>
  );
};