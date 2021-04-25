import Elevator from './app/elevator.js'
import {
    normalPassengers,
    bigPassengers,
    passengersThatNeedReminders,
    edgeFloorsPassengers,
    tooManyPassengers
} from './app/sample_passengers.js'

let elevator = new Elevator()


elevator.elevate(normalPassengers)
console.log(`>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>\n\n\n`)
elevator.elevate(bigPassengers)
console.log(`>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>\n\n\n`)
elevator.elevate(passengersThatNeedReminders)
console.log(`>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>\n\n\n`)
elevator.elevate(edgeFloorsPassengers)
console.log(`>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>\n\n\n`)
elevator.elevate(tooManyPassengers)