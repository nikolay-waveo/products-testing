import AddToList from "components/AddToList"
import Container from "components/Container"
import Section from "components/Section"
import SubscriptionList from "components/SubscriptionList"
import Title from "components/Title"
import { useState } from "react"
import { ISubscriptions } from "types"


const Admin: React.FC = () => {

  const [incomingSubscriptions, setIncomingSubscriptions] = useState<ISubscriptions['subscriptions']>([
    { name: "Shopify Store 1", id: "1AC", URL: "test.com" },
    { name: "Shopify Store 2", id: "2BD", URL: "test.com" },
    { name: "Shopify Store 3", id: "3C0", URL: "test.com" },
  ]);
  const [outgoingSubscriptions, setOutgoingSubscriptions] = useState<ISubscriptions['subscriptions']>([]);

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

    setOutgoingSubscriptions([
      ...outgoingSubscriptions,
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
          list={incomingSubscriptions}
          updateListHandler={setIncomingSubscriptions}
          emptyListMessage="There are no subscribers." />
      </Section>

      <Section sectionTitle="Subscribe">
        <AddToList 
          label="Subscribe to store"
          labelName="subscribeToStore"
          placeholder="Add store URL"
          addToListHandler={outgoingSubscriptionsHandler}/>
          
        <SubscriptionList 
          list={outgoingSubscriptions}
          updateListHandler={setOutgoingSubscriptions}
          emptyListMessage="There are no subscriptions." />
      </Section>
    </Container>
  )
}

export default Admin
