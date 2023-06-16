import { initializeConnection, closeConnection } from "./database/config";
import dotenv from "dotenv"
import fs from "fs"
import { City } from "./entities/City";
import { CitiesCsvToJson } from "./utils/CitiesCsvToJson";

dotenv.config();

(async function seed() {
  await initializeConnection()
  console.log("Seeding")

  const pathFile = "./src/data/cities.csv"
  const citiesCsv = fs.readFileSync(pathFile).toString()
  const cities = CitiesCsvToJson.toJSON(citiesCsv)
  const result = await City.insertMany(cities)

  console.log(result.length)
  console.log("Close connection")
  closeConnection()
})()

