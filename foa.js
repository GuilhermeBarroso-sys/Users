const produtos = {
    id: 10,
    descricao: 'Notebook',
    quantidade: 20,
    preco_unitario: 1500.00
}
var {id,descricao,quantidade,preco_unitario} = produtos;
var valorTotal = quantidade * preco_unitario;
console.log(`O ${descricao } tem o valor total de ${valorTotal}`);