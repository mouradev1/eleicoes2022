const qrcode = require('qrcode-terminal');
const { Client } = require('whatsapp-web.js');
const axios = require('axios')
const url = 'https://resultados.tse.jus.br/oficial/ele2022/545/dados-simplificados/br/br-c0001-e000545-r.json';
const url2 = 'https://resultados.tse.jus.br/oficial/ele2022/544/dados-simplificados/br/br-c0001-e000544-r.json';
const client = new Client();
client.on('qr', (qr) => {
    qrcode.generate(qr, { small: true });
})

client.on('ready', () => {
    console.log('Client is ready!');
})

client.on('message', async message => {
    let cand= '';
    if (message.body === '!1000') {
        const result = await axios.get(url)
        const candidatos  = result.data.cand
        candidatos.forEach(c => {
            cand += `Nome: ${c.nm}\nVotos: ${c.vap}\nPorcentagem: ${c.pvap}\n\n`
        })
        message.reply(cand)
    }else if(message.body === '!2000'){
        const result = await axios.get(url2)
        const candidatos  = result.data.cand
        candidatos.forEach(c => {
            cand += `Nome: ${c.nm}\nVotos: ${c.vap}\nPorcentagem: ${c.pvap}\n\n`
        })
        message.reply(cand)
    }
})
client.initialize();