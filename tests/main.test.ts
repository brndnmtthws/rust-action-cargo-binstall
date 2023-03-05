import { osArchToUrl } from '../src/util'

test('arch and os map to correct url', () => {
  expect(osArchToUrl('Linux', 'arm64')).toBe(
    'https://github.com/cargo-bins/cargo-binstall/releases/latest/download/cargo-binstall-aarch64-unknown-linux-musl.tgz'
  )
  expect(osArchToUrl('Windows', 'ARM64')).toBe(
    'https://github.com/cargo-bins/cargo-binstall/releases/latest/download/cargo-binstall-aarch64-pc-windows-msvc.zip'
  )
  expect(osArchToUrl('macOS', 'X64')).toBe(
    'https://github.com/cargo-bins/cargo-binstall/releases/latest/download/cargo-binstall-x86_64-apple-darwin.zip'
  )
})
