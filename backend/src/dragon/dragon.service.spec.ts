import { Test, TestingModule } from '@nestjs/testing';
import { DragonService } from './dragon.service';

//test all the function from the dragon service
describe('DragonService', () => {
  let dragonService: DragonService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DragonService],
    }).compile();
    dragonService = module.get<DragonService>(DragonService);
    await dragonService.reloadDragons();
  });

  it('should be defined', () => {
    expect(dragonService).toBeDefined();
    expect(dragonService.getDragons().length).toBeGreaterThan(0);
  });

  it('should return a list of dragons, and return them in ascending order', () => {
    expect(dragonService.dragonsByHitpoints()).toHaveLength(7);
    const sortedDragonsAscending = dragonService.dragonsByHitpoints('asc');
    //Iterate over all dragons and ensure that the hitpoints are sorted in descending order.
    for (let i = 0; i < sortedDragonsAscending.length - 1; i++) {
      expect(sortedDragonsAscending[i].hitpoints).toBeGreaterThanOrEqual(
        sortedDragonsAscending[i + 1].hitpoints,
      );
    }
  });

  it('should return a list of dragons, and return them in descending order', () => {
    expect(dragonService.dragonsByHitpoints()).toHaveLength(7);
    const sortedDragonsAscending = dragonService.dragonsByHitpoints('desc');
    //Iterate over all dragons and ensure that the hitpoints are sorted in descending order.
    for (let i = 0; i < sortedDragonsAscending.length - 1; i++) {
      expect(sortedDragonsAscending[i].hitpoints).toBeLessThanOrEqual(
        sortedDragonsAscending[i + 1].hitpoints,
      );
    }
  });

  it('should return the total flying speed of all dragons', () => {
    expect(dragonService.totalFlyingSpeed()).toEqual(560);
    //Extract all the flying speeds from the dragons
    const flyingSpeeds = dragonService
      .getDragons()
      .map((dragon) => dragon.speed.fly);
    //Sum up all the flying speeds
    const totalFlyingSpeed = flyingSpeeds.reduce((total, speed) => {
      return total + speed;
    }, 0);
    expect(dragonService.totalFlyingSpeed()).toEqual(totalFlyingSpeed);
  });
  it('should return true if all dragons have the same flight speed', () => {
    expect(dragonService.sameFlightSpeed()).toEqual(true);
    const dragons = dragonService.getDragons();
    //Change the flight speed of the first dragon
    dragons[0].speed.fly = 100;
    expect(dragonService.sameFlightSpeed()).toEqual(false);
  });
  it('should return true if all dragons have the same walk speed', () => {
    expect(dragonService.sameWalkSpeed()).toEqual(false);
    const dragons = dragonService.getDragons();
    //Change the walk speed of the first dragon
    dragons[0].speed.walk = 100;
    expect(dragonService.sameWalkSpeed()).toEqual(false);
  });
  it('should correctly calculate the attack damage of the dragon', () => {
    const dragon = dragonService.dragonsByHitpoints()[0];
    expect(dragonService.attack(dragon).total).toBeGreaterThan(0);

    const originalDragonHitpoints = dragon.hitpoints;
    const attackingDragon = dragonService.getArbitraryDragon([dragon]);
    const attackResponse = dragonService.attack(attackingDragon);
    dragon.hitpoints -= attackResponse.total;
    expect(dragon.hitpoints).toBeLessThan(originalDragonHitpoints);
  });
  it('should return the winner of a battle', () => {
    const dragon1 = dragonService.dragonsByHitpoints()[0];
    const dragon2 = dragonService.dragonsByHitpoints()[1];
    expect(dragonService.battle(dragon1, dragon2)).toBeDefined();

    //Make sure that the dragon with the highest hitpoints wins
    const { winner } = dragonService.battle(dragon1, dragon2);
    if (winner === dragon1) {
      expect(dragon1.hitpoints).toBeGreaterThan(dragon2.hitpoints);
    }
    if (winner === dragon2) {
      expect(dragon2.hitpoints).toBeGreaterThan(dragon1.hitpoints);
    }
  });

  it('should return of log of dice rolls from a battle', () => {
    const dragon1 = dragonService.dragonsByHitpoints()[0];
    const dragon2 = dragonService.dragonsByHitpoints()[1];
    const dragon1InitialHitPoints = dragon1.hitpoints;
    const dragon2InitialHitPoints = dragon2.hitpoints;
    expect(dragonService.battle(dragon1, dragon2)).toBeDefined();
    const { attacks, winner } = dragonService.battle(dragon1, dragon2);
    expect(attacks).toBeDefined();
    const totalDamage = attacks.reduce((totalDamge, attack) => {
      return totalDamge + attack.damage;
    }, 0);
    if (winner === dragon1) {
      expect(dragon2InitialHitPoints).toBeGreaterThanOrEqual(totalDamage);
    }
    if (winner === dragon2) {
      expect(dragon1InitialHitPoints).toBeGreaterThanOrEqual(totalDamage);
    }
  });
});
