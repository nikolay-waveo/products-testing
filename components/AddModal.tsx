import {
  Button, Modal,
  Stack, TextContainer,
  TextField
} from '@shopify/polaris';
import { useSubscribe } from 'hooks/useSubscribe';
import React, { useCallback, useState } from 'react';
import { ISubscription } from 'types';

interface IAddModal {
  modalOpen: boolean,
  modalHandler: React.Dispatch<React.SetStateAction<boolean>>,
  list: ISubscription['subscription'][],
  listUpdateHandler: React.Dispatch<React.SetStateAction<IAddModal['list']>>,
  canAddToList: boolean,
}

const AddModal: React.FC<IAddModal> = ({
  modalOpen,
  modalHandler,
  list,
  listUpdateHandler,
  canAddToList,
}) => {

  const [input, setInput] = useState('')

  const {
    useSETShopSubscribeSettings: setSubscribe
  } = useSubscribe();

  const handleChange = useCallback(() => modalHandler(!modalOpen), [modalOpen, modalHandler]);

  const outgoingSubscriptionsHandler = (url: string) => {  

    //! Find a way to get inventoryLocationId
    // (url: string) => (id: string)
    const getStoreDataIfExists = (url: string): string => "10000000001"
    const storeID = getStoreDataIfExists(url)
    // --------------------------------------
    
    setSubscribe({
      origin: "testing-pub-dev.myshopify.com",
      subscriberShop: url,
      id: storeID,
    })
    .then(({
      shop,
      inventoryLocationId,
      status,
    }) => {
      console.log({
        shop,
        inventoryLocationId,
        status,
      })
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

  const handleSubmit = () => {
    outgoingSubscriptionsHandler(input)
    setInput('')
    handleChange();
  }

  return (
    <div>
        { canAddToList &&
          <Modal
            open={modalOpen}
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
                    placeholder="Example: store.myshopify.com"
                    connectedRight={
                      <Button primary onClick={()=> handleSubmit()}>
                        Subscribe
                      </Button>
                    }
                  />
                </Stack.Item>
              </Stack>
            </Modal.Section>
          </Modal> }
      </div>
  )
}

export default AddModal
