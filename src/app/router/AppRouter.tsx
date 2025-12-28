import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { ROUTES } from 'shared/config';

import { 
  LandingPage, 
  LoginPage, 
  RegisterPage, 
  DictationCreatePage,
  DictationListPage,
  DictationEditPage,
  DictationRunPage,
  ProfilePage,
} from 'pages';

export const AppRouter: React.FC = () => {
  return (
    <Routes>
      <Route path={ROUTES.HOME} element={<LandingPage />} />
      <Route path={ROUTES.LOGIN} element={<LoginPage />} />
      <Route path={ROUTES.REGISTER} element={<RegisterPage />} />
      <Route path={ROUTES.DICTATION_LIST} element={<DictationListPage />} />
      <Route path={ROUTES.DICTATION_CREATE} element={<DictationCreatePage />} />
      <Route path={ROUTES.PROFILE} element={<ProfilePage />} />
      <Route path="/dictations/:id/run" element={<DictationRunPage />} />
      <Route path="/dictations/:id/edit" element={<DictationEditPage />} />
      <Route path="*" element={<div style={{ textAlign: 'center', marginTop: 50 }}>404 Страница не найдена</div>} />
    </Routes>
  );
};