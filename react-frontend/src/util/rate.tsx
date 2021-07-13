// const ranks = [
//   "Iron", //0
//   "Bronze", //1
//   "Silver", //2
//   "Gold", //3
//   "Platinum", //4
//   "Diamond", //5
//   "Immortal", //6
//   "Radiant", //7
// ];
// const tiers = [
//   "I", //0
//   "II", //1
//   "III", //2
// ];
// const costs: any = {
//   Iron: 120,
//   Bronze: 120,
//   Silver: 120,
//   Gold: 120,
//   Platinum: 120,
//   Diamond: 120,
//   Immortal: 120,
//   Radiant: 120,
// };
export const calculateRateFromBackend = (ratesFromBackend: any, order: any) => {
  let total = 0;
  let r1: any = ratesFromBackend.filter((rate: any) => {
    return (
      rate.rankFrom === order.currentRank &&
      rate.tierFrom === order.currentRankTier
    );
  });
  let r2: any = ratesFromBackend.filter((rate: any) => {
    return (
      rate.rankFrom === order.desiredRank &&
      rate.tierFrom === order.desiredRankTier
    );
  });
  if (r1?.length > 0 && r2?.length > 0) {
    r1 = r1[0];
    r2 = r2[0];
    const r1IdIndex = Number(r1.id) - 1;
    const r2IdIndex = Number(r2.id) - 1;
    for (let i = r1IdIndex; i < r2IdIndex; i++) {
      console.log(ratesFromBackend[i].amount);
      total = total + ratesFromBackend[i].amount;
    }
  }
  if (order.appearOffline) {
  }
  let extras = 0;
  if (order.playWithBooster) {
    extras = total * 0.4 + extras;
  }
  if (order.priorityOrder) {
    extras = total * 0.2 + extras;
  }
  if (order.withStreaming) {
    extras = total * 0.15 + extras;
  }
  let currentRankBaseCost = 0;
  let currentRankCost = 0;
  try {
    currentRankBaseCost = ratesFromBackend.filter((rate: any) => {
      return rate.rankFrom === order.currentRank;
    })[0 + 1].amount;
    if (currentRankBaseCost === undefined) {
      currentRankBaseCost = 0;
    }
  } catch (e: any) {
    currentRankBaseCost = 0;
  }
  // if (order.currentRankAmount == "0-20") {
  //   currentRankCost = currentRankCost * 0.04;
  // } else

  if (order.currentRankAmount === "21-40") {
    currentRankCost = currentRankBaseCost * 0.04;
  } else if (order.currentRankAmount === "41-60") {
    currentRankCost = currentRankBaseCost * 0.06;
  } else if (order.currentRankAmount === "61-80") {
    currentRankCost = currentRankBaseCost * 0.08;
  } else if (order.currentRankAmount === "81-100") {
    currentRankCost = currentRankBaseCost * 0.1;
  }
  return typeof total === "number"
    ? (total + extras + currentRankCost).toFixed(2)
    : 0;
};
export const calculatePlacementRateFromBackend = (
  ratesFromBackend: any,
  order: any
) => {
  let total = 0;
  let r1: any = ratesFromBackend.filter((rate: any) => {
    return rate.rank === order.currentRank;
  });
  if (r1?.length > 0) {
    r1 = r1[0];
    total = r1.amount * order.wins;
  }
  let extras = 0;
  if (order.playWithBooster) {
    extras = total * 0.4 + extras;
  }
  if (order.priorityOrder) {
    extras = total * 0.2 + extras;
  }
  if (order.withStreaming) {
    extras = total * 0.15 + extras;
  }
  return typeof total === "number" ? (total + extras).toFixed(2) : 0;
};
export const calculateWinBoostingsRateFromBackend = (
  ratesFromBackend: any,
  order: any
) => {
  let total = 0;
  let r1: any = ratesFromBackend.filter((rate: any) => {
    return (
      rate.rank === order.currentRank && rate.tier === order.currentRankTier
    );
  });
  if (r1?.length > 0) {
    r1 = r1[0];
    total = r1.amount * order.wins;
  }
  let extras = 0;
  if (order.playWithBooster) {
    extras = total * 0.4 + extras;
  }
  if (order.priorityOrder) {
    extras = total * 0.2 + extras;
  }
  if (order.withStreaming) {
    extras = total * 0.15 + extras;
  }
  return typeof total === "number" ? (total + extras).toFixed(2) : 0;
};
// export const calculateRate = (order: any) => {
//   console.log(order);
//   let total = 0;
//   if (
//     ranks.indexOf(order.currentRank) <= 0 &&
//     ranks.indexOf(order.desiredRank) >= 1
//   ) {
//     total = total + 8;
//     if (ranks.indexOf(order.desiredRank) < ranks.indexOf(order.currentRank)) {
//       total = total + 8;
//     }
//   }
//   if (
//     ranks.indexOf(order.currentRank) <= 1 &&
//     ranks.indexOf(order.desiredRank) >= 1
//   ) {
//     total = total + 9;
//     if (ranks.indexOf(order.desiredRank) < ranks.indexOf(order.currentRank)) {
//       total = total + 9;
//     }
//   }
//   if (
//     ranks.indexOf(order.currentRank) <= 2 &&
//     ranks.indexOf(order.desiredRank) >= 2
//   ) {
//     total = total + 12;
//     if (ranks.indexOf(order.desiredRank) < ranks.indexOf(order.currentRank)) {
//       total = total + 12;
//     }
//   }
//   if (
//     ranks.indexOf(order.currentRank) <= 3 &&
//     ranks.indexOf(order.desiredRank) >= 3
//   ) {
//     total = total + 22;
//     if (ranks.indexOf(order.desiredRank) < ranks.indexOf(order.currentRank)) {
//       total = total + 22;
//     }
//   }
//   if (
//     ranks.indexOf(order.currentRank) <= 4 &&
//     ranks.indexOf(order.desiredRank) >= 4
//   ) {
//     total = total + 29;
//     if (ranks.indexOf(order.desiredRank) < ranks.indexOf(order.currentRank)) {
//       total = total + 29;
//     }
//   }
//   if (
//     ranks.indexOf(order.currentRank) <= 5 &&
//     ranks.indexOf(order.desiredRank) >= 5
//   ) {
//     total = total + 50;
//     if (ranks.indexOf(order.desiredRank) < ranks.indexOf(order.currentRank)) {
//       total = total + 50;
//     }
//   }
//   if (
//     ranks.indexOf(order.currentRank) <= 6 &&
//     ranks.indexOf(order.desiredRank) >= 6
//   ) {
//     total = total + 71;
//     const start = Number(order.currentRankAmount);
//     const end = Number(order.desiredRankAmount);
//     const difference = end - start;
//     if (difference > 0) {
//       total = total + difference * 3;
//     }
//     // only RR no tiers
//   }
//   if (ranks.indexOf(order.desiredRank) >= 7) {
//     total = total + 89;
//     const start = Number(order.currentRankAmount);
//     const end = Number(order.desiredRankAmount);
//     const difference = end - start;
//     if (difference > 0) {
//       total = total + difference * 4;
//     }
//     // only RR  no tiers
//   }

//   // calculate amount from the dropdown 0-20 21-40 41-60 61-80
//   let tierAmount;
//   // if (
//   //   order.currentRankAmount != "Immortal" ||
//   //   order.currentRankAmount !== "Radiant"
//   // ) {
//   //   if (order.currentRankAmount == "0-20") {
//   //     tierAmount = costs[order.currentRank] * 0.04;
//   //   } else if (order.currentRankAmount == "21-40") {
//   //     tierAmount = costs[order.currentRank] * 0.06;
//   //   } else if (order.currentRankAmount == "41-60") {
//   //     tierAmount = costs[order.currentRank] * 0.08;
//   //   } else if (order.currentRankAmount == "61-80") {
//   //     tierAmount = costs[order.currentRank] * 0.1;
//   //   } else if (order.currentRankAmount == "81-100") {
//   //     tierAmountcosts[order.currentRank] * 0.12;
//   //   }
//   // }
//   // calculate amount from the dropdown 0-20 21-40 41-60 61-80
//   // if (order.currentRankAmount === "Radiant") {
//   //   if (order.currentRankAmount == "0-20") {
//   //     total = total + 89 * 0.04;
//   //   } else if (order.currentRankAmount == "21-40") {
//   //     total = total + 89 * 0.06;
//   //   } else if (order.currentRankAmount == "41-60") {
//   //     total = total + 89 * 0.08;
//   //   } else if (order.currentRankAmount == "61-80") {
//   //     total = total + 89 * 0.1;
//   //   } else if (order.currentRankAmount == "81-100") {
//   //     total = total + 89 * 0.12;
//   //   }
//   // }
//   if (order.appearOffline) {
//   }
//   if (order.playWithBooster) {
//     total = total * 0.4 + total;
//   }
//   if (order.priorityOrder) {
//     total = total * 0.2 + total;
//   }
//   if (order.withStreaming) {
//     total = total * 0.15 + total;
//   }
//   console.log(total);
//   return total === 0 ? 8 : total.toFixed(2);
//   // Iron 1 - Iron 3 = $8
//   // Bronze 1 - Bronze 3 = $9
//   // Silver 1 - Silver 3 = $12
//   // Gold 1 - Gold 3 = $22
//   // Platinum 1 - Platinum 3 = $29
//   // Diamond 1 - Diamond 3 = $50
//   // Immortal 1 - Immortal 3 = $89
// };
// function adjustTiers(order: any) {
//   let total = 0;
//   if (
//     ranks.indexOf(order.currentRank) <= 0 &&
//     ranks.indexOf(order.desiredRank) >= 1
//   ) {
//     total = total + 8;
//   }
//   if (
//     ranks.indexOf(order.currentRank) <= 1 &&
//     ranks.indexOf(order.desiredRank) >= 1
//   ) {
//     total = total + 9;
//   }
//   if (
//     ranks.indexOf(order.currentRank) <= 2 &&
//     ranks.indexOf(order.desiredRank) >= 2
//   ) {
//     total = total + 12;
//   }
//   if (
//     ranks.indexOf(order.currentRank) <= 3 &&
//     ranks.indexOf(order.desiredRank) >= 3
//   ) {
//     total = total + 22;
//   }
//   if (
//     ranks.indexOf(order.currentRank) <= 4 &&
//     ranks.indexOf(order.desiredRank) >= 4
//   ) {
//     total = total + 29;
//   }
//   if (
//     ranks.indexOf(order.currentRank) <= 5 &&
//     ranks.indexOf(order.desiredRank) >= 5
//   ) {
//     total = total + 50;
//   }
//   if (
//     ranks.indexOf(order.currentRank) <= 6 &&
//     ranks.indexOf(order.desiredRank) >= 6
//   ) {
//     total = total + 71;
//     const start = Number(order.currentRankAmount);
//     const end = Number(order.desiredRankAmount);
//     const difference = end - start;
//     if (difference > 0) {
//       total = total + difference * 3;
//     }
//     // only RR no tiers
//   }
// }
