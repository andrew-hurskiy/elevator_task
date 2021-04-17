// We are going to imitiate working elevator in example below
// Normal scenario is like that: 
// 1) Elevator starts at the first floor and accept passengers. 
// It might be situation that there are more passengers, that elevator can accept
// So it accepts as many as it can, depending on amount or total weight of passengers
// 2) Also elevator should check if max weight is not exceeded. So, there can be situation
// elevator can accept passengers but max weight is already exceeded
// 3) Also there is so special category of passengers, that asking elevator to remind them 
// if they reach their target floor 
// 4) Elevator have to deliver passenger(s) to their desired floors 
// 5) Elevator should remind passengers that they should leave, in case passengers request such reminder
// 6) Elevator should stop elevating if there are no more passengers inside
function getRandomFloor() {
    const MAX_FLOOR = 30
    const MIN_FLOOR = 2
    return Math.floor(Math.random() * (MAX_FLOOR - MIN_FLOOR + 1)) + MIN_FLOOR;
}

function getRandomWeight(){
    const MIN_NORMAL_WEIGHT = 45
    const MAX_NORMAL_WEIGHT = 100
    return Math.floor(Math.random() * (MAX_NORMAL_WEIGHT - MIN_NORMAL_WEIGHT + 1)) + MIN_NORMAL_WEIGHT;
}

class Person {
    
    constructor(
        name='John',
        weight=getRandomWeight(),
        targetFloor=getRandomFloor(),
        needReminder=false
    ) {
        this.name = name
        this.weight = weight
        this.targetFloor = targetFloor
        this.needReminder = needReminder
    }

    enterElevator(){
        console.log(`My name: ${this.name}  and weight: ${this.weight} and target floor is ${this.targetFloor} floor.`)
    }

    leaveElevator(currentFloor){
        console.log(`My name is ${this.name} and my weight is ${this.weight} and I am leaving elevator on ${currentFloor}-th floor.`)
    }
}
class Elevator {

    constructor(){
        this.INITIAL_FLOOR = 2
        this.AMOUNT_OF_FLOORS = 30
        this.MAX_AMOUNT_OF_PASSENGERS = 5
        this.MAX_TOTAL_WEIGHT = 400
        this.MYSTERIOUS_FLOOR = 13
	
        this.currentAmountOfPassengers = 0
        this.currentWeight = 0
	
        this.floorsPassengers = new Map()
        this.notifiersMap = new Map()
    }

    elevate(passengers){
        this.registerPassengers(passengers)
        this.deliverPassengers()
        this.resetElevatorState()
    }


    registerPassengers(listOfPassengers){
        this.resetFloorsMap()

        console.log('***Passengers onboarding process has started***')

        while (
            this.isThereStillPlaceForAnybody()&& 
			this.areTherePotentialPassengers(listOfPassengers)
        ){
            this.register(listOfPassengers.shift())
        }
        console.log(`***Passengers onboarding is finished, total amount of them: ${this.currentAmountOfPassengers} and total weight: ${this.currentWeight}.***`)
    }

    resetFloorsMap(){
        for (
            let floorIndex = this.INITIAL_FLOOR;
            floorIndex <= this.AMOUNT_OF_FLOORS;
            floorIndex++)
        {
            this.floorsPassengers.set(floorIndex, new Array())
        }
    }

    isThereStillPlaceForAnybody(){
        return this.currentAmountOfPassengers < this.MAX_AMOUNT_OF_PASSENGERS
    }

    areTherePotentialPassengers(potentialPassengers){
        return potentialPassengers.length !== 0
    }

    register(passengerToRegister){
        if (this.isMaxWeightNoExceeded(passengerToRegister)){
            if (this.isTargetFloorIsValid(passengerToRegister)){
                if (this.isTargetFloorIsNotMysterious(passengerToRegister)){
                    this.assignPassengerToFloor(passengerToRegister)
                    this.currentAmountOfPassengers++
                    this.currentWeight += passengerToRegister.weight
                    if (passengerToRegister.needReminder === true){
                        console.log(`We are adding you ${passengerToRegister.name} to our reminder list`)
                        this.addPassengerToNotifierList(passengerToRegister)
                    }
                }else {
                    console.log(`Sorry, ${passengerToRegister.name}, but we are not stopping at floor ${passengerToRegister.targetFloor}, because it is haunted by demons and ghosts...., so we cannot accept you onboard.`)
                }
            }else {
                console.log(`Sorry, ${passengerToRegister.name}, but we are not stopping at floor ${passengerToRegister.targetFloor}, so we cannot accept you as passenger`)
            }
        }else {
            console.log(`Sorry but max weight ${this.MAX_TOTAL_WEIGHT} is already exceeded, so we cannot accept you`)
        }
    }

    isMaxWeightNoExceeded(potentialPassenger){
        return (this.currentWeight + potentialPassenger.weight) < this.MAX_TOTAL_WEIGHT
    }

    isTargetFloorIsValid(potentialPassenger){
        return (potentialPassenger.targetFloor >= this.INITIAL_FLOOR
                 && potentialPassenger.targetFloor <= this.AMOUNT_OF_FLOORS)
    }

    isTargetFloorIsNotMysterious(potentialPassenger){
        return (potentialPassenger.targetFloor !== this.MYSTERIOUS_FLOOR)
    }

    assignPassengerToFloor(passengerToAdd){
        this.floorsPassengers
            .get(passengerToAdd.targetFloor)
            .push(passengerToAdd)
    }

    addPassengerToNotifierList(passengerThatNeedNotification){
        this.notifiersMap.set(
            passengerThatNeedNotification.targetFloor,
            passengerThatNeedNotification.name)
    }


    deliverPassengers(){
        console.log('***Passengers delivery process has started***')

        for (
            let floorIndex = this.INITIAL_FLOOR;
            floorIndex <= this.AMOUNT_OF_FLOORS;
            floorIndex++)
        {
            if (floorIndex === this.MYSTERIOUS_FLOOR){
                continue
            }
            if (this.isThereAnyPassengerInElevator()){
                console.log(`We are passing floor ${floorIndex} floor.`)
                if (this.isAnyBodyGoesOut(floorIndex)){
                    console.log(`We are stopping at the floor number ${floorIndex}, since there are passengers to go out.`)
                    this.passengersGoOut(floorIndex)
                }
            }else {
                break
            }
        }

        console.log('***Passengers delivery process has finished***')
    }

    isThereAnyPassengerInElevator(){
        return (this.currentAmountOfPassengers > 0)
    }
    isAnyBodyGoesOut(floor){
        return (Object.keys(this.floorsPassengers.get(floor)).length !== 0)
    }

    passengersGoOut(floor){
        let passengersForThisFloor = this.floorsPassengers.get(floor)
        this.floorsPassengers.delete(floor)

        this.currentAmountOfPassengers = this.currentAmountOfPassengers - passengersForThisFloor.length
		
        for (let passenger of passengersForThisFloor){
            this.remindPassengerIfNecessary(passenger)
            passenger.leaveElevator(floor)
        }
    }

    remindPassengerIfNecessary(passenger){
        if (passenger.needReminder){
            console.log(`Reminder for  ${passenger.name}. Please leave.`)
        }
    }


    resetElevatorState(){
        console.log('***Reset elvator state start***')
        this.currentAmountOfPassengers = 0
        this.currentWeight = 0
        this.currentAmountOfPassengers = 0
        this.floorsPassengers = new Map()
        this.notifiersMap = new Map()
        console.log('***Reset elvator state end***')
    }

}

// Testing

let normalPassengers = [
    new Person(),
    new Person(),
    new Person(),
    new Person(),
    new Person()
]

let bigPassengers = [
    new Person('Tom', 150, 15, false),
    new Person('Jim', 150, 29, false),
    new Person('Linda', 132, 2, false)
]

let passengersThatNeedReminders = [
    new Person('Petia', 80, 2, true),
    new Person('Vasya', 79, 8, true),
    new Person('John', 76, 23, true),
    new Person('Carter', 76, 25, true),
    new Person('Daniel', 76, 27, true)
]

let edgeFloorsPassengers = [
    new Person('Petia', 60, 1, true),
    new Person('Vasya', 60, 2, true),
    new Person('John', 60, 30, true),
    new Person('Carter', 60, 13, true),
    new Person('Daniel', 60, 31, true)
]

let tooManyPassengers = [
    new Person(),
    new Person(),
    new Person(),
    new Person(),
    new Person(),
    new Person(),
    new Person(),
    new Person(),
    new Person(),
    new Person(),
    new Person(),
]

let elevator = new Elevator()


// elevator.elevate(lowFloorsPassengers)


console.log('>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>')
elevator.elevate(normalPassengers)
console.log('>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>')
elevator.elevate(bigPassengers)
console.log('>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>')
// elevator.elevate(passengersThatNeedReminders)
// console.log('>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>')
// elevator.elevate(edgeFloorsPassengers)
// console.log('>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>')
elevator.elevate(edgeFloorsPassengers)
// console.log('>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>')