import { useState } from 'react'
import TodoItem from './TodoItem'
export default function Todo() {
  const [list] = useState(['吃饭', '睡觉', '打豆豆'])
  return (
    <>
      {list.length > 0 &&
        list.map((i) => <TodoItem key={i} info={i}></TodoItem>)}
    </>
  )
}
