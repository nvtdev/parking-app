import { Request, Response } from "express";
import { addParkEntryType } from "../schema/parkEntry.schema";
import {
  addParkEntry,
  getFreeParkingSpots,
  getCurrentBill,
  exitParking,
} from "../service/parkEntry.service";

export async function addParkEntryController(req: Request, res: Response) {
  try {
    const parkEntry = await addParkEntry(req.body);
    return res.send("Park Entry added.");
  } catch (e: any) {
    console.error(e);
    return res.status(409).send(e.message);
  }
}

export async function getCurrentBillController(req: Request, res: Response) {
  const currentBill = await getCurrentBill(req.body);
  if (currentBill) {
    return res.send(currentBill.toString());
  } else {
    return res.send("Vehicle with that registration number is not found.");
  }
}

export async function exitParkingController(req: Request, res: Response) {
  const currentBill = await exitParking(req.body);
  if (currentBill) {
    return res.send(`You exited the parking. You owe: ${currentBill}`);
  } else {
    return res.send("Vehicle with that registration number is not found.");
  }
}

export async function getFreeParkingSpotsController(
  req: Request,
  res: Response
) {
  try {
    const parkingSpots = await getFreeParkingSpots();
    return res.send(parkingSpots.toString());
  } catch (e: any) {
    console.error(e);
    return res.status(409).send(e.message);
  }
}
