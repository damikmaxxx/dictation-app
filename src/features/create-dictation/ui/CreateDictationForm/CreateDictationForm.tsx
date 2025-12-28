import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Form, Row, Col, message } from 'antd';
import { ROUTES } from 'shared/config';
import { useCreateDictationMutation, MainInputs, SettingsSidebar, DictationFormLayout } from 'entities/dictation';
import { parseWords } from 'shared/lib/string/parseWords';
import { findInvalidWords } from 'shared/lib/validation/languageValidator';
import { Button } from 'shared/ui';

interface DictationFormValues {
  title: string;
  description?: string;
  language: string;
  isPublic: boolean;
  wordsString: string;
}

export const CreateDictationForm: React.FC = () => {
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const [createDictation, { isLoading }] = useCreateDictationMutation();

  const onFinish = async (values: DictationFormValues) => {
    try {
      const rawWords = parseWords(values.wordsString);

      if (rawWords.length === 0) {
        message.error('Список слов пуст!');
        return;
      }


      const invalidWords = findInvalidWords(rawWords, values.language);

      if (invalidWords.length > 0) {
        const badWordsStr = invalidWords.slice(0, 3).join(', ');
        message.error(`Ошибка! Слова содержат недопустимые символы для этого языка: ${badWordsStr}...`);
        return;
      }


      const wordsObjects = rawWords.map((wordText) => ({
        text: wordText,
      }));

      await createDictation({
        title: values.title,
        description: values.description,
        language: values.language,
        isPublic: values.isPublic,
        words: wordsObjects,
      }).unwrap();

      message.success('Диктант успешно создан!');
      navigate(ROUTES.DICTATION_LIST);

    } catch (err) {
      console.error(err);
      message.error('Ошибка создания');
    }
  };

  return (
    <DictationFormLayout title="Создание нового диктанта">
      <Form
        form={form}
        layout="vertical"
        onFinish={onFinish}
        initialValues={{ isPublic: true, language: 'ru' }}
        requiredMark={false}
        size="large"
      >
        <Row gutter={[40, 40]}>
          <Col xs={24} md={14}>
            <MainInputs form={form} isLoading={isLoading} />
          </Col>

          <Col xs={24} md={10}>
            <SettingsSidebar form={form} />
            <Button
              type="primary"
              htmlType="submit"
              size="large"
              loading={isLoading}
              block
            >
              Создать диктант
            </Button>
          </Col>
        </Row>
      </Form>
    </DictationFormLayout>
  );
};