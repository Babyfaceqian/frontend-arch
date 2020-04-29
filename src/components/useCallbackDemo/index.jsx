import React, { useState, useCallback } from 'react';
import Child from './Child';

export default () => {
  // 解构得到的第一个参数是state变量，第二个参数是设置该变量的方法，useState传入state变量的初始值，只会在第一次调用；
  const [count, setCount] = useState(0);

  const memoizedValueNoDep = useCallback(() => {
    console.log('memoizedValueNoDep', count)
    return count * count;
  });
  const memoizedValueDepNoEl = useCallback(() => {
    console.log('memoizedValueDepNoEl', count)
    return count * count;
  }, []);
  const memoizedValueDepOneEl = useCallback(() => {
    console.log('memoizedValueDepOneEl', count)
    return count * count;
  }, [count]);
  console.log('render')
  return (
    <div>
      <p>You clicked {count} times</p>
      <p>不写依赖项参数的memoizedValue is {memoizedValueNoDep()}</p>
      <p>依赖项参数为[]的memoizedValue is {memoizedValueDepNoEl()}</p>
      <p>依赖项参数为[count]的memoizedValue is {memoizedValueDepOneEl()}</p>
      <button onClick={() => setCount(count + 1)}>
        Click me
      </button>
      <button onClick={() => setCount(10)}>
        count set to 10
      </button>
      <Child handleClick={memoizedValueDepOneEl} />
    </div>
  )
}