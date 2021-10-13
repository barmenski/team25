import React from 'react';
import { UserNav } from '../components/userNavigation/userNavigation';
import Members from '../components/members/Members';
import Issues from '../components/issues/Issues';
import SettingsForm from '../components/settings-form/SettingsForm';
import { MainLayout } from '../components/mainLayout/mainLayout';

const LobbyMasterPage = () => {
  return (
    <MainLayout>
      <UserNav />
      <Members />
      <Issues />
      <SettingsForm />
    </MainLayout>
  );
};

export default LobbyMasterPage;
