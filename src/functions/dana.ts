const pptr = require('puppeteer')

export async function danaFood() {
  const browser = await pptr.launch({
    headless: true,
    defaultViewport: { width: 1100, height: 600 }
  })
  const data = []
  try {
    const page = await browser.newPage()
    await page.goto('https://dana.id/promo/cate/Food/1', { waitUntil: 'networkidle2', timeout: 0 })
    await page.waitForSelector('.section')

    const cards = await page.$$('.card_promo')

    for (const card of cards) {
      console.log('wait for it')
      const title = await card.$eval('h3', (h3: any) => h3.innerText)
      const date = await card.$eval('div[class="date"]', (date: any) => date.innerText)
      const detailUrl = await card.$eval('a[class="btn_more"]', (date: any) =>
        date.getAttribute('href')
      )
      const imageUrl = await card.$eval('.img_con > img', (node: any) => node.getAttribute('src'))
      data.push({ title, date, detailUrl, imageUrl, kodePromo: '' })
    }

    console.log(data)
    console.log('ITS SHOWING')
    await browser.close()

    return data
  } catch (err) {
    console.log(err)
    await browser.close()
  }
}

export async function danaEntermainment() {
  const browser = await pptr.launch({
    headless: true,
    defaultViewport: { width: 1100, height: 600 }
  })
  const data = []
  try {
    const page = await browser.newPage()
    await page.goto('https://dana.id/promo/cate/Entertainment/1', { waitUntil: 'networkidle2' })
    await page.waitForSelector('.section')

    const cards = await page.$$('.card_promo')

    for (const card of cards) {
      console.log('wait for it')
      const title = await card.$eval('h3', (h3: any) => h3.innerText)
      const date = await card.$eval('div[class="date"]', (node: any) => node.innerText)
      const detailUrl = await card.$eval('a[class="btn_more"]', (node: any) =>
        node.getAttribute('href')
      )
      const imageUrl = await card.$eval('.img_con > img', (node: any) => node.getAttribute('src'))
      data.push({ title, date, detailUrl, imageUrl, kodePromo: '' })
    }

    console.log(data)
    console.log('ITS SHOWING')
    await browser.close()

    return data
  } catch (err) {
    console.log(err)
    await browser.close()
  }
}

export async function danaGame() {
  const browser = await pptr.launch({
    headless: true,
    defaultViewport: { width: 1100, height: 600 }
  })
  const data = []
  try {
    const page = await browser.newPage()
    await page.goto('https://dana.id/promo/cate/Game/1', { waitUntil: 'networkidle2' })
    await page.waitForSelector('.section')

    const cards = await page.$$('.card_promo')

    for (const card of cards) {
      console.log('wait for it')
      const title = await card.$eval('h3', (node: any) => node.innerText)
      const date = await card.$eval('div[class="date"]', (node: any) => node.innerText)
      const detailUrl = await card.$eval('a[class="btn_more"]', (node: any) =>
        node.getAttribute('href')
      )
      const imageUrl = await card.$eval('.img_con > img', (node: any) => node.getAttribute('src'))
      data.push({ title, date, detailUrl, imageUrl, kodePromo: '' })
    }

    console.log(data)
    console.log('ITS SHOWING')
    await browser.close()
    return data
  } catch (err) {
    console.log(err)
    await browser.close()
  }
}
