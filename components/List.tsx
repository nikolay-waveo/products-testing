import { Card, EmptySearchResult, ResourceItem, ResourceList, TextContainer, Toast } from '@shopify/polaris';
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
  const [hasError, setHasError] = useState(false)
  const [errorMessage, setErrorMessage] = useState("")

  const onLoading = useCallback(
    () => {
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
      code, 
      message,
    }) => {
      if(code === "not_publishing") {
        setErrorMessage(message)
        setHasError(true)
      } else {
        listUpdateHandler([
          ...list,
          {
            storeURL: shop,
            id: inventoryLocationId,
            status: status,
          }
        ])
      } 
    })
  }
  
  // ------------------------------------------------------------

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

  const toggleHasError = useCallback(() => setHasError((hasError) => !hasError),[])

  const errorToastMarkup = hasError ? (
    <Toast content={errorMessage} error onDismiss={toggleHasError} />
  ) : null;

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
            id: "modalInput",
            label: "Store Subscription Link",
            placeholder: "Example: store.myshopify.com",
            requiredIndicator: true,
            errorMessage: "Invalid input",
            errorHandler: (input) => {
              // Error checking for shopify store name URLs
              const storeURLPattern = /(\w+-)*\w+(.myshopify.com)/
              if(!input) return true
              return !storeURLPattern.test(input)
            }
          }}
          toast={{
            content: "Request Sent",
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

        { errorToastMarkup }
      </Card.Section>
    </Card>
  )
}

export default List
