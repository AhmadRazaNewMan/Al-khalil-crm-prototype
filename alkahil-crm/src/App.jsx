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
import EmailModule from './components/email/EmailModule'
import LeadsPage from './components/leads/LeadsPage'
import SettingsPage from './components/settings/SettingsPage'
import AIAgentPage from './components/ai/AIAgentPage'

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [role, setRole] = useState('admin')

  const handleLogin = (r = 'admin') => {
    setRole(r === 'agent' ? 'agent' : 'admin')
    setIsAuthenticated(true)
  }

  const isAgent = role === 'agent'

  return (
    <div style={{ minHeight: '100%', position: 'relative' }}>
      <AppBackground />
      <div style={{ position: 'relative', zIndex: 1, minHeight: '100vh' }}>
        {!isAuthenticated ? (
          <LoginPage onLogin={handleLogin} />
        ) : (
          <AppLayout role={role} onLogout={() => setIsAuthenticated(false)}>
            <Routes>
              <Route path="/" element={<Navigate to="/dashboard" replace />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/inbox" element={<UnifiedInbox role={role} />} />
              <Route path="/calls" element={<CallLogs role={role} />} />
              <Route path="/whatsapp" element={<WhatsAppModule role={role} />} />
              <Route path="/sms" element={<SMSModule role={role} />} />
              <Route path="/email" element={<EmailModule role={role} />} />
              <Route path="/leads" element={<LeadsPage />} />
              <Route
                path="/settings"
                element={isAgent ? <Navigate to="/dashboard" replace /> : <SettingsPage />}
              />
              <Route path="/ai-agent" element={<AIAgentPage />} />
              <Route path="*" element={<Navigate to="/dashboard" replace />} />
            </Routes>
          </AppLayout>
        )}
      </div>
    </div>
  )
}
