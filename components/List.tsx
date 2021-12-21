import { Card, EmptySearchResult, ResourceItem, ResourceList, TextContainer } from '@shopify/polaris';
import { usePublish } from 'hooks/usePublish';
import { useSubscribe } from 'hooks/useSubscribe';
import React, { useCallback, useEffect, useState } from 'react';
import { IList } from 'types';
import Item from './Item';
import Modal from './Modal';

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
      const hasData = list
        .every(({
          storeURL,
          id,
          status
        }) => {
          return (
            storeURL === undefined ||
            id === undefined ||
            status === undefined
          )
        })
        
      if(!hasData) setIsLoading(true)
      else setIsLoading(false)
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

  // Modal handler ----------------------------------------------

  const {
    useSETShopSubscribeSettings: setSubscribe
  } = useSubscribe();

  const outgoingSubscriptionsHandler = (url: string) => {  

    //! Find a way to get inventoryLocationId
    // (url: string) => (id: string)
    const getStoreDataIfExists = (url: string): string => {
      console.log(url)
      return "10000000001"
    }
    const storeID = getStoreDataIfExists(url)
    // --------------------------------------
    
    setSubscribe({
      origin: user,
      subscriberShop: url,
      id: storeID,
    })
    .then(({
      shop,
      inventoryLocationId,
      status,
    }) => {
      console.log(shop, inventoryLocationId, status)
      listUpdateHandler([
        ...list,
        {
          storeURL: shop,
          id: inventoryLocationId,
          status: status,
        }
      ]) 
    })
  }

  // ------------------------------------------------------------

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
        <Modal
          title="Subscribe to a new store"
          content="You can add the store subscription link here to subscribe to that
            store and recieve product updates from them."
          isModalOpen={modalOpen}
          modalHandler={setModalOpen}
          primaryAction={{
            actionText: "Subscribe",
            actionHandler: (e) => outgoingSubscriptionsHandler(e)
          }}
          inputAction={{
            label: "Store Subscription Link",
            placeholder: "Example: store.myshopify.com",
          }}
          toast={{
            content: "Request sent",
            duration: 3000,
          }} />

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
                  loading={isLoading}
                  listType={listType} />
                </ResourceItem> 
              )
            }} />
      </Card.Section>
    </Card>
  )
}

export default List
