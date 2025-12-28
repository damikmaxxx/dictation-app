import React from 'react';
import { Card, Typography, Avatar} from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { useAppSelector } from 'app/store/hooks';
import { HistoryTable } from 'widgets/HistoryTable';

const { Title, Text } = Typography;

export const ProfilePage: React.FC = () => {
  const user = useAppSelector((state) => state.user.user);

  return (
    <div style={{ maxWidth: 1000, margin: '0 auto', padding: '40px 20px' }}>
      
      <Card style={{ marginBottom: 30, borderRadius: 12 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 24 }}>
          <Avatar 
            size={80} 
            icon={<UserOutlined />} 
            style={{ backgroundColor: '#1677ff' }} 
          />
          <div>
            <Title level={3} style={{ margin: 0, marginBottom: 4 }}>
              {user?.name || 'Пользователь'}
            </Title>
            <Text type="secondary" style={{ fontSize: 16 }}>
              {user?.email}
            </Text>
          </div>
        </div>
      </Card>

      <div style={{ background: '#fff', padding: 24, borderRadius: 12, border: '1px solid #f0f0f0' }}>
        <Title level={4} style={{ marginBottom: 20 }}>История прохождений</Title>
        <HistoryTable />
      </div>

    </div>
  );
};