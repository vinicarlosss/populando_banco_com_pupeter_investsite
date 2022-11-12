const mysql = require("mysql2/promise");

async function connect(){
    if(global.connection && global.connection.state !== 'disconnected')
        return global.connection;
    const connection = await mysql.createConnection("mysql://b1d4f0ec0ee3c3:e2af0b91@us-cdbr-east-05.cleardb.net/heroku_d2b26af3cebeb1b?reconnect=true");
    global.connection = connection;
    return connection
}

function calculaEarningYeld(ebit,valor_mercado,divida_liquida){
    let ey = ebit/(valor_mercado+divida_liquida)*100;
    return ey.toFixed(2)
}

async function insertEmpresa(ticker,nome_empresa,ebit,valor,divida){
    const conn = await connect();
    const sql = 'INSERT INTO empresa (ticker,nome_empresa,ebit,valor_mercado,divida_liquida) VALUES(?,?,?,?,?);'
    const values = [ticker,nome_empresa, ebit,valor , divida];
    await conn.query(sql,values);
    let ey = calculaEarningYeld(ebit, valor,divida);
    const sql2 = 'INSERT INTO ranking (ticker,nome_empresa,earning_yeld) VALUES(?,?,?);'
    const values2 = [ticker,nome_empresa,ey];
    await conn.query(sql2,values2);
};

async function updateEmpresa(ticker,nome_empresa,ebit,valor,divida){
    const conn = await connect();
    const sql = `UPDATE empresa SET nome_empresa = '${nome_empresa}', ebit = ${ebit}, valor_mercado=${valor}, divida_liquida=${divida} WHERE ticker= '${ticker}' ;`
    const values = [ticker,nome_empresa, ebit,valor , divida];
    await conn.query(sql,values);
    let ey = calculaEarningYeld(ebit, valor,divida);
    const sql2 =  `UPDATE ranking SET nome_empresa='${nome_empresa}', earning_yeld=${ey} WHERE ticker= '${ticker}';`
    const values2 = [ticker,nome_empresa,ey];
    await conn.query(sql2,values2);
};

module.exports = {insertEmpresa,updateEmpresa}