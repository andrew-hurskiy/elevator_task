import Elevator from './app/elevator.js'
import {
    normalPassengers,
    bigPassengers,
    passengersThatNeedReminders,
    edgeFloorsPassengers,
    tooManyPassengers
} from './app/sample_passengers.js'

let elevator = new Elevator()

elevator
    .elevate(normalPassengers)
    .elevate(bigPassengers)
    .elevate(passengersThatNeedReminders)
    .elevate(edgeFloorsPassengers)
    .elevate(tooManyPassengers)