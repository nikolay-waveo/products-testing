import * as polaris from '@shopify/polaris';
import {
  Button,
  Stack,
  TextContainer,
  TextField,
  Toast
} from '@shopify/polaris';
import React, { useCallback, useState } from 'react';

interface IModal {
  title: string,
  content: string,
  isModalOpen: boolean,
  modalHandler: React.Dispatch<React.SetStateAction<boolean>>,
  inputAction?: {
    label: string,
    placeholder: string,
  }
  primaryAction: {
    actionText: string, 
    actionHandler: (input: string) => void,
    destructive?: boolean,
  }
  secondaryActions?: {
    actionText: string, 
    actionHandler: (input: string) => void,
    destructive?: boolean,
  }[],
  toast?: {
    content: string,
    duration: number,
  }
}

const Modal: React.FC<IModal> = ({
  title,
  content,
  isModalOpen,
  modalHandler,
  inputAction,
  primaryAction,
  secondaryActions,
  toast,
}) => {

  const [input, setInput] = useState('')

  const [showModal, setShowModal] = useState(isModalOpen)

  const toggleShowModal = useCallback(() => setShowModal((showModal) => !showModal), []);

  const handleChange = useCallback(() => modalHandler(!isModalOpen), [isModalOpen, modalHandler]);

  const handleSubmit = () => {
    primaryAction.actionHandler(input)
    setInput('')
    handleChange()
    toggleShowModal()
  }

  const toastMarkup = (toast && showModal)
    ? (<Toast content={toast.content} onDismiss={toggleShowModal} duration={toast.duration}/>) 
    : null

  const primaryActionButtonMarkup = (
    <Button primary onClick={()=> handleSubmit()}>
      {primaryAction.actionText}
    </Button>
  )

  const modalActions = {}

  if(!inputAction) {
    modalActions['primaryAction'] = {
      content: primaryAction.actionText,
      onAction: primaryAction.actionHandler,
      destructive: primaryAction?.destructive,
    }
  }

  if(secondaryActions) {
    modalActions['secondaryActions'] = [
      ...secondaryActions.map(({
        actionText,
        actionHandler,
        destructive,
      }) => ({
          content: actionText,
          onAction: actionHandler,
          destructive: destructive
      }))
    ]
  }
  
  return (
    <>
      <polaris.Modal
        open={isModalOpen}
        onClose={handleChange}
        title={title}
        {...modalActions}>
          <polaris.Modal.Section>
            <Stack vertical>
              <Stack.Item>
                <TextContainer>
                  <p>
                    {content}
                  </p>
                </TextContainer>
              </Stack.Item>
            { inputAction &&
              <Stack.Item fill>
                <TextField
                  label={inputAction.label}
                  value={input}
                  onChange={(e) => setInput(e)}
                  autoComplete="off"
                  placeholder={inputAction.placeholder}
                  connectedRight={primaryActionButtonMarkup} />
              </Stack.Item> 
            }
            </Stack>
          </polaris.Modal.Section>

      </polaris.Modal>
      {toastMarkup}
    </>
  )
}

export default Modal
