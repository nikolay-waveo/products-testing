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
  enableModal, 
  children
}) => {

  const [active, setActive] = useState(publishStatus)

  const [showModal, setShowModal] = useState(false)

  const { useSETShopSettings: setSettings } = useSettings();

  useEffect(() => {
    setActive(publishStatus)
  }, [publishStatus])

  // const handleDeactivatePublish = useCallback(
  //   () => {
  //     setSettings(user, {
  //       publish: false
  //     })
  //     setActive(false)
  //     setShowModal(false)
  //   },
  //   [setSettings, user],
  // )

  // const handleToggle = useCallback(() => {
  //   setSettings(user, {
  //     publish: true
  //   })
  //   setActive(true)
  //   if(active && !showModal && enableModal) {
  //     setShowModal(true)
  //   }
  //   else {
  //     setShowModal(false)
  //   }
  // }, [active, enableModal, setSettings, showModal, user]);

  // const handleCloseModal = () => {
  //   setActive(true)
  //   setShowModal(false)
  // }

  const handleDeactivatePublish = useCallback(
    () => {
      setSettings(user, {
        publish: false
      })
      setActive(false)
      handleCloseModal()
    },
    [setSettings, user],
  )

  const handleToggle = useCallback(() => {
    if(enableModal && active) {
      setShowModal(true)
    }
    else {
      setSettings(user, {
        publish: !active
      })
      setActive(!active)
    }  
  }, [active, enableModal, setSettings, user]);

  const handleCloseModal = () => {
    setShowModal(false)
  }

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
                and suspend all current subscriptions to you. Do you want to continue?" 
              isModalOpen={showModal}
              modalHandler={setShowModal} 
              primaryAction={{
                actionText: "Deactivate",
                actionHandler: handleDeactivatePublish,
                destructive: true
              }}
              secondaryActions={[
                {
                  actionText: "Cancel",
                  actionHandler: handleCloseModal,
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
