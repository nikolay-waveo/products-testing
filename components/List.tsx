import { Card, EmptySearchResult, ResourceItem, ResourceList, TextContainer } from '@shopify/polaris';
import React, { useState } from 'react';
import { IList } from 'types';
import AddModal from './AddModal';
import Item from './Item';

const List: React.FC<IList> = ({
  list,
  listUpdateHandler,
  listText,
  canAddToList,
  emptyListText,
  canAcceptConnection,
}) => {
  const [modalOpen, setModalOpen] = useState(false)

  const onDisconnect = (id: string) => {
    const newList = list.filter((item) => item.id !== id);
    listUpdateHandler(newList);
  }

  const onConnect = (id: string) => {
    // Set store to active
    // Update list
    const newList = list.map((item) => item.id === id ? {...item, status: "active"} : item )
    listUpdateHandler(newList);
  }

  const sortedList = list
    .map((item) => { 
      return {...item, status: item.status.toUpperCase()}
    })
    .sort((item) => {
      if(item.status === "PENDING") return -1
      return 1
    })
    
  const resourceName = {
    singular: 'Subscriber',
    plural: 'Subscribers',
  };

  let cardProps = {}

  if(canAddToList) cardProps["actions"] = {
    content: "New Subscription",
    onAction: () => setModalOpen(!modalOpen),
  };

  const emptyStateMarkup = (
    <EmptySearchResult
      title={emptyListText.title}
      description={emptyListText.description}
      withIllustration
    />
  );

  return (
    <Card 
      title={ listText.title }
      {...cardProps}>
      <Card.Section>
        <TextContainer>
            { listText.description}
          </TextContainer>
      </Card.Section>

      <Card.Section>
        <AddModal 
          modalOpen={modalOpen}
          modalHandler={setModalOpen}
          list={list} 
          listUpdateHandler={listUpdateHandler} 
          canAddToList />

        <ResourceList 
          resourceName={resourceName}
          items={sortedList} 
          emptyState={emptyStateMarkup}
          renderItem={(item) => { 
            return (
              <ResourceItem
                id={item.id}
                accessibilityLabel={`View details for ${item.storeURL}`}
                onClick={() => {}}>
                <Item 
                  item={item}
                  onDisconnect={onDisconnect}
                  onConnect={onConnect}
                  canAcceptConnection={canAcceptConnection} />
                </ResourceItem> 
              )
            }} />
      </Card.Section>
    </Card>
  )
}

export default List
