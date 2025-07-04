import type { ChangelogOption } from '@soybeanjs/changelog';

export interface CliOption {
  /**
   * Options of generate changelog
   *
   * @link https://github.com/soybeanjs/changelog
   */
  changelogOptions: Partial<ChangelogOption>;
  /**
   * Cleanup dirs
   *
   * Glob pattern syntax {@link https://github.com/isaacs/minimatch}
   *
   * @default
   * ```json
   * ["** /dist", "** /pnpm-lock.yaml", "** /node_modules", "!node_modules/**"]
   * ```
   */
  cleanupDirs: string[];
  /** The project root directory */
  cwd: string;
  /**
   * Npm-check-updates command args
   *
   * @default ['--deep', '-u']
   */
  ncuCommandArgs: string[];
}
