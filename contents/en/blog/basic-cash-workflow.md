---
name: 'basic-cash-workflow'
trans: 'basic-cash-workflow'
title: Basic Cash Workflow
author: Gabriel Cardona
year: Dec 12, 2019
color: '#edece7'
lang: ''
isTextColorDark: true
extraComponent: 'Datatable'
id: 'basic-cash-workflow'
description: |
  Cash is a first-class citizen on EARTH. That means that you will find top-level and framework-wide support for sending and receiving cash on EARTH.
---

### Cash is a first-class citizen on EARTH. That means that you will find top-level and framework-wide support for sending and receiving cash on EARTH. Cash is denominated using EARTH units. EARTH is further subdivided in to SOL units. 1 SOL = 0.000001 EARTH. 1,000,000 SOL = 1 EARTH.

Similar to physical cash payments we want EARTH cash payments to be as quick and frictionless as possible. With that in mind we have 3 second block times with total transaction settlement in 1 minute. As the transaction shows up within 3 seconds and is totally settled un around 1 minute we feel this is equivalent to existing PoS UX using traditional cash or debit/credit cards.

Also similar to physical cash payments, we want EARTH cash payments be as inexpensive as possible. To solve this problem we allow users to pay cash transaction fees using BANDWIDTH. Each account is given 5000 BANDWIDTH points daily. Each cash transaction usually costs around 200 BANDWITH in fees so each EARTH Account gets around 25 free cash transactions daily.

Following are the basic steps for sending and recieving EARTH betwen accounts. We will cover how to query and calculate `BANDWIDTH` levels as well as how to freeze EARTH in order to get more `BANDWIDTH` points.

<image-responsive
    imageURL="blog/basic-cash-workflow/money.jpg"
    width="100%"
    alt="Money"
/>

## Getting Started

### Docker Quickstart

We provide a [docker quickstart](https://github.com/EarthEngineering/docker-earth-quickstart) to fire up your own private EARTH network with a coupld of lines of code. First [install docker](https://docs.docker.com/v17.09/engine/installation) for your OS.

Next pull down the `latest` tag of the `earthengineer/quickstart` image

```bash
docker pull earthengineering/quickstart:latest
```

Once that's complete run the image

```bash
docker run -it -p 9090:9090 --rm --name earth earthengineering/quickstart:latest
```

Once you fire up the quickstart it will generate a mnemonic and 10 accounts at the EARTH BIP44 HDPath. It will also send each of these new accounts 10,000 EARTH to use during development.

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

Don't worry if this scrolls off your console too quickly. You can call `curl` to see the data again.

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

`earthcli console` doesn't support breaking code across multiple lines to create a new `index.js` file and copy the following in to it. This creates an `async` main function so we can leverage `await`. It also sets up some boilerplace of requiring `earthweb` and instantiating it. You can follow this similar pattern to interact with earthweb in any of your webapps.

Also add `main_account_privkey`, `main_account_address` and `main_account_hex`. You can get the `privkey` and `address` by running the `curl` command listed above: `curl http://127.0.0.1:9090/admin/accounts`

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

If you run the script now we can query `getAccountResources` for our main account. To run the app, change directories to the root directory and run `node index.js`. You should see something similar to the following:

```js
{
  freeNetLimit: 5000,
  TotalNetLimit: 43200000000,
  TotalEnergyLimit: 65049895008
}
```

Note `freeNetLimit` which is the daily available `BANDWIDTH` for this account. As we begin to make transactions and pay the fee using `BANDWITH` we'll see `NetUsed` and `freeNetUsed`. We'll discuss `TotalEnergyLimit` in a later post.

<image-responsive
    imageURL="blog/basic-cash-workflow/sendearth.jpg"
    width="100%"
    alt="JS"
/>

## Send EARTH between 2 accounts

Now that we have everything set up let do a basic cash transaction between 2 accounts. First confirm that you have the quickstart running and that it properly generated 10 accounts.

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

Ok, it looks like we're still on track. Now, add the following to `index.js`

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

Note that after 1 transaction there are `267` `BANDWIDTH` which have been used out of the initial `5000`. Next call the `curl` command and confirm the balances are correct and 1 EARTH was transferred between the two accounts.

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

## Exhaust daily BANDWIDTH

I'll now generate enough transactions to exhaust the original daily allotment of BANDWIDTH. Every tine run `node index.js` you should see `reeNetUsed` increment by about `200`.

When you hav run the script enough you will see that `freeNetUsed` is near `5000`

```bash
freeNetUsed: 4793
```

You'll also notice that no fees have been paid in `EARTH`

```bash
curl http://127.0.0.1:9090/admin/accounts
Available Accounts
==================

(0) TByyPTZ1BU91kjD2rPYYk27JnE8jNVmcAg (9982 EARTH)
(1) TVyrnRU44hUecS6Ji2AQwBQ9oZ76Xenmqz (10018 EARTH)
```

Now the next time we run the script there won't be enough `BANDWIDTH` left to cover the transaction fee so a small amount of EARTH will deducted from the first Account.

Sure enough, the next time I run it `freeNetUsed: 4779`

```bash
curl http://127.0.0.1:9090/admin/accounts
Available Accounts
==================

(0) TByyPTZ1BU91kjD2rPYYk27JnE8jNVmcAg (9980.99733 EARTH)
(1) TVyrnRU44hUecS6Ji2AQwBQ9oZ76Xenmqz (10019 EARTH)
```

## Freeze EARTH to get more BANDWIDTH

If you don't want to pay more fees using yuor EARTH Then you can freeze it and get more daily `BANDWIDTH`. In order to freeze you have to call `transactoinBuilder.freezeBalance`. Add the following to your `index.js`

You need to decide how much EARTH you want to freeze and for how long. Also you need to set the `freeze_type` which can be `BANDWIDTH` or `ENERGY`. After creating the transaction you need to sign and broadcast it

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

While I'm debugging I'll add calls to `getAccountResources` before and after `freezeBalance` to cofirm the freezing worked and I actually got more `BANDWIDTH`. Everytime I run the script I can see my EARTH balance decrease by 100 since that is how much I'm freezing.

Also there are 3 new properties when calling `getAccountResources`.

```js
  NetUsed: 751,
  NetLimit: 43200000000,
  TotalNetWeight: 400,
```

## Query account by address

You can also query the account by address to confirm EARTH is frozen.

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

Note the following

```js
  frozen:
   [ { frozen_balance: 500000000, expire_time: 1576445499000 } ],
  net_usage: 980,
  free_net_usage: 4821,
  latest_consume_free_time: 1576185996000,
```

## Unfreeze

The frozen EARTH won't automatically unfreeze after the amount time which you specified when you froze them. You'll need to unfreeze them like so:

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

## Summary

You now know how to create basic EARTH cash transactions. You also are familiar with the concept of `BANDWIDTH` and the daily `freeNetLimit` which equals around 25 free transactions. Also, you saw how to freeze EARTH to unlock more BANDWIDTH to avoid paying fees.

Thanks for following along. An upcoming post will explore the opposite of `BANDWIDTH` which is `ENERGY` and is used for smart contracts.

Here is the final `index.js` script.

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