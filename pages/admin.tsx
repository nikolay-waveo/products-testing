import AddToList from "components/AddToList"
import Container from "components/Container"
import Section from "components/Section"
import SubscriptionList from "components/SubscriptionList"
import Title from "components/Title"
import { useState } from "react"
import { ISubscriptions } from "types"


const Admin: React.FC = () => {

  const [incomingPendingSubs, setIncomingPendingSubs] = useState<ISubscriptions['subscriptions']>([
    { name: "Shopify Store 1", id: "1AC", URL: "test.com" },
    { name: "Shopify Store 2", id: "2BD", URL: "test.com" },
    { name: "Shopify Store 3", id: "3C0", URL: "test.com" },
  ]);

  const [incomingSubs, setIncomingSubs] = useState<ISubscriptions['subscriptions']>([
    { name: "Shopify Store 4", id: "6AC", URL: "test.com" },
    { name: "Shopify Store 5", id: "5BD", URL: "test.com" },
    { name: "Shopify Store 6", id: "4C0", URL: "test.com" },
  ]);

  const [outgoingPendingSubs, setOutgoingPendingSubs] = useState<ISubscriptions['subscriptions']>([
    { name: "Shopify Store 7", id: "1AXC", URL: "test.com" },
    { name: "Shopify Store 8", id: "2BXD", URL: "test.com" },
    { name: "Shopify Store 9", id: "3CX0", URL: "test.com" },
  ]);

  const [outgoingSubs, setOutgoingSubs] = useState<ISubscriptions['subscriptions']>([
    { name: "Shopify Store 10", id: "6A44", URL: "test.com" },
    { name: "Shopify Store 11", id: "5B44", URL: "test.com" },
    { name: "Shopify Store 12", id: "4C44", URL: "test.com" },
  ]);

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
    }

    setOutgoingSubs([
      ...outgoingSubs,
      newSubscriptionItem,      
    ])

    //TODO Remove debugging script
    alert(subscription)
  }

  return (
    <Container>
      <Title>Store Product Sync</Title>

      <Section sectionTitle="Publish">
        <SubscriptionList 
          listTitle="Pending"
          list={incomingPendingSubs}
          ListUpdateHandler={setIncomingPendingSubs}
          linkedList={incomingSubs}
          LinkedListUpdateHandler={setIncomingSubs}
          emptyListMessage="There are no subscribers." />

        <SubscriptionList 
          listTitle="Subscribers"
          list={incomingSubs}
          ListUpdateHandler={setIncomingSubs}
          emptyListMessage="There are no subscribers." />
      </Section>

      <Section sectionTitle="Subscribe">
        <AddToList 
          label="Subscribe to store"
          labelName="subscribeToStore"
          placeholder="Add store URL"
          addToListHandler={outgoingSubscriptionsHandler}/>

        <SubscriptionList
          listTitle="Pending" 
          list={outgoingPendingSubs}
          ListUpdateHandler={setOutgoingPendingSubs}
          linkedList={outgoingSubs}
          LinkedListUpdateHandler={setOutgoingSubs}
          emptyListMessage="There are no subscriptions." />
          
        <SubscriptionList
          listTitle="Subscriptions" 
          list={outgoingSubs}
          ListUpdateHandler={setOutgoingSubs}
          emptyListMessage="There are no subscriptions." />
      </Section>
    </Container>
  )
}

export default Admin
