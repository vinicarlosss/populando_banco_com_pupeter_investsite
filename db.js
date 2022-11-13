const mysql = require("mysql2/promise");
const tratanumero = require('./tratando-dados')

async function connect(){
    if(global.connection && global.connection.state !== 'disconnected')
        return global.connection;
    const connection = await mysql.createConnection("mysql://b1d4f0ec0ee3c3:e2af0b91@us-cdbr-east-05.cleardb.net/heroku_d2b26af3cebeb1b?reconnect=true");
    global.connection = connection;
    return connection
}

function calculaEarningYeld(ebit,enterprise_value){
    let ey = (ebit/enterprise_value)*100;
    return ey.toFixed(2)
}

async function insertEmpresa(ticker,nome_empresa,ebit,valor){
    ebit = ebit.replaceAll('R$', '')
    valor = valor.replaceAll('R$', '')
    const conn = await connect();
    const sql = 'INSERT INTO empresa (ticker,nome_empresa,ebit,valor_mercado) VALUES(?,?,?,?);'
    const values = [ticker,nome_empresa, ebit,valor];
    await conn.query(sql,values);
    ebit = tratanumero.tratarNumero(ebit)
    valor = tratanumero.tratarNumero(valor)
    let ey = calculaEarningYeld(ebit, valor);
    const sql2 = 'INSERT INTO ranking (ticker,nome_empresa,earning_yeld) VALUES(?,?,?);'
    const values2 = [ticker,nome_empresa,ey];
    await conn.query(sql2,values2);
};

async function updateEmpresa(ticker,nome_empresa,ebit,valor){
    ebit = ebit.replaceAll('R$', '')
    valor = valor.replaceAll('R$', '')
    const conn = await connect();
    const sql = `UPDATE empresa SET nome_empresa = '${nome_empresa}', ebit = ${ebit}, valor_mercado=${valor} WHERE ticker= '${ticker}' ;`
    const values = [ticker,nome_empresa, ebit,valor];
    await conn.query(sql,values);
    ebit = tratanumero.tratarNumero(ebit)
    valor = tratanumero.tratarNumero(valor)
    let ey = calculaEarningYeld(ebit, valor);
    const sql2 =  `UPDATE ranking SET nome_empresa='${nome_empresa}', earning_yeld=${ey} WHERE ticker= '${ticker}';`
    const values2 = [ticker,nome_empresa,ey];
    await conn.query(sql2,values2);
};

module.exports = {insertEmpresa,updateEmpresa}