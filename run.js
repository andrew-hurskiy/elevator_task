class Elevator {

	INITIAL_FLOOR = 2
	AMOUNT_OF_FLOORS = 30
	MAX_AMOUNT_OF_PASSENGERS = 5
	MAX_TOTAL_WEIGHT = 400 

	currentAmountOfPassengers = 0
	currentWeight = 0
	currentAmountOfPassengers = 0
	floorsPassengers = new Map()
	notifiersMap = new Map()

	elevate(passengers){
		this.registerPassengers(passengers)
		this.deliverPassengers()
		this.resetState()
	}

	registerPassengers(listOfPassengers){
		this.resetFloorsMap()

		while (this.isThereStillPlaceForAnybody()){
				this.register(listOfPassengers.shift())
		}
		console.log(`Passengers are registered, total amount of them: ${this.currentAmountOfPassengers} and total weight: ${this.currentWeight}`)
	}

	deliverPassengers(){

		for (let floorIndex = this.INITIAL_FLOOR; floorIndex <= this.AMOUNT_OF_FLOORS; floorIndex++){
			console.log(`We are passing floor ${floorIndex} floor`)

			if (this.isAnyBodyGoesOut(floorIndex)){
				console.log(`We are stopping at the floor number ${floorIndex}, since there are passengers to go out`)
				this.passengersGoOut(floorIndex)
			}
		}

	}

	resetFloorsMap(){
		for (let floorIndex = this.INITIAL_FLOOR; floorIndex <= this.AMOUNT_OF_FLOORS; floorIndex++){
			this.floorsPassengers.set(floorIndex, new Array())
		}
	}

	isThereStillPlaceForAnybody(){
		return this.currentAmountOfPassengers < this.MAX_AMOUNT_OF_PASSENGERS
	}

	isMaxWeightNoExceeded(potentialPassenger){
		return (this.currentWeight + potentialPassenger.weight) < this.MAX_TOTAL_WEIGHT
	}

	register(passengerToRegister){
		if (this.isMaxWeightNoExceeded(passengerToRegister)){
			this.assignPassengerToFloor(passengerToRegister)
			this.currentAmountOfPassengers++
			this.currentWeight += passengerToRegister.weight
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



	isAnyBodyGoesOut(floor){
		return (Object.keys(this.floorsPassengers.get(floor)).length !== 0)
	}

	passengersGoOut(floor){
		let passengersForThisFloor = this.floorsPassengers.get(floor)
		this.floorsPassengers.delete(floor)

		for (let passenger of passengersForThisFloor){
			this.remindPassengerIfNecessary(passenger)
			passenger.leaveElevator(floor)
		}
	}

	remindPassengerIfNecessary(passenger){
		if (passenger.needReminder){
			console.log(`Reminder for  ${passenger.name} . Please go out`)
		}
	}

	resetState(){
		this.currentAmountOfPassengers = 0
		this.currentWeight = 0
		this.currentAmountOfPassengers = 0
		this.floorsPassengers = new Map()
		this.notifiersMap = new Map()
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
		console.log(`My name: ${this.name}  and weight: ${this.weight} and target floor is ${this.targetFloor} floor.`)
	}

	leaveElevator(currentFloor){
		console.log(`My name is ${this.name} and my weight is ${this.weight} and I am leaving elevator on ${currentFloor}`)
	}
}




// Normal passengers
let ivan = new Person('Ivan', 55, 8, false)
let vika = new Person('Vika', 87, 23, false)
let sveta = new Person('Sveta', 100, 30, false)
let nastya = new Person('Nastya', 77, 23, false)
let vov4ik = new Person('Vov4ik', 55, 6, false)

// Big passengers
let max = new Person('Max', 132, 8, false)
let vlad = new Person('Vlad', 144, 23, false)

// People that need reminders
let petia = new Person('Vasya', 132, 8, true)
let vasya = new Person('Petia', 144, 23, true)



let normalPassengers = [
	ivan, vika, sveta, nastya, vov4ik
]

let bigPassengers = [
	sveta, max, vlad, nastya, ivan
]

let passengersThatNeedReminders = [
	petia, vasya, ivan, max, vlad, sveta	
] 



let elevator = new Elevator()

elevator.elevate(normalPassengers)
