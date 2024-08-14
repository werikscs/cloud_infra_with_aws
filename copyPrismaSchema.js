import fs from 'node:fs'

const originalFilePath = './prisma/schema.prisma'
const newFilePath = './prisma/schema.prisma.dev'

fs.readFile(originalFilePath, 'utf8', (readErr, data) => {
  if (readErr) {
    console.error('Error reading the original file:', readErr)
    return
  }

  const newData = data
    .replace(/postgresql/g, 'sqlite')
    .replace(/DATABASE_URL/g, 'DATABASE_URL_TEST')

  fs.writeFile(newFilePath, newData, 'utf8', (writeErr) => {
    if (writeErr) {
      console.error('Error writing the new file:', writeErr)
      return
    }
    console.log('File copied and modified successfully!')
  })
})
