const isFridayRush = (orderTime: Date): boolean => {
  const dayOfWeek = orderTime.getDay(); // Sunday is 0, Monday is 1, ..., Saturday is 6
  const isFriday = dayOfWeek === 5; // Friday is 5
  const isRushHour = orderTime.getHours() >= 15 && orderTime.getHours() < 19;
  return isFriday && isRushHour;
};

const calculateDeliveryFee = (
  cartValue: number,
  deliveryDistance: number,
  numItems: number,
  orderTime: Date
): number => { 
  let deliveryFee = 0;

  if (cartValue >= 200) {
    return deliveryFee;
  }

  if (cartValue < 10) {
    let cartSurcharge = 10 - cartValue;
    deliveryFee += cartSurcharge;
  }

  deliveryFee += 2; // base delivery fee
  if (deliveryDistance > 1000) {
    deliveryFee += Math.ceil((deliveryDistance - 1000) / 500);
  }

  if (numItems >= 5) {
    deliveryFee += (numItems - 4) * 0.5;
  }

  if (numItems > 12) {
   deliveryFee += (numItems - 12) * 1.20; // bulk surcharge
  }

  if (isFridayRush(orderTime)) {
    deliveryFee *= 1.2; // friday rush surcharge
    if (deliveryFee > 15) {
      deliveryFee = 15;
    }
  }

  return deliveryFee;

};

export { calculateDeliveryFee };
