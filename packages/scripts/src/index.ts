import cac from 'cac';
import { blue, lightGreen } from 'kolorist';

import { version } from '../package.json';

import { cleanup, genChangelog, release, updatePkg } from './commands';
import { loadCliOptions } from './config';

type Command = 'changelog' | 'cleanup' | 'release' | 'update-pkg';

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
      '-e, --execute [command]',
      "Execute additional command after bumping and before git commit. Defaults to 'npx soy changelog'"
    )
    .option('-p, --push', 'Indicates whether to push the git commit and tag')
    .option('-t, --total', 'Generate changelog by total tags')
    .option(
      '-c, --cleanupDir <dir>',
      'The glob pattern of dirs to cleanup, If not set, it will use the default value, Multiple values use "," to separate them'
    )
    .option('-l, --lang <lang>', 'display lang of cli', { default: 'en-us', type: [String] })
    .help();

  const commands: CommandWithAction<CommandArg> = {
    changelog: {
      action: async args => {
        await genChangelog(cliOptions.changelogOptions, args?.total);
      },
      desc: 'generate changelog'
    },
    cleanup: {
      action: async () => {
        await cleanup(cliOptions.cleanupDirs);
      },
      desc: 'delete dirs: node_modules, dist, etc.'
    },
    release: {
      action: async args => {
        await release(args?.execute, args?.push);
      },
      desc: 'release: update version, generate changelog, commit code'
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
