import { readFile, readdir, stat } from 'node:fs/promises'
import AdmZip from 'adm-zip'

const zipExtensions = ['gstz', 'zip', 'catz']
function getExtension(extension_or_file: string) {
  const extension = extension_or_file.split('.').pop()?.toLowerCase() || ''
  return extension
}
function isZipExtension(extension_or_file: string) {
  const extension = getExtension(extension_or_file)
  return zipExtensions.includes(extension)
}
function replaceSlashes(path: string) {
  return path.replaceAll('\\', '/')
}
function filename(path: string) {
  return replaceSlashes(path).split('/').pop()
}
function dirname(path: string) {
  return replaceSlashes(path).split('/').slice(0, -1).join('/')
}
export async function isFile(f: any) {
  const stats = await stat(f)
  return stats.isFile()
}

export async function readAndUnzipFile(path: string) {
  try {
    if (!(await isFile(path)))
      return undefined
    const isZip = isZipExtension(path)
    if (isZip) {
      const zip = new AdmZip(path)
      const zipEntries = zip.getEntries()
      const entry = zipEntries[0]
      return entry.getData().toString('utf-8')
    }
    else {
      return await readFile(path, 'utf-8')
    }
  }
  catch (e) {
    // eslint-disable-next-line no-console
    console.log(e)
    return undefined
  }
}

export async function getFile(filePath: any) {
  return await readAndUnzipFile(filePath).then(data => ({ data, name: filename(filePath), path: filePath }))
}

export async function getFolderFiles(folderPath: any) {
  const fileObjects = []
  const isPathFile = await isFile(folderPath)
  if (isPathFile)
    folderPath = dirname(folderPath)

  const entries = await readdir(folderPath)
  for (const entry of entries) {
    const filePath = `${folderPath}/${entry}`
    fileObjects.push(readAndUnzipFile(filePath).then(data => ({ data, name: entry, path: filePath })))
  }

  return (await Promise.all(fileObjects)).filter(o => o.data)
}
