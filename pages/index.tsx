import { AppProvider, Frame, Page } from "@shopify/polaris";
import List from "components/List";
import Section from "components/Section";
// import { usePublish } from "hooks/usePublish";
import { useSettings } from "hooks/useSettings";
import { useSubscribe } from "hooks/useSubscribe";
import { useEffect, useState } from "react";
import { ISubscription } from "types";

const Admin: React.FC = () => {

  const [incomingSubs, setIncomingSubs] = useState<ISubscription['subscription'][]>([]);

  const [outgoingSubs, setOutgoingSubs] = useState<ISubscription['subscription'][]>([]);

  //? ----------------------------------------------------------------------------------

  //TODO
  const pubShop = "dev-publisher.myshopify.com";

  const subShop = "dev-subscriber.myshopify.com"
  //TODO
  
  const {
    useGETShopSettings: getSettings, 
    useSETShopSettings: setSettings,
  } = useSettings()

  const {data, isLoading} = getSettings(pubShop)

  // const {
  //   setShopPublishSettings: setPublish,
  // } = usePublish();

  const {
    useSETShopSubscribeSettings: setSubscribe,
  } = useSubscribe();

  setSubscribe({
    publisherShop: pubShop,
    subscriberShop: "joel-dev-subscriber.myshopify.com",
    accept: true,
  }).then(r => console.log("Subscription res: ", r))

  //! Figure out what this is supposed to do
  //! Aside from enable publisher permissions

  // const testData = {
  //   "shop": subShop,
  //   "inventoryLocationId": "88888888888",
  // }

  // const onSetSettings = () => {
  //   setSettings(pubShop, {
  //     publish: true,
  //     published: [testData],
  //   }).then(r => console.log('response: ', r))
  // }

  // console.log(testData)

  // onSetSettings()

  //! =======================================

  useEffect(() => {
    // GET incoming and outgoing subscriptions
    if(!isLoading) {
      console.log(data.published, data.subscribed)
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

  }, [data, isLoading, ])

  // useEffect(() => {
  //   client
  //     .put("https://shopify.perkd.io/products-pubsub-app-dev/subscribe", {
  //       headers: {
  //         "x-shopify-shop-domain": `${pubShop}`,
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify({
  //         inventoryLocationId: "00000000000",
  //         shop: subShop,
  //       }),
  //     })
  //     .then((res) => console.log(" response ", res));
  // }, []);

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
                    title: "No subscribers yet",
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