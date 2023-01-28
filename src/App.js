import { useState, useContext } from 'react'
import Todo from './Components/Todo'
import themeContext from './contexts'
function Tick() {
  const { themeInfo } = useContext(themeContext)
  console.log('themeInfo===>', themeInfo)
  return (
    <div>
      <div>Hello, world!</div>
    </div>
  )
}
export default function App() {
  const [themeInfo, setThemeInfo] = useState({
    theme: 'light',
  })
  return (
    <themeContext.Provider
      value={{
        themeInfo,
        setThemeInfo,
      }}
    >
      <Tick />
      <Todo />
    </themeContext.Provider>
  )
}
