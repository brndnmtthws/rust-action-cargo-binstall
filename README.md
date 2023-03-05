[![Build and test](https://github.com/brndnmtthws/rust-action-cargo-binstall/actions/workflows/build-and-test.yml/badge.svg)](https://github.com/brndnmtthws/rust-action-cargo-binstall/actions/workflows/build-and-test.yml)

# GitHub action for installing rustup

This action provides a simple way to install
[rustup](https://rust-lang.github.io/rustup/index.html), the official Rust
language toolchain management tool. This action sets the default toolchain to
the one specified (or the default, if none is specified).

You can use this action in your workflow directly, or use the [all-in-one
action](https://github.com/brndnmtthws/rust-action) for all your Rust CI needs.

## Inputs

| Input             | Description                                                                                                                                                                                                     | Default? | Example           |
| ----------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------- | ----------------- |
| `toolchain`       | The Rust toolchain to install (i.e., stable, nightly, beta, etc). Refer to https://rust-lang.github.io/rustup/concepts/toolchains.html on how to specify the toolchain.                                         | `stable` | `nightly`         |
| `components`      | List of individual components to install after installing rustup. Can be a whitespace or comma separated list.                                                                                                  | n/a      | `clippy, rustfmt` |
| `profile`         | Override the default rustup profile (for example, 'minimal').                                                                                                                                                   | n/a      | `minimal`         |
| `allow-downgrade` | Allow rustup to downgrade the installation until all components are available.                                                                                                                                  | `true`   | `false`           |
| `targets`         | Install additional targets for cross compilation (i.e., 'x86_64-apple-ios, armv7-unknown-linux-musleabi'). Can be a whitespace or comma separate list of targets. Run `rustup target list` to list all targets. | n/a      | `aarch64-fuchsia` |
| `self-update`     | Make sure rustup itself is up-to-date before using it. This may fail on some platforms, so it's disabled by default.                                                                                            | `false`  | `true`            |

## Recipes

### Install with defaults

<details>
  <summary>Show me the code</summary>

```yaml
- uses: brndnmtthws/rust-action-cargo-binstall@v1
```

</details>

### Install a minimal stable toolchain

<details>
  <summary>Show me the code</summary>

```yaml
- uses: brndnmtthws/rust-action-cargo-binstall@v1
  with:
    toolchain: stable
    profile: minimal
```

</details>

### Install a minimal stable toolchain with rustfmt and clippy

<details>
  <summary>Show me the code</summary>

```yaml
- uses: brndnmtthws/rust-action-cargo-binstall@v1
  with:
    toolchain: stable
    profile: minimal
    components: rustfmt, clippy
```

</details>

### Install the default nightly toolchain

<details>
  <summary>Show me the code</summary>

```yaml
- uses: brndnmtthws/rust-action-cargo-binstall@v1
  with:
    toolchain: nightly
```

</details>

### Install the default toolchain, and ensure rustup is up-to-date

<details>
  <summary>Show me the code</summary>

```yaml
- uses: brndnmtthws/rust-action-cargo-binstall@v1
  with:
    self-update: 'true'
```

</details>
