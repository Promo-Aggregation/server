const pptr = require('puppeteer')

export async function tokpedBelanja() {
  const browser = await pptr.launch({
    headless: false,
    defaultViewport: { width: 1100, height: 600 }
  })
  const data = []
  try {
    const page = await browser.newPage()
    await page.goto('https://www.tokopedia.com/promo/belanja/marketplace/?cta_src=2', {
      waitUntil: 'networkidle0'
    })
    await page.waitForSelector('.promo-row', { timeout: 0 })

    const cards = await page.$$('.promotion-box')

    for (const card of cards) {
      console.log('wait for it')
      const title = await card.$eval('.promotion-description > p', (node: any) => node.innerText)
      const date = await card.$eval('.promotion-box__value', (node: any) => node.innerText)
      const detailUrl = await card.$eval('a[class="promotion__btn"]', (node: any) =>
        node.getAttribute('href')
      )
      const imageUrl = await card.$eval('.img-responsive', (node: any) => node.getAttribute('src'))

      let kodePromo: string
      if (await card.$('input[class*="code-voucher__text"]')) {
        kodePromo = await card.$eval('input[class*="code-voucher__text"]', (node: any) =>
          node.getAttribute('value')
        )
      } else {
        kodePromo = ''
      }
      data.push({ title, date, detailUrl, imageUrl, kodePromo })
    }

    console.log('ITS SHOWING')
    await browser.close()

    console.log(data)
    return data
  } catch (err) {
    console.log(err)
    Promise.reject(err)
    await browser.close()
  }
}

export async function tokpedFlights() {
  const browser = await pptr.launch({
    headless: false,
    defaultViewport: { width: 1100, height: 600 }
  })
  const data = []
  try {
    const page = await browser.newPage()
    await page.goto('https://www.tokopedia.com/promo/tiket/pesawat/?cta_src=615', {
      waitUntil: 'networkidle0'
    })
    await page.waitForSelector('.promo-row', { timeout: 0 })

    const cards = await page.$$('.promotion-box')

    for (const card of cards) {
      console.log('wait for it')
      const title = await card.$eval('.promotion-description > p', (node: any) => node.innerText)
      const date = await card.$eval('.promotion-box__value', (node: any) => node.innerText)
      const detailUrl = await card.$eval('a[class="promotion__btn"]', (node: any) =>
        node.getAttribute('href')
      )
      const imageUrl = await card.$eval('.img-responsive', (node: any) => node.getAttribute('src'))

      let kodePromo: string
      if (await card.$('input[class*="code-voucher__text"]')) {
        kodePromo = await card.$eval('input[class*="code-voucher__text"]', (node: any) =>
          node.getAttribute('value')
        )
      } else {
        kodePromo = ''
      }
      data.push({ title, date, detailUrl, imageUrl, kodePromo })
    }

    await browser.close()

    console.log('ITS SHOWING TOKPED ENTERTAINMENT')
    console.log(data)
    return data
  } catch (err) {
    console.log(err)
    Promise.reject(err)
    await browser.close()
  }
}
export async function tokpedEntertanment() {
  const browser = await pptr.launch({
    headless: false,
    defaultViewport: { width: 1100, height: 600 }
  })
  const data = []
  try {
    const page = await browser.newPage()
    await page.goto('https://www.tokopedia.com/promo/tiket/entertainment/?cta_src=371', {
      waitUntil: 'networkidle0'
    })
    await page.waitForSelector('.promo-row', { timeout: 0 })

    const cards = await page.$$('.promotion-box')

    for (const card of cards) {
      console.log('wait for it')
      const title = await card.$eval('.promotion-description > p', (node: any) => node.innerText)
      const date = await card.$eval('.promotion-box__value', (node: any) => node.innerText)
      const detailUrl = await card.$eval('a[class="promotion__btn"]', (node: any) =>
        node.getAttribute('href')
      )
      const imageUrl = await card.$eval('.img-responsive', (node: any) => node.getAttribute('src'))

      let kodePromo: string
      if (await card.$('input[class*="code-voucher__text"]')) {
        kodePromo = await card.$eval('input[class*="code-voucher__text"]', (node: any) =>
          node.getAttribute('value')
        )
      } else {
        kodePromo = ''
      }
      data.push({ title, date, detailUrl, imageUrl, kodePromo })
    }

    await browser.close()

    console.log('ITS SHOWING TOKPED FLIGHTS')
    console.log(data)
    return data
  } catch (err) {
    console.log(err)
    Promise.reject(err)
    await browser.close()
  }
}
