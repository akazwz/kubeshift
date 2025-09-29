# kubeshift

A simple CLI to switch your active Kubernetes cluster by managing the kubeconfig at `~/.kube/config`.

- **Package name**: `kubeshift`
- **CLI commands**: `kubeshift` (long form), `ks` (short alias)

## Features
- **List** available kubeconfig files in `~/.kube` (YAML/YML).
- **Use** a selected config to overwrite `~/.kube/config`.
- Simple, zero-dependency workflow built on Node.js.

## Installation
```bash
# with npm
yarn global add kubeshift # or
npm i -g kubeshift        # or
pnpm add -g kubeshift
```

Alternatively, run without global install:
```bash
npx kubeshift list
```

## Usage
```
$ kubeshift --help
$ ks --help
```

### List clusters
Scans `~/.kube` and prints files ending with `.yaml` or `.yml`.
```bash
kubeshift list
# or
ks list
```
Example output:
```
kubernetes clusters:  [ 'cluster-a', 'staging', 'prod' ]
```

### Use a cluster
Select a cluster by prefix (case-sensitive). The command finds the first file whose name starts with the given value and writes its contents to `~/.kube/config`.
```bash
kubeshift use staging
# or
ks use staging
```
If `staging.yaml` exists under `~/.kube`, it becomes your active kubeconfig.

## How it works
- Reads `~/.kube` directory.
- Treats any `*.yaml`/`*.yml` file as a candidate config.
- `use <cluster>` performs a prefix match on filenames and writes the matched file's contents into `~/.kube/config`.

## Notes & limitations
- The match is prefix-based: `use prod` matches the first of `prod.yaml`, `prod-eu.yaml`, etc.
- If multiple files share the same prefix, the first match wins. Keep names unambiguous.
- If no match is found, the CLI prints `cluster not found: <name>`.
- Ensure your kubeconfig files in `~/.kube` are valid.

## Requirements
- Node.js 18+ recommended (ES modules). Earlier versions may work but are not officially tested.
- Access to your `~/.kube` directory.

## Development
```bash
# install deps
pnpm install

# build once
pnpm build

# watch mode (TypeScript -> dist)
pnpm dev

# run built CLI
node dist/index.js --help
```
During development you can also link locally:
```bash
pnpm build
npm link  # or pnpm link --global
kubeshift list
```

## Project structure
- `index.ts`: CLI entry that defines `list` and `use <cluster>` commands.
- `dist/index.js`: Compiled output used by the published binary.

## License
ISC

## Author
[@akazwz](https://github.com/akazwz)
