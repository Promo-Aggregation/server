import pptr from 'puppeteer'

async function getGeneralData(page: any, category: string) {
  process.setMaxListeners(Infinity)
  const cards = await page.$$('.promo-card-list')

  const data: any[] = []

  for (const card of cards) {
    console.log('wait for it')
    const _title = card.$eval('h3', (h3: any) => h3.innerText)
    const _date = card.$eval('div[class*="date"]', (date: any) => date.innerText)
    const _detailUrl = card.$eval('a[class="btn_more"]', (node: any) => node.getAttribute('href'))
    // const _imageUrl = card.$eval('.img_con > img', (node: any) => node.getAttribute('src'))
    const _imageUrl = card.$eval('.promo-card-list-img > img', (node: any) =>
      node.getAttribute('src')
    )

    const [title, date, detailUrl, imageUrl] = await Promise.all([
      _title,
      _date,
      _detailUrl,
      _imageUrl,
    ])

    data.push({ title, date, detailUrl, imageUrl, kodePromo: null, tags: ['dana', category] })
  }

  console.log(data)
  return data
}

async function getDetailData(page: any) {
  process.setMaxListeners(Infinity)
  const allDetailLinks = await page.$$('a[class="btn_more"]')

  const data: any[] = []

  for (let i = 0; i < allDetailLinks.length; i++) {
    console.log('wait for it')
    const browser = await pptr.launch({
      headless: true,
      defaultViewport: { width: 1100, height: 600 },
      args: ['--no-sandbox', '--disable-setuid-sandbox'],
    })
    const page = await browser.newPage()
    const hrefValue = await (await allDetailLinks[i].getProperty('href')).jsonValue()
    console.log(hrefValue)

    try {
      const detail = { syaratKetentuan: [], cara: [] }
      await page.goto(hrefValue + 'full', { waitUntil: 'networkidle2', timeout: 0 })
      const detailItem = await page.evaluate(() =>
        Array.from(document.querySelectorAll('ol > li'), element => element.textContent)
      )

      let min: any
      const a = detailItem.filter(detail => detail.match(/minimum transaksi/i))
      if (a.length && a[0].includes('0')) {
        // console.log(a)
        const first = a[0]
        min = first.match(/\d+/)[0] + '000'
      }

      for (let j = 0; j < detailItem.length; j++) {
        if (detailItem[j].includes('Syarat dan ketentuan')) {
          detail.cara = [...detailItem.slice(j + 1)]
          detail.syaratKetentuan.push(detailItem[j])
          break
        } else {
          detail.syaratKetentuan.push(detailItem[j])
        }
      }

      data.push({ detail, minimalTransaction: Number(min) || null })

      await browser.close()
    } catch (err) {
      await browser.close()
      console.log(err)
      Promise.reject(err)
    }
  }

  return data
}

export async function danaFood() {
  process.setMaxListeners(Infinity)
  const browser = await pptr.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
    timeout: 0,
  })
  const data = []
  try {
    const page = await browser.newPage()
    await page.goto('https://dana.id/promo/category/Food', {
      waitUntil: 'networkidle2',
      timeout: 0,
    })
    await page.waitForSelector('.promo-list')

    const foo = await getGeneralData(page, 'food')

    const [generalData, detailData] = await Promise.all([Promise.all(foo), getDetailData(page)])

    for (let i = 0; i < generalData.length; i++) {
      data.push({
        ...generalData[i],
        detail: { ...detailData[i].detail },
        minimalTransaction: detailData[i].minimalTransaction,
        cashback: null,
      })
    }

    console.log(data)
    await browser.close()
    return data
  } catch (err) {
    await browser.close()
    console.log(err)
    Promise.reject(err)
  }
}

export async function danaEntertainment() {
  process.setMaxListeners(Infinity)
  const browser = await pptr.launch({
    headless: true,
    defaultViewport: { width: 1100, height: 600 },
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  })
  const data = []
  try {
    const page = await browser.newPage()
    await page.goto('https://dana.id/promo/category/Entertainment', { waitUntil: 'networkidle2' })
    await page.waitForSelector('.promo-list')

    const foo = await getGeneralData(page, 'entertainment')

    const [generalData, detailData] = await Promise.all([Promise.all(foo), getDetailData(page)])

    for (let i = 0; i < generalData.length; i++) {
      data.push({
        ...generalData[i],
        detail: { ...detailData[i].detail },
        minimalTransaction: detailData[i].minimalTransaction,
        cashback: null,
      })
    }

    await browser.close()

    return data
  } catch (err) {
    await browser.close()
    console.log(err)
    Promise.reject(err)
  }
}

export async function danaGame() {
  process.setMaxListeners(Infinity)
  const browser = await pptr.launch({
    headless: true,
    defaultViewport: { width: 1100, height: 600 },
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  })
  const data = []
  try {
    const page = await browser.newPage()
    await page.goto('https://dana.id/promo/category/Game', {
      waitUntil: 'networkidle2',
      timeout: 0,
    })
    await page.waitForSelector('.promo-list')

    const foo = await getGeneralData(page, 'game')

    const [generalData, detailData] = await Promise.all([Promise.all(foo), getDetailData(page)])

    for (let i = 0; i < generalData.length; i++) {
      data.push({
        ...generalData[i],
        detail: { ...detailData[i].detail },
        minimalTransaction: detailData[i].minimalTransaction,
        cashback: null,
      })
    }

    await browser.close()
    return data
  } catch (err) {
    await browser.close()
    console.log(err)
    Promise.reject(err)
  }
}
