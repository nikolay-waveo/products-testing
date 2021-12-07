import Container from "components/Container"
import List from "components/List"
import Section from "components/Section"
import Title from "components/Title"


const admin: React.FC = () => {
  return (
    <Container>
      <Title>Store Product Sync</Title>

      <Section sectionTitle="Publish">
        <List 
          list={[
            {listItem: "test"},
            {listItem: "shopify shop", listItemURL: "test.com"}
          ]}
          emptyListMessage="There are no subscribers." />

      </Section>

      <Section sectionTitle="Subscribe">
        <List 
            list={[
              {listItem: "test"},
              {listItem: "shopify shop", listItemURL: "test.com"}
            ]}
            emptyListMessage="There are no subscriptions." />
      </Section>
    </Container>
  )
}

export default admin
