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
          addToListHandler={setOutgoingSubscriptions}/>
          
        <List 
          list={outgoingSubscriptions}
          emptyListMessage="There are no subscriptions." />
      </Section>
    </Container>
  )
}

export default Admin
