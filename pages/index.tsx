import { AppProvider, Frame, Page } from "@shopify/polaris";
import List from "components/List";
import Section from "components/Section";
import { useSettings } from "hooks/useSettings";
import { useEffect, useState } from "react";
import { ISubscription } from "types";

const Admin: React.FC = () => {

  //change to PublishedToList
  const [incomingSubs, setIncomingSubs] = useState<ISubscription['subscription'][]>([]);

  //change to SubscribedToList
  const [outgoingSubs, setOutgoingSubs] = useState<ISubscription['subscription'][]>([]);

  //? ----------------------------------------------------------------------------------

  //TODO
  const pubShop = "dev-publisher.myshopify.com"

  const subShop = "dev-subscriber.myshopify.com"

  const tubShop = "testing-pub-dev.myshopify.com" //Pub Sub
  //TODO
  

  // GET lists
  const {
    useGETShopSettings: getSettings, 
    useSETShopSettings: setSettings,
  } = useSettings()

  const {data, isLoading} = getSettings(tubShop)

  // SET user to Publisher mode

  setSettings(pubShop, {
    publish: true
  })

  // Subscribe to other user

  // const {
  //   useSETShopSubscribeSettings: setSubscribe,
  //   useDELETEShopSubscribeSettings: deleteSubscribe,
  // } = useSubscribe();

  //? Adds to Origin SubscribedTo list and Destination PublishedTo list
  // //! Find out how to get inventoryLocationId
  // setSubscribe({
  //   origin: tubShop,
  //   subscriberShop: pubShop,
  //   accept: true,
  //   id: '00000000001'
  // })
  // .then(r => console.log("SUB SET", r))

  //? Deletes from SubscribedTo list
  // deleteSubscribe({
  //   origin: tubShop,
  //   subscriberShop: pubShop,
  // }).then(r => console.log("SUB DEL", r))

  
  // const {
  //   useSETShopPublishSettings: setPublish,
  //   useDELETEShopPublishSettings: deletePublish,
  // } = usePublish();

  //? Confirms subscription
  // setPublish({
  //   origin: pubShop,
  //   publisherShop: subShop,
  //   accept: true,
  // })
  // .then(r => console.log("PUB SET", r))

  //! =======================================

  useEffect(() => {
    // GET incoming and outgoing subscriptions
    if(!isLoading) {
      const incomingSubsData = data
      .published?.map(({
        shop,
        inventoryLocationId,
        status,
      }) => {
        return ({
          storeURL: shop,
          id: inventoryLocationId,
          status: status,
        })
      }) || []

      setIncomingSubs(incomingSubsData)

      const outgoingSubsData = data
      .subscribed?.map(({
        shop,
        inventoryLocationId,
        status,
      }) => {
        return ({
          storeURL: shop,
          id: inventoryLocationId,
          status: status,
        })
      }) || []

      setOutgoingSubs(outgoingSubsData) 
    }
  }, [data, isLoading, ])

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