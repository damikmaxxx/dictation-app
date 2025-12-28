import React from 'react';
import { Table, Tag, Typography, Button, Spin } from 'antd';
import { useNavigate } from 'react-router-dom';
import { useGetMyHistoryQuery, HistoryItem } from 'entities/history';
import { ROUTES } from 'shared/config';

const { Text } = Typography;

export const HistoryTable: React.FC = () => {
  const navigate = useNavigate();
  
  const { data: history, isLoading } = useGetMyHistoryQuery();

  const columns = [
    {
      title: 'Дата',
      dataIndex: 'createdAt',
      key: 'date',
      render: (date: string) => new Date(date).toLocaleDateString(), 
    },
    {
      title: 'Диктант',
      dataIndex: ['dictation', 'title'], 
      key: 'title',
      render: (text: string, record: HistoryItem) => (
        <Button 
          type="link" 
          style={{ padding: 0 }} 
          onClick={() => navigate(ROUTES.DICTATION_RUN(record.dictation.id))}
        >
          {text}
        </Button>
      ),
    },
    {
      title: 'Язык',
      dataIndex: ['dictation', 'language'],
      key: 'language',
      render: (lang: string) => <Tag>{lang?.toUpperCase()}</Tag>,
    },
    {
      title: 'Результат',
      key: 'score',
      render: (_: any, record: HistoryItem) => {
        let color = 'green';
        if (record.score < 50) color = 'red';
        else if (record.score < 80) color = 'orange';

        return (
          <Tag color={color} style={{ minWidth: 50, textAlign: 'center' }}>
            {record.score}%
          </Tag>
        );
      },
    },
    {
      title: 'Детали',
      key: 'details',
      render: (record: HistoryItem) => (
        <Text type="secondary">
          {record.correctCount} из {record.totalWords} слов
        </Text>
      ),
    },
  ];

  if (isLoading) return <Spin />;

  return (
    <Table 
      dataSource={history} 
      columns={columns} 
      rowKey="id" 
      pagination={{ pageSize: 10 }} 
    />
  );
};