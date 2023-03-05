import { setFailed } from '@actions/core'

export const osArchToUrl = (os: string, arch: string): string => {
  if (os.toLowerCase() === 'linux') {
    if (arch.toLowerCase() === 'x86_64' || arch.toLowerCase() === 'x64') {
      return 'https://github.com/cargo-bins/cargo-binstall/releases/latest/download/cargo-binstall-x86_64-unknown-linux-musl.tgz'
    }
    if (
      arch.toLowerCase() === 'arm64' ||
      arch.toLowerCase() === 'aarch64' ||
      arch.toLowerCase() === 'armv8'
    ) {
      return 'https://github.com/cargo-bins/cargo-binstall/releases/latest/download/cargo-binstall-aarch64-unknown-linux-musl.tgz'
    }
    if (arch.toLowerCase() === 'armv7') {
      return 'https://github.com/cargo-bins/cargo-binstall/releases/latest/download/cargo-binstall-x86_64-unknown-linux-musl.tgz'
    }
  }
  if (os.toLowerCase() === 'windows') {
    if (arch.toLowerCase() === 'x86_64' || arch.toLowerCase() === 'x64') {
      return 'https://github.com/cargo-bins/cargo-binstall/releases/latest/download/cargo-binstall-x86_64-pc-windows-msvc.zip'
    }
    if (
      arch.toLowerCase() === 'arm64' ||
      arch.toLowerCase() === 'aarch64' ||
      arch.toLowerCase() === 'armv8'
    ) {
      return 'https://github.com/cargo-bins/cargo-binstall/releases/latest/download/cargo-binstall-aarch64-pc-windows-msvc.zip'
    }
  }
  if (os.toLowerCase() === 'macos') {
    if (
      arch.toLowerCase() === 'arm64' ||
      arch.toLowerCase() === 'aarch64' ||
      arch.toLowerCase() === 'armv8' ||
      arch.toLowerCase() === 'm1' ||
      arch.toLowerCase() === 'm2'
    ) {
      return 'https://github.com/cargo-bins/cargo-binstall/releases/latest/download/cargo-binstall-aarch64-apple-darwin.zip'
    }
    if (arch.toLowerCase() === 'x86_64' || arch.toLowerCase() === 'x64') {
      return 'https://github.com/cargo-bins/cargo-binstall/releases/latest/download/cargo-binstall-x86_64-apple-darwin.zip'
    }
    return 'https://github.com/cargo-bins/cargo-binstall/releases/latest/download/cargo-binstall-universal-apple-darwin.zip'
  }
  setFailed('Unsupported OS/arch')
  return ''
}
