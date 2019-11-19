import pptr from 'puppeteer'

async function getGeneralData(page: any, category: string) {
  const cards = await page.$$('.dc__dealw')
  console.log(cards.length)

  const data = []

  for (const card of cards) {
    console.log('wait for it')

    const _title = card.$eval('h5', (h3: any) => h3.innerText)
    const _subTitle = card.$eval('h6', (h6: any) => h6.innerText)
    const _detailUrl = card.$eval('a[class*="ovo-deals-list-link"]', (node: any) =>
      node.getAttribute('href')
    )
    // const _date = await card.$eval('h6[class="detail-push"]', date => date.innerText)
    const _imageUrl = card.$eval('.ovo-deal-image-wrapper > img', (node: any) =>
      node.getAttribute('src')
    )

    const [title, imageUrl, subTitle, detailUrl] = await Promise.all([
      _title,
      _imageUrl,
      _subTitle,
      _detailUrl
    ])

    data.push({
      title,
      imageUrl,
      subTitle,
      detailUrl: `https://www.ovo.id${detailUrl}`,
      tags: ['ovo', category]
    })
  }

  const newData = []
  data.forEach(d => {
    if (!(d.subTitle === d.subTitle.toUpperCase())) {
      delete d.subTitle
      newData.push(d)
    }
  })

  return newData
}

async function getDetailData(page: any, links: any[]) {
  const data = []

  process.setMaxListeners(Infinity)

  for (let i = 0; i < links.length; i++) {
    console.log('wait for it')
    const browser = await pptr.launch({
      headless: true,
      defaultViewport: { width: 1100, height: 600 },
      args: ['--no-sandbox', '--disable-setuid-sandbox']
    })
    const page = await browser.newPage()
    console.log(links[i].detailUrl)

    try {
      const detail = { syaratKetentuan: [], cara: [] }

      await page.goto(links[i].detailUrl, { waitUntil: 'networkidle2', timeout: 0 })

      const _date = page.$eval('.ovo-merchant-content-wrapper > h6', (node: any) => node.innerText)
      const _syarat = page.evaluate(() =>
        Array.from(
          document.querySelectorAll('.ovo-deals-merchant-details > ol > li'),
          el => el.textContent
        )
      )

      const [datePromise, syarat] = await Promise.all([_date, _syarat])

      let cara: string[]
      if (await page.$('.ovo-deals-merchant-details > p')) {
        cara = [await page.$eval('.ovo-deals-merchant-details > p', (node: any) => node.innerText)]
      } else {
        cara = [
          await page.$eval('.ovo-deals-merchant-details > div', (node: any) => node.innerText)
        ]
      }

      detail.syaratKetentuan.push(...syarat)
      detail.cara.push(...cara)
      const date = datePromise

      data.push({ detail, date })

      await browser.close()
    } catch (err) {
      console.log(err)
      await browser.close()
    }
  }

  return data
}

export async function ovoFood() {
  const browser = await pptr.launch({
    headless: true,
    defaultViewport: { width: 1100, height: 1000 },
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  })

  const data = []
  try {
    const page = await browser.newPage()
    await page.goto('https://www.ovo.id/deals', { waitUntil: 'networkidle2', timeout: 0 })
    await page.waitForSelector('.ovo-deals-list')

    const buttonMore = await page.$('.ovo-button-wrapper')

    await buttonMore.click()
    await page.waitForSelector('.dc__dealw')

    return new Promise((resolve, reject) => {
      setTimeout(async () => {
        const foo = await getGeneralData(page, 'food')

        const [generalData] = await Promise.all([Promise.all(foo)])
        const detailData = await getDetailData(page, generalData)

        const minTransAndCashback = detailData.map(d => {
          let cashback: number
          d.detail.syaratKetentuan.forEach((d2: string) => {
            const cashbackResult = d2.match(/(cashback)\s?(\d+)/i)
            if (cashbackResult) cashback = Number(cashbackResult[2])
          })

          const arrayMin = d.detail.syaratKetentuan
            .filter((d2: string) => {
              if (d2.match(/minimal/gi) || d2.match(/minimum/gi)) return d2
            })
            .join(' ')
            .split(' ')

          let indexRp: number
          if (arrayMin.length && arrayMin.indexOf('Rp') !== -1) indexRp = arrayMin.indexOf('Rp')
          else indexRp = arrayMin.indexOf('Rp.')

          return { arrayMin, cashback: cashback || null, indexRp }
        })

        for (let i = 0; i < generalData.length; i++) {
          data.push({
            ...generalData[i],
            detail: detailData[i].detail,
            date: detailData[i].date,
            minimalTransaction:
              minTransAndCashback[i].arrayMin.length > 1
                ? Number(
                    minTransAndCashback[i].arrayMin[minTransAndCashback[i].indexRp + 1]
                      .split('.')
                      .join('')
                  )
                : null,
            cashback: minTransAndCashback[i].cashback,
            kodePromo: null
          })
        }

        await browser.close()
        resolve(data)
      }, 500)
    })
  } catch (err) {
    await browser.close()
    Promise.reject(err)
  }
}
