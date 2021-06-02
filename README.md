 ### Elevator

 # You have to program Elevator with javascript
 1. You have to  simulate behaviour of 'typical' elevator.
 2. You will need to use all concepts, you have learned before
 * Variables
 * Conditions
 * Loops
 * Arrays and even Map
 * Objects and classes
 3. Your app should consist of few files(classes) (so you will have to use imports and exports)
 * Elevator class should handle all the logic (accept passengers, deliver them to floors)
 * Person class should be responsible for providing information for Elevator
 * Elevator should be started from other file
 4. Your app should be transparent
  * Use console.log('some message') in order to make print what elevator is doing (onboard passenger, stop at certain floor...)
 * It should be clear from 'logs' what is going on
 5. You should start code with nodejs
 6. Execution result should look similiar to `expected_result.txt`


# Requirements
1. Elevator(Object) starts at first(1) floor.
  * In total there are 30 floors
  * Elevator does not stop at 2 floor
  * And elevator does not stop at 13 floor
2. There are people waiting in the hall for elevator (Array of Persons)
  * It might be situation, when there are no people(empty array)
  * Also there are can be many people(Array of 20 objects)
3. Person object should include following fields
  * name = String (So Elevator can 'inform us' which person is going out at which stage)
  * weight = float number  ( So Elevator can check if max weight is not exceeded)
  * targetFloor = integer number - so elevator can accept or deny person (2, 13 floors) or inform person to go out.
  * needsReminder = boolean = if set to true, elevator will remind passenger to leave on floor (Remind is simly console.log() statement for that person at correct floor)
4. Elevator can accept passengers following those rules
  * Max 400 kg in total
  * Max 5 persons
  * Elevator does not accept persons traveling to 2 floor
  * Elevator does not accept persons traveling to 13 floor
5. Our elevator is 'smart' and it can remind passenger to leave elevator on target floor, if passenger needs reminder only

# Tasks
1. Write code for elevator, based on requirements
2. Fix existed code, to make elevator work (even harder)
