import { Button, Icon, Modal, Stack, TextContainer, TextField } from '@shopify/polaris';
import { MobilePlusMajor } from '@shopify/polaris-icons';
import React, { useCallback, useState } from 'react';
import { IList } from 'types';
import Item from './Item';

const List: React.FC<IList> = ({
  list,
  listUpdateHandler,
  listTitle,
  emptyListMessage,
  canAddToList,
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

  const itemProps = {
    onDisconnect: onDisconnect,
  }

  if(canAcceptConnection) itemProps['onConnect'] = onConnect;

  const sortedList = list
    .map((item) => { 
      return {...item, status: item.status.toUpperCase()}
    })
    .sort((item) => {
      if(item.status === "PENDING") return -1
      return 1
    })

    //!---------- Modal

    const [active, setActive] = useState(false);

    const [input, setInput] = useState('')

    const handleChange = useCallback(() => setActive(!active), [active]);

    const outgoingSubscriptionsHandler = () => {
      //TODO GET store info and check for existance/duplicate subscription
  
      // Does store exist?
      // GET(subscription: string)
  
      // YES: 
        // Is the user already subscribed?
  
        // YES:
        // return error "You are already subscribed to this store."
  
        // NO:
        // PUSH new subscription to backend store list
        // return {name: string, URL: string, id: string}
  
      // NO:
      // return error "This store doesn't exist."
  
      const newSubscriptionItem = {
        name: "New Shopify Store",
        URL: "test.com",
        id: "44AF",
        status: "pending"
      }
  
      listUpdateHandler([
        ...list,
        newSubscriptionItem,      
      ])
    }

    const handleSubmit = () => {
      outgoingSubscriptionsHandler()
      setInput('')
      handleChange();
    }

    //!----------

    const activator = (
      <Button 
        monochrome
        outline
        size="medium" 
        icon={
          <Icon
            source={ MobilePlusMajor }
            color="interactive" /> } 
            onClick={handleChange}>
        New Subscription
      </Button>
    );

  return (
    <div>
      <div className="flex justify-between items-center h-24 p-5 bg-indigo-500">
        <h3 className="text-2xl font-semibold text-white tracking-wide" >{ listTitle }</h3>
        { canAddToList &&
          <div className="text-white">

            {/* //TODO Move this into it's own component */}
            {/* Both the Modal and the ListTitle should be their own components */}

            <Modal
              activator={activator}
              open={active}
              onClose={handleChange}
              title="Subscribe to a new store" >
              <Modal.Section>
                <Stack vertical>
                  <Stack.Item>
                    <TextContainer>
                      <p>
                        You can add the store subscription link here to subscribe to that
                        store and recieve product updates from them.
                      </p>
                    </TextContainer>
                  </Stack.Item>
                  <Stack.Item fill>
                    <TextField
                      label="Store Subscription link"
                      value={input}
                      onChange={(e) => setInput(e)}
                      autoComplete="off"
                      connectedRight={
                        <Button primary onClick={()=> handleSubmit()}>
                          Subscribe
                        </Button>
                      }
                    />
                  </Stack.Item>
                </Stack>
              </Modal.Section>
            </Modal>

            {/* //TODO ----------- */}
            
          </div>
        }
      </div>
      <ul className="space-y-1">
        { sortedList.length > 0
          ? sortedList
            .map((item) => 
              <Item 
                key={ item.id }
                item={ item } 
                {...itemProps} />
            )
          : <li 
              className="text-2xl p-5 font-normal bg-white" >{ emptyListMessage || "" }</li>
        }
      </ul>
    </div>
  )
}

export default List
