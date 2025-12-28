import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Form,  Row, Col, message, Spin } from 'antd';
import { Button } from 'shared/ui';
import { ROUTES } from 'shared/config';
import { useGetDictationByIdQuery, useUpdateDictationMutation } from 'entities/dictation';

import { MainInputs, SettingsSidebar,DictationFormLayout } from 'entities/dictation';
import { findInvalidWords, parseWords } from 'shared/lib';

interface EditDictationFormProps {
  dictationId: string | number;
}

export const EditDictationForm: React.FC<EditDictationFormProps> = ({ dictationId }) => {
  const navigate = useNavigate();
  const [form] = Form.useForm();

  const { data: dictation, isLoading: isFetching } = useGetDictationByIdQuery(dictationId);
  
  const [updateDictation, { isLoading: isSaving }] = useUpdateDictationMutation();

  useEffect(() => {
    if (dictation) {
      const wordsString = dictation.words?.map((w) => w.text).join(', ') || '';

      form.setFieldsValue({
        title: dictation.title,
        description: dictation.description,
        language: dictation.language,
        isPublic: dictation.isPublic,
        wordsString: wordsString,
      });
    }
  }, [dictation, form]);

  const onFinish = async (values: any) => {
    try {
      const wordsArray = parseWords(values.wordsString);

      if (!wordsArray || wordsArray.length === 0) {
        message.error('Список слов пуст!');
        return;
      }
      const invalidWords = findInvalidWords(wordsArray, values.language);
      console.log(invalidWords,values)
      if (invalidWords.length > 0) {
        const badWordsStr = invalidWords.slice(0, 3).join(', ');
        message.error(`Ошибка! Слова содержат недопустимые символы (${values.language}): ${badWordsStr}...`);
        return; 
      }
      
      const wordsObjects = wordsArray.map((wordText) => ({
        text: wordText,
      }));

      await updateDictation({
        id: Number(dictationId),
        title: values.title,
        description: values.description,
        language: values.language,
        isPublic: values.isPublic,
        words: wordsObjects,
      }).unwrap();

      message.success('Диктант обновлен!');
      navigate(ROUTES.DICTATION_LIST);

    } catch (err) {
      console.error(err);
      message.error('Ошибка сохранения');
    }
  };

  if (isFetching) {
    return <div style={{ textAlign: 'center', padding: 50 }}><Spin size="large" /></div>;
  }

  return (
    <DictationFormLayout title="Редактирование диктанта">

        <Form
          form={form}
          layout="vertical"
          onFinish={onFinish}
          requiredMark={false}
          size="large"
        >
          <Row gutter={[40, 40]}>
            <Col xs={24} md={16}>
              <MainInputs form={form} isLoading={isSaving} />
            </Col>

            <Col xs={24} md={8}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
                <SettingsSidebar form={form}  />
                
                <Button 
                  type="primary" 
                  htmlType="submit" 
                  size="large" 
                  loading={isSaving} 
                  block
                >
                  Сохранить
                </Button>
                
                <Button onClick={() => navigate(-1)} block>
                  Отмена
                </Button>
              </div>
            </Col>
          </Row>
        </Form>
    </DictationFormLayout>
  );
};