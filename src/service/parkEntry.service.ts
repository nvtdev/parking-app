import ParkEntryModel, {
  ParkEntryDocument,
  ParkEntryInput,
  GetCurrentBillInput,
} from "../model/parkEntry.model";

const MAX_PARKING_SPOTS = 200;

export async function addParkEntry(input: ParkEntryInput): Promise<string> {
  try {
    const category = input.category.toUpperCase();
    if (category === "A") {
      input.spotsRequired = 1;
    } else if (category === "B") {
      input.spotsRequired = 2;
    } else {
      input.spotsRequired = 4;
    }
    const freeParkingSpots = await getFreeParkingSpots();
    if (freeParkingSpots >= input.spotsRequired) {
      const parkEntry = await ParkEntryModel.create(input);
      if (parkEntry) {
        return "Park Entry added.";
      } else {
        return "Error adding park entry.";
      }
    } else {
      return "Parking is full.";
    }
  } catch (e: any) {
    throw new Error(e);
  }
}

export async function getFreeParkingSpots(): Promise<number> {
  try {
    const occupiedCarkingSpotsCount = await countOccupiedParkingSpots();
    return MAX_PARKING_SPOTS - occupiedCarkingSpotsCount;
  } catch (e: any) {
    throw new Error(e);
  }
}

export async function exitParking(
  input: GetCurrentBillInput
): Promise<number> | null {
  const currentBill = getCurrentBill(input);
  if (currentBill) {
    const deletedCount = await ParkEntryModel.deleteOne({
      registrationNumber: input.registrationNumber,
    });
    return currentBill;
  } else {
    return null;
  }
}

export async function getCurrentBill(
  input: GetCurrentBillInput
): Promise<number> | null {
  const vehicle = await getVehicle(input.registrationNumber);
  if (vehicle) {
    return calculateBill(vehicle);
  } else {
    return null;
  }
}

export function calculateBill(vehicle: ParkEntryDocument): number {
  const createdDate = vehicle.createdAt;
  const currentDate = new Date();
  const hours =
    (Math.abs(currentDate.getTime() - createdDate.getTime()) / 36e5) | 0;

  let startHour = createdDate.getHours();
  let dayHours = 0,
    nightHours = 0;
  for (let i = 0; i < hours; i++) {
    if (startHour >= 8 && startHour <= 18) {
      dayHours++;
    } else {
      nightHours++;
    }
    startHour++;
    if (startHour === 24) {
      startHour = 0;
    }
  }

  let currentBill = 0;
  switch (vehicle.category.toUpperCase()) {
    case "A":
      currentBill = dayHours * 3 + nightHours * 2;
    case "B":
      currentBill = dayHours * 6 + nightHours * 4;
    case "C":
      currentBill = dayHours * 12 + nightHours * 8;
  }

  // apply discount
  if (vehicle.discountCard) {
    switch (vehicle.discountCard.toUpperCase()) {
      case "SILVER":
        currentBill = currentBill * 0.9;
      case "GOLD":
        currentBill = currentBill * 0.85;
      case "PLATINUM":
        currentBill = currentBill * 0.8;
    }
  }

  return currentBill;
}

function getVehicle(regNumber: string): Promise<ParkEntryDocument> {
  return new Promise((resolve, reject) => {
    ParkEntryModel.findOne({
      registrationNumber: regNumber,
    }).exec((err, value) => {
      resolve(value);
    });
  });
}

function countOccupiedParkingSpots(): Promise<number> {
  return new Promise((resolve, reject) => {
    ParkEntryModel.aggregate([
      {
        $group: {
          _id: null,
          total: {
            $sum: "$spotsRequired",
          },
        },
      },
    ]).exec((err, result) => {
      if (err) {
        reject(err.message);
      }
      resolve(result[0].total);
    });
  });
}
