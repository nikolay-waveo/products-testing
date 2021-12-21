import { Card, Tabs, TextStyle } from '@shopify/polaris';
import React, { SetStateAction, useCallback, useState } from 'react';

interface ITestingCard {
  user: string, 
  setUser: React.Dispatch<SetStateAction<string>>
}

const TestingCard: React.FC<ITestingCard> = ({
  user,
  setUser,
}) => {

  const [selected, setSelected] = useState(0);

  const handleTabChange = useCallback(
    (selectedTabIndex) => {
      setSelected(selectedTabIndex)
      switch(selectedTabIndex) {
        case 0: 
          return setUser("dev-subscriber.myshopify.com")
        case 1: 
          return setUser("dev-publisher.myshopify.com")
        case 2: 
          return setUser("testing-pub-dev.myshopify.com")
        default: 
          return setUser("dev-subscriber.myshopify.com")
      }
    },
    [setUser],
  );

  const tabs = [
    {
      id: 'dev-subscribe',
      content: 'Publish and Subscribe',
      panelID: 'dev-subscribe-content',
    },
    {
      id: 'dev-publish',
      content: 'Publish',
      panelID: 'dev-publish-content',
    },
    {
      id: 'dev-test',
      content: 'Subscribe Only',
      panelID: 'dev-test-content',
    },
  ];

  return (
    <Card>
      <Tabs tabs={tabs} selected={selected} onSelect={handleTabChange}>
        <Card.Section title={tabs[selected].content}>
          <p>Selected store: <TextStyle variation="strong">{user}</TextStyle></p>
        </Card.Section>
      </Tabs>
    </Card>
  )
}

export default TestingCard
