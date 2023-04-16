import dragons from './dragon-data.json' assert { type: 'json' };

type Dragon = {
  name: string;
  hitpoints: number;
  speed: {
    walk?: number;
    fly?: number;
    swim?: number;
    burrow?: number;
    climb?: number;
  };
  strength: number;
  dexterity: number;
  constitution: number;
  intelligence: number;
  wisdom: number;
  charisma: number;
  xp: number;
  attack: string;
};

const [
  adultBlackDragon,
  adultBlueDragon,
  adultBrassDragon,
  adultBronzeDragon,
  adultCopperDragon,
  adultGoldDragon,
  adultGreenDragon,
] = dragons;

/********************************************************
Task 1:
Sort the dragons by their hitpoints to get a picture of who the strongest dragon is
********************************************************/
console.log('------------------ Task 1 ------------------');
// console.log( Print sorted dragons );

/********************************************************
 Task 2:
 What is the combined flying speed of all the dragons?
********************************************************/
console.log('------------------ Task 2 ------------------');
// const totalSpeed = ;
// console.log(`The combined flying speed of the dragons is ${totalSpeed}`);

/********************************************************
 Task 3:
 Create a snippet that tells us if every dragon has the same flight speed and also if they have the same walk speed.
********************************************************/
console.log('------------------ Task 3 ------------------');
// const sameFlight =
// const sameWalk =

// console.log(`Same flight speed: ${sameFlight ? 'yes' : 'no'}`);
// console.log(`Same walk speed: ${sameWalk ? 'yes' : 'no'}`);

/********************************************************
 Task 4:
 Create a function called `attack` to calculate and return the attack damage of a dragon.
 
 Example:
 Adult Black Dragon deals 2d10+6 damage.
 This means that you roll 2x 10-sided dice (1-10), and adds 6 as a modifier.
 For instance, dice 1 rolled as a 3, dice 2 rolled as a 7, so the damage will be 3+7 for the dice, and +6 for the modifier = 16.
 ********************************************************/
console.log('------------------ Task 4 ------------------');
// const attack = (dragon: Dragon): number => {};
// console.log(`The ${adultBlueDragon.name} deals ${attack(adultBlueDragon)} points of damage`);

/********************************************************
 Task 5:
 Create a function called `battle` that allows you to match 2 dragons against eachother, in a battle to the death!
 Using the `attack` function, simulate attacks from each dragon that subtracts the dragons hitpoints. 
 The battle is over once one or the other dragon reaches 0 hitpoints.
 Return the winning dragon
 ********************************************************/
console.log('------------------ Task 5 ------------------');
// const battle = (dragon1: Dragon, dragon2: Dragon): Dragon => {};
// const dragon1 = adultBrassDragon;
// const dragon2 = adultCopperDragon;
// const winner = battle(dragon1, dragon2);
// console.log(`In a battle between a ${dragon1.name} and a ${dragon2.name}, the winner is ${winner.name}`);
