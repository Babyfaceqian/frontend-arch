import React, { useState } from 'react';

export default () => {
  // 解构得到的第一个参数是state变量，第二个参数是设置该变量的方法，useState传入state变量的初始值，只会在第一次调用；
  const [count, setCount] = useState(0);
  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>
        Click me
      </button>
    </div>
  )
}