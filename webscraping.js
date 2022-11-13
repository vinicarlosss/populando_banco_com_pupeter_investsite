const puppeter = require('puppeteer')
const db = require('./db')
async function rolarFim(page){
    await page.evaluate(() =>{
        return window.scrollTo(0,9500)
    })
}
/*async function rolarFim(page){
    await page.evaluate(() => {
        return window.scrollTo(0,9000)
      })
}*/

async function webScraping(ticker){
    const browser = await puppeter.launch({headless:false})
    const page = await browser.newPage()
    await page.goto(`https://www.investsite.com.br/principais_indicadores.php?cod_negociacao=${ticker}`)
    //await rolarFim(page)
    await page.waitForSelector('#tabela_resumo_empresa_dre_12meses')
    const RESULTADO = await page.evaluate(() =>{
        let elementDRE = document.querySelector('#tabela_resumo_empresa_dre_12meses')
        let elementValue = document.querySelector('#tabela_resumo_empresa_margens_retornos')
        return {
            ebit: elementDRE.children[2].children[2].children[1].innerHTML,
            enterprise_value: elementValue.children[2].children[12].children[1].innerHTML
        }
    })
    await browser.close()
    return RESULTADO
}

module.exports = { rolarFim, webScraping }