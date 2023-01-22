# Projeto 16 - Shortly (Back-end)

<p align="center">
  <img src="https://img.icons8.com/color/240/null/shorts.png"/>
</p>

<div align="center">
  <h3>Tecnologias utilizadas</h3>

  <img alt="Postgres" src="https://img.shields.io/badge/postgres-%23316192.svg?style=for-the-badge&logo=postgresql&logoColor=white" />
  <img alt="JWT" src="https://img.shields.io/badge/JWT-black?style=for-the-badge&logo=JSON%20web%20tokens" />
  <img alt="Node.js" src="https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white" />  
  <img alt="Express.js" src="https://img.shields.io/badge/Express.js-404D59?style=for-the-badge&logo=express.js&logoColor=white" />
  <img alt="Dotenv" src="https://img.shields.io/static/v1?label=&message=DOTENV&color=%23ECD53F&style=for-the-badge&logo=dotenv&logoColor=%23404040" />
  <!-- Badges source: https://dev.to/envoy_/150-badges-for-github-pnk -->
</div>

<br/>

## Descrição

Shortly é um sistema de encurtador de URLs onde é possível armazenar e encurtar as suas URLs favoritas. Shortly: Links que cabem no bolso!

</br>

## Funcionalidades

-   Criar uma conta
-   Fazer Login
-   Encurtar uma URL (encurtar)
-   Retornar os dados de uma URL
-   Abrir uma URL encurtada
-   Excluir uma URL cadastrada
-   Listar informações do usuário e URLs encurtadas
-   Ranking de URLs
-   Contador de clicks nas URLs

</br>

## Documentação da API

### Criar uma conta


```http
POST /signup
```

#### Parâmetros da requisição:

| Body         | Tipo     | Descrição                              |
| :------------| :------- | :--------------------------------------- |
| `email` | `string`| **Obrigatório**. e-mail                    |
| `password`       | `string` | **Obrigatório**. senha       |
| `confirmPassword`       | `string` | **Obrigatório**. confirmação de senha       |

- Responde com _status code_ `201`.
- Caso exista algum erro no formato enviado, responde com *status code* `422` e os erros correspondentes.

####

#

### Login

```http
POST /login
```

#### Parâmetros da requisição:

| Body         | Tipo     | Descrição                              |
| :------------| :------- | :--------------------------------------- |
| `email` | `string`| **Obrigatório**. e-mail                    |
| `password`       | `string` | **Required**. senha       |

Rerorna um _JSON_ no formato abaixo:
```json
{
  "token": "iIsInR5cCI6Ik.jE2NjMwMDg2NTF9.36UsZxcxCFpecWo"
}
```
- Retorna o *status code* `200` com o *token* gerado para autenticação.
- Caso o usuário/senha não seja compatível (ou não exista), retorna o *status code* `401`.
- Caso exista algum erro no formato enviado, responde com *status code* `422` e os erros correspondentes.

####
#

### Encurtar uma URL

```http
POST /urls/shorten
```

#### Parâmetros da requisição:

| Body         | Tipo     | Descrição                              |
| :------------| :------- | :--------------------------------------- |
| `url` | `string` | **Obrigatório**. URL que será encurtada         |



####

| Headers     | Tipo     | Descrição           |
| :---------- | :------- | :-------------------- |
| `Authorization` | `string` | **Obrigatório**. token da sessão no formato `Bearer TOKEN` |

#### Rerorna um _JSON_ no formato:

```json
{
	"shortUrl": "a8745bcf" 
}
```

- Responde com status code 201 e a URL encurtada.
- Caso o *header* não seja enviado (ou seja inválido), responde com *status code* `401`.
- Caso exista algum erro no formato enviado, responde com *status code* `422` e os erros correspondentes. 

#

### Retornar os dados de uma URL

```http
GET /urls/:id
```

#### Parâmetros da requisição:

| Params         | Tipo     | Descrição                                  |
| :--------------- | :------- | :--------------------------------- |
| `id`         | `integer`| **Obrigatório**. id da URL no banco de dados |

#### Rerorna um _JSON_ no formato:
```json
{
	"id": 1,
	"shortUrl": "bd8235a0",
	"url": "http(s)://..."
}
```

- Responde com *status code* 200 e os dados da URL.
- Caso a url encurtada não exista, responder com status code `404`.

#

### Abrir uma URL encurtada

```http
GET /urls/open/:shortUrl
```

#### Parâmetros da requisição:

| Params         | Tipo     | Descrição                                   |
| :---------- | :-------- | :-------------------- |
| `shortUrl` | `string` | **Obrigatório**. identificador da URL encurtada |

- Redireciona o usuário para o link correspondente e incrementa o contador de acessos.
- Caso a url encurtada não exista, responde com status code `404`.

#

### Excluir uma URL encurtada

```http
DELETE /urls/:id
```

#### Parâmetros da requisição:

| Params         | Tipo     | Descrição           |
| :---------- | :-------- | :-------------------- |
| `id` | `integer` | **Obrigatório**. identificador da URL encurtada |


####

| Headers     | Tipo     | Descrição           |
| :---------- | :------- | :-------------------- |
| `Authorization` | `string` | **Obrigatório**. token da sessão no formato `Bearer TOKEN` |

- Responde com *status code* `401` quando a URL encurtada não pertencer ao usuário.
- Se for do usuário, responde com *status code* `204` e exclui a url encurtada.
- Caso a URL encurtada não exista, responde com *status code* `404` .

#

### Retornar dados do usuário

```http
GET /users/me
```

#### Parâmetros da requisição:

####

| Headers     | Tipo     | Descrição           |
| :---------- | :------- | :-------------------- |
| `Authorization` | `string` | **Obrigatório**. token da sessão no formato `Bearer TOKEN` |

#### Rerorna um _JSON_ no formato:
```json
{
  "id": id do usuário,
	"name": nome do usuário,
	"visitCount": soma da quantidade de visitas de todos os links do usuário,
	"shortenedUrls": [
		{
			"id": 1,
			"shortUrl": "...",
			"url": "...",
			"visitCount": soma da quantidade de visitas do link
		},
		{
			"id": 2,
			"shortUrl": "...",
			"url": "...",
			"visitCount": soma da quantidade de visitas do link
		}
	]
}
```
- Responde com *status code* `404` caso o usuário não exista.
- Caso o *header* não seja enviado (ou seja inválido), responde com *status code* `401`.

#

### Ranking de URLs

```http
GET /ranking
```

#### Rerorna um _JSON_ no formato:

```json
[
	{
		"id": id do usuário,
		"name": nome do usuário,
		"linksCount": 5,
		"visitCount": 100000
	},
	{
		"id": id do usuário,
		"name": nome do usuário,
		"linksCount": 3,
		"visitCount": 85453
	},
	{
		"id": id do usuário,
		"name": nome do usuário,
		"linksCount": 10,
		"visitCount": 0
	},
	{
		"id": id do usuário,
		"name": nome do usuário,
		"linksCount": 0,
		"visitCount": 0
	}
]
```

- Responde com *status code* `200` e um *JSON* com os dados do Ranking
- Limitado a **10 usuários.**
- A lista é **ordenada** pela soma de visitas nos links.
- Caso necessário, a lista incluirá usuários cujos *links* não tiveram nenhuma visita.

</br>

## Variáveis de Ambiente

Para o projeto funcionar, são necessárias as seguintes variáveis de ambiente no arquivo `.env`.
Você deve criar esse esse arquivo na raíz do projeto e populá-lo seguindo as orientações abaixo e o modelo do arquivo `.env.example`.

| Variável         | Tipo     | Descrição                                                            |
| :--------------- | :------- | :--------------------------------- |
| `PORT`           | `integer`| **Obrigatório**. número da porta na qual a aplicação estará disponível |
| `DATABASE_URL`   | `string`| **Obrigatório**. URL para acessar o banco de dados no formato: `postgres://UserName:Password@Hostname:5432/DatabaseName` |
| `SECRET_KEY`     | `string`| **Obrigatório**. uma chave utilizada pelo jwt para descriptografar e validar os dados |

</br>

## Rodando localmente

1- Abra o terminal e navegue até o diretório onde deseja salvar o projeto


2- Faça um clone do projeto:

por SSH
```bash 
  git clone git@github.com:danton03/projeto16-shortly-back.git
```

ou

por HTTPS
```bash 
  git clone https://github.com/danton03/projeto16-shortly-back.git
```

3- Entre no diretório do projeto

```bash
  cd projeto16-shortly-back
```

4- Instale as dependências

```bash
  npm install
```

5- Crie um banco de dados postgres na sua máquina. Você pode utilizar o terminal ou o pgAdmin. 

OBS.: Certifique-se de informar a URL do database no arquivo .env

6- Execute o dump para criar as tabelas. *(Esse arquivo se encontra na raíz do projeto)*
```bash
  psql -U <username> -f <caminho_para_o_dump>/dump.sql
```

7- Inicie o servidor da aplicação

```bash
  npm start
```

## Créditos

-   [Awesome Badges](https://github.com/Envoy-VC/awesome-badges)
-   [Shorts icon por Icons8](https://icons8.com/icon/16586/shorts)

## Autores

-   [Danton Matheus](https://github.com/danton03)
