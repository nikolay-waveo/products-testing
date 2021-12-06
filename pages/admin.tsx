import Container from "components/Container"
import Section from "components/Section"
import SubscriptionList from "components/SubscriptionList"
import Title from "components/Title"


const admin: React.FC = () => {
  return (
    <Container>
      <Title>Store Product Sync</Title>

      <Section sectionTitle="Publish">
        <SubscriptionList 
          emptyListMessage="There are no subscribers." />
      </Section>

      <Section sectionTitle="Subscribe">
        <SubscriptionList 
          emptyListMessage="There are no subscriptions." />
      </Section>
    </Container>
  )
}

export default admin
