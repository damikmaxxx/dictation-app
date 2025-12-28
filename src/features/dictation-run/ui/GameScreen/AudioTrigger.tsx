import React from 'react';
import { Button } from 'antd';
import { SoundOutlined } from '@ant-design/icons';

interface AudioTriggerProps {
  onClick: () => void;
  isSpeaking: boolean;
}

export const AudioTrigger: React.FC<AudioTriggerProps> = ({ onClick, isSpeaking }) => {
  return (
    <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 40 }}>
      <Button
        type="default"
        shape="circle"
        onClick={onClick}
        disabled={isSpeaking} 
        style={{
          width: 120,
          height: 120,
          fontSize: 40,
          boxShadow: '0 4px 15px rgba(0,0,0,0.1)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: isSpeaking ? '#1677ff' : undefined, 
          borderColor: isSpeaking ? '#1677ff' : undefined,
        }}
      >
        <SoundOutlined />
      </Button>
    </div>
  );
};