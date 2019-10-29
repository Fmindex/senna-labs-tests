const axios = require('axios')
const fs = require('fs')

const extractNameFromHtmlTag = htmlTag => {
  const startIndex = htmlTag.indexOf(`\n`)
  const endIndex = htmlTag.indexOf(` <`)
  return htmlTag.substr(startIndex + 2, endIndex - startIndex - 2).trim()
}

const extractAllNames = webPage => {
  const pattern = /<div class="nameMem">\n   .+   <\/div>/g
  return webPage.match(pattern).map(row => extractNameFromHtmlTag(row))
}

const extractAllPictureUrls = webPage => {
  const baseUrl = 'https://www.bnk48.com/'
  const pattern = /data\/Members\/\d+\/s\/.+.png/g
  return webPage.match(pattern).map(path => baseUrl + path)
}

const zipNameAndPictureUrl = (names, pictureUrls) =>
  names.map((name, idx) => ({
    name,
    pictureUrl: pictureUrls[idx]
  }))

const downloadPicture = async (pictureName, pictureUrl) => {
  const url = pictureUrl
  const writer = fs.createWriteStream(pictureName + '.png')

  const response = await axios({
    url,
    method: 'GET',
    responseType: 'stream'
  })

  response.data.pipe(writer)

  return new Promise((resolve, reject) => {
    writer.on('finish', resolve)
    writer.on('error', reject)
  })
}

const getAllBNKMembersPicture = async () => {
  const { data: webPage } = await axios.get(
    'https://www.bnk48.com/index.php?page=members'
  )
  const names = extractAllNames(webPage)
  const pictureUrls = extractAllPictureUrls(webPage)

  return zipNameAndPictureUrl(names, pictureUrls)
}

const downloadAllBNKMembersPicture = async () => {
  const allMembersPicture = await getAllBNKMembersPicture()
  Promise.all(
    allMembersPicture.map(async ({ name, pictureUrl }) => {
      await downloadPicture(name, pictureUrl)
    })
  )
}

downloadAllBNKMembersPicture()
