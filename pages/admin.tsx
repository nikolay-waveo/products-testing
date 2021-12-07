import AddToList from "components/AddToList"
import Container from "components/Container"
import List from "components/List"
import Section from "components/Section"
import Title from "components/Title"
import { useState } from "react"


const Admin: React.FC = () => {

  const [incomingSubscriptions, setIncomingSubscriptions] = useState([
    { name: "Shopify Store", URL: "test.com" },
    { name: "Shopify Store", URL: "test.com" },
    { name: "Shopify Store", URL: "test.com" },
  ]);
  const [outgoingSubscriptions, setOutgoingSubscriptions] = useState([]);

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
      // return {name: string, URL: string}

    // NO:
    // return error "This store doesn't exist."

    const newSubscriptionItem = {
      name: "New Shopify Store",
      URL: "test.com",
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
        <List 
          list={incomingSubscriptions}
          emptyListMessage="There are no subscribers." />
      </Section>

      <Section sectionTitle="Subscribe">
        <AddToList 
          label="Subscribe to store"
          labelName="subscribeToStore"
          placeholder="Add store URL"
          addToListHandler={outgoingSubscriptionsHandler}/>
          
        <List 
          list={outgoingSubscriptions}
          emptyListMessage="There are no subscriptions." />
      </Section>
    </Container>
  )
}

export default Admin
