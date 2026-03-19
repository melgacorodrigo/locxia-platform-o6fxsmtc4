import { useEffect } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Toaster } from '@/components/ui/toaster'
import { Toaster as Sonner } from '@/components/ui/sonner'
import { TooltipProvider } from '@/components/ui/tooltip'
import { MainProvider } from '@/stores/useMainStore'
import Index from './pages/Index'
import Integrations from './pages/Integrations'
import Finance from './pages/Finance'
import RelAiA from './pages/RelAiA'
import Architecture from './pages/Architecture'
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
      <MainProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <Routes>
            <Route element={<Layout />}>
              <Route path="/" element={<Index />} />
              <Route path="/finance" element={<Finance />} />
              <Route path="/relaia" element={<RelAiA />} />
              <Route path="/integrations" element={<Integrations />} />
              <Route path="/architecture" element={<Architecture />} />
            </Route>
            <Route path="*" element={<NotFound />} />
          </Routes>
        </TooltipProvider>
      </MainProvider>
    </BrowserRouter>
  )
}

export default App
