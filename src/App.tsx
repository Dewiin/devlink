import { Routes, Route } from 'react-router'
import './App.css'

// screens
import { AppLayout } from '@/components/screens/AppLayout/AppLayout'
import { HomeScreen } from '@/components/screens/HomeScreen/HomeScreen'
import { ChatScreen } from '@/components/screens/ChatScreen/ChatScreen'
import { SettingsScreen } from '@/components/screens/SettingsScreen/SettingsScreen'
import { Page404 } from '@/components/screens/ErrorScreens/Page404'

function App() {
  return (
    <Routes>
      <Route element={<AppLayout />}>
        <Route path='/' element={<HomeScreen />} />
        <Route path='/chats/:chatId?' element={<ChatScreen />} />
        <Route path='/settings' element={<SettingsScreen />} />
      </Route>

      <Route path='/*' element={<Page404 />} />
    </Routes>
  )
}

export default App
