import Elevator from '../../app/elevator.js'
import Person from '../../app/person.js'
let elevator

describe('Testing register passengers method', () => {

	beforeEach('Start with new elevator each time', () => {
		elevator = new Elevator()
	})

	it('Verify that 29 floors are initialized', () => {
		elevator.resetFloorsMap()
		expect(elevator.floorsPassengers).to.have.length(29)
	})

	it('Verify that each floor has empty array initially', () => {
		elevator.resetFloorsMap();
		for (let i = 2; i < 30; i ++){
			expect(elevator.floorsPassengers.get(i)).to.be.an('array').that.is.empty;
		}
	})

	it('Verify method for checking free place works fine', () => {
	
		expect(elevator.isThereStillPlaceForAnybody()).to.be.true

		elevator.currentAmountOfPassengers = 4;
		expect(elevator.isThereStillPlaceForAnybody()).to.be.true

		elevator.currentAmountOfPassengers = -22;
		expect(elevator.isThereStillPlaceForAnybody()).to.be.true

		elevator.currentAmountOfPassengers = 5;
		expect(elevator.isThereStillPlaceForAnybody()).to.be.false

		elevator.currentAmountOfPassengers = 6;
		expect(elevator.isThereStillPlaceForAnybody()).to.be.false

	})

	it('Verify method that checks for potential passengers works fine', () =>{

		let passengers = [1,2,3, 'cat', [1,2,3]]

		expect(elevator.areTherePotentialPassengers(passengers)).to.be.false

		passengers = [1,2,3, new Person(), 'cat', 'dog']
		expect(elevator.areTherePotentialPassengers(passengers)).to.be.true

		passengers = []

		expect(elevator.areTherePotentialPassengers(passengers)).to.be.false

		passengers = [
			new Person(),
			new Person()
		]

		expect(elevator.areTherePotentialPassengers(passengers)).to.be.true

		passengers.unshift()
		expect(elevator.areTherePotentialPassengers(passengers)).to.be.true

	})

	it('Checking max weight function ', () => {
		expect(
			elevator.isMaxWeightNoExceeded(new Person())
			).to.be.true

		expect(
			elevator.isMaxWeightNoExceeded(new Person('Bob', 401, 23, false))
			).to.be.false

		elevator.currentWeight = 330

		expect(
			elevator.isMaxWeightNoExceeded(new Person('Bil', 69.83, 23, false))
			).to.be.true
		expect(
			elevator.isMaxWeightNoExceeded(new Person('Bil', 70, 23, false))
			).to.be.true

		expect(
			elevator.isMaxWeightNoExceeded(new Person('Bil', 70.01, 23, false))
			).to.be.false
		expect(
			elevator.isMaxWeightNoExceeded(new Person('Bil', 71, 23, false))
			).to.be.false
		expect(
			elevator.isMaxWeightNoExceeded(new Person('Bil', 100, 23, false))
			).to.be.false
	})

	it('Checking isTargetFloorValid function ', () => {
		expect(elevator.isTargetFloorValid(-23)).to.be.false
		expect(elevator.isTargetFloorValid(-24.54)).to.be.false
		expect(elevator.isTargetFloorValid(0)).to.be.false
		expect(elevator.isTargetFloorValid(1)).to.be.false
		expect(elevator.isTargetFloorValid(1.5)).to.be.false

		expect(elevator.isTargetFloorValid(2)).to.be.false

		// expect(elevator.isTargetFloorValid(12.43)).to.be.false

		expect(elevator.isTargetFloorValid(31)).to.be.false

		for (let i = 32; i < 200; i ++){
			expect(elevator.isTargetFloorValid(i)).to.be.false
		}
	});



	it('Checking target floor', () => {
		expect(elevator.isTargetFloorNotMysterious(13)).to.be.false
		expect(elevator.isTargetFloorNotMysterious(12)).to.be.true
		expect(elevator.isTargetFloorNotMysterious(3)).to.be.true
		expect(elevator.isTargetFloorNotMysterious(30)).to.be.true
	})


	it('Testing assignPassenger', () => {
		elevator.resetFloorsMap()
		expect(elevator.floorsPassengers.get(23)).to.be.an('array').that.is.empty

		elevator.assignPassengerToFloor(new Person('Tom', 76, 23, false))
		expect(elevator.floorsPassengers.get(23)).to.be.an('array').that.has.length(1)

		//Add few more passengers to the same floor
		elevator.assignPassengerToFloor(new Person('Bob', 76, 23, false))
		elevator.assignPassengerToFloor(new Person('Jane', 76, 23, false))
		elevator.assignPassengerToFloor(new Person('Liza', 76, 23, false))
		expect(elevator.floorsPassengers.get(23)).to.be.an('array').that.has.length(4)

		//Add some passengers to the edge floors
		elevator.assignPassengerToFloor(new Person('Bob', 76, 2, false))
		elevator.assignPassengerToFloor(new Person('Jane', 76, 30, false))
		expect(elevator.floorsPassengers.get(2)).to.be.an('array').that.has.length(1)
		expect(elevator.floorsPassengers.get(30)).to.be.an('array').that.has.length(1)
		expect(elevator.floorsPassengers.get(23)).to.be.an('array').that.has.length(4)

		//And we can remove all of them
		elevator.resetFloorsMap()
		expect(elevator.floorsPassengers.get(23)).to.be.an('array').that.is.empty
		expect(elevator.floorsPassengers.get(2)).to.be.an('array').that.is.empty
		expect(elevator.floorsPassengers.get(30)).to.be.an('array').that.is.empty

})

it('Testing update cuurrent information method', () => {
	//Initial state
	expect(elevator.currentWeight).to.eq(0)
	expect(elevator.currentAmountOfPassengers).to.eq(0)

	elevator.updateCurrentInformation(new Person('Bob', 50, 2, false))

	expect(elevator.currentWeight).to.eq(50)
	expect(elevator.currentAmountOfPassengers).to.eq(1)

	//Add few more things
	elevator.updateCurrentInformation(new Person('Bob', 45, 2, false))
	elevator.updateCurrentInformation(new Person('Bob', 65, 2, false))
	elevator.updateCurrentInformation(new Person('Bob', 39.5, 2, false))

	expect(elevator.currentAmountOfPassengers).to.eq(4)
	expect(elevator.currentWeight).to.eq(199.5)
})

it('Testing update notifiers list', () => {
	expect(elevator.notifiersMap).to.be.an('Map').and.to.be.empty

	//Add person that does not need notifier
	elevator.updateNotifierList(new Person('John', 23, 5, false))
	expect(elevator.notifiersMap).to.be.an('Map').and.to.be.empty

	//Add person that requires notification
	elevator.updateNotifierList(new Person('John', 23, 5, true))
	expect(elevator.notifiersMap).to.be.an('Map').and.not.to.be.empty
	expect(elevator.notifiersMap.get(5)).to.eq('John')

})






})