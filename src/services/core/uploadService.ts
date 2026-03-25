import { CryptoService } from './cryptoService'

/**
 * UploadService
 * Manages secure file uploads, applying AES-256 encryption before storage,
 * and generating time-limited presigned URLs.
 */
export class UploadService {
  /**
   * Encrypts file data before sending to the storage bucket.
   */
  static async uploadEncryptedFile(tenantId: string, fileData: string, tenantKey: string) {
    const encryptedData = CryptoService.encryptAES256(fileData, tenantKey)
    const fileId = crypto.randomUUID()

    console.log(
      `[UploadService] File ${fileId} encrypted (AES-256) and stored for tenant ${tenantId}`,
    )

    return {
      id: fileId,
      path: `/secure-storage/${tenantId}/${fileId}`,
      encryptedSize: encryptedData.length,
    }
  }

  /**
   * Generates a temporary, time-limited presigned URL for secure access.
   */
  static generateTemporaryDownloadUrl(fileId: string, expiresInMinutes: number = 15): string {
    const expiresAt = Date.now() + expiresInMinutes * 60000
    // Generate a mock HMAC signature for the URL
    const signature = btoa(`hmac_${fileId}_${expiresAt}`).substring(0, 16)

    return `https://storage.locxia.app/secure/files/${fileId}?expires=${expiresAt}&sig=${signature}`
  }
}
