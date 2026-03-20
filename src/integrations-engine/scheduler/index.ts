import { IntegrationService } from '../service'

export class Scheduler {
  private static timers: ReturnType<typeof setInterval>[] = []

  static schedule(name: string, intervalMs: number, task: () => Promise<void>) {
    console.log(`[Scheduler] Registered job: ${name} (every ${intervalMs}ms)`)

    // Initial mock execution with a small delay to simulate background workers
    setTimeout(() => task().catch(console.error), 2000)

    const timer = setInterval(() => {
      console.log(`[Scheduler] Executing periodic job: ${name}`)
      task().catch(console.error)
    }, intervalMs)

    this.timers.push(timer)
  }

  static startAll() {
    // Uses the isolated tenant configuration
    const tenantId = localStorage.getItem('locxia_active_tenant') || 't1'

    // Tecimob (Property Sync): Every 1 hour
    this.schedule('Tecimob Property Sync', 60 * 60 * 1000, async () => {
      await IntegrationService.syncTecimobProperties(tenantId)
    })

    // Superlógica (Contract Sync): Every 24 hours
    this.schedule('Superlogica Contract Sync', 24 * 60 * 60 * 1000, async () => {
      await IntegrationService.syncSuperlogicaContracts(tenantId)
    })

    // Superlógica (Financial Sync): Every 1 hour
    this.schedule('Superlogica Financial Sync', 60 * 60 * 1000, async () => {
      await IntegrationService.syncData(tenantId, 'Superlogica', '/financial', 'FINANCIAL_UPDATE')
    })

    // Cora (Bank Conciliation): Every 30 minutes
    this.schedule('Cora Bank Conciliation', 30 * 60 * 1000, async () => {
      await IntegrationService.syncData(tenantId, 'Cora', '/conciliation', 'FINANCIAL_UPDATE')
    })

    // Serasa/Porto (Credit Re-check): Every 24 hours
    this.schedule('Credit Re-check (Serasa/Porto)', 24 * 60 * 60 * 1000, async () => {
      await IntegrationService.syncData(tenantId, 'Serasa', '/recheck', 'CREDIT_RESULT')
      await IntegrationService.syncData(tenantId, 'PortoSeguro', '/recheck', 'CREDIT_RESULT')
    })

    // Dihub (Certificate Update): Every 24 hours
    this.schedule('Dihub Certificate Update', 24 * 60 * 60 * 1000, async () => {
      await IntegrationService.syncData(tenantId, 'Dihub', '/certificates', 'NEW_DOCUMENT')
    })
  }

  static stopAll() {
    this.timers.forEach(clearInterval)
    this.timers = []
  }
}
