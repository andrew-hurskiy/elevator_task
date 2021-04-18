// Those functions will be just used for Person class, 
// Person will represent elevator passenger
function getRandomFloor() {
    const MAX_FLOOR = 30
    const MIN_FLOOR = 2
    return Math.floor(Math.random() * (MAX_FLOOR - MIN_FLOOR + 1)) + MIN_FLOOR
}

function getRandomWeight(){
    const MIN_NORMAL_WEIGHT = 45
    const MAX_NORMAL_WEIGHT = 100
    return Math.floor(Math.random() * (MAX_NORMAL_WEIGHT - MIN_NORMAL_WEIGHT + 1)) + MIN_NORMAL_WEIGHT
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

// Starting from here, you will have to fill gaps
class Elevator {

    constructor(){
        this.INITIAL_FLOOR = // What number should be here?
        this.AMOUNT_OF_FLOORS = // And here?
        this.MAX_AMOUNT_OF_PASSENGERS = 5
        this.MAX_TOTAL_WEIGHT = 400
        this.MYSTERIOUS_FLOOR = 13
	
        this.currentAmountOfPassengers = 0
        this.currentWeight = 0
	
        this.floorsPassengers = // What datastructure are we going to use here?
        this.notifiersMap = new Map()
    }

    elevate(passengers){
        this.registerPassengers(passengers)
        this.deliverPassengers()
        // some method is missing here
    }


    registerPassengers(listOfPassengers){
        this.resetFloorsMap()

        console.log('***Passengers onboarding process has started***')

        while (
            this.isThereStillPlaceForAnybody() && 
			// One more condition  should be added here. Which one?
        ){
            this.register(listOfPassengers.xxxxxx())// Instead of xxxxx() should be some valid array method
        }
        console.log(`***Passengers onboarding is finished, total amount of them: ${this.currentAmountOfPassengers} and total weight: ${this.currentWeight}.***`)
    }

    resetFloorsMap(){
        for (
            let floorIndex = this.INITIAL_FLOOR;
            floorIndex <= ???; // What should be here instead of ???
            floorIndex++)
        {
            this.floorsPassengers.set(floorIndex, new Array())
        }
    }

    isThereStillPlaceForAnybody(){
        return ( this.??? < this.MAX_AMOUNT_OF_PASSENGERS ) // What should be here instead of ???
    }

    areTherePotentialPassengers(potentialPassengers){
        return ( potentialPassengers.length !== 0 )
    }

    register(passengerToRegister){
        if (this.isMaxWeightNoExceeded(passengerToRegister)){
            if (this.isTargetFloorValid(passengerToRegister)){
                if (this.isTargetFloorNotMysterious(passengerToRegister)
                ){
                    this.assignPassengerToFloor(passengerToRegister)
                    this.xxxx(passengerToRegister) // What method should be here instead of xxxx ?
                    this.updateNotifierList(passengerToRegister)
                }else {
                    this.notifyPassengerAboutMysteryFloor(passengerToRegister)
                }
            }else {
                this.notifyPassengerAboutWrongFloor(passengerToRegister);
            }
        }else {
            this.notifyPassengersAboutExceededWeight();
        }
    }

    isMaxWeightNoExceeded(potentialPassenger){
        return (this.currentWeight + ??? ) <= this.MAX_TOTAL_WEIGHT /// what should be here instead of ???
    }

    isTargetFloorValid(potentialPassenger){
        return (potentialPassenger.targetFloor >= this.INITIAL_FLOOR
                 && potentialPassenger.targetFloor <= this.AMOUNT_OF_FLOORS)
    }

    isTargetFloorNotMysterious(XXXX){ /// What should be passed to this method instead of XXXX?
        return (potentialPassenger.targetFloor !== this.MYSTERIOUS_FLOOR)
    }

    assignPassengerToFloor(passengerToAdd){
        this.floorsPassengers
            .get(passengerToAdd.targetFloor)
            .xxx(passengerToAdd) // What action should be done upon passenger instead of xxx?
    }

    updateCurrentInformation(passengerToRegister){
        this.currentAmountOfPassengers++
        this.currentWeight += passengerToRegister.weight
    }

    updateNotifierList(passengerToRegister){
        if (passengerToRegister.needReminder === false){// Is this condition correct or should it be changed?
            console.log(`We are adding you ${passengerToRegister.name} to our reminder list`)
            this.addPassengerToNotifierList(passengerToRegister)
        }
    }

    addPassengerToNotifierList(passengerThatNeedNotification){
        this.notifiersMap.set(
            passengerThatNeedNotification.xxxx, // What should be here instead of xxxx?
            passengerThatNeedNotification.name)
    }

    notifyPassengerAboutMysteryFloor(passengerToRegister){
        console.log(`Sorry, ${passengerToRegister.name}, but we are not stopping at floor ${passengerToRegister.targetFlor}, because it is haunted by demons and ghosts...., so we cannot accept you onboard.`)
    }// Is it everything okay with this function?

    notifyPassengerAboutWrongFloor(passengerToRegister){
        console.log(`Sorry, ${passengerToRegister.name}, but we are not stopping at floor ${passengerToRegister.targetFloor}, so we cannot accept you as passenger`)
    }

    notifyPassengersAboutExceededWeight(){
        console.log(`Sorry but max weight ${this.MAX_TOTAL_WEIGHT} is already exceeded, so we cannot accept you`)
    }

    deliverPassengers(){
        console.log('***Passengers delivery process has started***')

        for (
            let floorIndex = this.INITIAL_FLOOR;
            floorIndex <= this.AMOUNT_OF_FLOORS;
            floorIndex++)
        {
            if (floorIndex === this.MYSTERIOUS_FLOOR){
                // What shall we do if we reach MYSTERIOUS 13 floor ? ;)
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
        return (this.currentAmountOfPassengers >= 0) // Is this condition okay or should it be changed ? 
    }
    isAnyBodyGoesOut(floor){
        return (Object.keys(this.floorsPassengers.get(floorIndex)).length !== 0) // It looks somebody make typo within this method . Can you spot it?
    }

    passengersGoOut(floor){
        let passengersForThisFloor = this.floorsPassengers.get(floor)
        this.floorsPassengers.delete(floor)

        this.currentAmountOfPassengers = this.currentAmountOfPassengers - passengersForThisFloor.xxxx // What property should be instead of xxxx?
		
        for (let passenger of passengersForThisFloor){
            this.remindPassengerIfNecessary(passenger)
            passenger.leaveElevator(floor)
        }
    }

    remindPassengerIfNecessary(passenger){
        if (passenger.needReminder !== true){ // Does this condition seems okay to you ?
            console.log(`Reminder for  ${passenger.name}. Please leave.`)
        }
    }


    reset(){
        console.log('***Reset elvator state start***') // There are 2 mistakes within this method, can you spot them?
        this.currentAmountOfPassengers = 5
        this.currentWeight = 300
        this.currentAmountOfPassengers = 0
        this.floorsPassengers = // some data structure is missing
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
    new Person('Linda', 150, 2, false)
]

let passengersThatNeedReminders = [
    new Person('Petia', 80, 2, true),
    new Person('Vasya', 79, 8, true),
    new Person('John', 76, 23, true),
    new Person('Carter', 76, 25, true),
    new Person('Daniel', 76, 27, true)
]

let edgeFloorsPassengers = [
    new Person('Petia', 60, 1, false),
    new Person('Vasya', 60, 2, true),
    new Person('John', 60, 30, false),
    new Person('Carter', 60, 13, true),
    new Person('Daniel', 60, 31, false)
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

elevator.elevate(normalPassengers)
console.log(`>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>\n\n\n`)
elevator.elevate(bigPassengers)
console.log(`>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>\n\n\n`)
elevator.elevate(passengersThatNeedReminders)
console.log(`>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>\n\n\n`)
elevator.elevate(edgeFloorsPassengers)
console.log(`>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>\n\n\n`)
elevator.elevate(tooManyPassengers)