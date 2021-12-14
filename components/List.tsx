import { Badge, Card, EmptySearchResult, ResourceItem, ResourceList, TextContainer, TextStyle } from '@shopify/polaris';
import React, { useState } from 'react';
import { IList } from 'types';
import AddModal from './AddModal';
import Options from './Options';

const List: React.FC<IList> = ({
  list,
  listUpdateHandler,
  listTitle,
  canAddToList,
  emptyListMessage,
  canAcceptConnection,
}) => {

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
    

  //? -----------------------------------------------------------------------------------------
  const [modalOpen, setModalOpen] = useState(false)

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
      title={'No subscriptions yet'}
      description={'Try changing the subscribing to stores'}
      withIllustration
    />
  );

  return (
    <Card title={listTitle}
      {...cardProps}>
      <Card.Header  />
      <Card.Section>
        <TextContainer>
            You can use sales reports to see information about your customers’ orders
            based on criteria such as sales over time, by channel, or by staff.
          </TextContainer>
      </Card.Section>

      <Card.Section title="Subscription List">
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
            const {name, id, status} = item
            const itemProps = {
              onDisconnect: onDisconnect,
            }

            if(canAcceptConnection && status === 'PENDING') {
              itemProps['onConnect'] = onConnect
            }

            const capitalizedStatus = status.charAt(0) + status.slice(1).toLowerCase()

            return (
              <ResourceItem
                id={id}
                // media={media}
                accessibilityLabel={`View details for ${name}`}
                onClick={() => {}}>
                  <div className="grid grid-cols-9">
                    <h3 className="col-span-2 truncate">
                      <TextStyle variation="strong">{name}</TextStyle>
                    </h3>
                    <div className="ml-10">
                      <Badge 
                        status={status === "ACTIVE" ? "success" : "warning"}
                        size="small">
                          {capitalizedStatus}
                      </Badge>
                    </div>
                    <div className="grid justify-end col-start-9">
                      <Options id={id} {...itemProps} />
                    </div>
                  </div>
            </ResourceItem>
              )
            }} />
      </Card.Section>
      {/* { canAddToList && 
        <Card.Section title="Add Subscription">
          <TextContainer>
            You can use sales reports to see information about your customers’ orders
            based on criteria such as sales over time, by channel, or by staff.
          </TextContainer>
        </Card.Section>} */}
    </Card>
  )
}

export default List
