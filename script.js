// --- Globale Variabelen & Constanten ---
let currentScreen = 'intro';
let selectedTrainerData = null; 
let tempSelectedStarter = null; 
let isNewGameSetup = false; 

let battleState = { 
    playerTeam: [], 
    opponentTeam: [], 
    playerActiveIndex: 0, opponentActiveIndex: 0, 
    playerTurn: true, 
    currentActingPokemonIsPlayer: true, 
    attackerUsedMoveFirstThisTurn: false, 
    messageQueue: [], isProcessingMessage: false, onMessageComplete: null, 
    switchingAfterFaint: false,
    isWildBattle: false,
    isGymBattle: false, 
    currentGymLeaderKey: null, 
    pendingBattleStartFunction: null, 
    selectedBattleTeamIndexes: [] 
};

const GAME_LEVEL = 50; 
const SHINY_CHANCE = 0.1; 
const CRITICAL_HIT_CHANCE_BASE = 1 / 24; 
const CRITICAL_HIT_MULTIPLIER = 1.5;
const PARALYSIS_CHANCE_NO_MOVE = 0.25;
const FREEZE_THAW_CHANCE = 0.2;
const MAX_TEAM_SIZE = 6;
const MAX_PC_BOX_SIZE = 30; 


const gameBody = document.getElementById('gameBody');
const screens = { 
    intro: document.getElementById('introScreen'), 
    characterSelect: document.getElementById('characterSelectScreen'), 
    starterSelect: document.getElementById('starterSelectScreen'), 
    confirmStarterDialog: document.getElementById('confirmStarterDialog'), 
    confirmDialog: document.getElementById('confirmDialog'), 
    resetConfirmDialog: document.getElementById('resetConfirmDialog'), 
    mainMenu: document.getElementById('mainMenuScreen'), 
    playMenu: document.getElementById('playMenuScreen'), 
    optionsMenu: document.getElementById('optionsMenuScreen'), 
    market: document.getElementById('marketScreen'),
    inventory: document.getElementById('inventoryScreen'),
    team: document.getElementById('teamScreen'), 
    pcBox: document.getElementById('pcBoxScreen'), 
    teamSelect: document.getElementById('teamSelectScreen'), 
    gymLeaderSelect: document.getElementById('gymLeaderSelectScreen'), 
    gymLeaderDetail: document.getElementById('gymLeaderDetailScreen'), 
    myCards: document.getElementById('myCardsScreen'), 
    battle: document.getElementById('battleScreen'), 
    switchPokemon: document.getElementById('switchPokemonScreen') 
};
const chosenTrainerNameSpan = document.getElementById('chosenTrainerName'); const confirmYesButton = document.getElementById('confirmYes'); const confirmNoButton = document.getElementById('confirmNo'); const trainerCards = document.querySelectorAll('.trainer-card'); const chosenTrainerImageMainMenu = document.getElementById('chosenTrainerImageMainMenu'); const playerCoinsDisplayMainMenuEl = document.getElementById('playerCoinsDisplayMainMenu'); 
const btnPlay = document.getElementById('btnPlay'); 
const btnQuickBattlePlay = document.getElementById('btnQuickBattlePlay'); 
const btnGymBattlePlay = document.getElementById('btnGymBattlePlay'); 
const btnEliteBattlesPlay = document.getElementById('btnEliteBattlesPlay');
const btnWildModePlay = document.getElementById('btnWildModePlay'); 
const btnBackToMainFromPlay = document.getElementById('btnBackToMainFromPlay');
const btnOptions = document.getElementById('btnOptions'); const btnSaveGameOpt = document.getElementById('btnSaveGameOpt'); const btnResetGameOpt = document.getElementById('btnResetGameOpt'); const btnDarkModeOpt = document.getElementById('btnDarkModeOpt'); const btnBackToMainOpts = document.getElementById('btnBackToMainOpts'); const resetConfirmYesButton = document.getElementById('resetConfirmYes'); const resetConfirmNoButton = document.getElementById('resetConfirmNo'); const opponentPokemonNameEl = document.getElementById('opponentPokemonName'); const opponentHpFillEl = document.getElementById('opponentHpFill'); const opponentHpNumbersEl = document.getElementById('opponentHpNumbers'); const opponentTeamStatusEl = document.getElementById('opponentTeamStatus'); const opponentPokemonSpriteEl = document.getElementById('opponentPokemonSprite'); const opponentStatusTagEl = document.getElementById('opponentStatusTag'); const playerPokemonNameEl = document.getElementById('playerPokemonName'); const playerHpFillEl = document.getElementById('playerHpFill'); const playerHpNumbersEl = document.getElementById('playerHpNumbers'); const playerTeamStatusEl = document.getElementById('playerTeamStatus'); const playerPokemonSpriteEl = document.getElementById('playerPokemonSprite'); const playerStatusTagEl = document.getElementById('playerStatusTag'); const battleTextboxEl = document.getElementById('battleTextbox'); const battleMessageEl = document.getElementById('battleMessage'); const actionMenuEl = document.getElementById('actionMenu'); const moveMenuEl = document.getElementById('moveMenu'); const itemMenuEl = document.getElementById('itemMenu'); const attackAnimationLayer = document.getElementById('attackAnimationLayer'); const switchGridEl = document.getElementById('switchGrid'); const switchCancelButton = document.getElementById('switchCancelButton');
const tabMarket = document.getElementById('tabMarket'); const tabInventory = document.getElementById('tabInventory'); const tabTeam = document.getElementById('tabTeam'); const tabMyCards = document.getElementById('tabMyCards'); 
const tabMyPc = document.getElementById('tabMyPc'); 
const marketCoinDisplayEl = document.getElementById('marketCoinDisplay'); const marketItemsGridEl = document.querySelector('#marketScreen .market-items-grid'); const btnBackToMainFromMarket = document.getElementById('btnBackToMainFromMarket'); const inventoryGridEl = document.getElementById('inventoryGrid'); const btnBackToMainFromInventory = document.getElementById('btnBackToMainFromInventory'); const teamGridEl = document.getElementById('teamGrid'); const btnBackToMainFromTeam = document.getElementById('btnBackToMainFromTeam');
const noInventoryItemsMsg = document.querySelector('#inventoryGrid .no-items');
const noTeamPokemonMsg = document.querySelector('#teamGrid .no-pokemon');
const teamSelectGridEl = document.getElementById('teamSelectGrid');
const teamSelectConfirmButton = document.getElementById('teamSelectConfirmButton');
const gymLeaderGridEl = document.getElementById('gymLeaderGrid');
const btnBackToPlayMenuFromGymSelect = document.getElementById('btnBackToPlayMenuFromGymSelect');
const gymLeaderDetailNameEl = document.getElementById('gymLeaderDetailName');
const gymLeaderCardImageEl = document.getElementById('gymLeaderCardImage');
const gymLeaderDialogEl = document.getElementById('gymLeaderDialog');
const btnStartGymBattle = document.getElementById('btnStartGymBattle');
const btnBackToGymSelectFromDetail = document.getElementById('btnBackToGymSelectFromDetail');
const collectedCardsGridEl = document.getElementById('collectedCardsGrid');
const noCollectedCardsMsgEl = document.getElementById('noCollectedCardsMsg');
const collectedBadgesGridEl = document.getElementById('collectedBadgesGrid');
const noCollectedBadgesMsgEl = document.getElementById('noCollectedBadgesMsg');
const btnBackToMainFromMyCards = document.getElementById('btnBackToMainFromMyCards');
const startersGridEl = document.querySelector('#starterSelectScreen .starters-grid');
const chosenStarterNameDialogSpan = document.getElementById('chosenStarterNameDialog'); 
const confirmStarterYesButton = document.getElementById('confirmStarterYes');
const confirmStarterNoButton = document.getElementById('confirmStarterNo');
const pcTeamGridEl = document.getElementById('pcTeamGrid'); 
const pcBoxGridEl = document.getElementById('pcBoxGrid'); 
const btnBackToMainFromPcBox = document.getElementById('btnBackToMainFromPcBox'); 
const pcTeamCountEl = document.getElementById('pcTeamCount'); 
const pcBoxCountEl = document.getElementById('pcBoxCount'); 
const pcBoxCapacityEl = document.getElementById('pcBoxCapacity'); 
const noPokemonPcTeamMsg = document.querySelector('#pcTeamGrid .no-pokemon-pc-team'); 
const noPokemonPcBoxMsg = document.querySelector('#pcBoxGrid .no-pokemon-pc-box'); 


document.addEventListener('DOMContentLoaded', () => {
    const marketPokeballIcon = document.querySelector('.market-item[data-item-id="pokeball"] .item-icon');
    if (marketPokeballIcon) marketPokeballIcon.style.backgroundImage = 'var(--item-icon-pokeball)';
    
    const marketGreatballIcon = document.querySelector('.market-item[data-item-id="greatball"] .item-icon');
    if (marketGreatballIcon) marketGreatballIcon.style.backgroundImage = 'var(--item-icon-greatball)';

    const marketEvoStoneIcon = document.querySelector('.market-item[data-item-id="evolutionstone"] .item-icon');
    if (marketEvoStoneIcon) marketEvoStoneIcon.style.backgroundImage = 'var(--item-icon-evolutionstone)';
    
    const marketPermaEvoStoneIcon = document.querySelector('.market-item[data-item-id="permaevolutionstone"] .item-icon');
    if (marketPermaEvoStoneIcon) marketPermaEvoStoneIcon.style.backgroundImage = 'var(--item-icon-evolutionstone)';
});

const trainersData = { "Bea": { name: "Bea", imageUrl: "https://www.pokemonkaart.nl/wp-content/uploads/Bea-TG25-Astral-Radiance.png" }, "Brock": { name: "Brock", imageUrl: "https://www.pokemonkaart.nl/wp-content/uploads/brocks-scouting-179-sv9-eng.png" }, "Giovanni": { name: "Giovanni", imageUrl: "https://www.pokemonkaart.nl/wp-content/uploads/Giovannis-Charisma-204-151.jpg" } };
const SAVE_KEY = 'blazingThunder_savedData_v1_1_8_elite_gyms_pc';

const typeChart = { "Normal": {"Rock": 0.5, "Ghost": 0, "Steel": 0.5}, "Fire": {"Fire": 0.5, "Water": 0.5, "Grass": 2, "Ice": 2, "Bug": 2, "Rock": 0.5, "Dragon": 0.5, "Steel": 2}, "Water": {"Fire": 2, "Water": 0.5, "Grass": 0.5, "Ground": 2, "Rock": 2, "Dragon": 0.5}, "Electric": {"Water": 2, "Electric": 0.5, "Grass": 0.5, "Ground": 0, "Flying": 2, "Dragon": 0.5}, "Grass": {"Fire": 0.5, "Water": 2, "Grass": 0.5, "Poison": 0.5, "Ground": 2, "Flying": 0.5, "Bug": 0.5, "Rock": 2, "Dragon": 0.5, "Steel": 0.5}, "Ice": {"Fire": 0.5, "Water": 0.5, "Grass": 2, "Ice": 0.5, "Ground": 2, "Flying": 2, "Dragon": 2, "Steel": 0.5}, "Fighting": {"Normal": 2, "Ice": 2, "Poison": 0.5, "Flying": 0.5, "Psychic": 0.5, "Bug": 0.5, "Rock": 2, "Ghost": 0, "Dark": 2, "Steel": 2, "Fairy": 0.5}, "Poison": {"Grass": 2, "Poison": 0.5, "Ground": 0.5, "Rock": 0.5, "Ghost": 0.5, "Steel": 0, "Fairy": 2}, "Ground": {"Fire": 2, "Electric": 2, "Grass": 0.5, "Poison": 2, "Flying": 0, "Bug": 0.5, "Rock": 2, "Steel": 2}, "Flying": {"Electric": 0.5, "Grass": 2, "Fighting": 2, "Bug": 2, "Rock": 0.5, "Steel": 0.5}, "Psychic": {"Fighting": 2, "Poison": 2, "Psychic": 0.5, "Dark": 0, "Steel": 0.5}, "Bug": {"Fire": 0.5, "Grass": 2, "Fighting": 0.5, "Poison": 0.5, "Flying": 0.5, "Psychic": 2, "Ghost": 0.5, "Dark": 2, "Steel": 0.5, "Fairy": 0.5}, "Rock": {"Fire": 2, "Ice": 2, "Fighting": 0.5, "Ground": 0.5, "Flying": 2, "Bug": 2, "Steel": 0.5}, "Ghost": {"Normal": 0, "Psychic": 2, "Ghost": 2, "Dark": 0.5}, "Dragon": {"Dragon": 2, "Steel": 0.5, "Fairy": 0}, "Steel": {"Fire": 0.5, "Water": 0.5, "Electric": 0.5, "Ice": 2, "Rock": 2, "Steel": 0.5, "Fairy": 2}, "Dark": {"Fighting": 0.5, "Psychic": 2, "Ghost": 2, "Dark": 0.5, "Fairy": 0.5}, "Fairy": {"Fire": 0.5, "Fighting": 2, "Poison": 0.5, "Dragon": 2, "Dark": 2, "Steel": 0.5} };
const statStageMultipliers = [1/4, 2/7, 1/3, 2/5, 1/2, 2/3, 1, 1.5, 2, 2.5, 3, 3.5, 4]; 
const accuracyStageMultipliers = [1/3, 3/8, 3/7, 1/2, 3/5, 3/4, 1, 4/3, 5/3, 2, 7/3, 8/3, 3]; 

const pokemonPool = [ 
    {
        pokedexId: 1, name: "BULBASAUR", types: ["Grass", "Poison"], hp: 120, baseStats: { attack: 49, defense: 49, speed: 45 },
        moves: [ { name: "Tackle", type: "Normal", accuracy: 100, maxPp: 35, power: 40 }, { name: "Vine Whip", type: "Grass", accuracy: 100, maxPp: 25, power: 45 }, { name: "Poison Powder", type: "Poison", accuracy: 75, maxPp: 35, power: 0, effect: { type: "status", condition: "PSN", chance: 1 } }, { name: "Growth", type: "Normal", accuracy: 100, maxPp: 20, power: 0, effect: { type: "stat", stat: ["attack"], target: "self", stages: 1 }, alwaysHits: true } ],
        spriteFront: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png", spriteBack: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/1.png", evolvesToPokedexId: 2 
    },
    {
        pokedexId: 2, name: "IVYSAUR", types: ["Grass", "Poison"], hp: 135, baseStats: { attack: 62, defense: 63, speed: 60 },
        moves: [ { name: "Razor Leaf", type: "Grass", accuracy: 95, maxPp: 25, power: 55, highCritRatio: true }, { name: "Poison Powder", type: "Poison", accuracy: 75, maxPp: 35, power: 0, effect: { type: "status", condition: "PSN", chance: 1 } }, { name: "Sleep Powder", type: "Grass", accuracy: 75, maxPp: 15, power: 0, effect: { type: "status", condition: "SLP", chance: 1 } }, { name: "Take Down", type: "Normal", accuracy: 85, maxPp: 20, power: 90 } ],
        spriteFront: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/2.png", spriteBack: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/2.png", evolvesToPokedexId: 3 
    },
    {
        pokedexId: 3, name: "VENUSAUR", types: ["Grass", "Poison"], hp: 155, baseStats: { attack: 82, defense: 83, speed: 80 },
        moves: [ { name: "Solar Beam", type: "Grass", accuracy: 100, maxPp: 10, power: 120 }, { name: "Sludge Bomb", type: "Poison", accuracy: 100, maxPp: 10, power: 90, effect: { type: "status", condition: "PSN", chance: 0.3 } }, { name: "Earthquake", type: "Ground", accuracy: 100, maxPp: 10, power: 100 }, { name: "Growth", type: "Normal", accuracy: 100, maxPp: 20, power: 0, effect: { type: "stat", stat: "attack", target: "self", stages: 1 }, alwaysHits: true } ],
        spriteFront: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/3.png", spriteBack: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/3.png", evolvesToPokedexId: null 
    },
    {
        pokedexId: 4, name: "CHARMANDER", types: ["Fire"], hp: 115, baseStats: { attack: 52, defense: 43, speed: 65 },
        moves: [ { name: "Scratch", type: "Normal", accuracy: 100, maxPp: 35, power: 40 }, { name: "Ember", type: "Fire", accuracy: 100, maxPp: 25, power: 40, effect: { type: "status", condition: "BRN", chance: 0.1 } }, { name: "Growl", type: "Normal", accuracy: 100, maxPp: 40, power: 0, effect: { type: "stat", stat: "attack", target: "opponent", stages: -1 }, alwaysHits: true }, { name: "Smokescreen", type: "Normal", accuracy: 100, maxPp: 20, power: 0, effect: { type: "stat", stat: "accuracy", target: "opponent", stages: -1 }, alwaysHits: true } ],
        spriteFront: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/4.png", spriteBack: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/4.png", evolvesToPokedexId: 5
    },
    {
        pokedexId: 5, name: "CHARMELEON", types: ["Fire"], hp: 130, baseStats: { attack: 64, defense: 58, speed: 80 },
        moves: [ { name: "Slash", type: "Normal", accuracy: 100, maxPp: 20, power: 70, highCritRatio: true }, { name: "Flamethrower", type: "Fire", accuracy: 100, maxPp: 15, power: 90, effect: { type: "status", condition: "BRN", chance: 0.1 } }, { name: "Scary Face", type: "Normal", accuracy: 100, maxPp: 10, power: 0, effect: { type: "stat", stat: "speed", target: "opponent", stages: -2 }, alwaysHits: true }, { name: "Fire Fang", type: "Fire", accuracy: 95, maxPp: 15, power: 65, effect: { type: "flinch_or_status", condition: "BRN", chance: 0.1, flinchChance: 0.1 } } ],
        spriteFront: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/5.png", spriteBack: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/5.png", evolvesToPokedexId: 6
    },
    {
        pokedexId: 6, name: "CHARIZARD", types: ["Fire", "Flying"], hp: 150, baseStats: { attack: 84, defense: 78, speed: 100 },
        moves: [ { name: "Air Slash", type: "Flying", accuracy: 95, maxPp: 15, power: 75, effect: { type: "flinch", chance: 0.3 } }, { name: "Flamethrower", type: "Fire", accuracy: 100, maxPp: 15, power: 90, effect: { type: "status", condition: "BRN", chance: 0.1 } }, { name: "Dragon Claw", type: "Dragon", accuracy: 100, maxPp: 15, power: 80 }, { name: "Heat Wave", type: "Fire", accuracy: 90, maxPp: 10, power: 95, effect: { type: "status", condition: "BRN", chance: 0.1 } } ],
        spriteFront: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/6.png", spriteBack: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/6.png", evolvesToPokedexId: null
    },
    {
        pokedexId: 7, name: "SQUIRTLE", types: ["Water"], hp: 118, baseStats: { attack: 48, defense: 65, speed: 43 },
        moves: [ { name: "Tackle", type: "Normal", accuracy: 100, maxPp: 35, power: 40 }, { name: "Water Gun", type: "Water", accuracy: 100, maxPp: 25, power: 40 }, { name: "Tail Whip", type: "Normal", accuracy: 100, maxPp: 30, power: 0, effect: { type: "stat", stat: "defense", target: "opponent", stages: -1 }, alwaysHits: true }, { name: "Withdraw", type: "Water", accuracy: 100, maxPp: 40, power: 0, effect: { type: "stat", stat: "defense", target: "self", stages: 1 }, alwaysHits: true } ],
        spriteFront: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/7.png", spriteBack: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/7.png", evolvesToPokedexId: 8
    },
    {
        pokedexId: 8, name: "WARTORTLE", types: ["Water"], hp: 132, baseStats: { attack: 63, defense: 80, speed: 58 },
        moves: [ { name: "Water Gun", type: "Water", accuracy: 100, maxPp: 25, power: 40 }, { name: "Bite", type: "Dark", accuracy: 100, maxPp: 25, power: 60, effect: { type: "flinch", chance: 0.3 } }, { name: "Rapid Spin", type: "Normal", accuracy: 100, maxPp: 40, power: 50, effect: { type: "clear_hazards_self" } }, { name: "Protect", type: "Normal", accuracy: 100, maxPp: 10, power: 0, effect: { type: "protect" }, priority: 4, alwaysHits: true } ],
        spriteFront: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/8.png", spriteBack: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/8.png", evolvesToPokedexId: 9
    },
    {
        pokedexId: 9, name: "BLASTOISE", types: ["Water"], hp: 152, baseStats: { attack: 83, defense: 100, speed: 78 },
        moves: [ { name: "Hydro Pump", type: "Water", accuracy: 80, maxPp: 5, power: 110 }, { name: "Skull Bash", type: "Normal", accuracy: 100, maxPp: 10, power: 130 }, { name: "Flash Cannon", type: "Steel", accuracy: 100, maxPp: 10, power: 80, effect: {type: "stat", stat: "defense", target: "opponent", stages: -1, chance: 0.1 } }, { name: "Iron Defense", type: "Steel", accuracy: 100, maxPp: 15, power: 0, effect: { type: "stat", stat: "defense", target: "self", stages: 2 }, alwaysHits: true } ],
        spriteFront: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/9.png", spriteBack: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/9.png", evolvesToPokedexId: null
    },
    {
        pokedexId: 25, name: "PIKACHU", types: ["Electric"], hp: 110, baseStats: { attack: 55, defense: 40, speed: 90 },
        moves: [ { name: "Thunder Shock", type: "Electric", accuracy: 100, maxPp: 30, power: 40, effect: { type: "status", condition: "PAR", chance: 0.1 } }, { name: "Quick Attack", type: "Normal", accuracy: 100, maxPp: 30, power: 40, priority: 1 }, { name: "Thunder Wave", type: "Electric", accuracy: 90, maxPp: 20, power: 0, effect: { type: "status", condition: "PAR", chance: 1 } }, { name: "Double Team", type: "Normal", accuracy: 100, maxPp: 15, power: 0, effect: { type: "stat", stat: "evasion", target: "self", stages: 1 }, alwaysHits: true } ],
        spriteFront: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/25.png", spriteBack: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/25.png", evolvesToPokedexId: 26
    },
    {
        pokedexId: 26, name: "RAICHU", types: ["Electric"], hp: 135, baseStats: { attack: 90, defense: 55, speed: 110 },
        moves: [ { name: "Thunderbolt", type: "Electric", accuracy: 100, maxPp: 15, power: 90, effect: { type: "status", condition: "PAR", chance: 0.1 } }, { name: "Slam", type: "Normal", accuracy: 75, maxPp: 20, power: 80 }, { name: "Volt Switch", type: "Electric", accuracy: 100, maxPp: 20, power: 70, effect: { type: "switch_self_after_hit" } }, { name: "Nasty Plot", type: "Dark", accuracy: 100, maxPp: 20, power: 0, effect: { type: "stat", stat: "attack", target: "self", stages: 2 }, alwaysHits: true } ],
        spriteFront: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/26.png", spriteBack: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/26.png", evolvesToPokedexId: null
    },
    {
        pokedexId: 152, name: "CHIKORITA", types: ["Grass"], hp: 120, baseStats: { attack: 49, defense: 65, speed: 45 },
        moves: [ { name: "Tackle", type: "Normal", accuracy: 100, maxPp: 35, power: 40 }, { name: "Razor Leaf", type: "Grass", accuracy: 95, maxPp: 25, power: 55, highCritRatio: true }, { name: "Poison Powder", type: "Poison", accuracy: 75, maxPp: 35, power: 0, effect: { type: "status", condition: "PSN", chance: 1 } }, { name: "Synthesis", type: "Grass", accuracy: 100, maxPp: 5, power: 0, effect: { type: "heal", percentage: 0.5, target: "self" }, alwaysHits: true } ],
        spriteFront: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/152.png", spriteBack: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/152.png", evolvesToPokedexId: 153
    },
    {
        pokedexId: 153, name: "BAYLEEF", types: ["Grass"], hp: 135, baseStats: { attack: 62, defense: 80, speed: 60 },
        moves: [ { name: "Razor Leaf", type: "Grass", accuracy: 95, maxPp: 25, power: 55, highCritRatio: true }, { name: "Body Slam", type: "Normal", accuracy: 100, maxPp: 15, power: 85, effect: { type: "status", condition: "PAR", chance: 0.3 } }, { name: "Light Screen", type: "Psychic", accuracy: 100, maxPp: 30, power: 0, effect: {type: "apply_team_effect", effect_name: "light_screen", turns: 5}, alwaysHits: true }, { name: "Synthesis", type: "Grass", accuracy: 100, maxPp: 5, power: 0, effect: { type: "heal", percentage: 0.5, target: "self" }, alwaysHits: true } ],
        spriteFront: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/153.png", spriteBack: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/153.png", evolvesToPokedexId: 154
    },
    {
        pokedexId: 154, name: "MEGANIUM", types: ["Grass"], hp: 155, baseStats: { attack: 82, defense: 100, speed: 80 },
        moves: [ { name: "Petal Dance", type: "Grass", accuracy: 100, maxPp: 10, power: 120 }, { name: "Earthquake", type: "Ground", accuracy: 100, maxPp: 10, power: 100 }, { name: "Aromatherapy", type: "Grass", accuracy: 100, maxPp: 5, power: 0, effect: { type: "heal_team_status" }, alwaysHits: true }, { name: "Solar Beam", type: "Grass", accuracy: 100, maxPp: 10, power: 120 } ],
        spriteFront: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/154.png", spriteBack: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/154.png", evolvesToPokedexId: null
    },
    {
        pokedexId: 155, name: "CYNDAQUIL", types: ["Fire"], hp: 115, baseStats: { attack: 52, defense: 43, speed: 65 },
        moves: [ { name: "Tackle", type: "Normal", accuracy: 100, maxPp: 35, power: 40 }, { name: "Ember", type: "Fire", accuracy: 100, maxPp: 25, power: 40, effect: { type: "status", condition: "BRN", chance: 0.1 } }, { name: "Smokescreen", type: "Normal", accuracy: 100, maxPp: 20, power: 0, effect: { type: "stat", stat: "accuracy", target: "opponent", stages: -1 }, alwaysHits: true }, { name: "Quick Attack", type: "Normal", accuracy: 100, maxPp: 30, power: 40, priority: 1 } ],
        spriteFront: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/155.png", spriteBack: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/155.png", evolvesToPokedexId: 156
    },
    {
        pokedexId: 156, name: "QUILAVA", types: ["Fire"], hp: 130, baseStats: { attack: 64, defense: 58, speed: 80 },
        moves: [ { name: "Flame Wheel", type: "Fire", accuracy: 100, maxPp: 25, power: 60, effect: { type: "status", condition: "BRN", chance: 0.1 } }, { name: "Swift", type: "Normal", accuracy: 100, maxPp: 20, power: 60, alwaysHits: true }, { name: "Defense Curl", type: "Normal", accuracy: 100, maxPp: 40, power: 0, effect: { type: "stat", stat: "defense", target: "self", stages: 1 }, alwaysHits: true }, { name: "Lava Plume", type: "Fire", accuracy: 100, maxPp: 15, power: 80, effect: { type: "status", condition: "BRN", chance: 0.3 } } ],
        spriteFront: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/156.png", spriteBack: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/156.png", evolvesToPokedexId: 157
    },
    {
        pokedexId: 157, name: "TYPHLOSION", types: ["Fire"], hp: 150, baseStats: { attack: 84, defense: 78, speed: 100 },
        moves: [ { name: "Flamethrower", type: "Fire", accuracy: 100, maxPp: 15, power: 90, effect: { type: "status", condition: "BRN", chance: 0.1 } }, { name: "Focus Blast", type: "Fighting", accuracy: 70, maxPp: 5, power: 120, effect: {type: "stat", stat: "defense", target: "opponent", stages: -1, chance: 0.1 } }, { name: "Eruption", type: "Fire", accuracy: 100, maxPp: 5, power: 150 }, { name: "Solar Beam", type: "Grass", accuracy: 100, maxPp: 10, power: 120 } ],
        spriteFront: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/157.png", spriteBack: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/157.png", evolvesToPokedexId: null
    },
    {
        pokedexId: 158, name: "TOTODILE", types: ["Water"], hp: 125, baseStats: { attack: 65, defense: 64, speed: 43 },
        moves: [ { name: "Scratch", type: "Normal", accuracy: 100, maxPp: 35, power: 40 }, { name: "Water Gun", type: "Water", accuracy: 100, maxPp: 25, power: 40 }, { name: "Rage", type: "Normal", accuracy: 100, maxPp: 20, power: 20, effect: {type: "rage_effect"} }, { name: "Bite", type: "Dark", accuracy: 100, maxPp: 25, power: 60, effect: { type: "flinch", chance: 0.3 } } ],
        spriteFront: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/158.png", spriteBack: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/158.png", evolvesToPokedexId: 159
    },
    {
        pokedexId: 159, name: "CROCONAW", types: ["Water"], hp: 140, baseStats: { attack: 80, defense: 80, speed: 58 },
        moves: [ { name: "Water Gun", type: "Water", accuracy: 100, maxPp: 25, power: 40 }, { name: "Ice Fang", type: "Ice", accuracy: 95, maxPp: 15, power: 65, effect: { type: "flinch_or_status", condition: "FRZ", chance: 0.1, flinchChance: 0.1 } }, { name: "Scary Face", type: "Normal", accuracy: 100, maxPp: 10, power: 0, effect: { type: "stat", stat: "speed", target: "opponent", stages: -2 }, alwaysHits: true }, { name: "Crunch", type: "Dark", accuracy: 100, maxPp: 15, power: 80, effect: {type: "stat", stat: "defense", target: "opponent", stages: -1, chance: 0.2 } } ],
        spriteFront: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/159.png", spriteBack: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/159.png", evolvesToPokedexId: 160
    },
    {
        pokedexId: 160, name: "FERALIGATR", types: ["Water"], hp: 160, baseStats: { attack: 105, defense: 100, speed: 78 },
        moves: [ { name: "Aqua Tail", type: "Water", accuracy: 90, maxPp: 10, power: 90 }, { name: "Superpower", type: "Fighting", accuracy: 100, maxPp: 5, power: 120, effect: {type: "stat", stat: ["attack", "defense"], target: "self", stages: -1 } }, { name: "Ice Punch", type: "Ice", accuracy: 100, maxPp: 15, power: 75, effect: { type: "status", condition: "FRZ", chance: 0.1 } }, { name: "Dragon Dance", type: "Dragon", accuracy: 100, maxPp: 20, power: 0, effect: { type: "stat", stat: ["attack", "speed"], target: "self", stages: 1 }, alwaysHits: true } ],
        spriteFront: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/160.png", spriteBack: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/160.png", evolvesToPokedexId: null
    },
	{ 
        pokedexId: 249, name: "LUGIA", types: ["Psychic", "Flying"], hp: 160, baseStats: { attack: 90, defense: 130, speed: 110 }, 
        moves: [ { name: "Aeroblast", type: "Flying", accuracy: 95, maxPp: 5, power: 100, highCritRatio: true }, { name: "Hydro Pump", type: "Water", accuracy: 80, maxPp: 5, power: 110 }, { name: "Psychic", type: "Psychic", accuracy: 100, maxPp: 10, power: 90, effect: {type: "stat", stat: "defense", target: "opponent", stages: -1, chance: 0.1 } }, { name: "Recover", type: "Normal", accuracy: 100, maxPp: 10, power: 0, effect: { type: "heal", percentage: 0.5, target: "self" }, alwaysHits: true } ], 
        spriteFront: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/249.png", spriteBack: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/249.png", evolvesToPokedexId: null
    }, 
    { 
        pokedexId: 250, name: "HO-OH", types: ["Fire", "Flying"], hp: 160, baseStats: { attack: 130, defense: 90, speed: 90 }, 
        moves: [ { name: "Sacred Fire", type: "Fire", accuracy: 95, maxPp: 5, power: 100, effect: { type: "status", condition: "BRN", chance: 0.5 } }, { name: "Brave Bird", type: "Flying", accuracy: 100, maxPp: 15, power: 120 }, { name: "Solar Beam", type: "Grass", accuracy: 100, maxPp: 10, power: 120 }, { name: "Recover", type: "Normal", accuracy: 100, maxPp: 10, power: 0, effect: { type: "heal", percentage: 0.5, target: "self" }, alwaysHits: true } ], 
        spriteFront: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/250.png", spriteBack: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/250.png", evolvesToPokedexId: null
    },
    {
        pokedexId: 251, name: "CELEBI", types: ["Psychic", "Grass"], hp: 170, baseStats: { attack: 100, defense: 100, speed: 100 },
        moves: [ { name: "Psychic", type: "Psychic", accuracy: 100, maxPp: 10, power: 90, effect: {type: "stat", stat: "defense", target: "opponent", stages: -1, chance: 0.1 } }, { name: "Giga Drain", type: "Grass", accuracy: 100, maxPp: 10, power: 75, effect: {type: "heal", percentage: 0.5, target: "self"} }, { name: "Recover", type: "Normal", accuracy: 100, maxPp: 10, power: 0, effect: { type: "heal", percentage: 0.5, target: "self" }, alwaysHits: true }, { name: "Ancient Power", type: "Rock", accuracy: 100, maxPp: 5, power: 60, effect: { type: "stat_all_self", chance: 0.1, stages: 1 } } ],
        spriteFront: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/251.png", spriteBack: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/251.png", evolvesToPokedexId: null
    }
];

const gymLeadersData = {
    "Misty": {
        name: "Misty",
        cardUrl: "https://www.pokemonkaart.nl/wp-content/uploads/Evolutions_Misty%E2%80%99s-Determination-1.jpg",
        badgeName: "Cascade Badge",
        badgeUrl: "https://archives.bulbagarden.net/media/upload/thumb/9/9c/Cascade_Badge.png/50px-Cascade_Badge.png",
        pokemonTeam: ["SEADRA", "GOLDUCK", "STARMIE"], 
        dialog: "My water Pokémon are unbeatable!"
    },
    "Brock": {
        name: "Brock",
        cardUrl: "https://www.pokemonkaart.nl/wp-content/uploads/sun-moon-lost-thunder-brock-s-grit-210.jpg",
        badgeName: "Boulder Badge",
        badgeUrl: "https://archives.bulbagarden.net/media/upload/thumb/d/d3/Boulder_Badge.png/50px-Boulder_Badge.png",
        pokemonTeam: ["GOLEM", "ONIX", "KABUTOPS"],
        dialog: "My rock-hard willpower is evident in my Pokémon!"
    },
    "Jasmine": {
        name: "Jasmine",
        cardUrl: "https://www.pokemonkaart.nl/wp-content/uploads/Team-Up_Jasmine.jpg",
        badgeName: "Mineral Badge", 
        badgeUrl: "https://archives.bulbagarden.net/media/upload/thumb/1/11/Mineral_Badge.png/50px-Mineral_Badge.png",
        pokemonTeam: ["SKARMORY", "MAGNETON", "STEELIX"],
        dialog: "...You're a kind person. ...Allow me to see your Pokémon's power."
    }
};


// --- Helper Functions ---
function createPokemon(name, types, hp, baseStats, moves, spriteFront, spriteBack, isShiny = false, pokedexIdInput = null) { 
    const shinyBaseUrl = "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon";
    const idFromSprite = spriteFront.split('/').pop().split('.')[0]; 
    const effectivePokedexId = pokedexIdInput !== null ? pokedexIdInput : parseInt(idFromSprite);

    const basePokemonData = pokemonPool.find(p => p.pokedexId === effectivePokedexId) || {};

    return { 
        id: Date.now().toString(36) + Math.random().toString(36).substr(2), 
        pokedexId: effectivePokedexId, 
        name: name.toUpperCase(), types: types, maxHP: hp, currentHP: hp, 
        baseStats: JSON.parse(JSON.stringify(baseStats)), 
        stats: { attack: 0, defense: 0, speed: 0, accuracy: 0, evasion: 0 }, 
        moves: moves.map(m => ({ ...m, currentPp: m.maxPp })), 
        spriteFrontUrl: isShiny ? `${shinyBaseUrl}/shiny/${effectivePokedexId}.png` : spriteFront, 
        spriteBackUrl: isShiny ? `${shinyBaseUrl}/back/shiny/${effectivePokedexId}.png` : spriteBack, 
        status: null, isShiny: isShiny,
        sleepTurns: 0, 
        flinch: false,
        originalEvolutionData: null,
        evolvesToPokedexId: basePokemonData.evolvesToPokedexId || null 
    }; 
}
function createPokemonFromData(data, isOpponent = false, forPlayerTeam = false) {
    let isShiny = false;
    if (isOpponent && !forPlayerTeam && Math.random() < SHINY_CHANCE) {
        isShiny = true;
    }
    const newPokemon = createPokemon(data.name, data.types, data.hp, data.baseStats, data.moves, data.spriteFront, data.spriteBack, isShiny, data.pokedexId);
    if (forPlayerTeam && !newPokemon.isShiny) { 
        newPokemon.isShiny = false; 
        newPokemon.spriteFrontUrl = data.spriteFront; 
        newPokemon.spriteBackUrl = data.spriteBack;   
    }
    return newPokemon;
}
function calculateStatWithStage(baseStat, stage, statType) { const stageArray = (statType === 'accuracy' || statType === 'evasion') ? accuracyStageMultipliers : statStageMultipliers; const modifier = stageArray[stage + 6]; let finalStat = Math.floor(baseStat * modifier); if (statType === 'speed') { const pokemonToCheck = battleState.playerTurn ? (battleState.opponentTeam[battleState.opponentActiveIndex] || {}) : (battleState.playerTeam[battleState.playerActiveIndex] || {}); if (pokemonToCheck && pokemonToCheck.status === 'PAR' && baseStat === pokemonToCheck.baseStats?.speed) { finalStat = Math.floor(finalStat / 2); } } return finalStat; }
function calculateTypeEffectiveness(moveType, defenderTypes) { let totalEffectiveness = 1; if (!typeChart[moveType]) return 1; defenderTypes.forEach(defenderType => { if (typeChart[moveType][defenderType] !== undefined) { totalEffectiveness *= typeChart[moveType][defenderType]; }}); return totalEffectiveness; }
function getEffectivenessText(multiplier, defenderName) { if (multiplier >= 2) return "It's super effective!"; if (multiplier > 0 && multiplier < 1) return "It's not very effective..."; if (multiplier === 0) return `It doesn't affect foe ${defenderName.toUpperCase()}...`; return ""; }
function switchScreen(screenKey) { Object.keys(screens).forEach(key => { if (screens[key]) screens[key].style.display = 'none'; }); if (screens[screenKey]) { screens[screenKey].style.display = 'flex'; currentScreen = screenKey; } else { console.error(`Screen '${screenKey}' not found.`); } }
function typeMessage(message, callback) { if (battleState.isProcessingMessage && message) { battleState.messageQueue.push({ message, callback }); return; } battleState.isProcessingMessage = true; battleMessageEl.textContent = ''; actionMenuEl.style.display = 'none'; moveMenuEl.style.display = 'none'; itemMenuEl.style.display = 'none'; battleTextboxEl.style.display = 'block'; battleTextboxEl.style.visibility = 'visible'; let i = 0; const intervalId = setInterval(() => { if (i < message.length) { battleMessageEl.textContent += message.charAt(i); i++; } else { clearInterval(intervalId); battleState.isProcessingMessage = false; battleState.onMessageComplete = callback; processMessageQueue(); } }, 35); }
function processMessageQueue() { if (!battleState.isProcessingMessage && battleState.messageQueue.length > 0) { const next = battleState.messageQueue.shift(); typeMessage(next.message, next.callback); } }
if (battleTextboxEl && battleTextboxEl.parentElement) { battleTextboxEl.parentElement.addEventListener('click', (e) => { if (e.target.closest('.battle-menu') || e.target.closest('#switchPokemonScreen') || e.target.closest('#teamSelectScreen') || e.target.closest('.dialog-overlay')) return; if (!battleState.isProcessingMessage && battleState.onMessageComplete) { const callback = battleState.onMessageComplete; battleState.onMessageComplete = null; callback(); processMessageQueue(); } });}
function updateHpBar(hpFillElement, hpNumbersElement, currentHp, maxHp) { const p = Math.max(0, (currentHp / maxHp) * 100); hpFillElement.style.width = p + '%'; if (p > 50) hpFillElement.style.backgroundColor = 'var(--hp-high-color)'; else if (p > 20) hpFillElement.style.backgroundColor = 'var(--hp-medium-color)'; else hpFillElement.style.backgroundColor = 'var(--hp-low-color)'; if (hpNumbersElement) hpNumbersElement.textContent = `${Math.max(0, Math.floor(currentHp))}/${maxHp}`; }
function updateStatusTag(pokemon, tagElement) { if (pokemon.status) { tagElement.textContent = pokemon.status.toUpperCase(); tagElement.className = 'status-tag ' + pokemon.status.toUpperCase(); tagElement.style.display = 'inline-block'; } else { tagElement.style.display = 'none'; } }

function playShakeAnimation(spriteElementContainer) {
    if (spriteElementContainer && typeof anime === 'function') {
        const baseScale = spriteElementContainer.classList.contains('player-sprite') ? 2.1 : 1.4;
        anime({
            targets: spriteElementContainer,
            translateX: [
                { value: -5, duration: 50, delay: 0 },
                { value: 5, duration: 100, delay: 0 },
                { value: -5, duration: 100, delay: 0 },
                { value: 5, duration: 100, delay: 0 },
                { value: 0, duration: 50, delay: 0 }
            ],
            scale: baseScale, 
            easing: 'easeInOutSine',
            duration: 400
        });
    } else if (spriteElementContainer) { 
         spriteElementContainer.classList.add('shake-anim'); 
         setTimeout(() => { spriteElementContainer.classList.remove('shake-anim'); }, 500);
    }
}

function playAttackAnimation(moveType, attackerSpriteEl, defenderSpriteEl, onComplete) {
    if (typeof anime !== 'function') { 
        console.warn("Anime.js not loaded, using fallback CSS animation placeholder.");
        setTimeout(() => { if (onComplete) onComplete(); }, 500);
        return;
    }

    const animElement = document.createElement('div');
    animElement.classList.add('attack-animation'); 

    const attackerRect = attackerSpriteEl.getBoundingClientRect();
    const defenderRect = defenderSpriteEl.getBoundingClientRect();
    const layerRect = attackAnimationLayer.getBoundingClientRect();

    const startX = attackerRect.left + attackerRect.width / 2 - layerRect.left;
    const startY = attackerRect.top + attackerRect.height / 2 - layerRect.top;
    const endX = defenderRect.left + defenderRect.width / 2 - layerRect.left;
    const endY = defenderRect.top + defenderRect.height / 2 - layerRect.top;

    let animationProps = {};
    
    switch (moveType.toUpperCase()) {
        case 'FIRE':
            animElement.style.width = '40px';
            animElement.style.height = '40px';
            animElement.style.backgroundColor = 'orangered';
            animElement.style.borderRadius = '50%';
            animElement.style.boxShadow = '0 0 20px 10px darkorange, 0 0 30px 15px rgba(255,69,0,0.7)';
            animationProps = {
                translateX: [startX - 20, endX - 20],
                translateY: [startY - 20, endY - 20],
                scale: [0.5, 1.8, 0.8],
                opacity: [0, 1, 0],
                duration: 600,
                easing: 'easeOutExpo'
            };
            break;
        case 'WATER':
            animElement.style.width = '50px';
            animElement.style.height = '30px';
            animElement.style.background = 'radial-gradient(circle, rgba(173,216,230,1) 0%, rgba(0,119,182,1) 100%)';
            animElement.style.borderRadius = '15px';
            animElement.style.border = '3px solid cyan';
            animElement.style.boxShadow = '0 0 15px 5px skyblue';
            animationProps = {
                translateX: [startX - 25, endX - 25],
                translateY: [startY - 15, endY - 15],
                scale: [0.8, 1.5, 0.7],
                opacity: [0, 1, 0],
                rotate: anime.random(300, 420),
                duration: 700,
                easing: 'easeInOutQuart'
            };
            break;
        case 'ELECTRIC':
            animElement.style.width = '120px';
            animElement.style.height = '120px';
            animElement.style.backgroundColor = 'yellow';
            animElement.style.borderRadius = '50%';
            animElement.style.opacity = 0; 
            animElement.style.left = `${endX - 60}px`;
            animElement.style.top = `${endY - 60}px`;
            animElement.style.boxShadow = '0 0 30px 20px gold, 0 0 40px 25px yellow, 0 0 60px 35px rgba(255,255,0,0.6)';
            animationProps = {
                opacity: [0, 0.9, 0.6, 0.9, 0],
                scale: [1, 1.6, 1.2, 1.6, 1],
                duration: 350,
                easing: 'linear'
            };
            break;
        case 'GRASS':
            animElement.style.width = '35px';
            animElement.style.height = '70px';
            animElement.style.backgroundColor = 'limegreen';
            animElement.style.borderRadius = '50% 50% 10px 10px / 80% 80% 20% 20%'; 
            animElement.style.left = `${startX - 17}px`;
            animElement.style.top = `${startY - 35}px`;
            animElement.style.boxShadow = '0 0 10px 3px darkgreen';
            animationProps = {
                translateX: [0, endX - startX + anime.random(-10, 10)],
                translateY: [0, endY - startY + anime.random(-10, 10)],
                rotate: [0, anime.random(300, 420) + 'deg'],
                scale: [1, 0.3],
                opacity: [1, 0],
                duration: 600,
                easing: 'easeInSine'
            };
            break;
        default: 
            animElement.style.width = '70px';
            animElement.style.height = '70px';
            animElement.style.backgroundColor = 'rgba(220, 220, 220, 0.9)';
            animElement.style.borderRadius = '50%';
            animElement.style.left = `${endX - 35}px`;
            animElement.style.top = `${endY - 35}px`;
            animElement.style.boxShadow = '0 0 10px 4px lightgrey';
            animationProps = {
                scale: [0.3, 1.3, 0.7],
                opacity: [0, 1, 0],
                duration: 450,
                easing: 'easeOutExpo'
            };
            break;
    }

    attackAnimationLayer.appendChild(animElement);

    anime({
        targets: animElement,
        ...animationProps,
        complete: () => {
            animElement.remove();
            if (onComplete) onComplete();
        }
    });
}

function updateBattleUI() { 
    if(!battleState.playerTeam[battleState.playerActiveIndex] || (battleState.opponentTeam.length > 0 && !battleState.opponentTeam[battleState.opponentActiveIndex])) {
        return; 
    }
    const pPok = battleState.playerTeam[battleState.playerActiveIndex]; 
    playerPokemonNameEl.textContent = pPok.name.toUpperCase(); 
    playerPokemonSpriteEl.src = pPok.spriteBackUrl; 
    updateHpBar(playerHpFillEl, playerHpNumbersEl, pPok.currentHP, pPok.maxHP); 
    updateStatusTag(pPok, playerStatusTagEl); 
    updateTeamStatus(playerTeamStatusEl, battleState.playerTeam); 

    if (battleState.opponentTeam.length > 0 && battleState.opponentTeam[battleState.opponentActiveIndex]) {
        const oPok = battleState.opponentTeam[battleState.opponentActiveIndex];
        opponentPokemonNameEl.textContent = oPok.name.toUpperCase(); 
        opponentPokemonSpriteEl.src = oPok.spriteFrontUrl; 
        updateHpBar(opponentHpFillEl, opponentHpNumbersEl, oPok.currentHP, oPok.maxHP); 
        updateStatusTag(oPok, opponentStatusTagEl); 
        updateTeamStatus(opponentTeamStatusEl, battleState.opponentTeam); 
    } else { 
        opponentPokemonNameEl.textContent = "";
        opponentPokemonSpriteEl.src = "";
        opponentHpFillEl.style.width = '0%';
        opponentHpNumbersEl.textContent = "";
        opponentStatusTagEl.style.display = 'none';
        opponentTeamStatusEl.innerHTML = '';
    }
    
    if (actionMenuEl) {
        let visibleAndEnabledButtonsInActionMenu = 0;
        const buttons = actionMenuEl.querySelectorAll('button');
        buttons.forEach(b => {
            if (b.parentElement === actionMenuEl) { 
                const style = window.getComputedStyle(b);
                if (style.display !== 'none' && !b.disabled) {
                    visibleAndEnabledButtonsInActionMenu++;
                }
            }
        });
        actionMenuEl.classList.toggle('extended', visibleAndEnabledButtonsInActionMenu === 4);
    }
}
function updateTeamStatus(containerElement, team) { containerElement.innerHTML = ''; team.forEach(p => { const ball = document.createElement('span'); ball.classList.add('status-ball'); if (p.currentHP <= 0) ball.classList.add('fainted'); containerElement.appendChild(ball); }); }
function updateCoinDisplay() { const coins = selectedTrainerData ? (selectedTrainerData.coins || 0) : 0; if (playerCoinsDisplayMainMenuEl) playerCoinsDisplayMainMenuEl.textContent = `Coins: ${coins}`; if (marketCoinDisplayEl) marketCoinDisplayEl.textContent = `Coins: ${coins}`; }
function showMarketScreen() { if (!selectedTrainerData) { alert("Please select a trainer first."); switchScreen('characterSelect'); return; } updateCoinDisplay(); switchScreen('market'); }
function showInventoryScreen() { 
    if (!selectedTrainerData) { alert("Please select a trainer first."); switchScreen('characterSelect'); return; } 
    inventoryGridEl.innerHTML = ''; 
    const inventory = selectedTrainerData.inventory || {}; 
    let hasItems = false; 
    Object.keys(inventory).forEach(itemName => { 
        if (inventory[itemName] > 0) { 
            hasItems = true; 
            const itemDiv = document.createElement('div'); 
            itemDiv.classList.add('inventory-item'); 
            const itemIcon = document.createElement('img'); 
            itemIcon.classList.add('item-icon'); 
            if (itemName.toLowerCase().includes("great")) { itemIcon.style.backgroundImage = 'var(--item-icon-greatball)'; itemIcon.alt = "Great Ball"; } 
            else if (itemName.toLowerCase().includes("evolution")) { itemIcon.style.backgroundImage = 'var(--item-icon-evolutionstone)'; itemIcon.alt = "Evolution Stone"; }
            else { itemIcon.style.backgroundImage = 'var(--item-icon-pokeball)'; itemIcon.alt = "Poké Ball"; } 
            itemIcon.src = "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7"; 
            const itemDetails = document.createElement('div'); 
            itemDetails.classList.add('item-details'); 
            itemDetails.innerHTML = `<span class="item-name">${itemName}</span>: ${inventory[itemName]}`; 
            itemDiv.appendChild(itemIcon); 
            itemDiv.appendChild(itemDetails); 
            inventoryGridEl.appendChild(itemDiv); 
        } 
    }); 
    if (!hasItems && noInventoryItemsMsg) { noInventoryItemsMsg.style.display = 'block'; } 
    else if (noInventoryItemsMsg) { noInventoryItemsMsg.style.display = 'none'; } 
    switchScreen('inventory'); 
}

function showTeamScreen() { 
    if (!selectedTrainerData || !selectedTrainerData.team) { 
        alert("Please select a trainer and have a team."); 
        switchScreen('characterSelect'); 
        return; 
    } 
    teamGridEl.innerHTML = ''; 
    const currentTeam = selectedTrainerData.team.filter(p => p); 
    if (currentTeam.length === 0 && noTeamPokemonMsg) { 
        noTeamPokemonMsg.style.display = 'block'; 
    } else { 
        if(noTeamPokemonMsg) noTeamPokemonMsg.style.display = 'none'; 
        currentTeam.forEach((pokemon, index) => { 
            const pCard = document.createElement('div'); 
            pCard.classList.add('team-pokemon-card');
            pCard.dataset.pokemonId = pokemon.id; 

            const orderControls = document.createElement('div');
            orderControls.classList.add('pokemon-order-controls');
            
            const upButton = document.createElement('button');
            upButton.classList.add('order-btn');
            upButton.innerHTML = '&#9650;'; 
            upButton.disabled = index === 0;
            upButton.addEventListener('click', (e) => { e.stopPropagation(); movePokemonInTeam(index, index - 1); });
            orderControls.appendChild(upButton);

            const downButton = document.createElement('button');
            downButton.classList.add('order-btn');
            downButton.innerHTML = '&#9660;'; 
            downButton.disabled = index === currentTeam.length - 1;
            downButton.addEventListener('click', (e) => { e.stopPropagation(); movePokemonInTeam(index, index + 1); });
            orderControls.appendChild(downButton);
            
            pCard.appendChild(orderControls);

            const pSprite = document.createElement('img'); 
            pSprite.classList.add('pokemon-list-sprite'); 
            pSprite.src = pokemon.spriteFrontUrl; 
            pSprite.alt = pokemon.name.toUpperCase(); 
            const pDetails = document.createElement('div'); 
            pDetails.classList.add('pokemon-details'); 
            pDetails.innerHTML = `<span class="pokemon-name">${pokemon.name.toUpperCase()}</span> <br>HP: ${Math.floor(pokemon.currentHP)}/${pokemon.maxHP} ${pokemon.status ? '('+pokemon.status.toUpperCase()+')' : ''}`; 
            pCard.appendChild(pSprite); 
            pCard.appendChild(pDetails); 
            teamGridEl.appendChild(pCard); 
        }); 
    } 
    switchScreen('team'); 
}

function movePokemonInTeam(currentIndex, newIndex) {
    if (!selectedTrainerData || !selectedTrainerData.team) return;
    if (newIndex < 0 || newIndex >= selectedTrainerData.team.length) return;

    const team = selectedTrainerData.team;
    const pokemonToMove = team.splice(currentIndex, 1)[0];
    team.splice(newIndex, 0, pokemonToMove);
    
    saveGame();
    showTeamScreen(); 
}

function showPcBoxScreen() {
    if (!selectedTrainerData) {
        alert("Please select a trainer first.");
        switchScreen('characterSelect');
        return;
    }
    pcTeamGridEl.innerHTML = '';
    pcBoxGridEl.innerHTML = '';

    const team = selectedTrainerData.team.filter(p => p);
    const pcBox = selectedTrainerData.pcBox.filter(p => p);

    pcTeamCountEl.textContent = team.length;
    pcBoxCountEl.textContent = pcBox.length;
    pcBoxCapacityEl.textContent = MAX_PC_BOX_SIZE;

    if (team.length === 0 && noPokemonPcTeamMsg) noPokemonPcTeamMsg.style.display = 'block';
    else if (noPokemonPcTeamMsg) noPokemonPcTeamMsg.style.display = 'none';
    
    if (pcBox.length === 0 && noPokemonPcBoxMsg) noPokemonPcBoxMsg.style.display = 'block';
    else if (noPokemonPcBoxMsg) noPokemonPcBoxMsg.style.display = 'none';

    team.forEach((pokemon, index) => {
        const pCard = createPcPokemonCard(pokemon, 'team', index);
        pcTeamGridEl.appendChild(pCard);
    });

    pcBox.forEach((pokemon, index) => {
        const pCard = createPcPokemonCard(pokemon, 'pc', index);
        pcBoxGridEl.appendChild(pCard);
    });

    switchScreen('pcBox');
}

function createPcPokemonCard(pokemon, location, index) {
    const pCard = document.createElement('div');
    pCard.classList.add('pc-pokemon-card');
    pCard.dataset.pokemonId = pokemon.id;
    pCard.dataset.location = location;
    pCard.dataset.index = index;

    const pSprite = document.createElement('img');
    pSprite.classList.add('pokemon-list-sprite');
    pSprite.src = pokemon.spriteFrontUrl;
    pSprite.alt = pokemon.name.toUpperCase();
    pCard.appendChild(pSprite);

    const pDetails = document.createElement('div');
    pDetails.classList.add('pokemon-details');
    pDetails.innerHTML = `<span class="pokemon-name">${pokemon.name.toUpperCase()}</span> <br>HP: ${Math.floor(pokemon.currentHP)}/${pokemon.maxHP} ${pokemon.status ? '('+pokemon.status.toUpperCase()+')' : ''}`;
    pCard.appendChild(pDetails);

    const moveButton = document.createElement('button');
    moveButton.classList.add('pc-move-button');
    if (location === 'team') {
        moveButton.textContent = 'To PC';
        moveButton.disabled = selectedTrainerData.pcBox.length >= MAX_PC_BOX_SIZE;
        moveButton.addEventListener('click', (e) => { e.stopPropagation(); movePokemonToPc(index); });
    } else { // location === 'pc'
        moveButton.textContent = 'To Team';
        moveButton.disabled = selectedTrainerData.team.length >= MAX_TEAM_SIZE;
        moveButton.addEventListener('click', (e) => { e.stopPropagation(); movePokemonToTeam(index); });
    }
    pCard.appendChild(moveButton);

    return pCard;
}

function movePokemonToPc(teamIndex) {
    if (!selectedTrainerData || !selectedTrainerData.team[teamIndex] || selectedTrainerData.pcBox.length >= MAX_PC_BOX_SIZE) {
        alert("Cannot move Pokémon to PC. PC might be full or Pokémon not found.");
        return;
    }
    if (selectedTrainerData.team.length <= 1 && selectedTrainerData.team[teamIndex]) {
         alert("You must keep at least one Pokémon in your team!");
         return;
    }

    const pokemonToMove = selectedTrainerData.team.splice(teamIndex, 1)[0];
    selectedTrainerData.pcBox.push(pokemonToMove);
    saveGame();
    showPcBoxScreen();
}

function movePokemonToTeam(pcIndex) {
    if (!selectedTrainerData || !selectedTrainerData.pcBox[pcIndex] || selectedTrainerData.team.length >= MAX_TEAM_SIZE) {
        alert("Cannot move Pokémon to team. Team might be full or Pokémon not found.");
        return;
    }
    const pokemonToMove = selectedTrainerData.pcBox.splice(pcIndex, 1)[0];
    selectedTrainerData.team.push(pokemonToMove);
    saveGame();
    showPcBoxScreen();
}


function buyItem(itemName, price) { if (!selectedTrainerData) return; price = parseInt(price); if (selectedTrainerData.coins >= price) { selectedTrainerData.coins -= price; selectedTrainerData.inventory[itemName] = (selectedTrainerData.inventory[itemName] || 0) + 1; updateCoinDisplay(); saveGame(); alert(`Successfully bought 1 ${itemName}!`); } else { alert("Not enough coins!"); } }

function getUniqueRandomPokemon(existingPokedexIds, fromPool) {
    const available = fromPool.filter(p => !existingPokedexIds.includes(p.pokedexId));
    if (available.length === 0) return null; 
    return available[Math.floor(Math.random() * available.length)];
}

function startQuickBattle() {
    battleState.isWildBattle = false;
    battleState.isGymBattle = false;
    battleState.playerTeam = []; 
    battleState.opponentTeam = []; 
    
    let availableForPlayer = [...pokemonPool];
    let playerPokedexIds = [];
    for (let i = 0; i < 3; i++) {
        if (availableForPlayer.length === 0) break;
        let poolIdx = Math.floor(Math.random() * availableForPlayer.length);
        let chosenData = availableForPlayer.splice(poolIdx, 1)[0];
        battleState.playerTeam.push(createPokemonFromData(chosenData, false, true));
        playerPokedexIds.push(chosenData.pokedexId);
    }

    let availableForOpponent = pokemonPool.filter(p => !playerPokedexIds.includes(p.pokedexId));
    if (availableForOpponent.length < 3) { 
        availableForOpponent = [...pokemonPool];
    }
    
    for (let i = 0; i < 3; i++) {
        if (availableForOpponent.length === 0) { 
             if (pokemonPool.length > 0) battleState.opponentTeam.push(createPokemonFromData(pokemonPool[Math.floor(Math.random()*pokemonPool.length)], true, false));
             else break; 
        } else {
            let poolIdx = Math.floor(Math.random() * availableForOpponent.length);
            let chosenData = availableForOpponent.splice(poolIdx, 1)[0];
            battleState.opponentTeam.push(createPokemonFromData(chosenData, true, false));
        }
    }
    
    if (battleState.playerTeam.length === 0 || battleState.opponentTeam.length === 0) {
        alert("Error: Could not set up teams for Quick Battle. Pokemon pool might be too small.");
        switchScreen('mainMenu');
        return;
    }

    battleState.playerActiveIndex = 0; 
    battleState.opponentActiveIndex = 0; 
    
    updateBattleUI(); 
    switchScreen('battle'); 
    const opponent = battleState.opponentTeam[0];
    const introMsg = opponent.isShiny ? `Opponent sent out SHINY ${opponent.name.toUpperCase()}!` : `Opponent sent out ${opponent.name.toUpperCase()}!`;
    typeMessage(introMsg, () => { 
        battleState.onMessageComplete = () => { 
            typeMessage(`Go ${battleState.playerTeam[0].name.toUpperCase()}!`, startTurnPhase); 
        } 
    }); 
}

function prepareBattle(battleFunction) {
    if (!selectedTrainerData || !selectedTrainerData.team || selectedTrainerData.team.length === 0) {
        alert("You have no Pokémon! Please choose a starter or catch one in Wild Mode.");
        switchScreen('mainMenu');
        return;
    }
    selectedTrainerData.team.forEach(p => {
        if(p) { 
            p.currentHP = p.maxHP;
            p.status = null;
            p.sleepTurns = 0;
            p.flinch = false;
            p.stats = { attack: 0, defense: 0, speed: 0, accuracy: 0, evasion: 0 };
            p.moves.forEach(m => m.currentPp = m.maxPp);

            if (p.originalEvolutionData) { 
                const oldMaxHPBeforeRevert = p.maxHP;
                const currentHPRatio = (oldMaxHPBeforeRevert > 0) ? (p.currentHP / oldMaxHPBeforeRevert) : 0;
                p.pokedexId = p.originalEvolutionData.pokedexId;
                p.name = p.originalEvolutionData.name;
                p.types = [...p.originalEvolutionData.types];
                p.maxHP = p.originalEvolutionData.maxHP;
                p.currentHP = Math.max(0, Math.floor(currentHPRatio * p.maxHP));
                p.baseStats = JSON.parse(JSON.stringify(p.originalEvolutionData.baseStats));
                p.moves = p.originalEvolutionData.moves.map(m => ({ ...m, currentPp: m.maxPp })); 
                p.spriteFrontUrl = p.originalEvolutionData.spriteFrontUrl;
                p.spriteBackUrl = p.originalEvolutionData.spriteBackUrl;
                p.isShiny = p.originalEvolutionData.isShiny;
                p.originalEvolutionData = null;
            }
        }
    });

    if (selectedTrainerData.team.length > 3) {
        battleState.pendingBattleStartFunction = battleFunction;
        showTeamSelectScreen();
    } else {
        battleState.playerTeam = JSON.parse(JSON.stringify(selectedTrainerData.team.filter(p => p))); 
        battleFunction(); 
    }
}

function showTeamSelectScreen() {
    teamSelectGridEl.innerHTML = '';
    battleState.selectedBattleTeamIndexes = []; 
    teamSelectConfirmButton.disabled = true;

    selectedTrainerData.team.forEach((pokemon, index) => {
        if (!pokemon) return; 
        const opt = document.createElement('div');
        opt.classList.add('team-select-option');
        opt.dataset.index = index; 

        const sp = document.createElement('img');
        sp.src = pokemon.spriteFrontUrl;
        sp.alt = pokemon.name.toUpperCase();
        opt.appendChild(sp);

        const nfo = document.createElement('div');
        nfo.classList.add('team-select-info');
        nfo.innerHTML = `<span class="name">${pokemon.name.toUpperCase()}</span><div class="hp-bar-container"><div class="hp-bar-fill" style="width:${Math.max(0,(pokemon.currentHP/pokemon.maxHP)*100)}%; background-color:${pokemon.currentHP/pokemon.maxHP > 0.5 ? 'var(--hp-high-color)' : (pokemon.currentHP/pokemon.maxHP > 0.2 ? 'var(--hp-medium-color)' : 'var(--hp-low-color)')};"></div></div><div class="hp-numbers">${Math.max(0,Math.floor(pokemon.currentHP))}/${pokemon.maxHP}</div>`;
        opt.appendChild(nfo);

        if (pokemon.currentHP <= 0) { 
            opt.classList.add('fainted', 'disabled');
        } else {
            opt.addEventListener('click', () => toggleTeamSelectOption(opt, index));
        }
        teamSelectGridEl.appendChild(opt);
    });
    switchScreen('teamSelect');
}

function toggleTeamSelectOption(optionElement, pokemonIndex) {
    if (optionElement.classList.contains('fainted')) return;

    const indexInSelection = battleState.selectedBattleTeamIndexes.indexOf(pokemonIndex);

    if (indexInSelection > -1) { 
        battleState.selectedBattleTeamIndexes.splice(indexInSelection, 1);
        optionElement.classList.remove('selected');
    } else { 
        if (battleState.selectedBattleTeamIndexes.length < 3) {
            battleState.selectedBattleTeamIndexes.push(pokemonIndex);
            optionElement.classList.add('selected');
        } else {
            alert("You can only select up to 3 Pokémon.");
        }
    }
    teamSelectConfirmButton.disabled = battleState.selectedBattleTeamIndexes.length !== 3;
}

teamSelectConfirmButton.addEventListener('click', () => {
    if (battleState.selectedBattleTeamIndexes.length === 3) {
        battleState.playerTeam = battleState.selectedBattleTeamIndexes.map(index => {
            return JSON.parse(JSON.stringify(selectedTrainerData.team[index]));
        });

        if (battleState.pendingBattleStartFunction) {
            battleState.pendingBattleStartFunction();
            battleState.pendingBattleStartFunction = null; 
        }
    }
});


function startWildBattleActual() {
    battleState.isWildBattle = true;
    battleState.isGymBattle = false;
    battleState.opponentTeam = [];
    const wildPokemonData = pokemonPool[Math.floor(Math.random() * pokemonPool.length)];
    battleState.opponentTeam.push(createPokemonFromData(wildPokemonData, true, false)); 

    battleState.playerActiveIndex = 0;
    battleState.opponentActiveIndex = 0;
    
    updateBattleUI();
    switchScreen('battle');
    const opponent = battleState.opponentTeam[0];
    const introMsg = opponent.isShiny ? `A wild SHINY ${opponent.name.toUpperCase()} appeared!` : `A wild ${opponent.name.toUpperCase()} appeared!`;
    typeMessage(introMsg, () => {
        battleState.onMessageComplete = () => {
            typeMessage(`Go ${battleState.playerTeam[0].name.toUpperCase()}!`, startTurnPhase);
        }
    });
}

function startGymBattleActual() {
    battleState.isWildBattle = false;
    battleState.isGymBattle = true;
    
    const leaderData = gymLeadersData[battleState.currentGymLeaderKey];
    if (!leaderData) {
        alert("Error: Gym Leader data not found!");
        switchScreen('playMenu');
        return;
    }

    battleState.opponentTeam = leaderData.pokemonTeam.map(pokemonName => {
        const pokemonBase = pokemonPool.find(p => p.name.toUpperCase() === pokemonName.toUpperCase());
        if (!pokemonBase) {
            console.error(`Pokemon ${pokemonName} not found in pool for Gym Leader ${leaderData.name}`);
            return null; 
        }
        return createPokemonFromData(pokemonBase, true, false); 
    }).filter(p => p !== null);

    if (battleState.opponentTeam.length === 0) {
        alert(`Error: Could not set up Gym Leader ${leaderData.name}'s team.`);
        switchScreen('playMenu');
        return;
    }
    
    battleState.playerActiveIndex = 0;
    battleState.opponentActiveIndex = 0;

    updateBattleUI();
    switchScreen('battle');
    const opponent = battleState.opponentTeam[0];
    const introMsg = `${leaderData.name} challenges you to a battle! ${leaderData.name} sent out ${opponent.name.toUpperCase()}!`;
    typeMessage(introMsg, () => {
        battleState.onMessageComplete = () => {
            typeMessage(`Go ${battleState.playerTeam[0].name.toUpperCase()}!`, startTurnPhase);
        }
    });
}


function startTurnPhase() { if(!battleState.playerTeam[battleState.playerActiveIndex] || !battleState.opponentTeam[battleState.opponentActiveIndex]) {console.warn("Attempted to start turn phase with undefined active Pokemon."); return;} battleState.playerTeam[battleState.playerActiveIndex].flinch = false; if (battleState.opponentTeam[battleState.opponentActiveIndex]) battleState.opponentTeam[battleState.opponentActiveIndex].flinch = false; battleState.attackerUsedMoveFirstThisTurn = false; determineMoveOrder(); }
function determineMoveOrder() { if(!battleState.playerTeam[battleState.playerActiveIndex] || !battleState.opponentTeam[battleState.opponentActiveIndex]) {console.warn("Attempted to determine move order with undefined active Pokemon."); return;} const playerPokemon = battleState.playerTeam[battleState.playerActiveIndex]; const opponentPokemon = battleState.opponentTeam[battleState.opponentActiveIndex]; const playerMoveCheck = checkCanMove(playerPokemon, true); if (playerMoveCheck.message) { typeMessage(playerMoveCheck.message, () => { if (!playerMoveCheck.canMove) { battleState.currentActingPokemonIsPlayer = false; opponentActionPhase(); } else { playerActionPhase(); } }); } else { playerActionPhase(); } }

function playerActionPhase() {
    if(!battleState.playerTeam[battleState.playerActiveIndex]) {
        console.warn("Attempted player action phase with undefined active Pokemon.");
        return;
    }
    battleState.playerTurn = true;
    battleState.currentActingPokemonIsPlayer = true;
    const activePlayerPokemon = battleState.playerTeam[battleState.playerActiveIndex];
    
    actionMenuEl.style.display = 'none';
    moveMenuEl.style.display = 'none';
    itemMenuEl.style.display = 'none';

    const itemButtonInActionMenu = actionMenuEl.querySelector('button[data-action="item"]');
    if (itemButtonInActionMenu) {
        itemButtonInActionMenu.style.display = 'block'; 
        let hasAnyUsableItem = false;
        if (selectedTrainerData && selectedTrainerData.inventory && activePlayerPokemon) {
            if ((selectedTrainerData.inventory["Evolution Stone"] > 0 || selectedTrainerData.inventory["Perma Evolution Stone"] > 0) && getEvolutionTarget(activePlayerPokemon.pokedexId)) {
                hasAnyUsableItem = true;
            }
            if (battleState.isWildBattle && 
               (selectedTrainerData.inventory["Poke Ball"] > 0 || selectedTrainerData.inventory["Great Ball"] > 0)) {
                hasAnyUsableItem = true;
            }
        }
        itemButtonInActionMenu.disabled = !hasAnyUsableItem;
    }

    const runButtonInActionMenu = actionMenuEl.querySelector('button[data-action="run"]');
    if (runButtonInActionMenu) {
        runButtonInActionMenu.style.display = 'block'; 
        runButtonInActionMenu.disabled = battleState.isGymBattle; 
    }

    const pokemonButtonInActionMenu = actionMenuEl.querySelector('button[data-action="pokemon"]');
    if (pokemonButtonInActionMenu) {
        pokemonButtonInActionMenu.style.display = 'block';
        const switchablePokemon = battleState.playerTeam.filter((p, i) => p.currentHP > 0 && i !== battleState.playerActiveIndex);
        pokemonButtonInActionMenu.disabled = switchablePokemon.length === 0;
    }

    const fightButtonInActionMenu = actionMenuEl.querySelector('button[data-action="fight"]');
    if (fightButtonInActionMenu) {
        fightButtonInActionMenu.style.display = 'block';
        fightButtonInActionMenu.disabled = false; 
    }
    
    typeMessage(`What will ${activePlayerPokemon.name.toUpperCase()} do?`, () => {
        actionMenuEl.style.display = 'grid'; 
        updateBattleUI(); 
    });
}

function opponentActionPhase() { if(!battleState.opponentTeam[battleState.opponentActiveIndex] || !battleState.playerTeam[battleState.playerActiveIndex]) {console.warn("Attempted opponent action phase with undefined active Pokemon."); return;} battleState.playerTurn = false; battleState.currentActingPokemonIsPlayer = false; const opponentPokemon = battleState.opponentTeam[battleState.opponentActiveIndex]; const opponentMoveCheck = checkCanMove(opponentPokemon, false); if (opponentMoveCheck.message) { typeMessage(opponentMoveCheck.message, () => { if (!opponentMoveCheck.canMove) { handleEndOfTurnStatusEffects(); } else { opponentChooseAndExecuteMove(); } }); } else { opponentChooseAndExecuteMove(); } }
function opponentChooseAndExecuteMove() { if(!battleState.opponentTeam[battleState.opponentActiveIndex] || !battleState.playerTeam[battleState.playerActiveIndex]) {console.warn("Attempted opponent move with undefined active Pokemon."); return;} const attacker = battleState.opponentTeam[battleState.opponentActiveIndex]; const defender = battleState.playerTeam[battleState.playerActiveIndex]; if (attacker.currentHP <= 0) { handleOpponentFaint(); return; } let availableMoves = attacker.moves.filter(m => m.currentPp > 0); if (availableMoves.length === 0) { typeMessage(`${attacker.name.toUpperCase()} has no moves left!`, () => handleEndOfTurnStatusEffects()); return; } const move = availableMoves[Math.floor(Math.random() * availableMoves.length)]; executeMove(attacker, defender, move, false); }
function checkCanMove(pokemon, isPlayer) { if (!pokemon) return { canMove: false, message: null}; const name = pokemon.name.toUpperCase(); if (pokemon.flinch) { pokemon.flinch = false; return { canMove: false, message: `${name} flinched and couldn't move!` }; } if (pokemon.status === "SLP") { if (pokemon.sleepTurns > 0) { pokemon.sleepTurns--; return { canMove: false, message: `${name} is fast asleep.` }; } else { pokemon.status = null; updateStatusTag(pokemon, isPlayer ? playerStatusTagEl : opponentStatusTagEl); return { canMove: true, message: `${name} woke up!` }; } } if (pokemon.status === "FRZ") { if (Math.random() < FREEZE_THAW_CHANCE) { pokemon.status = null; updateStatusTag(pokemon, isPlayer ? playerStatusTagEl : opponentStatusTagEl); return { canMove: true, message: `${name} thawed out!` }; } else { return { canMove: false, message: `${name} is frozen solid!` }; } } if (pokemon.status === "PAR") { if (Math.random() < PARALYSIS_CHANCE_NO_MOVE) { return { canMove: false, message: `${name} is fully paralyzed!` }; } } return { canMove: true, message: null }; }
function showMoveMenu() { if(!battleState.playerTeam[battleState.playerActiveIndex]) {console.warn("Attempted to show move menu with undefined active Pokemon.");return;} actionMenuEl.style.display = 'none'; battleTextboxEl.style.display = 'none'; itemMenuEl.style.display = 'none'; const pPok = battleState.playerTeam[battleState.playerActiveIndex]; const moveBtns = moveMenuEl.querySelectorAll('button'); moveBtns.forEach(b => b.style.visibility = 'hidden'); pPok.moves.forEach((m, i) => { if (moveBtns[i]) { moveBtns[i].style.visibility = 'visible'; moveBtns[i].querySelector('.move-name').textContent = m.name.toUpperCase(); moveBtns[i].querySelector('.move-pp').textContent = `PP ${m.currentPp}/${m.maxPp}`; moveBtns[i].disabled = m.currentPp <= 0; } }); moveMenuEl.style.display = 'grid'; }
function applyStatChange(targetPokemon, stat, stages, targetName, isSelf) { const statNames = Array.isArray(stat) ? stat : [stat]; let messages = []; let anyChange = false; statNames.forEach(s => { const currentStage = targetPokemon.stats[s] || 0; let newStage = currentStage; if (stages > 0) newStage = Math.min(6, currentStage + stages); else if (stages < 0) newStage = Math.max(-6, currentStage + stages); if (newStage !== currentStage) { targetPokemon.stats[s] = newStage; anyChange = true; if (stages === 1) messages.push(`${targetName.toUpperCase()}'s ${s} rose!`); else if (stages > 1) messages.push(`${targetName.toUpperCase()}'s ${s} sharply rose!`); else if (stages === -1) messages.push(`${(isSelf ? targetName.toUpperCase() : "Foe " + targetName.toUpperCase())}'s ${s} fell!`); else if (stages < -1) messages.push(`${(isSelf ? targetName.toUpperCase() : "Foe " + targetName.toUpperCase())}'s ${s} harshly fell!`); } }); if (!anyChange) messages.push(`${targetName.toUpperCase()}'s ${statNames.join(' and ')} won't go any ${stages > 0 ? 'higher' : 'lower'}!`); return messages; }
function executeMove(attacker, defender, move, isPlayerAttacking) { battleState.currentActingPokemonIsPlayer = isPlayerAttacking; const attackerName = attacker.name.toUpperCase(); const defenderName = defender.name.toUpperCase(); let turnMessages = []; if (isPlayerAttacking) battleState.playerSelectedMove = move; else battleState.opponentSelectedMove = move; if (attacker.flinch) { attacker.flinch = false; typeMessage(`${attackerName} flinched!`, () => { if (isPlayerAttacking && battleState.opponentTeam[battleState.opponentActiveIndex]?.currentHP > 0) { opponentActionPhase(); } else if (!isPlayerAttacking && battleState.playerTeam[battleState.playerActiveIndex]?.currentHP > 0) { handleEndOfTurnStatusEffects(); } else { handleEndOfTurnStatusEffects(); } }); return; } move.currentPp--; if(isPlayerAttacking) updateBattleUI(); turnMessages.push({ message: `${attackerName} used ${move.name.toUpperCase()}!`, callback: () => { let hit = true; if (!move.alwaysHits) { const moveAccuracy = move.accuracy || 100; const attackerAccStage = attacker.stats.accuracy || 0; const defenderEvaStage = defender.stats.evasion || 0; const accModifier = calculateStatWithStage(100, attackerAccStage, 'accuracy') / 100; const evaModifier = calculateStatWithStage(100, defenderEvaStage, 'evasion') / 100; const finalAccuracy = moveAccuracy * (accModifier / evaModifier); if (Math.random() * 100 >= finalAccuracy) hit = false; } if (!hit) { turnMessages.push({ message: `${attackerName}'s attack missed!`, callback: () => { if (isPlayerAttacking && battleState.opponentTeam[battleState.opponentActiveIndex]?.currentHP > 0) { opponentActionPhase(); } else { handleEndOfTurnStatusEffects(); } }}); processTurnMessages(turnMessages); return; } playAttackAnimation(move.type, isPlayerAttacking ? playerPokemonSpriteEl.parentElement : opponentPokemonSpriteEl.parentElement, isPlayerAttacking ? opponentPokemonSpriteEl.parentElement : playerPokemonSpriteEl.parentElement, () => { playShakeAnimation(isPlayerAttacking ? opponentPokemonSpriteEl.parentElement : playerPokemonSpriteEl.parentElement); let effectivenessMultiplier = 1; let calculatedDamage = 0; let isCrit = false; if (move.power > 0) { effectivenessMultiplier = calculateTypeEffectiveness(move.type, defender.types); if (effectivenessMultiplier === 0) { calculatedDamage = 0; } else { let critChance = CRITICAL_HIT_CHANCE_BASE * (move.highCritRatio ? 2 : 1); if (Math.random() < critChance) isCrit = true; let effAttackerAttack = calculateStatWithStage(attacker.baseStats.attack, attacker.stats.attack, 'attack'); let effDefenderDefense = calculateStatWithStage(defender.baseStats.defense, defender.stats.defense, 'defense'); if (isCrit) { if (attacker.stats.attack < 0) effAttackerAttack = attacker.baseStats.attack; if (defender.stats.defense > 0) effDefenderDefense = defender.baseStats.defense; } calculatedDamage = Math.max(1, Math.floor((((((2 * GAME_LEVEL / 5 + 2) * effAttackerAttack * move.power) / effDefenderDefense) / 50) + 2) * effectivenessMultiplier * (isCrit ? CRITICAL_HIT_MULTIPLIER : 1))); } defender.currentHP -= calculatedDamage; } updateBattleUI(); if (isCrit) turnMessages.push({ message: "A critical hit!" }); const effText = getEffectivenessText(effectivenessMultiplier, defenderName); if (effText && move.power > 0) turnMessages.push({ message: effText }); if (move.effect) { const effect = move.effect; const canApplyEffect = effectivenessMultiplier > 0; if (effect.type === "status" && defender.status === null && canApplyEffect && (!effect.chance || Math.random() < effect.chance)) { defender.status = effect.condition; if (effect.condition === "SLP") defender.sleepTurns = Math.floor(Math.random() * 3) + 2; else if (effect.condition === "FRZ" && defender.types.includes("Ice")) {} else turnMessages.push({ message: `${defenderName} was ${effect.condition === "BRN" ? "burned" : effect.condition === "PSN" ? "poisoned" : effect.condition === "PAR" ? "paralyzed" : effect.condition === "SLP" ? "put to sleep" : "frozen"}!` }); } else if (effect.type === "stat" && canApplyEffect && (!effect.chance || Math.random() < effect.chance)) { const target = effect.target === "self" ? attacker : defender; const targetN = effect.target === "self" ? attackerName : defenderName; const statMsgs = applyStatChange(target, effect.stat, effect.stages, targetN, effect.target === "self"); statMsgs.forEach(m => turnMessages.push({message: m})); } else if (effect.type === "heal" && effect.target === "self") { const healAmount = Math.floor(attacker.maxHP * effect.percentage); attacker.currentHP = Math.min(attacker.maxHP, attacker.currentHP + healAmount); turnMessages.push({ message: `${attackerName} recovered health!` }); } else if (effect.type === "switch" && effect.target === "opponent" && canApplyEffect) { const targetTeam = isPlayerAttacking ? battleState.opponentTeam : battleState.playerTeam; const currentActiveIdx = isPlayerAttacking ? battleState.opponentActiveIndex : battleState.playerActiveIndex; const availableSwitch = targetTeam.filter((p, i) => p.currentHP > 0 && i !== currentActiveIdx); if (availableSwitch.length > 0) { const oldTargetName = targetTeam[currentActiveIdx].name.toUpperCase(); const newTargetIdx = targetTeam.indexOf(availableSwitch[Math.floor(Math.random() * availableSwitch.length)]); if (isPlayerAttacking) battleState.opponentActiveIndex = newTargetIdx; else battleState.playerActiveIndex = newTargetIdx; turnMessages.push({ message: `${oldTargetName} was dragged out!` }); turnMessages.push({ message: `${(isPlayerAttacking ? "Opponent sent out " : "Go ")}${targetTeam[newTargetIdx].name.toUpperCase()}!`}); battleState.attackerUsedMoveFirstThisTurn = true; } else { turnMessages.push({ message: "But it failed!"}); } } else if (effect.type === "flinch" && canApplyEffect && (!effect.chance || Math.random() < effect.chance)) { if (battleState.attackerUsedMoveFirstThisTurn && !defender.flinch) { defender.flinch = true; } } updateBattleUI(); } processTurnMessages(turnMessages, isPlayerAttacking ? defender : attacker, isPlayerAttacking); }); }}); processTurnMessages(turnMessages, isPlayerAttacking ? defender : attacker, isPlayerAttacking); }
function processTurnMessages(messages, nextPokemonToActIfApplicable, isOriginalAttackerPlayer) { if (messages.length > 0) { const nextMsg = messages.shift(); typeMessage(nextMsg.message, nextMsg.callback || (() => processTurnMessages(messages, nextPokemonToActIfApplicable, isOriginalAttackerPlayer))); } else { if(!battleState.playerTeam[battleState.playerActiveIndex] || !battleState.opponentTeam[battleState.opponentActiveIndex]) {console.warn("Attempted to process turn end with undefined active Pokemon."); return;} const playerPokemon = battleState.playerTeam[battleState.playerActiveIndex]; const opponentPokemon = battleState.opponentTeam[battleState.opponentActiveIndex]; if (playerPokemon.currentHP <= 0) { handlePlayerFaint(); return; } if (opponentPokemon.currentHP <= 0) { handleOpponentFaint(); return; } if (isOriginalAttackerPlayer) { opponentActionPhase(); } else { handleEndOfTurnStatusEffects(); } } }
function playerAttack(moveIndex) { if(!battleState.playerTeam[battleState.playerActiveIndex] || !battleState.opponentTeam[battleState.opponentActiveIndex]) {console.warn("Attempted player attack with undefined active Pokemon."); return;} moveMenuEl.style.display = 'none'; const attacker = battleState.playerTeam[battleState.playerActiveIndex]; const defender = battleState.opponentTeam[battleState.opponentActiveIndex]; const move = attacker.moves[moveIndex]; if (!move || move.currentPp <= 0) { playerActionPhase(); return; } battleState.attackerUsedMoveFirstThisTurn = true; executeMove(attacker, defender, move, true); }
function handleEndOfTurnStatusEffects() { if(!battleState.playerTeam[battleState.playerActiveIndex] || !battleState.opponentTeam[battleState.opponentActiveIndex]) {console.warn("Attempted EOT effects with undefined active Pokemon."); return;} let turnEndMessages = []; let playerFaintedFromStatus = false; let opponentFaintedFromStatus = false; const playerPokemon = battleState.playerTeam[battleState.playerActiveIndex]; const opponentPokemon = battleState.opponentTeam[battleState.opponentActiveIndex]; const applyEOT = (pokemon, isPlayer) => { if (pokemon.currentHP > 0 && pokemon.status) { if (pokemon.status === "BRN" || pokemon.status === "PSN") { const damage = Math.floor(pokemon.maxHP / (pokemon.status === "PSN" ? 8 : 16)); pokemon.currentHP -= damage; turnEndMessages.push({ message: `${pokemon.name.toUpperCase()} was hurt by its ${pokemon.status === "BRN" ? "burn" : "poison"}!` }); if (pokemon.currentHP <= 0) isPlayer ? playerFaintedFromStatus = true : opponentFaintedFromStatus = true; } } }; applyEOT(playerPokemon, true); if (playerFaintedFromStatus) turnEndMessages.push({ message: `${playerPokemon.name.toUpperCase()} fainted!` }); if (opponentPokemon.currentHP > 0) { applyEOT(opponentPokemon, false); if (opponentFaintedFromStatus) turnEndMessages.push({ message: `${opponentPokemon.name.toUpperCase()} fainted!` }); } updateBattleUI(); const showEOTMessages = () => { if (turnEndMessages.length > 0) { const msg = turnEndMessages.shift(); typeMessage(msg.message, showEOTMessages); } else { if (playerPokemon.currentHP <= 0) handlePlayerFaint(); else if (opponentPokemon.currentHP <= 0) handleOpponentFaint(); else setTimeout(startTurnPhase, 800); } }; showEOTMessages(); }
function showSwitchScreen(isForced = false) { battleState.switchingAfterFaint = isForced; actionMenuEl.style.display = 'none'; moveMenuEl.style.display = 'none'; itemMenuEl.style.display = 'none'; battleTextboxEl.style.display = 'none'; switchGridEl.innerHTML = ''; battleState.playerTeam.forEach((p, i) => { const opt = document.createElement('div'); opt.classList.add('switch-option'); opt.dataset.index = i; const sp = document.createElement('img'); sp.src = p.spriteFrontUrl; sp.alt = p.name.toUpperCase(); opt.appendChild(sp); const nfo = document.createElement('div'); nfo.classList.add('switch-info'); nfo.innerHTML = `<span class="name">${p.name.toUpperCase()} ${p.status ? '('+p.status.toUpperCase()+')' : ''}</span><div class="hp-bar-container"><div class="hp-bar-fill" style="width:${Math.max(0,(p.currentHP/p.maxHP)*100)}%; background-color:${p.currentHP/p.maxHP > 0.5 ? 'var(--hp-high-color)' : (p.currentHP/p.maxHP > 0.2 ? 'var(--hp-medium-color)' : 'var(--hp-low-color)')};"></div></div><div class="hp-numbers">${Math.max(0,Math.floor(p.currentHP))}/${p.maxHP}</div>`; opt.appendChild(nfo); if (p.currentHP <= 0) opt.classList.add('fainted'); else if (i === battleState.playerActiveIndex) opt.classList.add('active'); else opt.addEventListener('click', () => switchPokemonAction(i)); switchGridEl.appendChild(opt); }); switchCancelButton.style.display = isForced ? 'none' : 'block'; switchScreen('switchPokemon'); }
function switchPokemonAction(newIndex) { if(!battleState.playerTeam[battleState.playerActiveIndex] || !battleState.playerTeam[newIndex]) {console.warn("Attempted switch with undefined Pokemon."); return;} const oldPok = battleState.playerTeam[battleState.playerActiveIndex]; const newPok = battleState.playerTeam[newIndex]; if (newPok.currentHP <= 0 || newIndex === battleState.playerActiveIndex) return; battleState.playerActiveIndex = newIndex; updateBattleUI(); switchScreen('battle'); let msgs = []; if (!battleState.switchingAfterFaint) { msgs.push({ message: `Come back, ${oldPok.name.toUpperCase()}!`}); battleState.playerTurn = false; } msgs.push({ message: `Go, ${newPok.name.toUpperCase()}!`, callback: null }); const finalCb = () => { battleState.switchingAfterFaint = false; if (!battleState.playerTurn && battleState.opponentTeam[battleState.opponentActiveIndex] && battleState.opponentTeam[battleState.opponentActiveIndex].currentHP > 0) { opponentActionPhase(); } else { startTurnPhase(); } }; const showNxt = () => { if (msgs.length > 0) { const n = msgs.shift(); typeMessage(n.message, n.callback || showNxt); } else { setTimeout(finalCb, 500); } }; showNxt(); }

function finalizeBattleState() {
    if (!selectedTrainerData || !selectedTrainerData.team) return;

    battleState.playerTeam.forEach(battlePok => {
        if(!battlePok) return; 
        const trainerPok = selectedTrainerData.team.find(p => p && p.id === battlePok.id);
        if (trainerPok) {
            trainerPok.currentHP = Math.max(0, battlePok.currentHP);
            trainerPok.status = battlePok.status;
            trainerPok.sleepTurns = battlePok.sleepTurns; 
            trainerPok.flinch = false; 
            trainerPok.stats = { attack: 0, defense: 0, speed: 0, accuracy: 0, evasion: 0 };

            trainerPok.moves.forEach(tpMove => {
                tpMove.currentPp = tpMove.maxPp; 
            });

            if (battlePok.originalEvolutionData) { 
                const oldMaxHPBeforeRevert = trainerPok.maxHP; 
                const currentHPRatio = (oldMaxHPBeforeRevert > 0) ? (trainerPok.currentHP / oldMaxHPBeforeRevert) : 0;
                trainerPok.pokedexId = battlePok.originalEvolutionData.pokedexId;
                trainerPok.name = battlePok.originalEvolutionData.name;
                trainerPok.types = [...battlePok.originalEvolutionData.types];
                trainerPok.maxHP = battlePok.originalEvolutionData.maxHP;
                trainerPok.currentHP = Math.max(0, Math.floor(currentHPRatio * trainerPok.maxHP));
                if (battlePok.currentHP <= 0) trainerPok.currentHP = 0; 
                trainerPok.baseStats = JSON.parse(JSON.stringify(battlePok.originalEvolutionData.baseStats));
                trainerPok.moves = battlePok.originalEvolutionData.moves.map(m => ({ ...m, currentPp: m.maxPp })); 
                trainerPok.spriteFrontUrl = battlePok.originalEvolutionData.spriteFrontUrl;
                trainerPok.spriteBackUrl = battlePok.originalEvolutionData.spriteBackUrl;
                trainerPok.isShiny = battlePok.originalEvolutionData.isShiny;
                trainerPok.originalEvolutionData = null; 
                battlePok.originalEvolutionData = null; 
            }
        }
    });
    saveGame();
}

function handlePlayerFaint() { 
    if(!battleState.playerTeam[battleState.playerActiveIndex]) {
        console.warn("Attempted player faint with undefined Pokemon."); return;
    }
    const p = battleState.playerTeam[battleState.playerActiveIndex]; 
    const cb = () => { 
        const rem = battleState.playerTeam.filter(pk => pk.currentHP > 0); 
        if (rem.length === 0) { 
            let coinsEarned = 0;
            let lossMessage = "You have no more Pokémon! You lost the battle!";
            if (battleState.isGymBattle) {
                coinsEarned = 10;
                lossMessage = `You lost to Gym Leader ${gymLeadersData[battleState.currentGymLeaderKey].name}! You earned ${coinsEarned} coins.`;
            } else if (!battleState.isWildBattle) { 
                coinsEarned = 5;
                lossMessage = `You lost the Quick Battle! You earned ${coinsEarned} coins.`;
            }
            if (selectedTrainerData && coinsEarned > 0) {
                selectedTrainerData.coins = (selectedTrainerData.coins || 0) + coinsEarned;
                updateCoinDisplay();
            }
            typeMessage(lossMessage, () => setTimeout(() => { 
                finalizeBattleState(); 
                battleState.isWildBattle = false; 
                battleState.isGymBattle = false;
                battleState.currentGymLeaderKey = null;
                switchScreen('mainMenu'); 
            }, 1000)); 
        } else { 
            showSwitchScreen(true); 
        }
    }; 
    if (battleState.isProcessingMessage) battleState.messageQueue.push({message: `${p.name.toUpperCase()} fainted!`, callback: cb}); 
    else typeMessage(`${p.name.toUpperCase()} fainted!`, cb); 
    updateBattleUI(); 
} 

function handleOpponentFaint() { 
    if(!battleState.opponentTeam[battleState.opponentActiveIndex]) {
        console.warn("Attempted opponent faint with undefined Pokemon."); return;
    }
    const o = battleState.opponentTeam[battleState.opponentActiveIndex]; 
    const cb = () => { 
        let coinsEarned = 0;
        let winMessages = []; 

        if (battleState.isWildBattle) { 
            coinsEarned = 3;
            winMessages.push(`The wild ${o.name.toUpperCase()} fainted! You earned ${coinsEarned} coins!`);
        } else if (battleState.isGymBattle) {
            const remOpponent = battleState.opponentTeam.filter(pk => pk.currentHP > 0);
            if (remOpponent.length === 0) { 
                coinsEarned = 30;
                const leaderData = gymLeadersData[battleState.currentGymLeaderKey];
                winMessages.push(`You defeated Gym Leader ${leaderData.name}!`);
                winMessages.push(`You earned the ${leaderData.badgeName} and ${coinsEarned} coins!`);
                if (selectedTrainerData && !selectedTrainerData.defeatedGymLeaders.includes(battleState.currentGymLeaderKey)) {
                    selectedTrainerData.defeatedGymLeaders.push(battleState.currentGymLeaderKey);
                }
            }
        } else { 
             const remOpponent = battleState.opponentTeam.filter(pk => pk.currentHP > 0);
             if (remOpponent.length === 0) {
                coinsEarned = 15; 
                winMessages.push(`You defeated the opponent and earned ${coinsEarned} coins!`);
             }
        }

        if (selectedTrainerData && coinsEarned > 0) { 
            selectedTrainerData.coins = (selectedTrainerData.coins || 0) + coinsEarned; 
            updateCoinDisplay(); 
        } 

        const processWinMessages = () => {
            if (winMessages.length > 0) {
                typeMessage(winMessages.shift(), processWinMessages);
            } else {
                const remOpponent = battleState.opponentTeam.filter(pk => pk.currentHP > 0);
                if (remOpponent.length === 0) { 
                    setTimeout(() => { 
                        finalizeBattleState(); 
                        battleState.isWildBattle = false; 
                        battleState.isGymBattle = false;
                        battleState.currentGymLeaderKey = null;
                        switchScreen('mainMenu'); 
                    }, 1200);
                } else { 
                    let nxtIdx = -1; 
                    for (let i=0; i<battleState.opponentTeam.length; i++) if (battleState.opponentTeam[i].currentHP > 0) { nxtIdx = i; break; } 
                    if (nxtIdx !== -1) { 
                        battleState.opponentActiveIndex = nxtIdx; 
                        const newOpp = battleState.opponentTeam[nxtIdx]; 
                        typeMessage(`Opponent sent out ${newOpp.name.toUpperCase()}!`, () => { 
                            updateBattleUI(); 
                            setTimeout(startTurnPhase, 800); 
                        }); 
                    } else { 
                        typeMessage("Error: Opponent has no more Pokémon?", () => { finalizeBattleState(); switchScreen('mainMenu'); }); 
                    }
                }
            }
        };
        typeMessage(`Foe's ${o.name.toUpperCase()} fainted!`, processWinMessages);
    }; 
    cb(); 
    updateBattleUI(); 
}

function getEvolutionTarget(currentPokedexId) { 
    const currentPokemonData = pokemonPool.find(p => p.pokedexId === currentPokedexId);
    if (currentPokemonData && typeof currentPokemonData.evolvesToPokedexId === 'number') {
        return pokemonPool.find(p => p.pokedexId === currentPokemonData.evolvesToPokedexId);
    }
    return null;
}

function evolvePokemon(pokemonToEvolve, evolvedFormData, isPermanentEvolution = false) {
    const originalName = pokemonToEvolve.name.toUpperCase();
    const originalPokedexId = pokemonToEvolve.pokedexId;

    if (!isPermanentEvolution && !pokemonToEvolve.originalEvolutionData) {
        pokemonToEvolve.originalEvolutionData = {
            pokedexId: originalPokedexId, name: pokemonToEvolve.name, types: [...pokemonToEvolve.types],
            maxHP: pokemonToEvolve.maxHP, baseStats: JSON.parse(JSON.stringify(pokemonToEvolve.baseStats)),
            moves: pokemonToEvolve.moves.map(m => ({ ...m })), spriteFrontUrl: pokemonToEvolve.spriteFrontUrl,
            spriteBackUrl: pokemonToEvolve.spriteBackUrl, isShiny: pokemonToEvolve.isShiny,
            evolvesToPokedexId: pokemonToEvolve.evolvesToPokedexId 
        };
    } else if (isPermanentEvolution) {
        pokemonToEvolve.originalEvolutionData = null; 
    }
    
    pokemonToEvolve.pokedexId = evolvedFormData.pokedexId; 
    pokemonToEvolve.name = evolvedFormData.name.toUpperCase();
    pokemonToEvolve.types = [...evolvedFormData.types];
    const oldMaxHP = pokemonToEvolve.maxHP;
    pokemonToEvolve.maxHP = evolvedFormData.hp;
    pokemonToEvolve.currentHP = Math.max(1, Math.floor((pokemonToEvolve.currentHP / oldMaxHP) * pokemonToEvolve.maxHP));
    pokemonToEvolve.baseStats = JSON.parse(JSON.stringify(evolvedFormData.baseStats));
    pokemonToEvolve.moves = evolvedFormData.moves.map(m => ({ ...m, currentPp: m.maxPp })); 
    pokemonToEvolve.evolvesToPokedexId = evolvedFormData.evolvesToPokedexId || null; 
    
    pokemonToEvolve.spriteFrontUrl = evolvedFormData.spriteFront; 
    pokemonToEvolve.spriteBackUrl = evolvedFormData.spriteBack;   
    if (pokemonToEvolve.isShiny) { 
         const shinyBaseUrl = "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon";
         pokemonToEvolve.spriteFrontUrl = `${shinyBaseUrl}/shiny/${evolvedFormData.pokedexId}.png`;
         pokemonToEvolve.spriteBackUrl = `${shinyBaseUrl}/back/shiny/${evolvedFormData.pokedexId}.png`;
    }

    if (isPermanentEvolution) {
        const teamPokemonInstance = selectedTrainerData.team.find(p => p && p.id === pokemonToEvolve.id);
        if (teamPokemonInstance) {
            teamPokemonInstance.pokedexId = pokemonToEvolve.pokedexId;
            teamPokemonInstance.name = pokemonToEvolve.name.toUpperCase();
            teamPokemonInstance.types = [...pokemonToEvolve.types];
            teamPokemonInstance.maxHP = pokemonToEvolve.maxHP;
            teamPokemonInstance.currentHP = pokemonToEvolve.currentHP; 
            teamPokemonInstance.baseStats = JSON.parse(JSON.stringify(pokemonToEvolve.baseStats));
            teamPokemonInstance.moves = pokemonToEvolve.moves.map(m => ({...m}));
            teamPokemonInstance.spriteFrontUrl = pokemonToEvolve.spriteFrontUrl; 
            teamPokemonInstance.spriteBackUrl = pokemonToEvolve.spriteBackUrl;   
            teamPokemonInstance.isShiny = pokemonToEvolve.isShiny;
            teamPokemonInstance.evolvesToPokedexId = pokemonToEvolve.evolvesToPokedexId;
            teamPokemonInstance.originalEvolutionData = null; 
            saveGame(); 
        }
    }
    return originalName;
}

function useEvolutionItem(itemName) { 
    const playerPokemon = battleState.playerTeam[battleState.playerActiveIndex];
    const evolutionTargetData = getEvolutionTarget(playerPokemon.pokedexId); 
    const isPermanent = itemName === "Perma Evolution Stone";

    if (evolutionTargetData && selectedTrainerData.inventory[itemName] > 0) {
        selectedTrainerData.inventory[itemName]--;
        if (!isPermanent) saveGame(); 
        
        itemMenuEl.style.display = 'none';
        typeMessage(`${selectedTrainerData.name} used a ${itemName}!`, () => {
            typeMessage(`${playerPokemon.name.toUpperCase()} is evolving!`, () => {
                playerPokemonSpriteEl.parentElement.classList.add('flash-anim');
                setTimeout(() => {
                    playerPokemonSpriteEl.parentElement.classList.remove('flash-anim');
                    
                    const originalName = evolvePokemon(playerPokemon, evolutionTargetData, isPermanent);
                    updateBattleUI(); 

                    typeMessage(`Congratulations! Your ${originalName} evolved into ${playerPokemon.name.toUpperCase()}!${isPermanent ? " (Permanently)" : ""}`, () => {
                        opponentActionPhase(); 
                    });
                }, 1000); 
            });
        });
    } else {
        typeMessage("It won't have any effect.", () => {
            playerActionPhase(); 
        });
    }
}

function throwPokeball(itemName) {
    if (!battleState.isWildBattle) {
        typeMessage("Can only use Poké Balls in wild battles!", playerActionPhase);
        return;
    }
    if (!selectedTrainerData || !selectedTrainerData.inventory || selectedTrainerData.inventory[itemName] <= 0) {
        typeMessage(`You don't have any ${itemName}s!`, playerActionPhase);
        return;
    }

    selectedTrainerData.inventory[itemName]--;
    saveGame();

    const opponentPokemon = battleState.opponentTeam[battleState.opponentActiveIndex];
    typeMessage(`${selectedTrainerData.name} used a ${itemName}!`, () => {
        const pokeballAnim = document.createElement('div');
        pokeballAnim.classList.add('pokeball-throw-animation');
        
        const playerRect = playerPokemonSpriteEl.getBoundingClientRect();
        const opponentRect = opponentPokemonSpriteEl.getBoundingClientRect();
        const arenaRect = screens.battle.querySelector('.battle-arena').getBoundingClientRect();

        pokeballAnim.style.left = `${playerRect.left + playerRect.width / 2 - arenaRect.left - 15}px`;
        pokeballAnim.style.top = `${playerRect.bottom - arenaRect.top - 30 - 15}px`; 

        pokeballAnim.style.setProperty('--target-x', `${opponentRect.left + opponentRect.width / 2 - (playerRect.left + playerRect.width / 2)}px`);
        pokeballAnim.style.setProperty('--target-y', `${opponentRect.top + opponentRect.height / 2 - (playerRect.bottom - 30)}px`);


        if (itemName === "Great Ball") pokeballAnim.style.backgroundImage = 'var(--item-icon-greatball)';
        
        attackAnimationLayer.appendChild(pokeballAnim);

        setTimeout(() => {
            pokeballAnim.remove();
            const catchRateBase = itemName === "Great Ball" ? 1.5 : 1;
            const maxHP = opponentPokemon.maxHP;
            const currentHP = opponentPokemon.currentHP;
            let catchChance = (((3 * maxHP - 2 * currentHP) * 45 * catchRateBase) / (3 * maxHP)) / 255;
            if (opponentPokemon.status && (opponentPokemon.status === "SLP" || opponentPokemon.status === "FRZ")) catchChance *= 2.5;
            else if (opponentPokemon.status && (opponentPokemon.status === "PAR" || opponentPokemon.status === "PSN" || opponentPokemon.status === "BRN")) catchChance *= 1.5;
            
            if (Math.random() < catchChance || opponentPokemon.currentHP <= 1) {
                typeMessage(`Gotcha! ${opponentPokemon.name.toUpperCase()} was caught!`, () => {
                    opponentPokemonSpriteEl.parentElement.classList.add('pokemon-caught-flash');
                    setTimeout(() => {
                        opponentPokemonSpriteEl.parentElement.classList.remove('pokemon-caught-flash');
                        const caughtPokemonData = pokemonPool.find(p => p.pokedexId === opponentPokemon.pokedexId); 
                        const newPlayerPokemon = createPokemonFromData(caughtPokemonData, false, true); 
                        newPlayerPokemon.currentHP = Math.max(1, opponentPokemon.currentHP); 
                        newPlayerPokemon.status = opponentPokemon.status;
                        newPlayerPokemon.isShiny = opponentPokemon.isShiny; 
                        
                        if (selectedTrainerData.team.length < MAX_TEAM_SIZE) {
                            selectedTrainerData.team.push(newPlayerPokemon);
                            alert(`${newPlayerPokemon.name.toUpperCase()} was added to your team!`);
                        } else if (selectedTrainerData.pcBox.length < MAX_PC_BOX_SIZE) {
                            selectedTrainerData.pcBox.push(newPlayerPokemon);
                            alert(`${newPlayerPokemon.name.toUpperCase()} was sent to the PC!`);
                        } else {
                             alert(`Team and PC Box are full! Cannot catch ${newPlayerPokemon.name.toUpperCase()}.`);
                        }
                        finalizeBattleState(); 
                        battleState.isWildBattle = false; 
                        switchScreen('mainMenu');
                    }, 600);
                });
            } else {
                typeMessage(`Oh no! The Pokémon broke free!`, opponentActionPhase);
            }
        }, 3500); 
    });
}


function showItemMenu() {
    if (!selectedTrainerData || !selectedTrainerData.inventory) {
        typeMessage("No items in inventory.", playerActionPhase);
        return;
    }
    itemMenuEl.innerHTML = ''; 
    const pPok = battleState.playerTeam[battleState.playerActiveIndex];
    let usableItemsFound = false;

    const evoStones = ["Evolution Stone", "Perma Evolution Stone"];
    evoStones.forEach(stoneName => {
        if (selectedTrainerData.inventory[stoneName] > 0) {
            const evoTarget = getEvolutionTarget(pPok.pokedexId); 
            if (evoTarget) {
                const btn = document.createElement('button');
                btn.dataset.itemName = stoneName;
                btn.innerHTML = `<span class="item-icon-battle evolutionstone"></span><span class="item-name-battle">${stoneName}</span><span class="item-count-battle">x${selectedTrainerData.inventory[stoneName]}</span>`;
                itemMenuEl.appendChild(btn);
                usableItemsFound = true;
            }
        }
    });


    if (battleState.isWildBattle) {
        const balls = ["Poke Ball", "Great Ball"];
        balls.forEach(ballName => {
            if (selectedTrainerData.inventory[ballName] > 0) {
                const btn = document.createElement('button');
                btn.dataset.itemName = ballName;
                const battleIconClass = ballName === "Poke Ball" ? "pokeball" : "greatball";
                btn.innerHTML = `<span class="item-icon-battle ${battleIconClass}"></span><span class="item-name-battle">${ballName}</span><span class="item-count-battle">x${selectedTrainerData.inventory[ballName]}</span>`;
                itemMenuEl.appendChild(btn);
                usableItemsFound = true;
            }
        });
    }

    if (!usableItemsFound) {
        typeMessage("No usable items for this situation.", playerActionPhase);
        return;
    }

    const backBtn = document.createElement('button');
    backBtn.dataset.action = "back-to-actions";
    backBtn.innerHTML = 'BACK';
    itemMenuEl.appendChild(backBtn);

    actionMenuEl.style.display = 'none';
    moveMenuEl.style.display = 'none';
    battleTextboxEl.style.display = 'none';
    itemMenuEl.style.display = 'grid';
}

function showGymLeaderSelectScreen() {
    gymLeaderGridEl.innerHTML = '';
    Object.keys(gymLeadersData).forEach(key => {
        const leader = gymLeadersData[key];
        const leaderButton = document.createElement('button');
        leaderButton.classList.add('gym-leader-button');
        leaderButton.textContent = leader.name.toUpperCase();
        leaderButton.dataset.leaderKey = key;
        leaderButton.addEventListener('click', () => showGymLeaderDetailScreen(key));
        gymLeaderGridEl.appendChild(leaderButton);
    });
    switchScreen('gymLeaderSelect');
}

function showGymLeaderDetailScreen(leaderKey) {
    const leader = gymLeadersData[leaderKey];
    if (!leader) {
        alert("Gym Leader not found!");
        switchScreen('gymLeaderSelect');
        return;
    }
    gymLeaderDetailNameEl.textContent = leader.name.toUpperCase();
    gymLeaderCardImageEl.src = leader.cardUrl;
    gymLeaderCardImageEl.alt = leader.name + " Card";
    gymLeaderDialogEl.textContent = leader.dialog || `Prepare to battle ${leader.name.toUpperCase()}!`;
    
    btnStartGymBattle.onclick = () => {
        battleState.currentGymLeaderKey = leaderKey;
        prepareBattle(startGymBattleActual);
    };
    switchScreen('gymLeaderDetail');
}

function showMyCardsScreen() {
    if (!selectedTrainerData) {
        alert("No trainer data found.");
        switchScreen('mainMenu');
        return;
    }
    collectedCardsGridEl.innerHTML = '';
    collectedBadgesGridEl.innerHTML = '';

    let hasCards = false;
    let hasBadges = false;

    (selectedTrainerData.defeatedGymLeaders || []).forEach(leaderKey => {
        const leaderData = gymLeadersData[leaderKey];
        if (leaderData) {
            hasCards = true;
            const cardItem = document.createElement('div');
            cardItem.classList.add('collected-card-item');
            const cardImg = document.createElement('img');
            cardImg.src = leaderData.cardUrl;
            cardImg.alt = leaderData.name + " Card";
            cardItem.appendChild(cardImg);
            collectedCardsGridEl.appendChild(cardItem);

            hasBadges = true;
            const badgeItem = document.createElement('div');
            badgeItem.classList.add('collected-badge-item');
            const badgeImg = document.createElement('img');
            badgeImg.src = leaderData.badgeUrl;
            badgeImg.alt = leaderData.badgeName;
            const badgeNameP = document.createElement('p');
            badgeNameP.textContent = `${leaderData.badgeName} (${leaderData.name.toUpperCase()})`;
            badgeItem.appendChild(badgeImg);
            badgeItem.appendChild(badgeNameP);
            collectedBadgesGridEl.appendChild(badgeItem);
        }
    });

    if (noCollectedCardsMsgEl) noCollectedCardsMsgEl.style.display = hasCards ? 'none' : 'block';
    if (noCollectedBadgesMsgEl) noCollectedBadgesMsgEl.style.display = hasBadges ? 'none' : 'block';

    switchScreen('myCards');
}

function showStarterSelectScreen() {
    startersGridEl.innerHTML = '';
    const starterPokedexIds = [1, 4, 7, 152, 155, 158]; 
    starterPokedexIds.forEach(pokedexId => {
        const pokemonData = pokemonPool.find(p => p.pokedexId === pokedexId);
        if (pokemonData) {
            const card = document.createElement('div');
            card.classList.add('starter-card');
            card.dataset.starterId = pokedexId;
            
            const img = document.createElement('img');
            img.src = pokemonData.spriteFront;
            img.alt = pokemonData.name.toUpperCase();
            card.appendChild(img);

            const nameP = document.createElement('p');
            nameP.textContent = pokemonData.name.toUpperCase();
            card.appendChild(nameP);

            card.addEventListener('click', () => {
                tempSelectedStarter = pokemonData;
                chosenStarterNameDialogSpan.textContent = pokemonData.name.toUpperCase();
                screens.confirmStarterDialog.style.display = 'flex'; // Changed from switchScreen for dialogs
            });
            startersGridEl.appendChild(card);
        }
    });
    switchScreen('starterSelect');
}


function saveGame() { if (selectedTrainerData) { localStorage.setItem(SAVE_KEY, JSON.stringify(selectedTrainerData)); console.log("Game Saved!"); } else { console.warn("No trainer selected to save!"); } } 
function loadGame() { 
    const sd = localStorage.getItem(SAVE_KEY); 
    if (sd) { 
        try { 
            selectedTrainerData = JSON.parse(sd); 
            selectedTrainerData.coins = selectedTrainerData.coins || 0;
            
            selectedTrainerData.inventory = selectedTrainerData.inventory || {};
            const defaultItems = { "Poke Ball": 0, "Great Ball": 0, "Evolution Stone": 0, "Perma Evolution Stone": 0 };
            for (const item in defaultItems) {
                if (typeof selectedTrainerData.inventory[item] === 'undefined') {
                    selectedTrainerData.inventory[item] = defaultItems[item];
                }
            }
            
            selectedTrainerData.team = selectedTrainerData.team || []; 
            selectedTrainerData.pcBox = selectedTrainerData.pcBox || []; // Ensure pcBox array exists
            selectedTrainerData.defeatedGymLeaders = selectedTrainerData.defeatedGymLeaders || []; 
            selectedTrainerData.hasChosenStarter = typeof selectedTrainerData.hasChosenStarter !== 'undefined' ? selectedTrainerData.hasChosenStarter : false;

            [selectedTrainerData.team, selectedTrainerData.pcBox].forEach(list => {
                (list || []).forEach(p => { 
                    if(p) {
                        p.originalEvolutionData = p.originalEvolutionData || null; 
                        p.moves.forEach(m => {
                            if (typeof m.currentPp === 'undefined') m.currentPp = m.maxPp;
                        });
                        p.name = p.name.toUpperCase(); // Ensure Pokémon names are uppercase on load
                    }
                });
            });


            if (chosenTrainerImageMainMenu && selectedTrainerData.imageUrl) { 
                chosenTrainerImageMainMenu.src = selectedTrainerData.imageUrl; 
                chosenTrainerImageMainMenu.alt = selectedTrainerData.name; 
            } 
            updateCoinDisplay();
            const dm = localStorage.getItem('blazingThunder_darkMode'); 
            if (dm === 'true') gameBody.classList.add('dark-mode'); 
            console.log("Game Loaded");
            return true; 
        } catch (e) { 
            console.error('Load error:', e); 
            localStorage.removeItem(SAVE_KEY); 
            return false; 
        } 
    } 
    return false; 
}
function resetGame() { 
    localStorage.removeItem(SAVE_KEY); 
    localStorage.removeItem('blazingThunder_darkMode'); 
    selectedTrainerData = null; 
    tempSelectedStarter = null;
    isNewGameSetup = false;
    gameBody.classList.remove('dark-mode'); 
    if(playerCoinsDisplayMainMenuEl) playerCoinsDisplayMainMenuEl.textContent = "Coins: 0";
    if(marketCoinDisplayEl) marketCoinDisplayEl.textContent = "Coins: 0";
    alert("Game Reset! Select a new trainer."); 
    switchScreen('intro'); 
}

document.addEventListener('DOMContentLoaded', () => {
    const cyEl = document.getElementById('currentYear'); if (cyEl) cyEl.textContent = new Date().getFullYear();
    const gsBtn = document.getElementById('gameStartButton');
    function setupEvtLstnrs() {
        const hS = (e) => { e.preventDefault(); if (loadGame() && selectedTrainerData.hasChosenStarter) { switchScreen('mainMenu'); } else { isNewGameSetup = true; switchScreen('characterSelect'); } }; 
        if (gsBtn) { gsBtn.addEventListener('click', hS); gsBtn.addEventListener('touchend', hS, {passive: false}); } else console.error("gsBtn not found!");
        
        trainerCards.forEach(c => { c.addEventListener('click', () => { const tn = c.dataset.trainer; selectedTrainerData = JSON.parse(JSON.stringify(trainersData[tn])); chosenTrainerNameSpan.textContent = selectedTrainerData.name; screens.confirmDialog.style.display = 'flex'; }); });
        
        if(confirmYesButton) confirmYesButton.addEventListener('click', () => { 
            if (selectedTrainerData) { 
                selectedTrainerData.coins = 0; 
                selectedTrainerData.inventory = { "Poke Ball": 5, "Great Ball": 0, "Evolution Stone": 1, "Perma Evolution Stone": 0 };
                selectedTrainerData.team = []; 
                selectedTrainerData.pcBox = [];
                selectedTrainerData.defeatedGymLeaders = []; 
                selectedTrainerData.hasChosenStarter = false; 

                if (isNewGameSetup) {
                    showStarterSelectScreen();
                } else { 
                    saveGame();
                    switchScreen('mainMenu');
                }
            } else switchScreen('characterSelect'); 
        });
        if(confirmNoButton) confirmNoButton.addEventListener('click', () => { selectedTrainerData = null; screens.confirmDialog.style.display = 'none'; switchScreen('characterSelect'); });

        if(confirmStarterYesButton) confirmStarterYesButton.addEventListener('click', () => {
            if (selectedTrainerData && tempSelectedStarter) {
                selectedTrainerData.team.push(createPokemonFromData(tempSelectedStarter, false, true));
                selectedTrainerData.hasChosenStarter = true;
                tempSelectedStarter = null;
                isNewGameSetup = false;

                if (chosenTrainerImageMainMenu && selectedTrainerData.imageUrl) { 
                    chosenTrainerImageMainMenu.src = selectedTrainerData.imageUrl; 
                    chosenTrainerImageMainMenu.alt = selectedTrainerData.name; 
                } 
                updateCoinDisplay(); 
                saveGame(); 
                screens.confirmStarterDialog.style.display = 'none';
                switchScreen('mainMenu'); 
            } else {
                screens.confirmStarterDialog.style.display = 'none';
                switchScreen('starterSelect'); 
            }
        });
        if(confirmStarterNoButton) confirmStarterNoButton.addEventListener('click', () => { tempSelectedStarter = null; screens.confirmStarterDialog.style.display = 'none'; switchScreen('starterSelect'); });

        
        if(btnPlay) btnPlay.addEventListener('click', () => switchScreen('playMenu'));
        if(btnQuickBattlePlay) btnQuickBattlePlay.addEventListener('click', () => prepareBattle(startQuickBattle)); 
        if(btnWildModePlay) btnWildModePlay.addEventListener('click', () => prepareBattle(startWildBattleActual));
        if(btnGymBattlePlay) btnGymBattlePlay.addEventListener('click', showGymLeaderSelectScreen); 
        if(btnEliteBattlesPlay) btnEliteBattlesPlay.addEventListener('click', () => alert('Elite Battles not implemented yet!'));
        if(btnBackToMainFromPlay) btnBackToMainFromPlay.addEventListener('click', () => switchScreen('mainMenu'));

        if(btnOptions) btnOptions.addEventListener('click', () => switchScreen('optionsMenu'));
        if(tabMyCards) tabMyCards.addEventListener('click', showMyCardsScreen); 
        if(tabTeam) tabTeam.addEventListener('click', showTeamScreen);
        if(tabMyPc) tabMyPc.addEventListener('click', showPcBoxScreen);
        if(tabMarket) tabMarket.addEventListener('click', showMarketScreen);
        if(tabInventory) tabInventory.addEventListener('click', showInventoryScreen);
        if(marketItemsGridEl) { marketItemsGridEl.addEventListener('click', (e) => { if (e.target.classList.contains('buy-button')) { const itemName = e.target.dataset.itemName; const price = e.target.dataset.price; buyItem(itemName, price); } }); }
        if(btnBackToMainFromMarket) btnBackToMainFromMarket.addEventListener('click', () => switchScreen('mainMenu'));
        if(btnBackToMainFromInventory) btnBackToMainFromInventory.addEventListener('click', () => switchScreen('mainMenu'));
        if(btnBackToMainFromTeam) btnBackToMainFromTeam.addEventListener('click', () => switchScreen('mainMenu'));
        if(btnBackToMainFromPcBox) btnBackToMainFromPcBox.addEventListener('click', () => switchScreen('mainMenu'));
        if(btnSaveGameOpt) btnSaveGameOpt.addEventListener('click', saveGame); 
        if(btnResetGameOpt) btnResetGameOpt.addEventListener('click', () => {screens.resetConfirmDialog.style.display = 'flex'});
        if(btnDarkModeOpt) btnDarkModeOpt.addEventListener('click', () => { gameBody.classList.toggle('dark-mode'); localStorage.setItem('blazingThunder_darkMode', gameBody.classList.contains('dark-mode')); });
        if(btnBackToMainOpts) btnBackToMainOpts.addEventListener('click', () => switchScreen('mainMenu')); 
        if(resetConfirmYesButton) resetConfirmYesButton.addEventListener('click', () => {screens.resetConfirmDialog.style.display = 'none'; resetGame();}); 
        if(resetConfirmNoButton) resetConfirmNoButton.addEventListener('click', () => {screens.resetConfirmDialog.style.display = 'none'; switchScreen('optionsMenu');});
        
        if(btnBackToPlayMenuFromGymSelect) btnBackToPlayMenuFromGymSelect.addEventListener('click', () => switchScreen('playMenu'));
        if(btnBackToGymSelectFromDetail) btnBackToGymSelectFromDetail.addEventListener('click', showGymLeaderSelectScreen);
        if(btnBackToMainFromMyCards) btnBackToMainFromMyCards.addEventListener('click', () => switchScreen('mainMenu'));

        if(actionMenuEl) actionMenuEl.addEventListener('click', (e) => { 
            if (!battleState.playerTurn || battleState.isProcessingMessage) return; 
            const buttonTarget = e.target.closest('button');
            if (buttonTarget && buttonTarget.parentElement === actionMenuEl) { 
                const act = buttonTarget.dataset.action; 
                actionMenuEl.style.display='none'; 
                switch(act){ 
                    case 'fight': showMoveMenu(); break; 
                    case 'item': showItemMenu(); break; 
                    case 'pokemon': showSwitchScreen(false); break; 
                    case 'run': 
                        if (battleState.isWildBattle) {
                            typeMessage("Got away safely!", () => { 
                                finalizeBattleState();
                                battleState = { ...battleState, playerTeam: [], opponentTeam:[], isWildBattle: false, isGymBattle: false, currentGymLeaderKey: null, switchingAfterFaint: false }; 
                                switchScreen('mainMenu'); 
                            }); 
                        } else if (battleState.isGymBattle) {
                             typeMessage("You can't run from a Gym Battle!", playerActionPhase);
                        } else { 
                            typeMessage("You can't run from a trainer battle!", playerActionPhase);
                        }
                        break;
                }
            }
        });

        if(itemMenuEl) itemMenuEl.addEventListener('click', (e) => {
            if (!battleState.playerTurn || battleState.isProcessingMessage) return;
            const btn = e.target.closest('button');
            if (btn && btn.parentElement === itemMenuEl) {
                const itemName = btn.dataset.itemName;
                const action = btn.dataset.action;

                itemMenuEl.style.display = 'none'; 

                if (action === 'back-to-actions') {
                    playerActionPhase();
                    return;
                }

                if (itemName === "Evolution Stone" || itemName === "Perma Evolution Stone") {
                    useEvolutionItem(itemName);
                } else if (itemName === "Poke Ball" || itemName === "Great Ball") {
                    if (battleState.isWildBattle) {
                        throwPokeball(itemName);
                    } else { 
                        typeMessage("Can only use Poke Balls in wild battles!", playerActionPhase);
                    }
                }
            }
        });

        if(moveMenuEl) moveMenuEl.addEventListener('click', (e) => { if (!battleState.playerTurn || battleState.isProcessingMessage) return; const btn = e.target.closest('button'); if (btn && btn.parentElement === moveMenuEl && !btn.disabled) { const mIdx = parseInt(btn.dataset.moveIndex); playerAttack(mIdx); }});
        if(switchCancelButton) switchCancelButton.addEventListener('click', () => { if (currentScreen === 'switchPokemon' && !battleState.switchingAfterFaint) { switchScreen('battle'); playerActionPhase(); }});
    }
    setupEvtLstnrs(); 
    if (loadGame()) {
        if (selectedTrainerData.hasChosenStarter) {
            switchScreen('mainMenu');
        } else { 
            isNewGameSetup = true;
            // Als er trainerdata is maar geen starter, ga direct naar starterselectie
            if (selectedTrainerData && selectedTrainerData.name) {
                 showStarterSelectScreen();
            } else { // Anders, begin bij trainerselectie (voor het geval loadGame() false was maar we hier toch komen)
                 switchScreen('characterSelect');
            }
        }
    } else { 
        isNewGameSetup = true; 
        switchScreen('intro');
    }
    updateCoinDisplay(); 
    if (screens[currentScreen] && screens[currentScreen].style.display === 'none') screens[currentScreen].style.display = 'flex';
});