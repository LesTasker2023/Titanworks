// Disabled for build - ESLint Storybook config issues
// TODO: Fix @storybook/react import configuration

import { Card } from './card';

export default {
  title: 'UI/Card',
  component: Card,
};

export const Default = {
  render: () => <Card>Simple Card</Card>,
};
