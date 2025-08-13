import cac from 'cac';
import { blue, lightGreen } from 'kolorist';

import { version } from '../package.json';

import { cleanup, updatePkg } from './commands';
import { loadCliOptions } from './config';

type Command = 'cleanup' | 'update-pkg';

type CommandAction<A extends object> = (args?: A) => Promise<void> | void;

type CommandWithAction<A extends object = object> = Record<Command, { action: CommandAction<A>; desc: string }>;

interface CommandArg {
  cleanupDir?: string;
  execute?: string;
  push?: boolean;
  total?: boolean;
}

export async function setupCli() {
  const cliOptions = await loadCliOptions();

  const cli = cac(blue('chiko-admin'));

  cli
    .version(lightGreen(version))
    .option(
      '-c, --cleanupDir <dir>',
      'The glob pattern of dirs to cleanup, If not set, it will use the default value, Multiple values use "," to separate them'
    )
    .help();

  const commands: CommandWithAction<CommandArg> = {
    cleanup: {
      action: async () => {
        await cleanup(cliOptions.cleanupDirs);
      },
      desc: 'delete dirs: node_modules, dist, etc.'
    },
    'update-pkg': {
      action: async () => {
        await updatePkg(cliOptions.ncuCommandArgs);
      },
      desc: 'update package.json dependencies versions'
    }
  };

  for (const [command, { action, desc }] of Object.entries(commands)) {
    cli.command(command, lightGreen(desc)).action(action);
  }

  cli.parse();
}

setupCli();
