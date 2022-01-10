import { Express } from "express";
import validate from "./middleware/validateParkEntry";
import { addParkEntrySchema } from "./schema/parkEntry.schema";
import {
  addParkEntryController,
  getCurrentBillController,
  getFreeParkingSpotsController,
  exitParkingController,
} from "./controller/parkEntry.controller";

function routes(app: Express) {
  app.get("/freeParkingSpots", getFreeParkingSpotsController);

  app.get("/currentBill", getCurrentBillController);

  app.post(
    "/enterParking",
    validate(addParkEntrySchema),
    addParkEntryController
  );

  app.post("/exitParking", exitParkingController);
}

export default routes;
