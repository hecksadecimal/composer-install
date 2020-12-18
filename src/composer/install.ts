import {exec} from '@actions/exec'
import * as core from '@actions/core';

export async function install(
  dependencyPreference: string,
  composerOptions = '',
  workingDirectory = ''
): Promise<void> {
  const args: string[] = []
  const options: string[] = composerOptions.split(' ')

  switch (dependencyPreference) {
    case 'highest':
      args.push('update')
      break
    case 'lowest':
      args.push('update', '--prefer-lowest')
      break
    case 'locked':
    default:
      args.push('install')
  }

  if (workingDirectory != '') {
    args.push('-d ' + workingDirectory)
  }
  args.push('--no-interaction', '--ansi')
  args.push(...options)
  
  const filteredArgs = args; //args.filter(Boolean)
  core.debug('Opts: composer ' + filteredArgs.join(" "))
  await exec('composer', filteredArgs)
}
