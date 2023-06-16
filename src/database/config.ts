import { connect, disconnect } from "mongoose"

function initializeConnection() {
  return connect(process.env.MONGO_URL as string)
}

function closeConnection() {
  disconnect()
}

export { initializeConnection, closeConnection }
