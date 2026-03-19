import { DataCoreModule } from './DataCore'
import { RealEstateModule } from './RealEstate'
import { FialoModule } from './Fialo'
import { RelAiAModule } from './RelAiA'
import { DashboardModule } from './Dashboard'
import { DocumentsModule } from './Documents'
import { CreditAnalysisModule } from './CreditAnalysis'
import { FinanceModule } from './Finance'
import { CRMModule } from './CRM'
import { IntegrationsManagerModule } from './IntegrationsManager'

/**
 * Modular Application Layer Bootstrap
 * Initializes all distinct business logic modules for the SaaS.
 */
export const initModules = () => {
  const modules = [
    DataCoreModule, // Central Data Core must initialize first
    RealEstateModule,
    FialoModule,
    RelAiAModule,
    DashboardModule,
    DocumentsModule,
    CreditAnalysisModule,
    FinanceModule,
    CRMModule,
    IntegrationsManagerModule,
  ]

  console.log('[LOCXIA Core] Bootstrapping Application Modules...')
  modules.forEach((m) => m.init())
  console.log('[LOCXIA Core] All modules ready.')
}
