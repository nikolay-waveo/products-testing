import { Card, EmptySearchResult, ResourceItem, ResourceList, TextContainer } from '@shopify/polaris';
import { usePublish } from 'hooks/usePublish';
import { useSubscribe } from 'hooks/useSubscribe';
import React, { useCallback, useEffect, useState } from 'react';
import { IList } from 'types';
import AddModal from './AddModal';
import Item from './Item';

const List: React.FC<IList> = ({
  user,
  listType,
  list,
  listUpdateHandler,
  listText,
  canAddToList,
  emptyListText,
}) => {
  const [modalOpen, setModalOpen] = useState(false)

  const [isLoading, setIsLoading] = useState(false)

  const onLoading = useCallback(
    () => {
      //TODO Check if undefined
    },
    [list],
  )

  useEffect(() => {
    onLoading()
  }, [list, isLoading, onLoading])

  const {
    useSETShopPublishSettings: setPublish,
    useDELETEShopPublishSettings: deletePublish,
  } = usePublish()

  const {
    useDELETEShopSubscribeSettings: deleteSubscribe
  } = useSubscribe()

  const onDisconnect = (store: string, subscribed?: string) => {
    if(listType === "publishTo") {

      if(subscribed === "active") {
        deletePublish({
          origin: user,
          publisherShop: store,
        })
      }
      else {
        setPublish({
          origin: user,
          publisherShop: store,
          accept: false,
        })
      }
      
    }
    if(listType === "subscribeTo") {
      deleteSubscribe({
        origin: user,
        subscriberShop: store
      })
    }
    const newList = list.filter((item) => item.storeURL !== store);
    listUpdateHandler(newList);
  }

  const onConnect = (store: string) => {
    setPublish({
      origin: user,
      publisherShop: store,
      accept: true,
    })
    const newList = list.map((item) => item.storeURL === store ? {...item, status: "active"} : item )
    listUpdateHandler(newList);
  }

  const sortedList = list
    .sort((item) => {
      if(item.status === "pending") return -1
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
          user={user}
          modalOpen={modalOpen}
          modalHandler={setModalOpen}
          list={list} 
          listUpdateHandler={listUpdateHandler} 
          canAddToList />

        <ResourceList 
          resourceName={resourceName}
          items={sortedList} 
          emptyState={emptyStateMarkup}
          loading={isLoading}
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
                  listType={listType} />
                </ResourceItem> 
              )
            }} />
      </Card.Section>
    </Card>
  )
}

export default List
