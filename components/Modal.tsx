import * as polaris from '@shopify/polaris';
import {
  Button,
  InlineError,
  Stack,
  TextContainer,
  TextField,
  Toast
} from '@shopify/polaris';
import useAsyncState from 'hooks/useAsyncState';
import React, { useCallback, useState } from 'react';

declare type Type = 'text' | 'email' | 'number' | 'password' | 'search' | 'tel' | 'url' | 'date' | 'datetime-local' | 'month' | 'time' | 'week' | 'currency';

interface IModal {
  title: string,
  content: string,
  isModalOpen: boolean,
  modalHandler: React.Dispatch<React.SetStateAction<boolean>>,
  inputAction?: {
    id: string,
    label: string,
    placeholder: string,
    type?: Type,
    requiredIndicator?: boolean,
    errorMessage?: string,
    errorHandler?: (input: string) => boolean,
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

  const [hasError, setHasError] = useAsyncState(false)

  const toggleShowModal = useCallback(() => setShowModal((showModal) => !showModal), []);

  const handleChange = useCallback(() => modalHandler(!isModalOpen), [isModalOpen, modalHandler]);

  const handleSubmit = () => {
    primaryAction.actionHandler(input)
    setInput('')
    handleChange()
    toggleShowModal()
    setHasError(false)
  }

  const checkErrorOnClick = async () => {
    if(inputAction?.errorHandler) {
      const error = await setHasError(inputAction.errorHandler(input))
      if (!error) handleSubmit()
    }
    else {
      handleSubmit()
    } 
  }

  const toastMarkup = (toast && showModal)
    ? (<Toast content={toast.content} onDismiss={toggleShowModal} duration={toast.duration}/>) 
    : null

  const primaryActionButtonMarkup = (
    <Button 
      primary 
      onClick={()=> {
        checkErrorOnClick()
      }}>
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
                  id={inputAction.id}
                  label={inputAction.label}
                  value={input}
                  onChange={(e) => setInput(e)}
                  autoComplete="off"
                  autoFocus={true}
                  type={inputAction.type}
                  requiredIndicator={inputAction.requiredIndicator}
                  error={hasError}
                  placeholder={inputAction.placeholder}
                  connectedRight={primaryActionButtonMarkup}
                  onFocus={() => {
                    setHasError(false)
                  }} />

                  { hasError &&
                    <div className='mt-4'>
                      <InlineError message={inputAction.errorMessage} fieldID={inputAction.id} />
                    </div>
                  }
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
