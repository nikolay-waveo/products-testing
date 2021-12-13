import { AppProvider, Frame } from "@shopify/polaris";
import Container from "components/Container";
import List from "components/List";
import Section from "components/Section";
import Title from "components/Title";
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
        <Container>
          <Title>Store Product Sync</Title>

  {/* //? ---------------------------------------------------------------------------------- */}

          <div>
            GET pub: { getPub }
          </div>

          <div>
            GET sub: { getSub }
          </div>

          <div>
            PUT sub: { putSub }
          </div>

  {/* //? ---------------------------------------------------------------------------------- */}

          <div className="grid grid-cols-1 gap-10 md:p-5 px-10 pt-0">
            <Section 
              sectionTitle="Publish"
              sectionDescription="See which stores are subscribed to you."
              toggle >

              <List 
                listTitle="SUBSCRIBERS"
                list={incomingSubs} 
                listUpdateHandler={setIncomingSubs}
                emptyListMessage="There are no subscribers." 
                canAcceptConnection />
            </Section>

            <Section 
              sectionTitle="Subscribe"
              sectionDescription="Subscribe to a published store and check on pending subscriptions.">

              <List 
                listTitle="SUBSCRIPTIONS"
                list={outgoingSubs} 
                listUpdateHandler={setOutgoingSubs}
                emptyListMessage="There are no subscriptions." 
                canAddToList />
            </Section>
          </div>
        </Container>
        
      </Frame>      
    </AppProvider>
    
  )
}

export default Admin