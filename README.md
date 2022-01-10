# parking-app

A parking app REST API built using Mongo, Node, Express and TypeScript. Parameters are passed in the body of the requests using JSON. Here are the available endpoints with an example request body:

Use **npm run app** to start the project.

App runs is set to run on **port 4000**. It expects MongoDB server to run on **port 27017**, full Mongo configuration can be found in src/db/connect.ts.

- **GET /freeParkingSpots** - returns the number of free spots in the parking

- **GET /currentBill** - returns the bill a vehicle has accumulated so far, example parameters:

      {
        registrationNumber: "reg1"
      }
    
- **POST /enterParking** - add a vehicle to the parking, example parameters:
  
      {
        registrationNumber: "reg1",
        category: "a" // possible inputs "a", "b" or "c", converted to uppercase on the backend
        discountCard: "gold" // optional parameter, possible values "silver", "gold", "platinum"
      }

- **POST /exitParking** - remove vehicle from parking and get accumulated bill, example parameters:
  
      {
        registrationNumber: "reg1"  
      }
