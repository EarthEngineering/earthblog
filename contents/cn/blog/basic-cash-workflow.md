---
name: 'basic-cash-workflow-cn'
trans: 'basic-cash-workflow'
title: 基本现金流
author: Gabriel Cardona
year: Dec 12, 2019
color: '#edece7'
lang: 'cn'
isTextColorDark: true
extraComponent: 'Datatable'
id: 'basic-cash-workflow'
description: |
  Cash是EARTH的头等公民。 这意味着您将获得在EARTH上发送和接收现金的顶级和框架范围的支持。
---

### Cash是EARTH的头等公民。 这意味着您将获得在EARTH上发送和接收现金的顶级和框架范围的支持。 现金以EARTH单位计价。 EARTH进一步细分为SOL单位。 1 SOL = 0.000001 EARTH。 1,000,000 SOL = 1 EARTH。

与实物现金付款类似，我们希望EARTH现金付款尽可能快且无摩擦。 考虑到这一点，我们在3分钟内完成了1分钟的总交易结算时间。 由于交易在3秒内显示，并在1分钟左右完全结算，因此我们认为这等同于使用传统现金或借记卡/信用卡的现有PoS UX。

与实物现金付款类似，我们希望EARTH现金付款尽可能便宜。 为了解决这个问题，我们允许用户使用BANDWIDTH支付现金交易费用。 每个帐户每天可获得5000 BANDWIDTH积分。 每笔现金交易的费用通常约为200 BANDWITH，因此每个EARTH帐户每天可获得约25笔免费现金交易。

以下是发送和接收EARTH betwen帐户之间的基本步骤。 我们将介绍如何查询和计算 `BANDWIDTH`水平以及如何冻结EARTH以获取更多的 `BANDWIDTH` 积分。
<image-responsive
    imageURL="blog/basic-cash-workflow/money.jpg"
    width="100%"
    alt="Money"
/>

## 入门

### Docker 快速入门

我们提供了一个 [docker quickstart](https://github.com/EarthEngineering/docker-earth-quickstart) 来启动您自己的私有EARTH网络，其中包括几行代码。 首先为您的操作系统安装 [docker安装](https://docs.docker.com/v17.09/engine/installation)。

接下来，下拉 `earthengineer/quickstart` 图像的 `latest` 标签。

```bash
docker pull earthengineering/quickstart:latest
```

Once that's complete run the image

```bash
docker run -it -p 9090:9090 --rm --name earth earthengineering/quickstart:latest
```

启动快速入门后，它将在EARTH BIP44路径上生成一个助记符和10个帐户。 它还将向这些新帐户中的每个帐户发送10,000 EARTH，以便在开发期间使用。

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

如果此操作在您的控制台上滚动得太快，请不要担心。 您可以调用 `curl` 再次查看数据。

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

`earthcli console` 不支持跨行破坏代码以创建新的 `index.js` 文件并将以下内容复制到其中。 这将创建一个 `async` 主要功能，因此我们可以利用 `await`。 它还设置了一些需要 `earthweb` 并将其实例化的地方。 您可以遵循类似的模式在任何 Web 应用程序中与 Earthweb 进行交互。

同时添加`main_account_privkey`，`main_account_address`和`main_account_hex`。 您可以通过运行上面列出的`curl`命令来获得`privkey`和`address`：`curl http://127.0.0.19090/admin/accounts`

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

如果现在运行脚本，我们可以查询 `getAccountResources` 作为我们的主要帐户。 要运行该应用程序，请将目录更改为根目录，然后运行 `node index.js`。 您应该看到类似于以下内容：

```js
{
  freeNetLimit: 5000,
  TotalNetLimit: 43200000000,
  TotalEnergyLimit: 65049895008
}
```

注意 `freeNetLimit`，它是该帐户的每日可用“带宽”。 当我们开始使用`BANDWITH`进行交易并支付费用时，我们会看到`NetUsed`和`freeNetUsed`。 我们将在以后的文章中讨论`TotalEnergyLimit`。

<image-responsive
    imageURL="blog/basic-cash-workflow/sendearth.jpg"
    width="100%"
    alt="JS"
/>

## 在2个帐户之间发送EARTH

现在我们已经完成了所有设置，让我们在2个帐户之间进行基本的现金交易。 首先确认您已运行快速入门，并且正确生成了10个帐户。

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

好的，看来我们仍在按计划进行。 现在，将以下内容添加到`index.js`中

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

请注意，在进行1次交易后，有267个“带宽”已从最初的“ 5000”中使用。 接下来调用 `curl` 命令并确认余额正确，并且在两个帐户之间转移了1 EARTH。

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

## 每天用尽带宽

现在，我将生成足够的事务来耗尽BANDWIDTH的原始每日分配。 每个执行例行程序的节点 index.js，您应该看到reeNetUsed增量增加了200左右。

当您足够运行脚本时，您会看到`freeNetUsed`接近`5000`。

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

现在，下次我们运行脚本时，将没有足够的`BANDWIDTH`来支付交易费用，因此将从第一个帐户中扣除少量的EARTH。

果然，下一次我运行它时，`freeNetUsed：4779`

```bash
curl http://127.0.0.1:9090/admin/accounts
Available Accounts
==================

(0) TByyPTZ1BU91kjD2rPYYk27JnE8jNVmcAg (9980.99733 EARTH)
(1) TVyrnRU44hUecS6Ji2AQwBQ9oZ76Xenmqz (10019 EARTH)
```

## 冻结 EARTH 以获得更多带宽

如果您不想使用EAROR EARTH支付更多费用，则可以将其冻结并每天获得更多的 `BANDWIDTH`。 为了冻结，您必须调用 `transactoinBuilder.freezeBalance`。 将以下内容添加到您的`index.js`中

您需要确定要冻结多少 EARTH 以及冻结多长时间。 另外，您需要设置 `freeze_type`，可以是 `BANDWIDTH` 或 `ENERGY`。 创建交易后，您需要签名并广播

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

在调试的同时，我将在 freezeBalance 之前和之后将调用添加到 getAccountResources 中，以确认冻结有效，而实际上我得到了更多的BANDWIDTH。 每次运行脚本时，我都会看到我的EARTH余额减少了100，因为这就是冻结的数量。

当调用`getAccountResources`时，还有3个新属性。

```js
  NetUsed: 751,
  NetLimit: 43200000000,
  TotalNetWeight: 400,
```

## 按地址查询账户

您也可以按地址查询帐户，以确认 EARTH 已冻结。

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

注意以下

```js
  frozen:
   [ { frozen_balance: 500000000, expire_time: 1576445499000 } ],
  net_usage: 980,
  free_net_usage: 4821,
  latest_consume_free_time: 1576185996000,
```

## 解冻

冻结的 EARTH 在冻结后指定的时间后不会自动解冻。 您需要像这样解冻它们：

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

## 摘要

您现在知道了如何创建基本的EARTH现金交易。 您还熟悉 `带宽` 的概念和每天大约25次免费交易的 `freeNetLimit`。 此外，您还了解了如何冻结 EARTH 以解锁更多 BANDWIDTH以避免支付费用。

感谢您的关注。 即将发布的帖子将探讨 `BANDWIDTH` 的反面，即 `ENERGY`，用于智能合约。

这是最终的 index.js 脚本。

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