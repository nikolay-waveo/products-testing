import { AppProvider, Card, Frame, Page, Tabs, TextStyle } from "@shopify/polaris";
import List from "components/List";
import Section from "components/Section";
import { useSettings } from "hooks/useSettings";
import { useCallback, useEffect, useState } from "react";
import { ISubscription } from "types";

const Admin: React.FC = () => {

  //TODO remove setUser
  const [user, setUser] = useState("dev-subscriber.myshopify.com")

  //change to PublishedToList
  const [incomingSubs, setIncomingSubs] = useState<ISubscription['subscription'][]>([]);

  //change to SubscribedToList
  const [outgoingSubs, setOutgoingSubs] = useState<ISubscription['subscription'][]>([]);

  const [publishStatus, setPublishStatus] = useState(false)

  //TODO
  // const pubShop = "dev-publisher.myshopify.com"

  // dev-publisher.myshopify.com

  // const subShop = "dev-subscriber.myshopify.com"

  // dev-subscriber.myshopify.com

  // const tubShop = "testing-pub-dev.myshopify.com"

  // testing-pub-dev.myshopify.com
  //TODO
  

  // GET lists
  const {
    useGETShopSettings: getSettings, 
  } = useSettings()

  const {data, isLoading} = getSettings(user)

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

      const publishResponse = data.publish
      
      setPublishStatus(publishResponse)
    }
  }, [data, isLoading, ])

  //? ---------------------------------------------------------------
  // For testing convenience

    const [selected, setSelected] = useState(0);

    const handleTabChange = useCallback(
      (selectedTabIndex) => {
        setSelected(selectedTabIndex)
        switch(selectedTabIndex) {
          case 0: 
            return setUser("dev-subscriber.myshopify.com")
          case 1: 
            return setUser("dev-publisher.myshopify.com")
          case 2: 
            return setUser("testing-pub-dev.myshopify.com")
          default: 
            return setUser("dev-subscriber.myshopify.com")
        }
      },
      [],
    );

    const tabs = [
      {
        id: 'dev-subscribe',
        content: 'Publish and Subscribe',
        panelID: 'dev-subscribe-content',
      },
      {
        id: 'dev-publish',
        content: 'Publish',
        panelID: 'dev-publish-content',
      },
      {
        id: 'dev-test',
        content: 'Subscribe Only',
        panelID: 'dev-test-content',
      },
    ];

    const testingComponent = (
      <Card>
        <Tabs tabs={tabs} selected={selected} onSelect={handleTabChange}>
          <Card.Section title={tabs[selected].content}>
            <p>Selected store: <TextStyle variation="strong">{user}</TextStyle></p>
          </Card.Section>
        </Tabs>
      </Card>
    )

  //? ---------------------------------------------------------------

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

  {/* //? --------------------------------------------------------------- */}

              {testingComponent}

  {/* //? --------------------------------------------------------------- */}

              <Section 
                user={user}
                sectionTitle="Publish"
                sectionDescription="See which stores are subscribed to you."
                toggle 
                toggleText={[
                  {
                    title: "Disable Publishing",
                    content: "Stop others from finding your store and remove all currently subscribed stores.",
                    destructive: true,
                  },
                  {
                    title: "Enable Publishing",
                    content: "Allow others to find and subscribe to your store.",
                  }]}
                publishStatus={publishStatus} >

                <List 
                  user={user}
                  listType="publishTo"
                  listText={{
                    title: "Subscribers",
                    description: "You can connect, disconnect and track subscriptions to your store.",
                  }}
                  list={incomingSubs}
                  listUpdateHandler={setIncomingSubs}
                  emptyListText={{
                    title: "No subscribers yet",
                    description: "Track user subscriptions to your store."
                  }} />
              </Section>

              <Section 
                user={user}
                sectionTitle="Subscribe"
                sectionDescription="Subscribe to a published store and check on pending subscriptions.">

                <List 
                  user={user}
                  listType="subscribeTo"
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