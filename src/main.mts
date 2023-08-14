import { addPath, setFailed, getInput, group } from '@actions/core'
import { exec } from '@actions/exec'
import {
  cacheDir,
  downloadTool,
  extractTar,
  extractZip,
  find
} from '@actions/tool-cache'
import { osArchToUrl } from './util.js'

const extractArchive = async (
  url: string,
  archive: string
): Promise<string> => {
  if (url.endsWith('.zip')) {
    return await extractZip(archive)
  }
  if (url.endsWith('.tgz')) {
    return await extractTar(archive)
  }
  setFailed(`Unknown archive kind: ${archive} (expected .tgz or .zip)`)
  return ''
}

const isCached = async (os: string, arch: string): Promise<boolean> => {
  const cachedBinstall = find('cargo-binstall', 'latest', `${os}-${arch}`)
  if (cachedBinstall !== '') {
    addPath(cachedBinstall)
    return true
  }
  return false
}

const fetchBinstall = async (os: string, arch: string) => {
  const binstallUrl = osArchToUrl(os, arch)
  const binstallArchive = await downloadTool(binstallUrl)
  const extractedPath = await extractArchive(binstallUrl, binstallArchive)
  const cachedPath = await cacheDir(
    extractedPath,
    os.toLowerCase() === 'windows' ? 'cargo-binstall.exe' : 'cargo-binstall',
    'latest',
    `${os}-${arch}`
  )
  addPath(cachedPath)
}

const installPackages = async () => {
  const packages = getInput('packages')
    .split(/(,|\s)+/)
    .map((p) => p.trim())
    .filter((p) => p.length > 0)
  await exec('cargo-binstall', ['-y', '--no-symlinks', ...packages])
}

async function run(): Promise<void> {
  try {
    if (!process.env.RUNNER_OS || !process.env.RUNNER_ARCH) {
      setFailed('Missing runner OS and arch')
    }
    const os = process.env.RUNNER_OS ?? ''
    const arch = process.env.RUNNER_ARCH ?? ''
    if (!(await isCached(os, arch))) {
      await group('Fetch cargo binstall', () => fetchBinstall(os, arch))
    }
    await group('Install packages with cargo-binstall', () => installPackages())
  } catch (error) {
    if (error instanceof Error) setFailed(error.message)
  }
}

run()
