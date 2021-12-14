import { AppProvider, Frame, Page } from "@shopify/polaris";
import List from "components/List";
import Section from "components/Section";
import { useSettings } from "hooks/useSettings";
import { usePublish } from "hooks/useSubscribe";
import { useEffect, useState } from "react";
import { ISubscription } from "types";

const Admin: React.FC = () => {

  const [incomingSubs, setIncomingSubs] = useState<ISubscription['subscription'][]>([
    { name: "Shopify Store 1", id: "1ACQ", URL: "test.com", status: "pending" },
    { name: "Shopify Store 2", id: "2BDQ", URL: "test.com", status: "active" },
  ]);

  const [outgoingSubs, setOutgoingSubs] = useState<ISubscription['subscription'][]>([
    { name: "Shopify Store 4", id: "1AC0", URL: "test.com", status: "pending" },
    { name: "Shopify Store 5", id: "2BD0", URL: "test.com", status: "active" },
    { name: "Shopify Store 4", id: "1AC2", URL: "test.com", status: "pending" },
    { name: "Shopify Store 5", id: "2BD2", URL: "test.com", status: "active" },
    { name: "Shopify Store 6", id: "3C02", URL: "test.com", status: "active" },
  ]);

  //? ----------------------------------------------------------------------------------

  const shop = "dev-subscriber.myshopify.com";

  const pubShop = "dev-publisher.myshopify.com";

  let getPubList:any[]
  let getSubList:any[]
  let putSubList:any[]

  let getPub:any
  let getSub:any
  let putSub:any

  useEffect(() => {
 
  }, [getPub, getSub, putSub])

  const {useGetShopSettings: getSettings, setShopSettings: setSettings} = useSettings()

  const getData = getSettings(shop).data

  try {
    getPubList = getData.published
    getSubList = getData.subscribed

    getPub = getPubList
      .map((item, key) => {
      return (
        <p key={key}>
          {item.shop}/
          {item.inventoryLocationId}/
          {item.status}
        </p>
      )
    })

    getSub = getSubList
      .map((item, key) => {
      return (
        <p key={key}>
          {item.shop}/
          {item.inventoryLocationId}/
          {item.status}
        </p>
      )
    })
  } catch (error) {
    getPub = ""
    getSub = ""
  }

  // const setPub = setSettings(shop, {
  //   publish: true,
  //   published: getPubList,
  //   subscribed: getSubList,
  // })

  const {setShopPublishSettings: setSubscribe} = usePublish();

  const setSubObject = {
    publisherShop: pubShop,
    subscriberShop: shop,
    accept: true,
  }

  setSubscribe(setSubObject)
    .then((r) => { 
      console.log(r, typeof r)
      // r.map((item, key) => {
      //   return (
      //     <p key={key}>
      //       {item.shop}/
      //       {item.inventoryLocationId}/
      //       {item.status}
      //     </p>
      //   )
      // })  
    }).catch(() => '')

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

  {/* //? ---------------------------------------------------------------------------------- */}

          {/* <div>
            GET pub: { getPub }
          </div>

          <div>
            GET sub: { getSub }
          </div>

          <div>
            PUT sub: { putSub }
          </div> */}

  {/* //? ---------------------------------------------------------------------------------- */}

            <div className="grid grid-cols-1 gap-10">
              <Section 
                sectionTitle="Publish"
                sectionDescription="See which stores are subscribed to you."
                toggle >

                <List 
                  listText={{
                    title: "Subscribers",
                    description: "You can accept, deny and track subscriptions to your store.",
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