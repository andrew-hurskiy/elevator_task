import { Person, Elevator } from '../../elevator_original'
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

		expect(elevator.isTargetFloorValid(12.43)).to.be.false

		expect(elevator.isTargetFloorValid(31)).to.be.false

		for (let i = 32; i < 200; i ++){
			expect(elevator.isTargetFloorValid(i)).to.be.false
		}
		
		
	})






})