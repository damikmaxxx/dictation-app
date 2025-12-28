import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Spin, Result, Button } from 'antd';
import { useGetDictationByIdQuery } from 'entities/dictation';
import { DictationSession } from 'features/dictation-run';
import { ROUTES } from 'shared/config';

export const DictationRunPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const { data: dictation, isLoading, isError } = useGetDictationByIdQuery(id || '');

  if (isLoading) return <div style={{ textAlign: 'center', marginTop: 100 }}><Spin size="large" /></div>;
  
  if (isError || !dictation) {
    return (
      <Result
        status="404"
        title="Диктант не найден"
        extra={<Button type="primary" onClick={() => navigate(ROUTES.DICTATION_LIST)}>В библиотеку</Button>}
      />
    );
  }

  if (!dictation.words || dictation.words.length === 0) {
    return (
      <Result
        status="warning"
        title="В этом диктанте нет слов"
        extra={<Button onClick={() => navigate(ROUTES.DICTATION_LIST)}>Назад</Button>}
      />
    );
  }

  return (
    <div style={{ minHeight: '100%', background: '#f0f2f5', padding: 20 }}>
      <DictationSession 
        dictationId={Number(dictation.id)} 
        words={dictation.words} 
        language={dictation.language}
        onFinish={(score) => {
          console.log('Finished with score:', score);
          navigate(ROUTES.DICTATION_LIST); 
        }}
      />
    </div>
  );
};