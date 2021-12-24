import * as polaris from '@shopify/polaris';
import { Button, Card, Heading, TextStyle } from '@shopify/polaris';
import React from 'react';

declare type Variation = 'positive' | 'negative' | 'strong' | 'subdued' | 'code';

declare type ToggleState = {
  title?: string,
  content: string | React.ReactNode,
  contentStyle?: Variation | string,
  primaryAction: polaris.ComplexAction,
  secondaryAction?: polaris.ComplexAction,
  primary?: boolean,
  destructive?: boolean,
}

interface IToggle {
  activated: boolean,
  onAction: () => void,
  onActivate: ToggleState,
  onDeactivate: ToggleState,
}

const Toggle: React.FC<IToggle> = ({
  activated,
  onAction,
  onActivate,
  onDeactivate,
}) => {

  const state = activated ? onActivate : onDeactivate
  const {
    title,
    content,
    contentStyle,
    primaryAction,
    secondaryAction,
    primary,
    destructive,
  } = state

  const onPrimaryAction = () => {
    primaryAction.onAction()
    onAction()
  }

  const style = contentStyle as Variation

  return (
    <Card sectioned >
      <div className="flex justify-between items-center gap-5">
        <div className="flex flex-col">
          <Heading>{title}</Heading>
          <span className="mt-4">
            <TextStyle variation={style}>
              {content}
            </TextStyle>
          </span>
        </div>
        <div className="flex w-max gap-3">
          { secondaryAction && 
            <Button onClick={secondaryAction.onAction}>{secondaryAction.content}</Button> }
          <Button 
            primary={primary} 
            destructive={destructive} 
            onClick={onPrimaryAction}>
              {primaryAction.content}
          </Button>
        </div>
      </div>
    </Card>
  )
}

export default Toggle
