const whichPokemon = document.querySelectorAll('.options');
const choose = document.querySelector('#choose-div');
const rival = document.querySelector('#rival-div');
const myPokemon = document.querySelector('.your-pokemon');
const enemyPokemon = document.querySelector('.enemy-pokemon');
const whatAttack = document.querySelector('#moves');
const prompt = document.querySelector('.dialogue-box');
const pathOptions = document.querySelector('#next-battle');
const wildBattle = document.querySelector('#wild-pokemon-battle');
const bugBattle = document.querySelector('#bug-catcher-battle');

var chosenPokemon;
var rivalPokemon;

var trainerBattle = false;
var xp = 0;

class Move{
  constructor(name, power, accuracy, type){
    this.name = name;
    this.power = power;
    this.accuracy = accuracy;
    this.type = type;
  }
}

class Pokemon{
  constructor(name, hp, atk, def, spd, lvl, type, [...evolveLVLs], [...evolutionForms], [...learnLVLs], [...newMoves], ...moveset){
    this.name = name;
    this.hp = hp;
    this.maxHP = hp;
    this.atk = atk;
    this.maxAtk = atk;
    this.def = def;
    this.maxDef = def;
    this.spd = spd;
    this.maxSpd = spd;
    this.lvl = lvl;
    this.evolveLVLs = [...evolveLVLs];
    this.forms = [...evolutionForms];
    this.learnLVLs = [...learnLVLs];
    this.newMoves = [...newMoves];
    this.type = type;
    this.changeHPGauge = function(){
      return Math.round((this.hp/this.maxHP)*100);
    }
    this.evolve = function(){
      this.evolveLVLs.forEach(lvl => {
        if(this.lvl === lvl){
          if(this.name == this.forms[this.evolveLVLs.indexOf(lvl)]){ return; }
          prompt.innerHTML += `${this.name} evolved to ${this.forms[this.evolveLVLs.indexOf(lvl)]}!<br>`
          this.name = this.forms[this.evolveLVLs.indexOf(lvl)];
        }
      })
    };
    this.learn = function(){
      this.learnLVLs.forEach(lvl => {
        if(this.lvl === lvl){
          if(this.moveset.indexOf(this.newMoves[this.learnLVLs.indexOf(lvl)])>=0){ return; }
          if(this.moveset.length >= 4){
            this.moveset.shift();
            this.moveset.push(this.newMoves[this.learnLVLs.indexOf(lvl)]);
          }else{
            this.moveset.push(this.newMoves[this.learnLVLs.indexOf(lvl)]);
          }
        }
      })
    };
    this.moveset = [...moveset]
  }
}


const scratch = new Move('Scratch', 40, 100, 'normal');
const tackle = new Move('Tackle', 40, 95, 'normal');
const growl = new Move('Growl', 'atk', 100, 'normal');
const tailWhip = new Move('Tail Whip', 'def', 100, 'normal');
const stringShot = new Move('String Shot', 'spd', 95, 'normal');
const gust = new Move('Gust', 40, 100, 'flying');
const twineedle = new Move('Twineedle', 50, 100, 'bug');
const bugBite = new Move('Bug Bite', 60, 100, 'bug');
const magnitude = new Move('Magnitude', magnitudeIntensity(), 100, 'rock');
function magnitudeIntensity(){
  let rand = Math.round(Math.random()*9)+1;
  switch(true){
    case (rand>0 && rand<=5):
      return 10;
    case (rand>5 && rand<=15):
      return 30;
    case (rand>15 && rand<=35):
      return 50;
    case (rand>35 && rand<=65):
      return 70;
    case (rand>65 && rand<=85):
      return 90;
    case (rand>85 && rand<=95):
      return 110;
    case (rand>95):
      return 150;
  }
}
const rockThrow = new Move('Rock Throw', 50, 90, 'rock');
const rockTomb = new Move('Rock Tomb', 50, 80, 'rock');
const ember = new Move('Ember', 40, 100, 'fire');
const fireFang = new Move('Fire Fang', 65, 95, 'fire');
const flameThrower = new Move('Flamethrower', 95, 100, 'fire');
const vineWhip = new Move('Vine Whip', 35, 100, 'grass');
const razorLeaf = new Move('Razor Leaf', 55, 95, 'grass');
const seedBomb = new Move('Seed Bomb', 80, 100, 'grass');
const bubble = new Move('Bubble', 20, 100, 'water');
const quickAttack = new Move('Quick Attack', 40, 100, 'normal');
const bite = new Move('Bite', 60, 100, 'normal');
const wingAttack = new Move('Wing Attack', 60, 100, 'flying');
const cut = new Move('Cut', 50, 90, 'normal');
const waterGun = new Move('Water Gun', 40, 100, 'water');
const waterPulse = new Move('Water Pulse', 60, 100, 'water');



const charmander = new Pokemon('Charmander', 20,11,10,13, 5, 'fire', [16,36], ['Charmeleon','Charizard'], [7, 20, 32], [ember, fireFang, flameThrower], scratch, growl);
const bulbasaur = new Pokemon('Bulbasaur', 21,11,11,12, 5, 'grass', [16,36], ['Ivysaur','Venusaur'], [7, 19, 37], [vineWhip, razorLeaf, seedBomb], tackle, growl);
const squirtle = new Pokemon('Squirtle', 20,11,13,11, 5, 'water', [16,36], ['Wartortle','Blastoise'], [7, 16, 25], [waterGun, bite, waterPulse], tackle, tailWhip);
const geodude = new Pokemon('Geodude', 39,31,37,17, 14, 'rock', [], [], [], [], tackle, rockTomb, magnitude);
const onix = new Pokemon('Onix', 44,25,64,20, 17, 'rock', [], [], [], [], magnitude, rockThrow, rockTomb);

whichPokemon.forEach(pokemon => {
  pokemon.addEventListener('click', (e) => {
    choose.style.display = 'none';
    rival.style.display = 'grid';
    trainerBattle = true;
    switch (e.target.id){
      case 'charmander':
        chosenPokemon = charmander;
        rivalPokemon = squirtle;
        break;
      case 'squirtle':
        chosenPokemon = squirtle;
        rivalPokemon = bulbasaur;
        break;
      case 'bulbasaur':
        chosenPokemon = bulbasaur;
        rivalPokemon = charmander;
        break;
    }
    updateStatus(chosenPokemon, rivalPokemon);
    addMoveset(chosenPokemon);
  })
});

function addMoveset(pokemon){
  whatAttack.innerHTML = ``;
  pokemon.moveset.forEach(atk => {
    whatAttack.innerHTML += `<div class="attacks">${atk.name}</div>`;
  });
}

function attackMove(pokemon, foe, move){ 
  prompt.innerHTML += `${pokemon.name} used ${move.name}<br>`;
  if(Math.round(Math.random()*99)+1 > move.accuracy){
    return prompt.innerHTML += `${pokemon.name}'s attack missed' <br>`
  }
  if(typeof move.power == 'number'){
    let rng = (Math.random()*(0.15)+0.85).toFixed(2);
    let crit = 1;
    if((Math.random()*(99)+1).toFixed(2) <= 6.25){crit = 2;}
    let foeDef = foe.def;
    let myAtk = pokemon.atk;
    let initDmg = (((((2/5)*pokemon.lvl+2)*(myAtk)*(move.power/foeDef))/50) + 2);
    let damage = Math.ceil(initDmg*crit*rng*weaknessChecker(move, foe));
    if(crit == 2){prompt.innerHTML += "Critical Hit!<br>";}
    foe.hp -= damage;
  }
  else{
    switch(move.power){
      case 'atk':
        lowerStat(foe, 'atk', 'attack');
        break;
      case 'def':
        lowerStat(foe, 'def', 'defense');
        break;
      case 'spd':
        lowerStat(foe, 'spd', 'speed');
        break;
    }
  }
}

function lowerStat(foe, stat, statTxt){
  if(foe[stat] <= 2){prompt.innerHTML += `${foe.name}'s ${statTxt} won't go any lower<br>`}
  else{
    prompt.innerHTML += `${foe.name}'s' ${statTxt} fell<br>`;
    foe[stat] -= 1;
  }
}

function weaknessChecker(move, foe){
  const types = ['fire', 'grass', 'water', 'flying', 'bug', 'rock', 'normal'];
  const weakness = [['water', 'rock'], ['fire', 'flying'], ['grass'], ['rock'], ['fire', 'flying'], ['water', 'grass'], []];
  let multiplier = 1;
  weakness[types.indexOf(foe.type)].forEach(type => {
    if(move.type == type){
      prompt.innerHTML += `It's super effective!<br>`;
      multiplier = 2;
    }
  })
  weakness[types.indexOf(move.type)].forEach(type => {
    if(foe.type == type){
      prompt.innerHTML += `It's not very effective<br>`;
      multiplier = 0.5;
    }
  })
  return multiplier;
}

whatAttack.addEventListener('click', (e) => {
  if(e.target.classList.contains('attacks')){
    resetDialogue();
    let move;
    chosenPokemon.moveset.forEach(x => {
      if(x.name == e.target.textContent){
        move = x;
      }
    });
    let chooseMove = Math.round(Math.random()*(rivalPokemon.moveset.length - 1));
    let move2 = rivalPokemon.moveset[chooseMove];
    if(chosenPokemon.spd>=rivalPokemon.spd){
      attackMove(chosenPokemon, rivalPokemon, move);
      if(rivalPokemon.hp<=0){
        rivalPokemon.hp = 0;
        updateStatus(chosenPokemon, rivalPokemon);
        return battleOver(rivalPokemon);
      }
      attackMove(rivalPokemon, chosenPokemon, move2);
      if(chosenPokemon.hp<=0){
        chosenPokemon.hp = 0;
        updateStatus(chosenPokemon, rivalPokemon);
        return battleOver(chosenPokemon);
      }
    }else{
      attackMove(rivalPokemon, chosenPokemon, move2);
      if(chosenPokemon.hp<=0){
        chosenPokemon.hp = 0;
        updateStatus(chosenPokemon, rivalPokemon);
        return battleOver(chosenPokemon);
      }
      attackMove(chosenPokemon, rivalPokemon, move);
      if(rivalPokemon.hp<=0){
        rivalPokemon.hp = 0;
        updateStatus(chosenPokemon, rivalPokemon);
        return battleOver(rivalPokemon);
      }
    }
    updateStatus(chosenPokemon, rivalPokemon);
  }
});

function resetDialogue(){
  prompt.innerHTML = "";
}

function battleOver(foe){
  const atkMoves = document.querySelectorAll('.attacks');
  prompt.innerHTML += `${foe.name} fainted!<br>`;
  if(chosenPokemon.hp <= 0){
    prompt.innerHTML += `
    You Lose!
    <a href=""><strong>Retry?</strong></a>
    `
  }
  else{
    prompt.innerHTML += `You Win!<br>`;
    trainerBattle ? xp += 60 : xp += 30;
    lvlUP();
    pathOptions.style.display = 'grid';
    chosenPokemon.evolve();
    chosenPokemon.learn();
  }
  atkMoves.forEach(move => {
    move.classList.add('disable');
  })
}

function lvlUP(){
  if(xp>=60){
    xp = 0;
    prompt.innerHTML += `${chosenPokemon.name} level up<br>`
    chosenPokemon.lvl += 1;
    chosenPokemon.maxAtk += 1;
    chosenPokemon.atk = chosenPokemon.maxAtk;
    chosenPokemon.maxDef += 1;
    chosenPokemon.def = chosenPokemon.maxDef;
    chosenPokemon.maxSpd += 1;
    chosenPokemon.spd = chosenPokemon.maxSpd;
    chosenPokemon.maxHP += 2;
  }
  chosenPokemon.hp = chosenPokemon.maxHP;
}

function updateStatus(pokemon, enemy){
  myPokemon.innerHTML = `
    <img class="pokemon-sprite" src="img/${pokemon.name.toUpperCase()}-back.png" alt="">
    <div class="progress-bar">
      <div class="progress-value" style="width:${pokemon.changeHPGauge()}%;"></div>
    </div>
  ${pokemon.name} (lvl: ${pokemon.lvl})
  `
  enemyPokemon.innerHTML = `
    <img class="pokemon-sprite" src="img/${enemy.name.toUpperCase()}-front.png" alt="">
    <div class="progress-bar">
      <div class="progress-value" style="width:${enemy.changeHPGauge()}%;"></div>
    </div>
    ${enemy.name} (lvl: ${enemy.lvl})
  `
  whatAttack.innerHTML = ``;
  pokemon.moveset.forEach(atk => {
    whatAttack.innerHTML += `<div class="attacks">${atk.name}</div>`;
  });
}

function wildPokemonPicker(){
  let choose = Math.round(Math.random()*99)+1;
  switch(true){
    case choose >= 0 && choose < 31:
      const caterpie = new Pokemon('Caterpie', 16,7,8,7, 3, 'bug', [7,10], ['Metapod','Butterfree'], [9, 19], [bugBite, razorLeaf], tackle, stringShot);
      rivalPokemon = caterpie;
      break;
    case choose > 30 && choose < 71:
      const rattata = new Pokemon('Rattata', 15,9,8,7, 3, 'normal', [20], ['Raticate'], [4, 10], [quickAttack, bite], tackle, tailWhip);
      rivalPokemon = rattata; 
      break;
    case choose > 70:
      const pidgey = new Pokemon('Pidgey', 16,8,8,9, 3, 'flying', [18, 36], ['Pidgeotto','Pidgeot'], [33], [vineWhip],tackle, gust);
      rivalPokemon = pidgey;
      break;
  }
}

function battleWildPokemon(){
  pathOptions.style.display = 'none';
  trainerBattle = false;
  wildPokemonPicker();
  updateStatus(chosenPokemon, rivalPokemon);
  resetDialogue();
  prompt.innerHTML = `A wild ${rivalPokemon.name} appeared!`
  const atkMoves = document.querySelectorAll('.attacks');
  atkMoves.forEach(move => {
    move.classList.remove('disable');
  })
}
wildBattle.addEventListener('click', battleWildPokemon);

bugBattle.addEventListener('click', () => {
  pathOptions.style.display = 'none';
  trainerBattle = true;
  const beedrill = new Pokemon('Beedrill', 36,24,16,23, 10, 'bug', [], [], [], [], bugBite, twineedle);
  rivalPokemon = beedrill;
  updateStatus(chosenPokemon, rivalPokemon);
  resetDialogue();
  prompt.innerHTML = `
  Bug catcher challenges you to a battle!
  Bug catcher sent out Beedrill!
  `;
  const atkMoves = document.querySelectorAll('.attacks');
  atkMoves.forEach(move => {
    move.classList.remove('disable');
  });
  pathOptions.innerHTML = `
  <button id="wild-pokemon-battle" class="path">Battle wild pokemon</button>
  <button id="youngster-battle" class="path">Battle Youngster</button>
  `;
  const wildBattle = document.querySelector('#wild-pokemon-battle');
  wildBattle.addEventListener('click', battleWildPokemon);
  const youngBattle = document.querySelector('#youngster-battle');
  youngBattle.addEventListener('click', battleYoungster);  
});

function battleYoungster(){
  pathOptions.style.display = 'none';
  trainerBattle = true;
  const nidorino = new Pokemon('Nidorino', 50,36,28,29, 16, 'normal', [],[],[],[], cut, tailWhip, rockThrow);
  rivalPokemon = nidorino;
  updateStatus(chosenPokemon, rivalPokemon);
  resetDialogue();
  prompt.innerHTML = `
  Youngster challenges you to a battle!
  Youngster sent out Nidorino!
  `;
  const atkMoves = document.querySelectorAll('.attacks');
  atkMoves.forEach(move => {
    move.classList.remove('disable');
  });
  pathOptions.innerHTML = `
  <button id="wild-pokemon-battle" class="path">Battle wild pokemon</button>
  <button id="gym-trainer-battle" class="path">Battle Gym trainer</button>
  `;
  const wildBattle = document.querySelector('#wild-pokemon-battle');
  wildBattle.addEventListener('click', battleWildPokemon);
  const gymTrainer = document.querySelector('#gym-trainer-battle');
  gymTrainer.addEventListener('click', battleGymTrainer);
}

function battleGymTrainer(){
  pathOptions.style.display = 'none';
  trainerBattle = true;
  rivalPokemon = geodude;
  updateStatus(chosenPokemon, rivalPokemon);
  resetDialogue();
  prompt.innerHTML = `
  Gym trainer challenges you to a battle!
  Gym trainer sent out Geodude!
  `;
  const atkMoves = document.querySelectorAll('.attacks');
  atkMoves.forEach(move => {
    move.classList.remove('disable');
  });
  pathOptions.innerHTML = `
  <button id="wild-pokemon-battle" class="path">Battle wild pokemon</button>
  <button id="gym-leader-battle" class="path">Battle Gym Leader</button>
  `;
  const wildBattle = document.querySelector('#wild-pokemon-battle');
  wildBattle.addEventListener('click', battleWildPokemon);
  const gymLeader = document.querySelector('#gym-leader-battle');
  gymLeader.addEventListener('click', battleGymLeader);
}

function battleGymLeader(){
  pathOptions.style.display = 'none';
  trainerBattle = true;
  rivalPokemon = onix;
  updateStatus(chosenPokemon, rivalPokemon);
  resetDialogue();
  prompt.innerHTML = `
  Gym Leader challenges you to a battle!
  Gym Leader sent out Onix!
  `;
  const atkMoves = document.querySelectorAll('.attacks');
  atkMoves.forEach(move => {
    move.classList.remove('disable');
  });
  pathOptions.innerHTML = `
  Congratulations! You defeated the gym leader!
  <a href="">Retry?</a>
  `;
}
