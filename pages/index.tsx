import { AppProvider, Frame, Page } from "@shopify/polaris";
import List from "components/List";
import Section from "components/Section";
import { useSettings } from "hooks/useSettings";
import { useEffect, useState } from "react";
import { ISubscription } from "types";

const Admin: React.FC = () => {

  const [incomingSubs, setIncomingSubs] = useState<ISubscription['subscription'][]>([
    // { storeURL: "test.com", id: "1ACQ", status: "pending" },
    // { storeURL: "test.com", id: "2BDQ", status: "active" },
  ]);

  const [outgoingSubs, setOutgoingSubs] = useState<ISubscription['subscription'][]>([
    // { storeURL: "test.com", id: "1AC0", status: "pending" },
    // { storeURL: "test.com", id: "2BD0", status: "active" },
    // { storeURL: "test.com", id: "1AC2", status: "pending" },
    // { storeURL: "test.com", id: "2BD2", status: "active" },
    // { storeURL: "test.com", id: "3C02", status: "active" },
  ]);

  //? ----------------------------------------------------------------------------------

  //TODO
  const pubShop = "dev-publisher.myshopify.com";

  const subShop = "dev-subscriber.myshopify.com"
  //TODO
  
  const {
    useGetShopSettings: getSettings, 
    setShopSettings: setSettings,
  } = useSettings()

  const {data, isLoading} = getSettings(pubShop)

  // -------- Delete item

  // const {
  //   setShopPublishSettings: setPublish,
  //   deleteShopPublishSettings: removePublish,
  // } = usePublish()

  // const onSetPublish = () => {
  //   setPublish({
  //     publisherShop: pubShop,
  //     subscriberShop: subShop,
  //     accept: false,
  //   }).then(r => console.log(r))
  // }

  // const onRemovePublish = () => {
  //   removePublish({
  //     publisherShop: pubShop,
  //     subscriberShop: subShop,
  //   }).then(r => console.log(r))
  // }

  // onSetPublish()

  // onRemovePublish()

  // ------------------------------

  // -------- Sets status to active
  // const { 
  //   setShopPublishSettings: setSubscribe
  // } = usePublish()

  // const onSetSubscribe = () => {
  //   setSubscribe({
  //     publisherShop: pubShop,
  //     subscriberShop: subShop,
  //     accept: false,
  //   })
  // }

  // onSetSubscribe()

  // ------------------------------

  //! Figure out what this is supposed to do
  //! Aside from enable publisher permissions

  const testData = {
    "shop": "dev-subscriber-test.myshopify.com",
    "status": "pending",
    "enabled": true,
    "inventoryLocationId": "62489591961",
    "updatedAt": "2021-12-09T05:02:58.399Z"
  }

  const onSetSettings = () => {
    setSettings(pubShop, {
      publish: true,
      subscribed: [testData],
    }).then(r => console.log('response: ', r))
  }

  // onSetSettings()

  //! =======================================

  useEffect(() => {
    // GET incoming and outgoing subscriptions
    if(!isLoading) {
      const incomingSubsData = data
      .published
      .map((storeData) => {
        return ({
          storeURL: storeData.shop,
          id: storeData.inventoryLocationId,
          status: storeData.status,
        })
      })

      setIncomingSubs(incomingSubsData)

      const outgoingSubsData = data
      .subscribed
      .map((storeData) => {
        return ({
          storeURL: storeData.shop,
          id: storeData.inventoryLocationId,
          status: storeData.status,
        })
      })

      setOutgoingSubs(outgoingSubsData)
      
    }

  }, [data, isLoading,])

  //? ----------------------------------------------------------------------------------

  return (
    <AppProvider 
      i18n={{
        Polaris: {
          ResourceList: {
            sortingLabel: 'Sort by',
            defaultItemSingular: 'item',
            defaultItemPlural: 'items',
            showing: 'Showing {itemsCount} {resource}',
            Item: {
              viewItem: 'View details for {itemName}',
            },
          },
          Common: {
            checkbox: 'checkbox',
          },
        },
    }} >
      <Frame>
          <Page
            title="Store Product Sync"
            fullWidth={true}
            divider >

            <div className="grid grid-cols-1 gap-10 mb-20">
              <Section 
                sectionTitle="Publish"
                sectionDescription="See which stores are subscribed to you."
                toggle >

                <List 
                  listText={{
                    title: "Subscribers",
                    description: "You can connect, disconnect and track subscriptions to your store.",
                  }}
                  list={incomingSubs}
                  listUpdateHandler={setIncomingSubs}
                  emptyListText={{
                    title: "No subscripters yet",
                    description: "Track user subscriptions to your store."
                  }}
                  canAcceptConnection />
              </Section>

              <Section 
                sectionTitle="Subscribe"
                sectionDescription="Subscribe to a published store and check on pending subscriptions.">

                <List 
                  listText={{
                    title: "Subscriptions",
                    description: "A list of all of your subscriptions to other stores.",
                  }}
                  list={outgoingSubs} 
                  listUpdateHandler={setOutgoingSubs}
                  emptyListText={{
                    title: "No subscriptions yet",
                    description: "Track your subscriptions from stores."
                  }} 
                  canAddToList />
              </Section>
            </div>
          </Page>
        
      </Frame>      
    </AppProvider>
    
  )
}

export default Admin