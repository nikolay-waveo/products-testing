import { Badge, SkeletonDisplayText, Spinner, TextStyle, Tooltip } from '@shopify/polaris'
import React from 'react'

declare type Status = 'success' | 'info' | 'critical' | 'warning' | 'new'
declare type Progress = 'incomplete' | 'partiallyComplete' | 'complete'

interface IItem {
  item: {
    storeURL: string,
    id: string,
    status: string,
  },
  badges?: {
    status: string,
    tooltip: string,
    statusStyle?: Status,
    progress?: Progress,
  }[],
  options: {
    content: string,
    helpText: string,
    onAction: (itemKey: string) => void,
    active?: boolean,
    destructive?: boolean,
  }[],
  loading?: {
    isLoading: boolean,
    accessibilityLabel: string,
  },
}

const ItemNew: React.FC<IItem> = ({
  item,
  badges = [],
  options,
  loading,
}) => {

  const {
    storeURL,
    status,
  } = item

  const {
    isLoading,
    accessibilityLabel,
  } = loading || {}

  const badge = badges.find(badge => status === badge.status)

  const capitalize = (string: string) => string.charAt(0).toUpperCase() + string.slice(1)

  return (
    <div className="grid grid-cols-9">
      <h3 className="col-span-7 truncate">
        { !isLoading
          ? <TextStyle variation="strong">{storeURL}</TextStyle>
          : <SkeletonDisplayText size="small" /> }
      </h3>
      <div className="col-start-8 justify-self-center">
        { isLoading && <Spinner accessibilityLabel={accessibilityLabel} size="small" /> }
        { !isLoading && badge && 
          <Tooltip 
            content={badge.tooltip}
            preferredPosition='above' >
              <Badge 
                size="small"
                {...{status: badge.statusStyle}} >
                {capitalize(status)}
            </Badge>
          </Tooltip> }
      </div>
      <div className="grid justify-end col-start-9">
        {/* <Options store={storeURL} status={status} {...itemProps} /> */}
      </div>
    </div>
  )
}

export default ItemNew