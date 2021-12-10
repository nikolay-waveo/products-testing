import { Icon } from '@shopify/polaris';
import { MobileVerticalDotsMajor } from '@shopify/polaris-icons';
import React from 'react';

interface IOptions {

}

const Options: React.FC<IOptions> = () => {
  return (
    <button onClick={() => alert('click')}> 
      <Icon
        source={MobileVerticalDotsMajor}
        color="interactive" />
    </button>
  )
}

export default Options
