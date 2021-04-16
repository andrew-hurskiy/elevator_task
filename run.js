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
		console.log(`My name is ${this.name} and my weight is ${this.weight} and I am leaving elevator on ${currentFloor}-th floor.`)
	}
}
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

		while (
			this.isThereStillPlaceForAnybody() && 
			this.isThereAnybodyInside(listOfPassengers)
			){
				this.register(listOfPassengers.shift())
		}
		console.log(`Passengers are registered, total amount of them: ${this.currentAmountOfPassengers} and total weight: ${this.currentWeight}.`)
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

	isThereAnybodyInside(passengers){
		return passengers.length !== 0
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

	isMaxWeightNoExceeded(potentialPassenger){
		return (this.currentWeight + potentialPassenger.weight) < this.MAX_TOTAL_WEIGHT
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
			let floorIndex = this.INITIAL_FLOOR;
			floorIndex <= this.AMOUNT_OF_FLOORS;
			floorIndex++)
			{
			if (this.isThereAnyPassengerInElevator()){
				if (this.isAnyBodyGoesOut(floorIndex)){
					console.log(`We are stopping at the floor number ${floorIndex}, since there are passengers to go out.`)
					this.passengersGoOut(floorIndex)
				}
			}else {
				break
			}
			console.log(`We are passing floor ${floorIndex} floor.`)
		}
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


	resetState(){
		this.currentAmountOfPassengers = 0
		this.currentWeight = 0
		this.currentAmountOfPassengers = 0
		this.floorsPassengers = new Map()
		this.notifiersMap = new Map()
	}

}

// Testing

// Normal passengers
let ivan = new Person('Ivan', 55, 8, false)
let vika = new Person('Vika', 87, 21, false)
let sveta = new Person('Sveta', 100, 30, false)
let nastya = new Person('Nastya', 77, 23, false)
let vov4ik = new Person('Vov4ik', 55, 6, false)

// Big passengers
let max = new Person('Max', 132, 15, false)
let vlad = new Person('Vlad', 144, 23, false)
let alex = new Person('Alex', 154, 23, false)

// People that need reminders
let petia = new Person('Petia', 132, 8, true)
let vasya = new Person('Vasya', 144, 8, true)

//Edge floors passengers
let bob = new Person('Bob', 67,2, false)
let tom = new Person('Tom', 76, 2, true)
let jim = new Person('Jim', 56, 29, false)
let july = new Person('July', 65, 30, true)

const normalPassengers = [
	ivan, vika, sveta, nastya, vov4ik
]

const bigPassengers = [
	sveta, max, ivan
]

const passengersThatNeedReminders = [
	petia, vasya, ivan, max, vlad, vika
]

const edgeFloorsPassengers = [
	bob, tom, jim, july
]

let tooManyPassengers = [
	ivan, vika, bob, tom, july, vasya, vlad, vika
]



let elevator = new Elevator()
console.log('>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>')
elevator.elevate(normalPassengers)
console.log('>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>')
elevator.elevate(bigPassengers)
console.log('>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>')
elevator.elevate(passengersThatNeedReminders)
console.log('>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>')
elevator.elevate(edgeFloorsPassengers)
console.log('>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>')
elevator.elevate(tooManyPassengers)
console.log('>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>')