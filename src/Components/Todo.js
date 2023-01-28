import { useState, useContext } from 'react'
import TodoItem from './TodoItem'
import ThemeContext from '../contexts'
export default function Todo() {
  const { themeInfo, setThemeInfo } = useContext(ThemeContext)
  const [list] = useState(['吃饭', '睡觉', '打豆豆'])
  const toggleTheme = () => {
    setThemeInfo({
      theme: 'dark',
    })
    console.log('theme===>', themeInfo, setThemeInfo)
    // changeTheme(theme === 'light' ? 'dark' : 'light')
  }
  return (
    <div onClick={toggleTheme}>
      {list.length > 0 &&
        list.map((i) => <TodoItem key={i} title={i}></TodoItem>)}
    </div>
  )
}
