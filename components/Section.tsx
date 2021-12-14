import { Layout, SettingToggle, TextStyle } from '@shopify/polaris';
import React, { useCallback, useState } from 'react';
import { ISection } from 'types';


const Section: React.FC<ISection> = ({
  sectionTitle,
  sectionDescription,
  toggle,
  children
}) => {

  const [active, setActive] = useState(true)

  const handleToggle = useCallback(() => setActive((active) => !active), []);

  const contentStatus = active ? 'Deactivate' : 'Activate';
  const textStatus = active ? 'activated' : 'deactivated';

  return (
    <Layout>
      <Layout.AnnotatedSection
        id="storeDetails"
        title={sectionTitle}
        description={sectionDescription} >

        { toggle &&
          <div className={active && "mb-10"}>
            <SettingToggle
              action={{
                content: contentStatus,
                onAction: handleToggle,
              }}
              enabled={active}>
              This setting is <TextStyle variation="strong">{textStatus}</TextStyle>.
            </SettingToggle> 
          </div> }

        { active && <div className="col-span-2" > { children } </div> }
      </Layout.AnnotatedSection>
    </Layout>
  )
}

export default Section
