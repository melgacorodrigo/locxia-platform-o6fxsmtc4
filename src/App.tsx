import { useEffect } from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { Toaster } from '@/components/ui/toaster'
import { Toaster as Sonner } from '@/components/ui/sonner'
import { TooltipProvider } from '@/components/ui/tooltip'
import Index from './pages/Index'
import Integrations from './pages/Integrations'
import Finance from './pages/Finance'
import RelAiA from './pages/RelAiA'
import Architecture from './pages/Architecture'
import Audit from './pages/Audit'
import Portfolio from './pages/Portfolio'
import Insights from './pages/Insights'
import NotFound from './pages/NotFound'
import Layout from './components/Layout'

// Bootstrap Architectural Modules
import { initModules } from '@/modules'

const App = () => {
  useEffect(() => {
    // Initialize modular logic on application start
    initModules()
  }, [])

  return (
    <BrowserRouter future={{ v7_startTransition: false, v7_relativeSplatPath: false }}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<Index />} />
            <Route path="/portfolio" element={<Portfolio />} />
            <Route path="/finance" element={<Finance />} />
            <Route path="/relaia" element={<RelAiA />} />
            <Route path="/audit" element={<Audit />} />
            <Route path="/integrations" element={<Integrations />} />
            <Route path="/architecture" element={<Architecture />} />
            <Route path="/insights" element={<Insights />} />
            <Route path="/insights/:category" element={<Insights />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </TooltipProvider>
    </BrowserRouter>
  )
}

export default App
