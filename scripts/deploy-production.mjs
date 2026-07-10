import { execFileSync } from 'node:child_process'

function run(command, args, options = {}) {
  return execFileSync(command, args, {
    cwd: process.cwd(),
    encoding: 'utf8',
    stdio: options.inherit ? 'inherit' : 'pipe',
  })
}

function fail(message) {
  console.error(`Production deploy blocked: ${message}`)
  process.exit(1)
}

const initialStatus = run('git', ['status', '--porcelain']).trim()
if (initialStatus) fail('the worktree is dirty. Commit or stash every change first.')

const branch = run('git', ['branch', '--show-current']).trim()
if (!branch) fail('the repository is in detached HEAD state.')

try {
  run('git', ['fetch', '--quiet'])
} catch {
  fail('git fetch failed, so the pushed commit cannot be verified.')
}

let upstream
try {
  upstream = run('git', ['rev-parse', '--abbrev-ref', '--symbolic-full-name', '@{u}']).trim()
} catch {
  fail(`branch ${branch} has no upstream. Push it before deploying.`)
}

const localCommit = run('git', ['rev-parse', 'HEAD']).trim()
const upstreamCommit = run('git', ['rev-parse', upstream]).trim()
if (localCommit !== upstreamCommit) {
  fail(`HEAD does not match ${upstream}. Push the current commit before deploying.`)
}

console.log('Running tests...')
run('npm', ['test'], { inherit: true })

console.log('Running production build...')
run('npm', ['run', 'build'], { inherit: true })

const finalStatus = run('git', ['status', '--porcelain']).trim()
if (finalStatus) fail('tests or the build changed tracked files. Commit those changes before deploying.')

console.log('Deploying the verified commit to Vercel production...')
run('vercel', ['deploy', '--prod', '--yes'], { inherit: true })
