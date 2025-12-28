import React from 'react';
import { Card, Result, Button } from 'antd';
import { ReloadOutlined, UnorderedListOutlined } from '@ant-design/icons';
import { GameAnswer } from '../../model/types';
import { ResultList } from './ResultList';

interface ResultScreenProps {
  answers: GameAnswer[];
  onRetry: () => void;
  onBack: () => void;
}

export const ResultScreen: React.FC<ResultScreenProps> = ({ answers, onRetry, onBack }) => {
  const correctCount = answers.filter((a) => a.isCorrect).length;
  const total = answers.length;
  const percent = Math.round((correctCount / total) * 100);

  let status: 'success' | 'warning' | 'error' = 'error';
  let title = 'Нужно потренироваться';
  
  if (percent === 100) {
    status = 'success';
    title = 'Великолепно! Ни одной ошибки 🎉';
  } else if (percent >= 70) {
    status = 'success';
    title = 'Хороший результат!';
  } else if (percent >= 40) {
    status = 'warning';
    title = 'Неплохо, но есть ошибки';
  }

  return (
    <div style={{ maxWidth: 700, margin: '0 auto', paddingTop: 20 }}>
      <Card bordered={false} style={{ boxShadow: '0 4px 20px rgba(0,0,0,0.05)' }}>
        
        <Result
          status={status}
          title={title}
          subTitle={`Вы набрали ${correctCount} из ${total} (${percent}%)`}
          extra={[
            <Button type="primary" key="retry" icon={<ReloadOutlined />} onClick={onRetry}>
              Попробовать снова
            </Button>,
            <Button key="back" icon={<UnorderedListOutlined />} onClick={onBack}>
              В список
            </Button>,
          ]}
        />

        <div style={{ marginTop: 20, borderTop: '1px solid #f0f0f0', paddingTop: 20 }}>
          <ResultList answers={answers} />
        </div>

      </Card>
    </div>
  );
};