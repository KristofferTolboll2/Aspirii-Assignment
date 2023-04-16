import { HttpException, Injectable, OnModuleInit } from '@nestjs/common';
import { Dragon } from './dragon.entity';
import * as fs from 'fs/promises';
import { join } from 'path';

@Injectable()
export class DragonService {
  private dragons: Dragon[];

  constructor() {
    //Load in the json file
    this.reloadDragons();
  }

  async reloadDragons() {
    //Load in the json file
    const dragons = await fs.readFile(
      join(__dirname, './data/dragon-data.json'),
      'utf8',
    );
    this.dragons = JSON.parse(dragons);
  }

  /**
   *
   * @returns a list of dragons from the json file
   */
  getDragons() {
    return this.dragons;
  }
  /**
   *
   * @param order asc or desc
   * @returns a list of dragons, and return them in ascending or descending order
   */

  dragonsByHitpoints(order: 'asc' | 'desc' = 'desc') {
    return order === 'asc'
      ? this.dragons.sort((a, b) => b.hitpoints - a.hitpoints)
      : this.dragons.sort((a, b) => a.hitpoints - b.hitpoints);
  }

  /**
   * HTTP service method
   * @param hitPointsOrder
   * @param limit
   * @returns
   */
  fetchDragons(
    hitPointsOrder?: 'asc' | 'desc',
    limit?: number,
    withoutSpeed = true,
  ) {
    let dragons: Dragon[] | Omit<Dragon, 'speed'>[] = [];
    if (hitPointsOrder) {
      dragons = limit
        ? this.dragonsByHitpoints(hitPointsOrder).slice(0, limit)
        : this.dragonsByHitpoints(hitPointsOrder);
    }
    dragons = limit ? this.dragons.slice(0, limit) : this.dragons;
    if (withoutSpeed) {
      dragons = dragons.map((dragon) => {
        const { speed, ...rest } = dragon;
        return rest;
      });
    }
    return dragons;
  }

  /**
   * HTTP service method
   * @param dragon1Name
   * @param dragon2Name
   * @returns
   */
  battleDragons(dragon1Name: string, dragon2Name: string) {
    const dragon1 = this.dragons.find((dragon) => dragon.name === dragon1Name);
    const dragon2 = this.dragons.find((dragon) => dragon.name === dragon2Name);
    if (!dragon1 || !dragon2) {
      throw new HttpException('Invalid dragon name', 400);
    }
    return this.battle(dragon1, dragon2);
  }

  attackDragon(dragonName: string, withDice = false) {
    const dragon = this.dragons.find((dragon) => dragon.name === dragonName);
    if (!dragon) {
      throw new HttpException('Invalid dragon name', 400);
    }
    return this.attack(dragon, withDice);
  }

  /**
   *
   * @returns the total flying speed of all dragons
   */
  totalFlyingSpeed() {
    return this.dragons.reduce((total, dragon) => {
      return total + dragon.speed.fly;
    }, 0);
  }

  /**
   *
   * @returns true if all dragons have the same flight speed
   */
  sameFlightSpeed() {
    return this.dragons.every(
      (dragon) => dragon.speed.fly === this.dragons[0].speed.fly,
    );
  }
  /**
   *
   * @returns true if all dragons have the same walk speed
   */

  sameWalkSpeed() {
    return this.dragons.every(
      (dragon) => dragon.speed.walk === this.dragons[0].speed.walk,
    );
  }

  getArbitraryDragon(excludeDragons?: Dragon[]) {
    const dragons = excludeDragons
      ? this.dragons.filter((dragon) => !excludeDragons.includes(dragon))
      : this.dragons;
    return dragons[Math.floor(Math.random() * dragons.length)];
  }

  /**
   *
   * @param dragon the dragon to attack
   * @returns
   */
  attack(dragon: Dragon, withDice = false) {
    const [dice, modifier] = dragon.attack.split('+');
    const [amount, sides] = dice.split('d');
    let diceRollTotal = 0;
    const diceRolls: number[] = [];
    for (let i = 0; i < parseInt(amount); i++) {
      const diceRoll = Math.floor(Math.random() * parseInt(sides)) + 1;
      diceRolls.push(diceRoll);
      diceRollTotal += diceRoll;
    }
    return {
      diceRolls: diceRollTotal,
      modifier: parseInt(modifier),
      total: diceRollTotal + parseInt(modifier) || 0,
    };
  }

  /**
   *
   * @param dragon1 the dragon to attack
   * @param dragon2 the dragon to attack
   * @returns the winning dragon of the battle
   */
  battle(dragon1: Dragon, dragon2: Dragon) {
    const attacks = [];

    while (dragon1.hitpoints > 0 && dragon2.hitpoints > 0) {
      const diceResponse = this.attack(dragon2, true);
      dragon1.hitpoints -= diceResponse.total;
      attacks.push(diceResponse);

      const secondDiceResponse = this.attack(dragon1);
      dragon2.hitpoints -= secondDiceResponse.total;
      attacks.push(secondDiceResponse);
    }
    const winner = dragon1.hitpoints > 0 ? dragon1 : dragon2;
    return { winner, attacks };
  }
}
