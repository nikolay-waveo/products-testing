import { Heading, Layout, SettingToggle, TextContainer } from '@shopify/polaris';
import { useSettings } from 'hooks/useSettings';
import React, { useCallback, useEffect, useState } from 'react';
import { ISection } from 'types';
import Modal from './Modal';

const Section: React.FC<ISection> = ({
  user,
  sectionTitle,
  sectionDescription,
  publishStatus=true,
  toggle,
  toggleText,
  children
}) => {

  const [active, setActive] = useState(publishStatus)

  const { useSETShopSettings: setSettings } = useSettings();

  useEffect(() => {
    setSettings(user, {
      publish: active
    })
  }, [active, setSettings, user])

  const handleToggle = useCallback(() => setActive((active) => !active), []);

  const contentStatus = active ? 'Deactivate' : 'Activate';

  const toggleTextMarkup = () => {
    // If passed a string
    if(typeof toggleText == "string") return toggleText

    // If passed an array of objects
    const [activateText, deactivateText] = toggleText.map(({
      title,
      content,
      destructive,
    }, key) => {
      return (
        <TextContainer key={key}>
          { title && <Heading>{title}</Heading> }
          <p className={destructive ? "text-shopify-critical" : undefined}>
            {content}
          </p>
        </TextContainer>
      )
    })
 
    return (
      active
      ? activateText
      : deactivateText
    )
  }

  console.log(active)

  return (
    <Layout>
      <Layout.AnnotatedSection
        id="storeDetails"
        title={sectionTitle}
        description={sectionDescription} >

        { toggle &&
          <div className={active ? "mb-10" : undefined}>
            <SettingToggle
              action={{
                content: contentStatus,
                onAction: handleToggle,
              }}
              enabled={active}>
              { toggleTextMarkup() }
            </SettingToggle> 
            <Modal
              title="Deactivate Publishing"
              content="Deactivating this setting will stop others from finding your store 
                and suspend all current subscription to you. Do you want to continue?" 
              isModalOpen={!active}
              modalHandler={() => setActive(!active)} 
              primaryAction={{
                actionText: "Deactivate",
                actionHandler: () => {},
                destructive: true
              }}
              secondaryActions={[
                {
                  actionText: "Cancel",
                  actionHandler: () => {},
                },
              ]}
              />
          </div> }

        { active && <div className="col-span-2" > { children } </div> }
      </Layout.AnnotatedSection>
    </Layout>
  )
}

export default Section
