---
name: 'basic-cash-workflow-ja'
trans: 'basic-cash-workflow'
title: 基本的な現金のワークフロー
author: Gabriel Cardona
year: Dec 12, 2019
color: '#edece7'
lang: 'ja'
isTextColorDark: true
extraComponent: 'Datatable'
id: 'basic-cash-workflow'
description: |
  現金は地球上の一流市民です。 つまり、EARTHでの現金の送受のトップレベルおよびフレームワーク全体のサポートを見つけることができます。
---

### 現金は地球上の一流市民です。 つまり、EARTHでの現金の送受のトップレベルおよびフレームワーク全体のサポートを見つけることができます。 現金は、EARTHユニットを使用して建てられます。 EARTHはさらにSOLユニットに細分化されます。 1 SOL = 0.000001地球。 1,000,000 SOL = 1 EARTH。

物理的な現金支払いと同様に、EARTHの現金支払いはできるだけ迅速かつ摩擦のないものにする必要があります。 それを念頭に置いて、3秒間のブロック時間と1分間での合計トランザクション決済があります。 トランザクションは3秒以内に表示され、約1分で完全に解決されるため、これは従来のキャッシュカードまたはデビット/クレジットカードを使用した既存のPoS UXと同等であると感じています。

また、物理的な現金支払いと同様に、EARTHの現金支払いはできるだけ安価にしたいと考えています。 この問題を解決するために、ユーザーはBANDWIDTHを使用して現金取引手数料を支払うことができます。 各アカウントには、毎日5000帯域幅のポイントが付与されます。 通常、各現金取引の手数料は約200バンドウィズであるため、各EARTHアカウントには毎日約25の無料現金取引があります。

アカウント間でEARTHを送信および受信するための基本的な手順は次のとおりです。`BANDWIDTH`レベルを照会および計算する方法と、さらに`BANDWIDTH`ポイントを取得するためにEARTHをフリーズする方法について説明します。

<image-responsive
    imageURL="blog/basic-cash-workflow/money.jpg"
    width="100%"
    alt="Money"
/>

## 入門

### Dockerクイックスタート

[dockerクイックスタート](https://github.com/EarthEngineering/docker-earth-quickstart) を提供して、独自のプライベートEARTHネットワークを一連のコード行で起動します。 OSの最初の[インストールドッカー](https://docs.docker.com/v17.09/engine/installation)。

次に、`earthengineer/quickstart` 画像の `latest`タグをプルダウンします

```bash
docker pull earthengineering/quickstart:latest
```

それが完了したら、イメージを実行します

```bash
docker run -it -p 9090:9090 --rm --name earth earthengineering/quickstart:latest
```

クイックスタートを起動すると、EARTH BIP44パスにニーモニックと10個のアカウントが生成されます。 また、これらの新しいアカウントのそれぞれを10,000 EARTHで送信して、開発中に使用します。

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

これがコンソールからあまりに速くスクロールしても心配しないでください。 `curl`を呼び出して、データを再表示できます。

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

`earthcli console`は、新しい` index.js`ファイルを作成し、その中に以下をコピーするための複数行にわたるコードの分割をサポートしていません。 これにより、「async」メイン関数が作成されるため、「await」を活用できます。 また、「earthweb」を要求してインスタンス化するボイラープレイスを設定します。 この同様のパターンに従って、webappでearthwebとやり取りできます。

また、`main_account_privkey`、`main_account_address`、`main_account_hex` を追加します。 上記の `curl`コマンドを実行することで`privkey`と `address`を取得できます：`curl http://127.0.0.1:9090/admin/accounts`

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

ここでスクリプトを実行すると、メインアカウントの `getAccountResources`をクエリできます。 アプリを実行するには、ディレクトリをルートディレクトリに変更し、`node index.js`を実行します。 次のようなものが表示されるはずです。

```js
{
  freeNetLimit: 5000,
  TotalNetLimit: 43200000000,
  TotalEnergyLimit: 65049895008
}
```

このアカウントで毎日利用可能な`BANDWIDTH`である`freeNetLimit`に注意してください。 `BANDWITH`を使用して取引を行い、料金を支払うと、`NetUsed`と`freeNetUsed`が表示されます。`TotalEnergyLimit`については後の投稿で説明します。

<image-responsive
    imageURL="blog/basic-cash-workflow/sendearth.jpg"
    width="100%"
    alt="JS"
/>

## 2つのアカウント間でEARTHを送信します

すべてのセットアップが完了したので、2つのアカウント間で基本的な現金取引を行います。 最初に、クイックスタートが実行されており、10個のアカウントが適切に生成されたことを確認します。

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

OK、まだ順調に進んでいるようです。 次に、以下を`index.js`に追加します

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

1つのトランザクションの後に、最初の`5000`のうち「267」`BANDWIDTH`が使用されていることに注意してください。 次に、 `curl`コマンドを呼び出して、残高が正しいことと2つのアカウント間で1 EARTHが転送されたことを確認します。

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

## 排気帯域幅

BANDWIDTH の元の1日の割り当てを使い果たすのに十分なトランザクションを生成します。 すべてのタインが`node index.js`を実行すると、`freeNetUsed`が`200`ほど増加するはずです。

スクリプトを十分に実行すると、`freeNetUsed`が`5000`に近いことがわかります。

```bash
freeNetUsed: 4793
```

また、`EARTH`で料金が支払われていないことにも気付くでしょう。

```bash
curl http://127.0.0.1:9090/admin/accounts
Available Accounts
==================

(0) TByyPTZ1BU91kjD2rPYYk27JnE8jNVmcAg (9982 EARTH)
(1) TVyrnRU44hUecS6Ji2AQwBQ9oZ76Xenmqz (10018 EARTH)
```

これで、次回スクリプトを実行するときに、取引手数料を賄うのに十分な`BANDWIDTH`が残っていないため、最初のアカウントから少額の地球が差し引かれます。

案の定、次回の実行時に `freeNetUsed：4779`

```bash
curl http://127.0.0.1:9090/admin/accounts
Available Accounts
==================

(0) TByyPTZ1BU91kjD2rPYYk27JnE8jNVmcAg (9980.99733 EARTH)
(1) TVyrnRU44hUecS6Ji2AQwBQ9oZ76Xenmqz (10019 EARTH)
```

## 地球を凍結して帯域幅を増やします

EARTHを使用してより多くの料金を支払いたくない場合は、それをフリーズして、毎日`BANDWIDTH`を取得できます。 凍結するには、 `transactoinBuilder.freezeBalance`を呼び出す必要があります。 以下を`index.js`に追加します

どのくらいの地球を凍結したいのか、どのくらいの期間を決定する必要があります。 また、`freeze_type`を設定する必要があります。これは`BANDWIDTH`または`ENERGY`にすることができます。 トランザクションを作成したら、署名してブロードキャストする必要があります

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

デバッグ中に、`freezeBalance`の前後に`getAccountResources`への呼び出しを追加して、フリーズが機能したことを確認し、実際に`BANDWIDTH`を増やしました。 スクリプトを実行するたびに、地球のバランスが100減少することがわかります。

また、 `getAccountResources`を呼び出すときに3つの新しいプロパティがあります。

```js
  NetUsed: 751,
  NetLimit: 43200000000,
  TotalNetWeight: 400,
```

## アドレスによるアカウントのクエリ

また、アカウントをアドレスで照会して、EARTHが凍結されていることを確認することもできます。

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

以下に注意してください

```js
  frozen:
   [ { frozen_balance: 500000000, expire_time: 1576445499000 } ],
  net_usage: 980,
  free_net_usage: 4821,
  latest_consume_free_time: 1576185996000,
```

## 凍結解除

凍結したEARTHは、凍結したときに指定した時間が経過しても自動的に凍結解除されません。 次のように解凍する必要があります。

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

## 概要

これで、基本的なEARTH現金取引の作成方法がわかりました。 また、`BANDWIDTH`の概念と、約25の無料トランザクションに相当する毎日の`freeNetLimit`にも精通しています。 また、EARTHをフリーズして帯域幅のロックを解除し、料金の支払いを回避する方法を見ました。

フォローしてくれてありがとう。 今後の投稿では、「エネルギー」でありスマート契約に使用される「バンド幅」の反対について検討します。

最終的な `index.js`スクリプトは次のとおりです。

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