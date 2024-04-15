# cloud-lab-app - dokumentáció

## 1. Bevezetés
A cloud-lab-app egy egyszerű alkalmazás, amely lehetőséget ad a 
felhasználóknak regisztrálás és bejelentkezés után fényképek feltöltésére. A program egy Node.js szerverből áll, amely 
server-side rendering segítségével hozza létre, ésküldi el az összeállított HTML-t. Az alkalmazás a képeket egy S3 
tárolóban tárolja, az adatbázis pedig egy MySQL adatbázis.
### Függőségek
- express: a szerver futtatásához
- express-session: a felhasználói sessionök kezeléséhez
- ejs: a HTML oldalak generálásához
- aws-sdk: az S3 tároló kezeléséhez
- mysql2: az adatbázis kezeléséhez
- bcrypt: a jelszavak hasheléséhez
- multer: a képfeltöltéshez
- dotenv: környezeti változók kezeléséhez
- nodemon: a fejlesztési folyamat megkönnyítéséhez
- eslint: a kódminőség ellenőrzéséhez
- prettier: a kódformázáshoz
- sequelize: az adatbázis kezeléséhez

## 2. Funkciók
### Endpointok
#### POST /register
request body példa:
```json
{
  "name": "string",
  "email": "string",
  "password": "string",
  "confirmPassword": "string"
}
```
#### POST /login
request body példa:
```json
{
  "email": "string",
  "password": "string"
}
```
#### GET /logout
Kijelentkezteti a felhasználót
#### POST /upload
request body példa:
```json
{
  "image": "string",
  "title": "string",
}
```
#### GET /delete/photo/:id
Törli a képet az adatbázisból
#### GET /
Visszaadja az összes képet

## 3. Telepítés
1. Klónozd le a repót
2. Telepítsd a függőségeket: `npm install`
3. Indítsd el a szervert: `npm start`

## 4. Környezeti változók
- PORT: a szervert futtató port
- DATABASE_HOST: az adatbázis host címe
- DATABASE_USER: az adatbázis felhasználó
- DATABASE_PASSWORD: az adatbázis jelszava
- DATABASE_NAME: az adatbázis neve
- S3_BUCKET_NAME: az S3 bucket neve
- S3_ACCESS_KEY: az S3 hozzáférési kulcs
- S3_SECRET_ACCESS_KEY: az S3 titkos kulcsa
- S3_REGION: az S3 régiója
- S3_KEY_PREFIX: az S3 kulcs előtagja