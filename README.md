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

## 5. Fejlesztői dokumentáció
Az architektúra alapjának a Node.js-t választottam, ami egy könnyen skálázható, gyors és könnyen érthető környezetet biztosít.
A Node.js egy futtatókörnyezet, ami lehetővé teszi a JavaScript kód futtatását a szerveren. A Node.js egy eseményvezérelt, nem blokkoló I/O modellt használ, így
a kód gyorsan fut és nem blokkol. Az alkalmazásban az express keretrendszert használtam, ami egy NPM csomag. Ez egy könnyen kezelhető, egyszerű, gyors és jól dokumentált keretrendszer,
ami számos napjainban készülő projekt alapjául szolgál. Szerver oldali rendereléssel jelenítettem meg az oldalakat, mert így a kliens oldal nem terheli a szervert, és a keresőmotorok is könnyebben értelmezhetik az oldalt.
Valamint a projekt mérete nem indokolta bármilyen frontend keretrendszer használatát.

Az adatbázis MySql alapú, mert a relációs adatbázisok kellően optimalizáltak, 
illetve az ipar által széleskörben elterjedt a használatuk, nagyban támogatottak és könnyen kezelhetőek. Számos ORM keretrendszert is támogat, amelyek segítségével könnyen kezelhető az adatbázis.
Az ORM keretrendszernek a Sequelize-t választottam, mert jól dokumentált, könnyen használható és támogatja a MySQL-t.

A képek tárólására az AWS S3-ot választottam, mert nagyban skálázható, biztonságos és könnyen integrálható. Node.js-hez is van hozzá csomag, ami segíti az integrációt.

A fejlesztési folyamatot a nodemon segítségével könnyítettem meg, mert így nem kell minden módosítás után újraindítani a szervert.
Az eslint és prettier segítségével a kódminőséget ellenőriztem és formáztam. A környezeti változókat a dotenv segítségével kezeltem, mert így nem kell a kódban tárolni a titkos adatokat.

A deployment folyamatot OpenShift segítségével oldottam meg, mert könnyen skálázható, biztonságos és jól dokumentált. 
Az OpenShift egy Kubernetes alapú platform, ami lehetővé teszi a konténerek könnyű kezelését és skálázását. Itt egy projektbe helyeztem a Node.js és MySQL podokat az egymás közötti kommunikáció biztosítása érdekében.
Így a backend és az adatbázis tud kommunikálni egymással. Az S3 tárolóhoz nem kellett podot létrehozni, mert az AWS szolgáltatás, így a backendhez tartozó pod tud kommunikálni vele.
A build folyamat részeként megadtam a környezeti változókat, amelyeket a podok használnak majd. A podokat egy deployment konfigurációban definiáltam, amelyeket egy service konfigurációval érhetőek el egymás között.
A deployment autómatikusan megtörténik, ha a main branchre érkezik egy push, viszont a fejlesztést elősegítve egy development branchre folyt a fejlesztés. 
Ennek az az oka, hogy nem szerettem volna, hogy minden egyes push után a deployment megtörténjen, mert így a fejlesztési folyamat lassabb lett volna és az OpenShiftet is terhelte volna a felesleges deploymentekkel.
Ehelyett, amikor egy funkció elkészült csak be kellett mergelni a main branchre a development branchet és a deployment automatikusan megtörtént.