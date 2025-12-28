import React from 'react';
import { Spin, SpinProps } from 'antd';
import classNames from 'classnames'; // Утилита для объединения классов
import styles from './Loader.module.scss';

interface LoaderProps extends SpinProps {
  center?: boolean;      // Центрировать ли спиннер?
  fullScreen?: boolean;  // На весь экран?
}

export const Loader: React.FC<LoaderProps> = ({ 
  center = true, // По умолчанию пусть всегда центрируется (частый кейс)
  fullScreen = false,
  className,
  size = 'large', // По умолчанию большой
  ...rest 
}) => {
  
  // Собираем классы
  const containerClass = classNames({
    [styles.container]: center && !fullScreen,
    [styles.fullScreen]: fullScreen, // Стили для фуллскрина подключат и флексы
    [styles.container]: fullScreen,  // Добавляем флексы к фуллскрину
  }, className);

  // Если нужно центрировать - оборачиваем в div
  if (center || fullScreen) {
    return (
      <div className={containerClass}>
        <Spin size={size} {...rest} />
      </div>
    );
  }

  // Если нет - просто возвращаем Spin
  return <Spin size={size} className={className} {...rest} />;
};