---
name: 'basic-cash-workflow-es'
trans: 'basic-cash-workflow'
title: Flujo de trabajo basico de Cash
author: Gabriel Cardona
year: Dec 12, 2019
color: '#edece7'
lang: 'es'
isTextColorDark: true
extraComponent: 'Datatable'
id: 'basic-cash-workflow'
description: |
  Cash es un ciudadano de primera clase en EARTH. Eso significa que encontrará soporte de nivel superior y de todo el marco para enviar y recibir efectivo en EARTH.
---

### Cash es un ciudadano de primera clase en EARTH. Eso significa que encontrará soporte de nivel superior y de todo el marco para enviar y recibir efectivo en EARTH. El efectivo se denomina utilizando unidades EARTH. EARTH se subdivide en unidades SOL. 1 SOL = 0.000001 EARTH. 1,000,000 SOL = 1 EARTH.

Similar a los pagos en efectivo físicos, queremos que los pagos en efectivo de EARTH sean lo más rápidos y sin fricciones posibles. Con eso en mente, tenemos 3 segundos de tiempo de bloqueo con la liquidación total de la transacción en 1 minuto. A medida que la transacción aparece en 3 segundos y se liquida por completo en aproximadamente 1 minuto, creemos que esto es equivalente a los PoS UX existentes que usan efectivo tradicional o tarjetas de débito / crédito.

También similar a los pagos en efectivo físicos, queremos que los pagos en efectivo de EARTH sean lo más económicos posible. Para resolver este problema, permitimos a los usuarios pagar tarifas de transacción en efectivo utilizando BANDWIDTH. Cada cuenta recibe 5000 puntos de ANCHO DE BANDA diariamente. Cada transacción en efectivo generalmente cuesta alrededor de 200 BANDWITH en tarifas, por lo que cada cuenta EARTH recibe alrededor de 25 transacciones en efectivo gratuitas al día.

Los siguientes son los pasos básicos para enviar y recibir EARTH entre cuentas. Cubriremos cómo consultar y calcular los niveles de `ANCHO DE BANDA`, así como cómo congelar la EARTH para obtener más puntos de `ANCHO DE BANDA`.

<image-responsive
    imageURL="blog/basic-cash-workflow/money.jpg"
    width="100%"
    alt="Money"
/>

## Empezando

### Inicio rápido de Docker


Proporcionamos un [inicio rápido de Docker](https://github.com/EarthEngineering/docker-earth-quickstart) para activar su propia red privada EARTH con un par de líneas de código. Primero [instalar docker](https://docs.docker.com/v17.09/engine/installation) para su sistema operativo.

A continuación, extraiga la etiqueta `latest` de la imagen` earthengineer/quickstart`

```bash
docker pull earthengineering/quickstart:latest
```

Una vez que esté completo, ejecute la imagen

```bash
docker run -it -p 9090:9090 --rm --name earth earthengineering/quickstart:latest
```

Una vez que inicie el inicio rápido, generará un mnemotécnico y 10 cuentas en EARTH BIP44 HDPath. También enviará cada una de estas nuevas acconuts 10,000 EARTH para usar durante el desarrollo.

```bash
Loading the accounts and waiting for the node to mine the transactions...
(1) Waiting for receipts...
Sending 10000 EARTH to TH55CkjfiMw9xp1gTt4Sop7vXZWp6nb7Fo
Sending 10000 EARTH to TYpksie1wfpDJByTZAxNX8MUYqKvUrCUEw
Sending 10000 EARTH to TWhfry9F1tX38CMm3Q2G1fGYnDx54tE2G3
Sending 10000 EARTH to TXWSQPa8xcT6vhNEg59sUtnkjcCr75zzjG
Sending 10000 EARTH to TWzSDbDGQSiyKzTqxPwzDPmzVK37Ptn1ed
Sending 10000 EARTH to TPi1UQbEkdYJfJKVd7ww2t8nnRe11bv7Dm
Sending 10000 EARTH to TRi2n6XtHbTVrfz57EZSkAyhUtP6KXZLKY
Sending 10000 EARTH to TJEviJnToiCSdGqdmeMjjuiZMUpcKj3ruc
Sending 10000 EARTH to TXyGANqmZXzGmmj1MwpMwH515eZJAqivx6
Sending 10000 EARTH to TKm9nmvzX9BtaxcQMDobGKxhBgST4qHHav
```

No se preocupe si esto se desplaza fuera de su consola demasiado rápido. Puede llamar a `curl` para ver los datos nuevamente.

```bash
curl http://127.0.0.1:9090/admin/accounts
Available Accounts
==================

(0) TH55CkjfiMw9xp1gTt4Sop7vXZWp6nb7Fo (10000 EARTH)
(1) TYpksie1wfpDJByTZAxNX8MUYqKvUrCUEw (10000 EARTH)
(2) TWhfry9F1tX38CMm3Q2G1fGYnDx54tE2G3 (10000 EARTH)
(3) TXWSQPa8xcT6vhNEg59sUtnkjcCr75zzjG (10000 EARTH)
(4) TWzSDbDGQSiyKzTqxPwzDPmzVK37Ptn1ed (10000 EARTH)
(5) TPi1UQbEkdYJfJKVd7ww2t8nnRe11bv7Dm (10000 EARTH)
(6) TRi2n6XtHbTVrfz57EZSkAyhUtP6KXZLKY (10000 EARTH)
(7) TJEviJnToiCSdGqdmeMjjuiZMUpcKj3ruc (10000 EARTH)
(8) TXyGANqmZXzGmmj1MwpMwH515eZJAqivx6 (10000 EARTH)
(9) TKm9nmvzX9BtaxcQMDobGKxhBgST4qHHav (10000 EARTH)

Private Keys
==================

(0) e8c2549151265fe3c9bf7b2cf42cc19bbe60c441accc08c19f066ffe7adc80dc
(1) 43ecbb3f7c238cf59ab8fe77f122a1983a0dfbd9ec919ff7c22badd215f370b5
(2) ea4871f1320edc44e2d48c1b47542caf4cf379162621e66ac76ccb09c0c23c50
(3) f31a8da09781af0f7f88d8ac5eea46115136136ec07e6f7f83496fb3990a0397
(4) 720d899d717f8c1f379550105a74a8ab27216b861902982af682e81fd7633bc6
(5) 5264a4ae32529c21c6847f133a47adbb808af93d67a4ceca4a50a4f79a3ebb51
(6) 76259cef834e26eb9c4df01b26cccf59d036539215efd078783c000984a51e30
(7) 9993fba507cdc02a299080da401433d1ed90c384afe838b01d6738da10aa42c1
(8) da4425d617e0b9a6945bb9d0cf88ef21cb63597fef9cb1bd06614b75d83cfffa
(9) 6ef406cb568434c4165671ad8a471ef0060382848a811c70a814c9772e8e92e5

HD Wallet
==================
Mnemonic:      sorry busy ship lemon always holiday awake pyramid direct write aware dizzy
Base HD Path:  m/44'/507'/0'/0/{account_index}
```

```bash
Available Accounts
==================

(0) TH55CkjfiMw9xp1gTt4Sop7vXZWp6nb7Fo (10000 EARTH)
(1) TYpksie1wfpDJByTZAxNX8MUYqKvUrCUEw (10000 EARTH)
(2) TWhfry9F1tX38CMm3Q2G1fGYnDx54tE2G3 (10000 EARTH)
(3) TXWSQPa8xcT6vhNEg59sUtnkjcCr75zzjG (10000 EARTH)
(4) TWzSDbDGQSiyKzTqxPwzDPmzVK37Ptn1ed (10000 EARTH)
(5) TPi1UQbEkdYJfJKVd7ww2t8nnRe11bv7Dm (10000 EARTH)
(6) TRi2n6XtHbTVrfz57EZSkAyhUtP6KXZLKY (10000 EARTH)
(7) TJEviJnToiCSdGqdmeMjjuiZMUpcKj3ruc (10000 EARTH)
(8) TXyGANqmZXzGmmj1MwpMwH515eZJAqivx6 (10000 EARTH)
(9) TKm9nmvzX9BtaxcQMDobGKxhBgST4qHHav (10000 EARTH)

Private Keys
==================

(0) e8c2549151265fe3c9bf7b2cf42cc19bbe60c441accc08c19f066ffe7adc80dc
(1) 43ecbb3f7c238cf59ab8fe77f122a1983a0dfbd9ec919ff7c22badd215f370b5
(2) ea4871f1320edc44e2d48c1b47542caf4cf379162621e66ac76ccb09c0c23c50
(3) f31a8da09781af0f7f88d8ac5eea46115136136ec07e6f7f83496fb3990a0397
(4) 720d899d717f8c1f379550105a74a8ab27216b861902982af682e81fd7633bc6
(5) 5264a4ae32529c21c6847f133a47adbb808af93d67a4ceca4a50a4f79a3ebb51
(6) 76259cef834e26eb9c4df01b26cccf59d036539215efd078783c000984a51e30
(7) 9993fba507cdc02a299080da401433d1ed90c384afe838b01d6738da10aa42c1
(8) da4425d617e0b9a6945bb9d0cf88ef21cb63597fef9cb1bd06614b75d83cfffa
(9) 6ef406cb568434c4165671ad8a471ef0060382848a811c70a814c9772e8e92e5

HD Wallet
==================
Mnemonic:      sorry busy ship lemon always holiday awake pyramid direct write aware dizzy
Base HD Path:  m/44'/507'/0'/0/{account_index}
```

<image-responsive
    imageURL="blog/basic-cash-workflow/js.jpg"
    width="100%"
    alt="JS"
/>

## index.js

`earthcli console` no admite la división de código en varias líneas para crear un nuevo archivo` index.js` y copiar lo siguiente en él. Esto crea una función principal `async` para que podamos aprovechar` wait '. También establece una caldera de requerir `earthweb` e instanciarlo. Puede seguir este patrón similar para interactuar con earthweb en cualquiera de sus aplicaciones web.

Agregue también `main_account_privkey`,` main_account_address` y `main_account_hex`. Puede obtener el "privkey" y la "dirección" ejecutando el comando `curl` mencionado anteriormente:` curl http://127.0.0.1:9090/admin/accounts`

```js
// create an async main function to leverage await below
async function main() {
  // require earthweb
  let EarthWeb = require("earthweb")
  let fullNodePrivateKey =
    "da146374a75310b9666e834ee4ad0866d6f4035967bfc76217c5a495fff9f0d0"

  // instantiate EarthWeb
  const earthweb = await new EarthWeb({
    fullHost: "http://127.0.0.1:9090",
    solidityHost: "http://127.0.0.1:9090",
    eventServer: "http://127.0.0.1:9090",
    privateKey: fullNodePrivateKey
  })

  // main_account credentials
  let main_account_privkey =
    "e8c2549151265fe3c9bf7b2cf42cc19bbe60c441accc08c19f066ffe7adc80dc"
  let main_account_address = "TH55CkjfiMw9xp1gTt4Sop7vXZWp6nb7Fo"
  let main_account_hex = earthweb.address.toHex(main_account_address)

  let main_account_resources = await earthweb.earth.getAccountResources(
    main_account_address
  )
  console.log("ACCOUNT_RESOURCES1: ", main_account_resources)
}

// make sure to call main() to start the dapp
main()
```

Si ejecuta el script ahora, podemos consultar `getAccountResources` para nuestra cuenta principal. Para ejecutar la aplicación, cambie los directorios al directorio raíz y ejecute `node index.js`. Debería ver algo similar a lo siguiente:

```js
{
  freeNetLimit: 5000,
  TotalNetLimit: 43200000000,
  TotalEnergyLimit: 65049895008
}
```

Tenga en cuenta `freeNetLimit` que es el` BANDWIDTH` disponible diariamente para esta cuenta. A medida que comencemos a realizar transacciones y pagar la tarifa usando `BANDWITH` veremos` NetUsed` y `freeNetUsed`. Hablaremos de `TotalEnergyLimit` en una publicación posterior.

<image-responsive
    imageURL="blog/basic-cash-workflow/sendearth.jpg"
    width="100%"
    alt="JS"
/>

## Enviar EARTH entre 2 cuentas

Ahora que tenemos todo configurado, hagamos una transacción básica en efectivo entre 2 cuentas. Primero confirme que tiene el inicio rápido en ejecución y que generó correctamente 10 cuentas.

```bash
curl http://127.0.0.1:9090/admin/accounts
Available Accounts
==================

(0) TH55CkjfiMw9xp1gTt4Sop7vXZWp6nb7Fo (10000 EARTH)
(1) TYpksie1wfpDJByTZAxNX8MUYqKvUrCUEw (10000 EARTH)
(2) TWhfry9F1tX38CMm3Q2G1fGYnDx54tE2G3 (10000 EARTH)
(3) TXWSQPa8xcT6vhNEg59sUtnkjcCr75zzjG (10000 EARTH)
(4) TWzSDbDGQSiyKzTqxPwzDPmzVK37Ptn1ed (10000 EARTH)
(5) TPi1UQbEkdYJfJKVd7ww2t8nnRe11bv7Dm (10000 EARTH)
(6) TRi2n6XtHbTVrfz57EZSkAyhUtP6KXZLKY (10000 EARTH)
(7) TJEviJnToiCSdGqdmeMjjuiZMUpcKj3ruc (10000 EARTH)
(8) TXyGANqmZXzGmmj1MwpMwH515eZJAqivx6 (10000 EARTH)
(9) TKm9nmvzX9BtaxcQMDobGKxhBgST4qHHav (10000 EARTH)

Private Keys
==================

(0) e8c2549151265fe3c9bf7b2cf42cc19bbe60c441accc08c19f066ffe7adc80dc
(1) 43ecbb3f7c238cf59ab8fe77f122a1983a0dfbd9ec919ff7c22badd215f370b5
(2) ea4871f1320edc44e2d48c1b47542caf4cf379162621e66ac76ccb09c0c23c50
(3) f31a8da09781af0f7f88d8ac5eea46115136136ec07e6f7f83496fb3990a0397
(4) 720d899d717f8c1f379550105a74a8ab27216b861902982af682e81fd7633bc6
(5) 5264a4ae32529c21c6847f133a47adbb808af93d67a4ceca4a50a4f79a3ebb51
(6) 76259cef834e26eb9c4df01b26cccf59d036539215efd078783c000984a51e30
(7) 9993fba507cdc02a299080da401433d1ed90c384afe838b01d6738da10aa42c1
(8) da4425d617e0b9a6945bb9d0cf88ef21cb63597fef9cb1bd06614b75d83cfffa
(9) 6ef406cb568434c4165671ad8a471ef0060382848a811c70a814c9772e8e92e5

HD Wallet
==================
Mnemonic:      sorry busy ship lemon always holiday awake pyramid direct write aware dizzy
Base HD Path:  m/44'/507'/0'/0/{account_index}
```

Ok, parece que todavía estamos en camino. Ahora, agregue lo siguiente a `index.js`

```js
// receiving address
let receiving_account_address = "TYpksie1wfpDJByTZAxNX8MUYqKvUrCUEw"
// receiving amoount
let receiving_amount = 1000000

// create unsigned transaction
let tx = await earthweb.transactionBuilder.sendEarth(
  receiving_account_address,
  receiving_amount,
  main_account_address
)

// sign the transaction
const signedTransaction = await earthweb.earth.sign(tx, main_account_privkey)

// broadcast the signed transaction to EARTH
const result = await earthweb.earth.broadcast(signedTransaction)
console.log(result)
// { result: true,
//   transaction:
//    { visible: false,
//      txID:
//       '36fd4fc4f1d346d6267086ea468a6d8e026b1845baf7a9741e20343d74d70e68',
//      raw_data:
//       { contract: [Array],
//         ref_block_bytes: '0039',
//         ref_block_hash: 'a2a56362cbad9bb0',
//         expiration: 1576183116000,
//         timestamp: 1576183058661 },
//      raw_data_hex:
//       '0a0200392208a2a56362cbad9bb040e0e1d6deef2d5a67080112630a2d747970652e676f6f676c65617069732e636f6d2f70726f746f636f6c2e5472616e73666572436f6e747261637412320a154116154da52abaa7070a17eab61721b70b4c5bcbf6121541db820dfafc93b42f8b7ded9aa35c4155ff7d83bf18c0843d70e5a1d3deef2d',
//      signature:
//       [ 'b3061274934cd2ec53aad019c9946e2694dc737b8698d9c2fac02c4d02d7ad680277dd159b111b94c62d53e825f0362db78ee7a151e8d48cb25d359fdb10a85501' ] } }

// again query main account resources
main_account_resources = await earthweb.earth.getAccountResources(
  main_account_address
)
console.log(main_account_resources)
//   { freeNetUsed: 267,
//   freeNetLimit: 5000,
//   TotalNetLimit: 43200000000,
//   TotalEnergyLimit: 52934300104 }
```

Tenga en cuenta que después de 1 transacción hay `267` `ANCHO DE BANDA` que se han utilizado fuera del `5000` inicial. A continuación, Invoque el comando `curl` y confirme que los saldos son correctos y se transfirió 1 EARTH entre las dos cuentas.

```bash
curl http://127.0.0.1:9090/admin/accounts
Available Accounts
==================

(0) TByyPTZ1BU91kjD2rPYYk27JnE8jNVmcAg (9999 EARTH)
(1) TVyrnRU44hUecS6Ji2AQwBQ9oZ76Xenmqz (10001 EARTH)
```

<image-responsive
    imageURL="blog/basic-cash-workflow/speed.jpg"
    width="100%"
    alt="JS"
/>

## Escape diario ANCHO DE BANDA

Ahora generaré suficientes transacciones para agotar la asignación diaria original de BANDWIDTH. Cada vez que ejecute `node index.js` debería ver un incremento de` reeNetUsed` de aproximadamente `200`.

Cuando haya ejecutado el script lo suficiente, verá que `freeNetUsed` está cerca de` 5000`

```bash
freeNetUsed: 4793
```

También notará que no se han pagado tarifas en `EARTH`

```bash
curl http://127.0.0.1:9090/admin/accounts
Available Accounts
==================

(0) TByyPTZ1BU91kjD2rPYYk27JnE8jNVmcAg (9982 EARTH)
(1) TVyrnRU44hUecS6Ji2AQwBQ9oZ76Xenmqz (10018 EARTH)
```

Ahora, la próxima vez que ejecutemos el script, no quedará suficiente `BANDWIDTH` para cubrir la tarifa de transacción, por lo que se deducirá una pequeña cantidad de EARTH de la primera cuenta.

Efectivamente, la próxima vez que lo ejecute `freeNetUsed: 4779`

```bash
curl http://127.0.0.1:9090/admin/accounts
Available Accounts
==================

(0) TByyPTZ1BU91kjD2rPYYk27JnE8jNVmcAg (9980.99733 EARTH)
(1) TVyrnRU44hUecS6Ji2AQwBQ9oZ76Xenmqz (10019 EARTH)
```

## Congele EARTH para obtener más ANCHO DE BANDA

Si no desea pagar más tarifas utilizando su EARTH, entonces puede congelarla y obtener más `ANCHO DE BANDA` a diario. Para congelar debe invocar a `transactoinBuilder.freezeBalance`. Agregue lo siguiente a su `index.js`

Debe decidir cuánta EARTH desea congelar y durante cuánto tiempo. También debe configurar el `tipo de congelación` que puede ser `ANCHO DE BANDA` o `ENERGÍA`. Después de crear la transacción, debe firmarla y transmitirla.

```js
let freeze_amount = earthweb.toSol(100)
let freeze_length = 3
let freeze_type = "BANDWIDTH"
let permissions_id = 1
let tx1 = await earthweb.transactionBuilder.freezeBalance(
  freeze_amount,
  freeze_length,
  freeze_type,
  main_account_hex,
  main_account_hex,
  permissions_id
)
const signedTransaction = await earthweb.earth.sign(tx, privkey)
const result1 = await earthweb.earth.broadcast(signedTransaction)
```

 Mientras estoy depurando, agregare solicitudes a `getAccountResources` antes y después de` freezeBalance` para confirmar que la congelación funcionó y realmente obtuve más `BANDWIDTH`. Cada vez que ejecuto el script puedo ver que mi saldo de EARTH disminuye en 100 ya que eso es lo que estoy congelando.

También hay 3 propiedades nuevas al llamar a `getAccountResources`.

```js
  NetUsed: 751,
  NetLimit: 43200000000,
  TotalNetWeight: 400,
```

## Consultar cuenta por dirección

También puede consultar la cuenta por dirección para confirmar que EARTH está congelado.

```js
  let account = await earthweb.earth.getAccount(main_account_address)
  console.log(account
  // { address: '4116154da52abaa7070a17eab61721b70b4c5bcbf6',
  // balance: 9480997330,
  // frozen:
  //  [ { frozen_balance: 500000000, expire_time: 1576445499000 } ],
  // net_usage: 980,
  // latest_opration_time: 1576186299000,
  // free_net_usage: 4821,
  // latest_consume_time: 1576186299000,
  // latest_consume_free_time: 1576185996000,
  // account_resource: {},
  // owner_permission:
  //  { permission_name: 'owner', threshold: 1, keys: [ [Object] ] },
  // active_permission:
  //  [ { type: 'Active',
  //      id: 2,
  //      permission_name: 'active',
  //      threshold: 1,
  //      operations:
  //       '7fff1fc0033e0100000000000000000000000000000000000000000000000000',
  //      keys: [Array] } ] }
```

Tenga en cuenta lo siguiente

```js
  frozen:
   [ { frozen_balance: 500000000, expire_time: 1576445499000 } ],
  net_usage: 980,
  free_net_usage: 4821,
  latest_consume_free_time: 1576185996000,
```

## Descongelar

La EARTH congelada no se descongelará automáticamente después del tiempo que especificó cuando la congeló. Tendrá que descongelarlos así:

```js
let freeze_type = "BANDWIDTH"
let permissions_id = 1
let unfreeze = await earthweb.transactionBuilder.unfreezeBalance(
  freeze_type,
  main_account_hex,
  main_account_hex,
  permissions_id
)
```

<image-responsive
    imageURL="blog/basic-cash-workflow/summary.jpg"
    width="100%"
    alt="JS"
/>

## Resumen

Ahora sabe cómo crear transacciones básicas en efectivo de EARTH. También está familiarizado con el concepto de `BANDWIDTH` y el ` freeNetLimit` diario que equivale a alrededor de 25 transacciones gratuitas. Además, viste cómo congelar EARTH para desbloquear más BANDWIDTH para evitar pagar tarifas.

Gracias por seguirme. En una próxima publicación exploraremos lo contrario de BANDWIDTH que es ENERGY y se utiliza para contratos inteligentes.

Aquí está el script final `index.js`.

```js
// create an async main function to leverage await below
async function main() {
  // require earthweb
  let EarthWeb = require("earthweb")
  let fullNodePrivateKey =
    "da146374a75310b9666e834ee4ad0866d6f4035967bfc76217c5a495fff9f0d0"

  // instantiate EarthWeb
  const earthweb = await new EarthWeb({
    fullHost: "http://127.0.0.1:9090",
    solidityHost: "http://127.0.0.1:9090",
    eventServer: "http://127.0.0.1:9090",
    privateKey: fullNodePrivateKey
  })

  // main_account credentials
  let main_account_privkey =
    "45edc3696ce916a9d9993d820b3d6f92b37f7637d841c5475ea80645be59e3bf"
  let main_account_address = "TByyPTZ1BU91kjD2rPYYk27JnE8jNVmcAg"
  let main_account_hex = earthweb.address.toHex(main_account_address)

  // query main account resources
  let main_account_resources = await earthweb.earth.getAccountResources(
    main_account_address
  )
  console.log("ACCOUNT_RESOURCES1: ", main_account_resources)

  // receiving address
  let receiving_account_address = "TVyrnRU44hUecS6Ji2AQwBQ9oZ76Xenmqz"
  // receiving amoount
  let receiving_amount = 1000000
  let tx = await earthweb.transactionBuilder.sendEarth(
    receiving_account_address,
    receiving_amount,
    main_account_address
  )

  // sign the tx and broadcast it
  const signedTransaction = await earthweb.earth.sign(tx, main_account_privkey)
  await earthweb.earth.broadcast(signedTransaction)

  // config for freezeBalance
  let freeze_amount = earthweb.toSol(100)
  let freeze_length = 3
  let freeze_type = "BANDWIDTH"
  let permissions_id = 1
  // call freezeBalance with config
  let tx1 = await earthweb.transactionBuilder.freezeBalance(
    freeze_amount,
    freeze_length,
    freeze_type,
    main_account_hex,
    main_account_hex,
    permissions_id
  )
  // sign transaction and broadcast it
  const signedTransaction1 = await earthweb.earth.sign(
    tx1,
    main_account_privkey
  )
  await earthweb.earth.broadcast(signedTransaction1)

  // again query main account resources
  account_resources = await earthweb.earth.getAccountResources(
    main_account_address
  )

  // query Account by address to confirm freeze
  let account = await earthweb.earth.getAccount(main_account_address)
  console.log(account)

  // once your tokens are ready to unfreeze
  // let unfreeze = await earthweb.transactionBuilder.unfreezeBalance(
  //   freeze_type,
  //   main_account_hex,
  //   main_account_hex,
  //   permissions_id
  // )
  // // sign transaction and broadcast it
  // const signedTransaction2 = await earthweb.earth.sign(
  //   unfreeze,
  //   main_account_privkey
  // )
  // await earthweb.earth.broadcast(signedTransaction2)
}

// make sure to call main() to start the dapp
main()
```