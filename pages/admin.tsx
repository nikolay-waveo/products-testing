import Container from "components/Container"
import Section from "components/Section"
import Title from "components/Title"
import { useState } from "react"
import { ISubscription } from "types"

const Admin: React.FC = () => {

  const [incomingSubs, setIncomingSubs] = useState<ISubscription['subscription'][]>([
    { name: "Shopify Store 1", id: "1AC", URL: "test.com", status: "pending" },
    { name: "Shopify Store 2", id: "2BD", URL: "test.com", status: "active" },
    { name: "Shopify Store 3", id: "3C0", URL: "test.com", status: "active" },
  ]);

  const [outgoingSubs, setOutgoingSubs] = useState<ISubscription['subscription'][]>([
    { name: "Shopify Store 4", id: "1AC0", URL: "test.com", status: "pending" },
    { name: "Shopify Store 5", id: "2BD0", URL: "test.com", status: "active" },
    { name: "Shopify Store 6", id: "3C00", URL: "test.com", status: "active" },
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
      status: "active"
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

      </Section>

      <Section sectionTitle="Subscribe">
  
      </Section>
    </Container>
  )
}

export default Admin
