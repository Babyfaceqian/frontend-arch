import React, { memo } from 'react';
export default memo(({ handleClick }) => {
  console.log('child render')
  return (
    <div>
      Child
    </div>
  )
})