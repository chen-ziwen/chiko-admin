import process from 'node:process';

import { loadConfig } from 'c12';

import type { CliOption } from '../types';

const defaultOptions: CliOption = {
  cleanupDirs: [
    '**/dist',
    '**/package-lock.json',
    '**/yarn.lock',
    '**/pnpm-lock.yaml',
    '**/node_modules',
    '!node_modules/**'
  ],
  cwd: process.cwd(),
  ncuCommandArgs: ['--deep', '-u']
};

export async function loadCliOptions(overrides?: Partial<CliOption>, cwd = process.cwd()) {
  const { config } = await loadConfig<Partial<CliOption>>({
    cwd,
    defaults: defaultOptions,
    name: 'chiko',
    overrides,
    packageJson: true
  });

  return config as CliOption;
}
