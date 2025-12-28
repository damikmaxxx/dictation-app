import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Row, Col, Empty, Button, Typography, Space } from 'antd';
import { PlusOutlined, EditOutlined } from '@ant-design/icons';
import { DictationCard, type Dictation } from 'entities/dictation';
import { DeleteDictationButton } from 'features/delete-dictation';
import { ROUTES } from 'shared/config'; 

const { Title } = Typography;

interface DictationListWidgetProps {
  items: Dictation[];
  isLoading: boolean;
  mode: 'my' | 'public';
}

export const DictationListWidget: React.FC<DictationListWidgetProps> = ({ 
  items, 
  isLoading, 
  mode 
}) => {
  const navigate = useNavigate();

  if (isLoading) return null;

  if (items.length === 0) {
    if (mode === 'my') {
      return (
        <div style={{ background: '#fff', padding: 60, borderRadius: 12, textAlign: 'center', border: '1px dashed #d9d9d9' }}>
          <Title level={4} style={{ marginBottom: 24 }}>Здесь будут диктанты, созданные вами</Title>
          <Button type="primary" size="large" icon={<PlusOutlined />} onClick={() => navigate(ROUTES.DICTATION_CREATE)}>
            Создать свой первый диктант
          </Button>
        </div>
      );
    }
    return <Empty description="Ничего не найдено" />;
  }

  return (
    <Row gutter={[24, 24]}>
      {items.map((dictation) => (
        <Col key={dictation.id} xs={24} sm={12} md={8} lg={6} xl={6}>
          <DictationCard 
            dictation={dictation} 
            onClick={(id) => navigate(ROUTES.DICTATION_RUN(id))} 
            
            extra={
              mode === 'my' ? (
                <Space>
                  <Button 
                    type="text" 
                    icon={<EditOutlined style={{ color: '#1677ff' }} />} 
                    onClick={(e) => {
                       e.stopPropagation();
                       navigate(ROUTES.DICTATION_EDIT(dictation.id)); 
                    }}
                  />
                  
                  <DeleteDictationButton id={dictation.id} title={dictation.title} />
                </Space>
              ) : undefined
            }
          />
        </Col>
      ))}

      {mode === 'my' && (
        <Col xs={24} sm={12} md={8} lg={6} xl={6}>
          <Button 
            type="dashed" 
            block 
            style={{ height: '100%', minHeight: 180, fontSize: 18, color: '#888', borderRadius: 8 }}
            onClick={() => navigate(ROUTES.DICTATION_CREATE)}
          >
            <PlusOutlined /> Создать новый
          </Button>
        </Col>
      )}
    </Row>
  );
};