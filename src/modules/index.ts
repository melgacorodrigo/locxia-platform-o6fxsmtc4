import { RelAiAModule } from './RelAiA'
import { DashboardModule } from './Dashboard'
import { DataCoreModule } from './DataCore'
import { AIBrainModule } from './AIBrain'

export const initModules = () => {
  console.log('--- Bootstrapping Application Modules ---')
  DataCoreModule.init()
  RelAiAModule.init()
  DashboardModule.init()
  AIBrainModule.init()
  console.log('--- Bootstrapping Complete ---')
}
