import pptr from 'puppeteer'
import shell from 'shelljs'

export async function danaFood() {
  const browser = await pptr.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
    // slowMo: 100
  })
  const data = []
  try {
    const page = await browser.newPage()
    await page.goto('https://dana.id/promo/cate/Food/1', { waitUntil: 'networkidle2', timeout: 0 })
    await page.waitForSelector('.section')

    const cards = await page.$$('.card_promo')
    // console.log(cards)
    for (const card of cards) {
      // console.log('wait for it')
      const _title = card.$eval('h3', (h3: any) => h3.innerText)
      const _date = card.$eval('div[class="date"]', (date: any) => date.innerText)
      const _detailUrl = card.$eval('a[class="btn_more"]', (date: any) => date.getAttribute('href'))
      const _imageUrl = card.$eval('.img_con > img', (node: any) => node.getAttribute('src'))
      const [title, date, detailUrl, imageUrl] = await Promise.all([
        _title,
        _date,
        _detailUrl,
        _imageUrl
      ])
      data.push({ title, date, detailUrl, imageUrl, kodePromo: '' })
    }

    // console.log(data)
    // console.log('ITS SHOWING')
    await browser.close()
    shell.exec('pkill chrome')
    return data
  } catch (err) {
    await browser.close()
    Promise.reject(err)
  }
}

export async function danaEntermainment() {
  const browser = await pptr.launch({
    headless: true,
    defaultViewport: { width: 1100, height: 600 },
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  })
  const data = []
  try {
    const page = await browser.newPage()
    await page.goto('https://dana.id/promo/cate/Entertainment/1', { waitUntil: 'networkidle2' })
    await page.waitForSelector('.section')

    const cards = await page.$$('.card_promo')

    for (const card of cards) {
      // console.log('wait for it')
      const _title = card.$eval('h3', (h3: any) => h3.innerText)
      const _date = card.$eval('div[class="date"]', (node: any) => node.innerText)
      const _detailUrl = card.$eval('a[class="btn_more"]', (node: any) => node.getAttribute('href'))
      const _imageUrl = card.$eval('.img_con > img', (node: any) => node.getAttribute('src'))
      const [title, date, detailUrl, imageUrl] = await Promise.all([
        _title,
        _date,
        _detailUrl,
        _imageUrl
      ])
      data.push({ title, date, detailUrl, imageUrl, kodePromo: '' })
    }

    // console.log(data)
    // console.log('ITS SHOWING')
    await browser.close()
    shell.exec('pkill chrome')

    return data
  } catch (err) {
    await browser.close()
    Promise.reject(err)
  }
}

export async function danaGame() {
  const browser = await pptr.launch({
    headless: true,
    defaultViewport: { width: 1100, height: 600 },
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  })
  const data = []
  try {
    const page = await browser.newPage()
    await page.goto('https://dana.id/promo/cate/Game/1', { waitUntil: 'networkidle2' })
    await page.waitForSelector('.section')

    const cards = await page.$$('.card_promo')

    for (const card of cards) {
      // console.log('wait for it')
      const _title = card.$eval('h3', (node: any) => node.innerText)
      const _date = card.$eval('div[class="date"]', (node: any) => node.innerText)
      const _detailUrl = card.$eval('a[class="btn_more"]', (node: any) => node.getAttribute('href'))
      const _imageUrl = card.$eval('.img_con > img', (node: any) => node.getAttribute('src'))
      const [title, date, detailUrl, imageUrl] = await Promise.all([
        _title,
        _date,
        _detailUrl,
        _imageUrl
      ])
      data.push({ title, date, detailUrl, imageUrl, kodePromo: '' })
    }

    // console.log(data)
    // console.log('ITS SHOWING')
    await browser.close()
    shell.exec('pkill chrome')
    return data
  } catch (err) {
    await browser.close()
    Promise.reject(err)
  }
}
