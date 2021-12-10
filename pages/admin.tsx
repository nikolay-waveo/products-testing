import { AppProvider, Frame } from "@shopify/polaris";
import AddToList from "components/AddToList";
import Container from "components/Container";
import List from "components/List";
import Section from "components/Section";
import Title from "components/Title";
import { useState } from "react";
import { ISubscription } from "types";

const Admin: React.FC = () => {

  const [incomingSubs, setIncomingSubs] = useState<ISubscription['subscription'][]>([
    { name: "Shopify Store 1", id: "1ACQ", URL: "test.com", status: "pending" },
    { name: "Shopify Store 2", id: "2BDQ", URL: "test.com", status: "active" },
    { name: "Shopify Store 3", id: "3C0Q", URL: "test.com", status: "active" },
  ]);

  const [outgoingSubs, setOutgoingSubs] = useState<ISubscription['subscription'][]>([
    { name: "Shopify Store 4", id: "1AC0", URL: "test.com", status: "pending" },
    { name: "Shopify Store 5", id: "2BD0", URL: "test.com", status: "active" },
    { name: "Shopify Store 6", id: "3C00", URL: "test.com", status: "active" },
    { name: "Shopify Store 4", id: "1AC1", URL: "test.com", status: "pending" },
    { name: "Shopify Store 5", id: "2BD1", URL: "test.com", status: "active" },
    { name: "Shopify Store 6", id: "3C01", URL: "test.com", status: "active" },
    { name: "Shopify Store 4", id: "1AC2", URL: "test.com", status: "pending" },
    { name: "Shopify Store 5", id: "2BD2", URL: "test.com", status: "active" },
    { name: "Shopify Store 6", id: "3C02", URL: "test.com", status: "active" },
  ]);

  //? Testing Area
  //? Start ----->

  // const settings = useSettings()

  // const shop = "dev-subscriber.myshopify.com";

  // const convertToSubscriptionObject = (shopObj: {
  //   enabled: boolean,
  //   inventoryLocationId: string,
  //   shop: string,
  //   status: string,
  //   updateAt: string,
  // }) => {
  //   return {
  //     name: shopObj.shop,
  //     id: shopObj.inventoryLocationId,
  //     URL: shopObj.shop,
  //     status: shopObj.status
  //   }
  // }

  // const getShopSettings = () => {
  //   const shopSettings = settings.useGetShopSettings(shop)
  //   const shopData = shopSettings.data
  //   const publishedShopData = shopData.published

  //   const test = publishedShopData

  //   console.log(test)

  // }

  //? <------- End

  const outgoingSubscriptionsHandler = (subscription: string) => {
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

    //? Testing area
    //? Start ---

    //? End ---

    setOutgoingSubs([
      ...outgoingSubs,
      newSubscriptionItem,      
    ])

    //TODO Remove debugging script
    alert(subscription)
  }

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

          <div className="grid grid-cols-1 gap-10 p-5 pt-0">
            <Section 
              sectionTitle="Publish"
              toggle >
              <List 
                listTitle="PENDING"
                listType="pending"
                list={incomingSubs} 
                listUpdateHandler={setIncomingSubs}
                action={["cancel", "accept"]} />

              <List 
                listTitle="SUBSCRIBERS"
                listType="active"
                list={incomingSubs} 
                listUpdateHandler={setIncomingSubs}
                emptyListMessage="There are no subscribers."
                action={["cancel"]} />
            </Section>

            <Section sectionTitle="Subscribe">
              <AddToList 
                label="Add New Subscriber"
                labelName="addSubscriber"
                placeholder="Subscribe to a shop..." 
                addToListHandler={outgoingSubscriptionsHandler}/>

              <List 
                listTitle="PENDING"
                listType="pending"
                list={outgoingSubs} 
                listUpdateHandler={setOutgoingSubs}
                action={["cancel"]} />

              <List 
                listTitle="SUBSCRIPTIONS"
                listType="active"
                list={outgoingSubs} 
                listUpdateHandler={setOutgoingSubs}
                emptyListMessage="There are no subscriptions."
                action={["cancel"]} />
            </Section>
          </div>
        </Container>
        
      </Frame>      
    </AppProvider>
    
  )
}

export default Admin
