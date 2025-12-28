import React from 'react';
import { List, Typography, Tag } from 'antd';
import { CheckCircleOutlined, CloseCircleOutlined } from '@ant-design/icons';
import { GameAnswer } from '../../model/types'; 

const { Text } = Typography;

interface ResultListProps {
  answers: GameAnswer[];
}

export const ResultList: React.FC<ResultListProps> = ({ answers }) => {
  return (
    <List
      itemLayout="horizontal"
      dataSource={answers}
      renderItem={(item) => (
        <List.Item>
          <div style={{ display: 'flex', alignItems: 'center', width: '100%', gap: 15 }}>
            
            {item.isCorrect ? (
              <CheckCircleOutlined style={{ color: '#52c41a', fontSize: 20 }} />
            ) : (
              <CloseCircleOutlined style={{ color: '#ff4d4f', fontSize: 20 }} />
            )}

            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 16, fontWeight: 500 }}>
                {item.word}
              </div>
              
              {!item.isCorrect && (
                <div style={{ marginTop: 4 }}>
                  <Text type="secondary" style={{ marginRight: 8 }}>Вы написали:</Text>
                  <Text type="danger" delete>{item.userInput}</Text>
                </div>
              )}
            </div>

            {item.isCorrect && <Tag color="success">Верно</Tag>}
          </div>
        </List.Item>
      )}
    />
  );
};