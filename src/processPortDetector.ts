/**
 * Process-based port detector.
 * Reads Antigravity Language Server command line args to extract ports and CSRF token.
 */

import { exec } from 'child_process';
import { promisify } from 'util';

const execAsync = promisify(exec);

export interface AntigravityProcessInfo {
  /** HTTP port from --extension_server_port */
  extensionPort: number;
  /** HTTPS port for Connect/CommandModelConfigs (usually extension_port + 1) */
  connectPort: number;
  csrfToken: string;
}

export class ProcessPortDetector {
  /**
   * Detect credentials (ports + CSRF token) from the running process.
   */
  async detectProcessInfo(): Promise<AntigravityProcessInfo | null> {
    try {
      // Fetch full command line for the language server process.
      const { stdout } = await execAsync(
        'wmic process where "name=\'language_server_windows_x64.exe\'" get CommandLine /format:list',
        { timeout: 5000 }
      );

      const portMatch = stdout.match(/--extension_server_port[=\s]+(\d+)/);
      const tokenMatch = stdout.match(/--csrf_token[=\s]+([a-f0-9\-]+)/i);

      if (portMatch && portMatch[1] && tokenMatch && tokenMatch[1]) {
        const extensionPort = parseInt(portMatch[1], 10);
        // Observed rule: Connect port is extension_server_port + 1 (e.g., 63462 -> 63463)
        const connectPort = extensionPort + 1;
        const csrfToken = tokenMatch[1];

        console.log(`✅ extension_server_port (HTTP): ${extensionPort}`);
        console.log(`✅ inferred Connect port (HTTPS): ${connectPort}`);
        console.log(`✅ CSRF Token: ${csrfToken.substring(0, 8)}...`);

        return { extensionPort, connectPort, csrfToken };
      }

      console.warn('⚠️ Unable to extract both port and CSRF Token from process output.');
      console.warn('⚠️ Process stdout sample:', stdout.substring(0, 200));
    } catch (error) {
      console.error('Process port detection failed:', error);
    }

    return null;
  }
}
