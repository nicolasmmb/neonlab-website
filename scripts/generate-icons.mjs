import { readFileSync, writeFileSync } from 'node:fs'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import { Resvg } from '@resvg/resvg-js'

const __dirname = dirname(fileURLToPath(import.meta.url))
const PUBLIC_DIR = resolve(__dirname, '../public')
const faviconSvgPath = resolve(PUBLIC_DIR, 'favicon.svg')
const faviconSvg = readFileSync(faviconSvgPath, 'utf-8')

function renderPng(size) {
  const renderer = new Resvg(faviconSvg, {
    fitTo: {
      mode: 'width',
      value: size,
    },
    background: 'rgba(0, 0, 0, 0)',
  })

  const renderResult = renderer.render()
  return Buffer.from(renderResult.asPng())
}

function createIco(pngBuffer, size) {
  const header = Buffer.alloc(6)
  header.writeUInt16LE(0, 0)
  header.writeUInt16LE(1, 2)
  header.writeUInt16LE(1, 4)

  const entry = Buffer.alloc(16)
  entry[0] = size === 256 ? 0 : size
  entry[1] = size === 256 ? 0 : size
  entry[2] = 0
  entry[3] = 0
  entry.writeUInt16LE(1, 4)
  entry.writeUInt16LE(32, 6)
  entry.writeUInt32LE(pngBuffer.length, 8)
  entry.writeUInt32LE(header.length + entry.length, 12)

  return Buffer.concat([header, entry, pngBuffer])
}

function writeIconFiles() {
  const png32 = renderPng(32)
  const png180 = renderPng(180)
  const png192 = renderPng(192)
  const png512 = renderPng(512)
  const ico = createIco(png32, 32)

  writeFileSync(`${PUBLIC_DIR}/favicon-32x32.png`, png32)
  writeFileSync(`${PUBLIC_DIR}/apple-touch-icon.png`, png180)
  writeFileSync(`${PUBLIC_DIR}/favicon-192x192.png`, png192)
  writeFileSync(`${PUBLIC_DIR}/favicon-512x512.png`, png512)
  writeFileSync(`${PUBLIC_DIR}/favicon.ico`, ico)
}

writeIconFiles()
