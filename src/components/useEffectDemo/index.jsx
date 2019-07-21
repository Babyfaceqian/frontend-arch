import React, { useState, useEffect } from 'react';

export default () => {
  const [count, setCount] = useState(0);
  useEffect(function () {
    // 合并了didMount,didUpdate,willUnmount，第二个参数是每次判断是否更新的比较值，使用Object.is（类似===，除了+0不等于-0和NaN等于自身）
    console.log(`You clicked ${count} times`);
  },
    [count])
  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => addCount(count, setCount)}>
        Click me
      </button>
    </div>
  )
}

function addCount(count, setCount) {
  setCount(count + 1);
}