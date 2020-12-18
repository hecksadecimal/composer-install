import {exec} from '@actions/exec'

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

  args.push('--no-interaction', '--ansi')
  if (workingDirectory != '') {
    args.push('-d ' + workingDirectory)
  }
  args.push(...options)

  const filteredArgs = args; //args.filter(Boolean)
  await exec('composer', filteredArgs)
}
