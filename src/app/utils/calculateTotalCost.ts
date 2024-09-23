export const calculateTotalCost = (
  date: string,
  startTime: string,
  endTime: string,
  pricePerHour: number,
): number => {
  const start = new Date(`${date}T${startTime}`)
  const end = new Date(`${date}T${endTime}`)
  const hours = (end.getTime() - start.getTime()) / (1000 * 60 * 60)
  const totalCost = hours * pricePerHour
  return totalCost
}

// Calculate the total cost based on startTime, endTime, and pricePerHour
// const startTime = new Date(`${booking.date}T${booking.startTime}`)
// const endDateTime = new Date(`${booking.date}T${endTime}`)
// const hoursUsed =
//     (endDateTime.getTime() - startTime.getTime()) / (1000 * 60 * 60)

// const totalCost = hoursUsed * car.pricePerHour
