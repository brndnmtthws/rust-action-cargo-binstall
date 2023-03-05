import {
  debug,
  startGroup,
  addPath,
  endGroup,
  setFailed,
  info,
  getInput
} from '@actions/core'
import { exec } from '@actions/exec'
import { downloadTool } from '@actions/tool-cache'
import { promises as fs } from 'fs'
import path from 'path'
import yn from 'yn'

const rustupExists = async (): Promise<boolean> => {
  startGroup('Checking for rustup')
  try {
    await exec('rustup', ['show'])
    return true
  } catch (error) {
    if (error instanceof Error) debug(error.message)
    return false
  } finally {
    endGroup()
  }
}

const fetchRustup = async () => {
  startGroup('Install rustup')
  const rustupInstaller =
    process.platform === 'win32'
      ? await downloadTool('https://win.rustup.rs')
      : await downloadTool('https://sh.rustup.rs')
  await fs.chmod(rustupInstaller, 0o755)

  await exec(rustupInstaller, ['--default-toolchain', 'none', '-y'])

  addPath(path.join(process.env.HOME ?? process.cwd(), '.cargo', 'bin'))

  await exec('rustup', ['show'])
  endGroup()
}

const selfUpdateRustup = async () => {
  startGroup('Updating rustup')
  await exec('rustup', ['self', 'update'])
  endGroup()
}

const installToolchain = async () => {
  startGroup('Installing toolchain')
  const toolchain = getInput('toolchain')
  const allowDowngrade = yn(getInput('allow-downgrade'))
  const profile = getInput('profile')
  const components = getInput('components')
    .split(/(,|\s)+/)
    .map((c) => c.trim())
    .filter((c) => c.length > 0)
    .flatMap((c) => ['--component', c])

  await exec('rustup', [
    'toolchain',
    'install',
    toolchain,
    ...(allowDowngrade ? ['--allow-downgrade'] : []),
    ...(profile ? ['--profile', profile] : []),
    ...components
  ])
  await exec('rustup', ['default', toolchain])
  endGroup()
}

const installAdditionalTargets = async (additionalTargets: string) => {
  startGroup('Installing additional targets')

  const targets = additionalTargets
    .split(/(,|\s)+/)
    .map((t) => t.trim())
    .filter((t) => t.length > 0)

  for (const target of targets) {
    await exec('rustup', ['target', 'add', target])
  }
  endGroup()
}

async function run(): Promise<void> {
  try {
    if (!(await rustupExists())) {
      info('Need to install rustup')
      await fetchRustup()
    } else {
      info('Rustup is already installed, nice 😎')
    }
    const selfUpdate = yn(getInput('self-update')) ?? false
    if (selfUpdate) {
      await selfUpdateRustup()
    }
    await installToolchain()
    const additionalTargets = getInput('targets')
    if (additionalTargets && additionalTargets.length > 0) {
      await installAdditionalTargets(additionalTargets)
    }
  } catch (error) {
    if (error instanceof Error) setFailed(error.message)
  }
}

run()
