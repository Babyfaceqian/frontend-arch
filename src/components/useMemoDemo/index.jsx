import React, { useMemo, useState } from 'react';

export default () => {
  // 解构得到的第一个参数是state变量，第二个参数是设置该变量的方法，useState传入state变量的初始值，只会在第一次调用；
  const [count, setCount] = useState(0);
  // 如果不填依赖项数组，则每次渲染都会计算；依赖项数组如果为[]，则只会第一次渲染时执行；如果填了依赖项数组元素，则会根据元素是否变更而做计算，如果不变，则会返回上一次计算结果。
  const memoizedValueNoDep = useMemo(() => computeExpensiveValue(count));
  const memoizedValueDepNoEl = useMemo(() => computeExpensiveValue(count), []);
  const memoizedValueDepOneEl = useMemo(() => computeExpensiveValue(count), [count]);
  console.log('render')
  return (
    <div>
      <p>You clicked {count} times</p>
      <p>不写依赖项参数的memoizedValue is {memoizedValueNoDep}</p>
      <p>依赖项参数为[]的memoizedValue is {memoizedValueDepNoEl}</p>
      <p>依赖项参数为[count]的memoizedValue is {memoizedValueDepOneEl}</p>
      <button onClick={() => setCount(count + 1)}>
        Click me
      </button>
      <button onClick={() => setCount(10)}>
        count set to 10
      </button>
    </div>
  )
}
function computeExpensiveValue(count) {
  console.log('computeExpensiveValue', count)
  return count * count;
}