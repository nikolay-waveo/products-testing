import { Layout } from '@shopify/polaris';
import React from 'react';
import { ISection } from 'types';

const Section: React.FC<ISection> = ({
  // user,
  // sectionTitle,
  // sectionDescription,
  // publishStatus=true,
  // toggle,
  // enableModal, 
  // children
}) => {

  // const [active, setActive] = useState(publishStatus)
  // const [showDeactivationModal, setShowDeactivationModal] = useState(false)
  // const [showCalloutCard, setShowCalloutCard] = useState(active)
  // const [showCalloutCardModal, setShowCalloutCardModal] = useState(false)
  // const { useSETShopSettings: setSettings } = useSettings();

  // useEffect(() => {
  //   setActive(publishStatus)
  // }, [publishStatus])

  // // const handleDeactivatePublish = useCallback(
  // //   () => {
  // //     setSettings(user, {
  // //       publish: false
  // //     })
  // //     setActive(false)
  // //     setShowDeactivationModal(false)
  // //   },
  // //   [setSettings, user],
  // // )

  // // const handleToggle = useCallback(() => {
  // //   if(enableModal && active) {
  // //     setShowDeactivationModal(true)
  // //   }
  // //   else {
  // //     setSettings(user, {
  // //       publish: !active
  // //     })
  // //     setActive(!active)
  // //     setShowCalloutCard(!active)
  // //   }  
  // // }, [active, enableModal, setSettings, user]);

  // // -------------------------------

  // const [paused, setPaused] = useState(false)

  // const isPaused = paused 
  //   ? {
  //     content: "Pause",
  //     onAction: () => {
  //       setSettings(user, {
  //         publish: false
  //       })
  //       setPaused(false)
  //     },
  //   }
  //   : {
  //     content: "Unpause",
  //     onAction: () => {
  //       setSettings(user, {
  //         publish: true
  //       })
  //       setPaused(true)
  //     },
  //   }

  // const isListEmpty = !true
  //   ? {
  //     title: "Deactivate Publishing",
  //     content: "Stop others from finding and subscribing to your store.",
  //     contentStyle: "negative",
  //     primaryAction: {
  //       content: "Deactivate",
  //       onAction: () => console.log("deactivate")
  //     },
  //   }
  //   : {
  //     title: "Deactivate Publishing",
  //     content: (
  //       <>
  //         <TextStyle variation="strong">Pause</TextStyle> publishing to keep subscriptions to your store 
  //         or <TextStyle variation="strong">deactivate</TextStyle> publishing to remove all subscriptions.
  //       </>
  //     ),
  //     primaryAction: {
  //       content: "Deactivate",
  //       onAction: () => {
          
  //       },
  //     },
  //     secondaryAction: isPaused,
  //     destructive: true,
  //   }


  return (
    <Layout>
      {/* <Layout.AnnotatedSection
        id="storeDetails"
        title={sectionTitle}
        description={sectionDescription} >

        { toggle &&
          <div className={active ? "mb-10" : undefined}>
            <Toggle 
              activated={active}
              onAction={handleToggle} 
              onActivate={isListEmpty}
              onDeactivate={{
                title: "Activate Publishing",
                content: "Allow others to find and subscribe to your store.",
                primaryAction: {
                  content: "Activate",
                  onAction: () => console.log("Activate"),
                },
                primary: true,
              }} />

            { active && 
              showCalloutCard &&
              <CalloutCard 
                title="Get your store link"
                content="Share your store link with other businesses to allow them to subscribe to your store."
                illustrationSRC="https://cdn.shopify.com/s/assets/admin/checkout/settings-customizecart-705f57c725ac05be5a34ec20c05b94298cb8afd10aac7bd9c7ad02030f48cfa0.svg"
                primaryAction={{
                  content: 'Get store link',
                  onAction: () => setShowCalloutCardModal(true),
                }} 
                // onDismiss={() => setShowCalloutCard(false)} 
                /> }

            <Modal 
              title="Get your store link"
              content={
                <p>
                  Your store link is <TextStyle variation="strong">{user}</TextStyle>. 
                  Share it with others so that they can find and subscribe to your store.
                </p>
              }
              isModalOpen={showCalloutCardModal}
              modalHandler={setShowCalloutCardModal} 
              primaryAction={{
                actionText: "Copy Link",
                actionHandler: () => {
                  navigator.clipboard.writeText(user)
                  setShowCalloutCardModal(false)
                },
              }}
              secondaryActions={[
                {
                  actionText: "Cancel",
                  actionHandler: () => setShowCalloutCardModal(false),
                },
              ]}
              toast={{
                content: "Copied to clipboard",
                duration: 3000
              }} />

            <Modal
              title="Deactivate Publishing"
              content="Deactivating this setting will stop others from finding your store 
                and remove all current subscriptions to you. Do you want to continue?" 
              isModalOpen={showDeactivationModal}
              modalHandler={setShowDeactivationModal} 
              primaryAction={{
                actionText: "Deactivate",
                // actionHandler: handleDeactivatePublish,
                actionHandler: () => {},
                destructive: true
              }}
              secondaryActions={[
                {
                  actionText: "Cancel",
                  actionHandler: () => setShowDeactivationModal(false),
                },
              ]}
              toast={{
                content: "Publishing Disabled"
              }}
              />
          </div> }

        { active && <div className="col-span-2" > { children } </div> }
      </Layout.AnnotatedSection> */}
    </Layout>
  )
}

export default Section
