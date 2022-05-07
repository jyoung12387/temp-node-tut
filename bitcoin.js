// 60 days of historical btc data
let bitcoin = [
  [1646784000000, 38732.93701302586],
  [1646870400000, 41986.03444607623],
  [1646956800000, 39468.35477300189],
  [1647043200000, 38775.17558840679],
  [1647129600000, 38903.69354800599],
  [1647216000000, 37852.52514106289],
  [1647302400000, 39669.423812004505],
  [1647388800000, 39331.84654059453],
  [1647475200000, 41165.63506140341],
  [1647561600000, 41001.70957801974],
  [1647648000000, 41837.41313797566],
  [1647734400000, 42201.939920688186],
  [1647820800000, 41283.25900104565],
  [1647907200000, 41061.81589384987],
  [1647993600000, 42401.895597489434],
  [1648080000000, 42802.15471016985],
  [1648166400000, 43936.09623454058],
  [1648252800000, 44331.77795706412],
  [1648339200000, 44510.84421762133],
  [1648425600000, 46715.1176185105],
  [1648512000000, 46994.879118357465],
  [1648598400000, 47459.261237539096],
  [1648684800000, 47063.36584996355],
  [1648771200000, 45528.40715313835],
  [1648857600000, 46270.20070585378],
  [1648944000000, 45842.14476317382],
  [1649030400000, 46434.562982661664],
  [1649116800000, 46622.63571309101],
  [1649203200000, 45635.45438126673],
  [1649289600000, 43198.77526936491],
  [1649376000000, 43515.15032279806],
  [1649462400000, 42315.70972421807],
  [1649548800000, 42796.39747810973],
  [1649635200000, 42274.907370256085],
  [1649721600000, 39603.965159284155],
  [1649808000000, 40205.67794073206],
  [1649894400000, 41205.16871904067],
  [1649980800000, 39959.457069033735],
  [1650067200000, 40586.59730938673],
  [1650153600000, 40450.37930543977],
  [1650240000000, 39739.11925622209],
  [1650326400000, 40833.5379650337],
  [1650412800000, 41498.12244669832],
  [1650499200000, 41397.220477279625],
  [1650585600000, 40528.54148675958],
  [1650672000000, 39756.848993471016],
  [1650758400000, 39561.78019075613],
  [1650844800000, 39469.04986198146],
  [1650931200000, 40488.877917622376],
  [1651017600000, 38134.21545068938],
  [1651104000000, 39237.94931747103],
  [1651190400000, 39741.766645809636],
  [1651276800000, 38650.55013809267],
  [1651363200000, 37820.61176529208],
  [1651449600000, 38537.65476669535],
  [1651536000000, 38561.56539902362],
  [1651622400000, 37758.496107734],
  [1651708800000, 39699.02404125388],
  [1651795200000, 36612.229548803036],
  [1651881600000, 36116.394294982965],
];

//60 days of btc price history. oldest last
let btcPrices = [
  38732.93701302586, 41986.03444607623, 39468.35477300189, 38775.17558840679,
  38903.69354800599, 37852.52514106289, 39669.423812004505, 39331.84654059453,
  41165.63506140341, 41001.70957801974, 41837.41313797566, 42201.939920688186,
  41283.25900104565, 41061.81589384987, 42401.895597489434, 42802.15471016985,
  43936.09623454058, 44331.77795706412, 44510.84421762133, 46715.1176185105,
  46994.879118357465, 47459.261237539096, 47063.36584996355, 45528.40715313835,
  46270.20070585378, 45842.14476317382, 46434.562982661664, 46622.63571309101,
  45635.45438126673, 43198.77526936491, 43515.15032279806, 42315.70972421807,
  42796.39747810973, 42274.907370256085, 39603.965159284155, 40205.67794073206,
  41205.16871904067, 39959.457069033735, 40586.59730938673, 40450.37930543977,
  39739.11925622209, 40833.5379650337, 41498.12244669832, 41397.220477279625,
  40528.54148675958, 39756.848993471016, 39561.78019075613, 39469.04986198146,
  40488.877917622376, 38134.21545068938, 39237.94931747103, 39741.766645809636,
  38650.55013809267, 37820.61176529208, 38537.65476669535, 38561.56539902362,
  37758.496107734, 39699.02404125388, 36612.229548803036, 36116.394294982965,
];

let contribution = 100;
let buyPeriod = 5;
let frequency = 7; //interval of days to dca. ie 3, 5, 7, 14, 30
let buyValues = []; // array to store possible buys based on frequency of buys
let portfolioValue = [];
let currentPrice = btcPrices[btcPrices.length - 1];

// loop to set possible buyValues for purchases
for (let i = btcPrices.length - 1; i > 0; i -= frequency) {
  buyValues.push(btcPrices[i]);
}

// get portfolio value over time
let totalSats = 0;
let currentPortValue = 0;
for (let i = 0; i < buyPeriod; i++) {
  totalSats += contribution / buyValues[i];
  currentPortValue = totalSats * currentPrice;
  portfolioValue.push(currentPortValue);
}

//summary statistics
let totalContributed = contribution * buyPeriod;

//get avg btc amount over period
let quantityPurchased = 0;
for (let i = 0; i < buyPeriod; i++) {
  quantityPurchased += contribution / buyValues[i];
}

let avgBuyPrice = (1 / quantityPurchased) * totalContributed;
let currentPortfolioValue = portfolioValue[portfolioValue.length - 1];
let totalReturn = currentPortfolioValue / totalContributed - 1;

// console.log(buyValues);

// console.log(totalContributed);
// console.log(currentValue);
// console.log(totalBtcBought);
// console.log(avgBuyPrice);
// console.log(totalReturn);

console.log(portfolioValue);
console.log(currentPortfolioValue);

// let unix = 1651939069;
// let millis = unix * 1000;
// let date = new Date(millis).toLocaleString();
// console.log(date);

function getDateFromUnix(unix) {
  let millis = unix * 1000;
  let date = new Date(millis).toLocaleString();
  return date;
}

// let one = getDateFromUnix(1651939069);
// console.log(one);

// for (let i = 0; i < bitcoin.length; i++) {
//   let timeStamp = getDateFromUnix(bitcoin[i][0]);
//   let date = `Date: ${timeStamp}`;
//   let price = `Price: ${bitcoin[i][1]}`;
//   console.log(date + " " + price);
// }
let dateExample = bitcoin[0][0];
let dateConverted = getDateFromUnix(dateExample);
console.log(dateConverted);

for (let i = 0; i < bitcoin.length; i++) {
  let date = bitcoin[i][0];
  let converted = getDateFromUnix(date);

  console.log(date);
  console.log(converted);
}