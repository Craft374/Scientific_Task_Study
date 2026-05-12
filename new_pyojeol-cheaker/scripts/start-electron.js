const fs = require('fs');
const path = require('path');
const { createRequire } = require('module');
const { spawnSync } = require('child_process');

function getPlatformPath(platform) {
  switch (platform) {
    case 'darwin':
      return 'Electron.app/Contents/MacOS/Electron';
    case 'win32':
      return 'electron.exe';
    default:
      return 'electron';
  }
}

function getElectronDir() {
  return path.dirname(require.resolve('electron/package.json'));
}

function expandArchive(zipPath, distDir, extract) {
  if (process.platform !== 'win32') {
    return extract(zipPath, { dir: distDir });
  }

  const escapedZipPath = zipPath.replace(/'/g, "''");
  const escapedDistDir = distDir.replace(/'/g, "''");
  const result = spawnSync(
    'powershell.exe',
    [
      '-NoProfile',
      '-Command',
      `Expand-Archive -LiteralPath '${escapedZipPath}' -DestinationPath '${escapedDistDir}' -Force`
    ],
    {
      stdio: 'inherit',
      windowsHide: true
    }
  );

  if (result.error) {
    throw result.error;
  }

  if (result.status !== 0) {
    throw new Error(`Expand-Archive failed with exit code ${result.status}`);
  }
}

async function ensureElectronBinary() {
  const electronDir = getElectronDir();
  const electronRequire = createRequire(path.join(electronDir, 'package.json'));
  const electronPackage = require(path.join(electronDir, 'package.json'));
  const platformPath = getPlatformPath(process.platform);
  const distDir = path.join(electronDir, 'dist');
  const binaryPath = path.join(distDir, platformPath);
  const pathFile = path.join(electronDir, 'path.txt');

  if (fs.existsSync(binaryPath)) {
    if (!fs.existsSync(pathFile) || fs.readFileSync(pathFile, 'utf-8') !== platformPath) {
      fs.writeFileSync(pathFile, platformPath, 'utf-8');
    }
    return binaryPath;
  }

  console.log('Downloading Electron binary...');

  const { downloadArtifact } = electronRequire('@electron/get');
  const extract = electronRequire('extract-zip');
  const zipPath = await downloadArtifact({
    version: electronPackage.version,
    artifactName: 'electron',
    checksums: require(path.join(electronDir, 'checksums.json')),
    platform: process.env.ELECTRON_INSTALL_PLATFORM || process.env.npm_config_platform || process.platform,
    arch: process.env.ELECTRON_INSTALL_ARCH || process.env.npm_config_arch || process.arch
  });

  fs.rmSync(distDir, { recursive: true, force: true });
  fs.mkdirSync(distDir, { recursive: true });
  await expandArchive(zipPath, distDir, extract);

  const srcTypeDefPath = path.join(distDir, 'electron.d.ts');
  const targetTypeDefPath = path.join(electronDir, 'electron.d.ts');
  if (fs.existsSync(srcTypeDefPath)) {
    fs.renameSync(srcTypeDefPath, targetTypeDefPath);
  }

  if (!fs.existsSync(binaryPath)) {
    throw new Error(`Electron binary was not extracted to ${binaryPath}`);
  }

  fs.writeFileSync(pathFile, platformPath, 'utf-8');
  return binaryPath;
}

async function main() {
  const electronBinary = await ensureElectronBinary();
  const electronArgs = process.argv.slice(2);
  const appArgs = electronArgs.length > 0 ? electronArgs : [process.cwd()];
  const result = spawnSync(electronBinary, appArgs, {
    stdio: 'inherit',
    windowsHide: false
  });

  if (result.error) {
    throw result.error;
  }

  process.exit(result.status ?? 0);
}

main().catch((error) => {
  console.error(error.stack || error);
  process.exit(1);
});
