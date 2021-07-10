const ranks = [
  "Iron",
  "Bronze",
  "Silver",
  "Gold",
  "Platinum",
  "Diamond",
  "Immortal",
  "Radiant",
];

export const calculateRate = (order: any) => {
  console.log(order);
  let total = 0;
  if (ranks.indexOf(order.currentRank) >= 0) {
    total = total + 8;
  }
  if (
    ranks.indexOf(order.currentRank) >= 1 ||
    ranks.indexOf(order.desiredRank) >= 1
  ) {
    total = total + 9;
  }
  if (
    ranks.indexOf(order.currentRank) >= 2 ||
    ranks.indexOf(order.desiredRank) >= 2
  ) {
    total = total + 12;
  }
  if (
    ranks.indexOf(order.currentRank) >= 3 ||
    ranks.indexOf(order.desiredRank) >= 3
  ) {
    total = total + 22;
  }
  if (
    ranks.indexOf(order.currentRank) >= 4 ||
    ranks.indexOf(order.desiredRank) >= 4
  ) {
    total = total + 29;
  }
  if (
    ranks.indexOf(order.currentRank) >= 5 ||
    ranks.indexOf(order.desiredRank) >= 5
  ) {
    total = total + 50;
  }
  if (
    ranks.indexOf(order.currentRank) >= 6 ||
    ranks.indexOf(order.desiredRank) >= 6
  ) {
    total = total + 89;
  }
  if (ranks.indexOf(order.desiredRank) >= 7) {
    total = total + 120;
  }
  if (order.appearOffline) {
  }
  if (order.playWithBooster) {
    total = total * 0.4 + total;
  }
  if (order.priorityOrder) {
    total = total * 0.2 + total;
  }
  if (order.withStreaming) {
    total = total * 0.15 + total;
  }
  return total === 0 ? 8 : total;
  // Iron 1 - Iron 3 = $8
  // Bronze 1 - Bronze 3 = $9
  // Silver 1 - Silver 3 = $12
  // Gold 1 - Gold 3 = $22
  // Platinum 1 - Platinum 3 = $29
  // Diamond 1 - Diamond 3 = $50
  // Immortal 1 - Immortal 3 = $89
};
