import { Routes, Route } from 'react-router'
import './App.css'

// screens
import { AppLayout } from '@/components/screens/AppLayout/AppLayout'
import { HomeScreen } from '@/components/screens/HomeScreen/HomeScreen'
import { ChatScreen } from '@/components/screens/ChatScreen/ChatScreen'
import { SettingsScreen } from '@/components/screens/SettingsScreen/SettingsScreen'
import { LoginScreen } from '@/components/screens/AuthScreen/LoginScreen'
import { SignupScreen } from '@/components/screens/AuthScreen/SignupScreen'
import { ProfileScreen } from '@/components/screens/ProfileScreen/ProfileScreen'
import { Page404 } from '@/components/screens/ErrorScreens/Page404'

function App() {
  return (
    <Routes>
      <Route element={<AppLayout />}>
        <Route path='/' element={<HomeScreen />} />
        <Route path='/chats/:recipientId?' element={<ChatScreen />} />
        <Route path='/settings' element={<SettingsScreen />} />
        <Route path='/login' element={<LoginScreen />} />
        <Route path='/signup' element={<SignupScreen />} />
        <Route path='/profile/:userId/:edit?' element={<ProfileScreen />} />
        <Route path='/*' element={<Page404 />} />
      </Route>
    </Routes>
  )
}

export default App
