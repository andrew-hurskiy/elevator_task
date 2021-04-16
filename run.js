class Elevator {

	FIRST_FLOOR_TO_STOP = 2
	AMOUNT_OF_FLOORS = 30
	MAX_AMOUNT_OF_PASSENGERS = 5
	MAX_TOTAL_WEIGHT = 400 

	currentAmountOfPassengers = 0
	currentWeight = 0
	currentAmountOfPassengers = 0
	floorsPassengers = new Map()
	notifiersMap = new Map()

	registerPassengers(listOfPassengers){
		this.resetFloorsMap()

		while (this.isThereStillPlaceForAnybody()){
			this.register(listOfPassengers.shift())
		}
	}

	resetFloorsMap(){
		for (let floorIndex = this.FIRST_FLOOR_TO_STOP;
			floorIndex <= this.AMOUNT_OF_FLOORS;
			floorIndex++
			){
			this.floorsPassengers.set(floorIndex, new Array())
		}
	}

	isThereStillPlaceForAnybody(){
		let isFreeSpace = this.currentAmountOfPassengers < this.MAX_AMOUNT_OF_PASSENGERS
		return isFreeSpace
	}

	isMaxWeightNoExceeded(potentialPassenger){
		let isWeightNotExceeded = ((this.currentWeight + potentialPassenger.weight) < this.MAX_TOTAL_WEIGHT)
		return isWeightNotExceeded
	}

	register(passengerToRegister){
		if (this.isMaxWeightNoExceeded(passengerToRegister)){
			this.assignPassengerToFloor(passengerToRegister)
			this.currentAmountOfPassengers++
			if (passengerToRegister.needReminder === true){
				this.addPassengerToNotifierList(passengerToRegister)
			}
		}
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
		for (
			let floorIndex = this.FIRST_FLOOR_TO_STOP;
			floorIndex <= this.AMOUNT_OF_FLOORS;
			floorIndex++
			){
			console.log(`We are passing floor ${floorIndex}`)

			if (this.isAnyBodyGoesOut(floorIndex)){
				console.log(`We are stoppoing at the floor ${floorIndex}, since there are passenger(s) to get out`)
				this.passengersGoOut(floorIndex)
			}
		}

	}

	isAnyBodyGoesOut(floor){
		return (Object.keys(this.floorsPassengers.get(floor)).length !== 0)
	}

	passengersGoOut(currentFloor){
		let passengersForThisFloor = this.floorsPassengers.get(currentFloor)
		this.floorsPassengers.delete(currentFloor)

		for (let passenger of passengersForThisFloor){
			this.remindPassengerIfNecessary(passenger)
			passenger.leaveElevator(currentFloor)
		}
	}

	remindPassengerIfNecessary(passenger){
		if (passenger.needReminder){
			console.log(`Reminder for: ${passenger.name}. Plese leave elevator`)
		}
	}

	resetState(){

	}

}

class Person {
	name
	weight
	targetFloor
	needReminder

	constructor(
		name='John',
		weight=75,
		targetFloor=15,
		needReminder=false
		) {
		this.name = name
		this.weight = weight
		this.targetFloor = targetFloor
		this.needReminder = needReminder
	}

	enterElevator(){
		console.log(`My name: ${this.name} and weight: ${this.weight} and target floor is ${this.targetFloor} floor.`)
	}

	leaveElevator(currentFloor){
		console.log(`My name is ${this.name} and my weight is ${this.weight} and I am leaving elevator on ${currentFloor} floor`)
	}
}





let ivan = new Person('Ivan', 55, 8, true)
let vika = new Person('Vika', 87, 23, false)
let sveta = new Person('Sveta', 100, 30, false)
let nastya = new Person('Nastya', 77, 23, false)
let vov4ik = new Person('Vov4ik', 55, 6, false)

let passengers = [
ivan, vika, sveta, nastya, vov4ik
]

let elevator = new Elevator()
elevator.registerPassengers(passengers)
elevator.deliverPassengers()