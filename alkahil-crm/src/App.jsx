import { Routes, Route, Navigate } from 'react-router-dom'
import { useState } from 'react'
import LoginPage from './components/auth/LoginPage'
import AppLayout from './components/layout/AppLayout'
import AppBackground from './components/layout/AppBackground'
import Dashboard from './components/dashboard/Dashboard'
import UnifiedInbox from './components/inbox/UnifiedInbox'
import CallLogs from './components/calls/CallLogs'
import WhatsAppModule from './components/whatsapp/WhatsAppModule'
import SMSModule from './components/sms/SMSModule'
import LeadsPage from './components/leads/LeadsPage'
import SettingsPage from './components/settings/SettingsPage'

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  return (
    <div style={{ minHeight: '100%', position: 'relative' }}>
      <AppBackground />
      <div style={{ position: 'relative', zIndex: 1, minHeight: '100vh' }}>
        {!isAuthenticated ? (
          <LoginPage onLogin={() => setIsAuthenticated(true)} />
        ) : (
          <AppLayout onLogout={() => setIsAuthenticated(false)}>
            <Routes>
              <Route path="/" element={<Navigate to="/dashboard" replace />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/inbox" element={<UnifiedInbox />} />
              <Route path="/calls" element={<CallLogs />} />
              <Route path="/whatsapp" element={<WhatsAppModule />} />
              <Route path="/sms" element={<SMSModule />} />
              <Route path="/leads" element={<LeadsPage />} />
              <Route path="/settings" element={<SettingsPage />} />
              <Route path="*" element={<Navigate to="/dashboard" replace />} />
            </Routes>
          </AppLayout>
        )}
      </div>
    </div>
  )
}
