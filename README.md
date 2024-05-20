# <p align="center"> Elisoft </p>

# Resumo

Projeto com objetivo de criar um sistema de fluxo de caixa e estoque de um vendedor(a), ajudando na organização e automatizando os cálculos envolvendo lucro e prejuízo.

# Tecnologias

Para atingir o objetivo do projeto irei utilizar tecnologias de frontend, backend e banco de dados, que estarão listadas a seguir:

- HTML
- CSS
- JavaScript
- Node.js
- Express.js
- Sequelize ORM
- MySQL

# Entidades

## Produto

- id : bigint pk
- nome : varchar
- descricao : varchar
- preco : float
- quantidade : int
- usuario_id : bigint fk

## Usuario

- id : bigint pk
- nome : varchar
- email : varchar
- senha : varchar
- dtcreate : date
- dtupdate : date

## Venda

- id : bigint pk
- id_produto : bigint fk
- id_usuario : bigint fk
- valor : float
- cliente : varchar
- dtcreate : date
- dtupdate : date

# Requisitos

## Funcionais

- CRUD de novos produtos
- CRUD de vendas
- CRUD de usuários
- Realizar fluxo de caixa usando de base o preço dos produtos em estoque e o quando foi vendido no mês

## Não-Funcionais

- Usar apenas HTML, CSS e Javascript para o frontend
- Utilizar Express para a Rest API
- MySQL para banco de dados
- Sequelize ORM para facilitar comunicação com banco

## Regras de negócio

- Ao criar produto verificar se não há duplicata
- Localizar entidades usando ID
- Ao registrar venda deve-se validar dados como estoque do produto e valor vendido, que deve ser o maior que o valor que o produto foi comprado.
- Todos os campos de produto, exceto descrição, devem estar preenchidos em sua criação.