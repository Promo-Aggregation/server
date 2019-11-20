import app from '../app'
import https from 'https'
import fs from 'fs'

const domain = process.env.DOMAIN
const PORT = 443

const options = {
  cert: fs.readFileSync(`/etc/letsencrypt/live/${domain}/fullchain.pem`),
  key: fs.readFileSync(`/etc/letsencrypt/live/${domain}/privkey.pem`)
}

const server = https.createServer(options, app)

server.listen(PORT, () => console.log('HTTPS Server running on port', PORT))
