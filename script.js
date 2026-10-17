let logNumber = 1;

const playerMaxHP = 30;
let playerCurrentHP = 30;
let playerAlive = true;

const enemyMaxHP = 30;
let enemyCurrentHP = 30;
let enemyAlive = true;

const playerHealthBar = document.querySelector("#playerHealthBar");
const playerHPstatus = document.querySelector("#playerHP");
const enemyHealthBar = document.querySelector("#enemyHealthBar");
const enemyHPstatus = document.querySelector("#enemyHP");
const log = document.querySelector("#log");

const btnAttack = document.querySelector("#attackButton");
btnAttack.addEventListener('click', e => {
    const playerAttackDamage = getRandomDmg(4, 8);
    const enemyAttackDamage = getRandomDmg(3, 7);

    playerAttack(playerAttackDamage);

    if (!enemyAlive) {
        btnAttack.disabled = true;
        return;
    }

    enemyAttack(enemyAttackDamage);

    if (!playerAlive) {
        btnAttack.disabled = true;
        return;
    }
});

const startNewGame = document.querySelector("#startNewGame");
startNewGame.addEventListener('click', e => {
    resetGame();
});

function getRandomDmg(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

function isAlive(hp) {
    return hp > 0;
}

function resetGame() {
    logNumber = 1;
    playerCurrentHP = 30;
    enemyCurrentHP = 30;
    playerAlive = true;
    enemyAlive = true;
    enemyHealthBar.style.width = `100%`;
    playerHealthBar.style.width = `100%`;
    const text = document.querySelectorAll("#log p");
    text.forEach((p) => {
        p.remove();
    })
    btnAttack.disabled = false;
    enemyHPstatus.textContent = `${enemyCurrentHP} / ${enemyMaxHP}`
    playerHPstatus.textContent = `${playerCurrentHP} / ${playerMaxHP}`;
}

function enemyAttack(dmg) {
    let outputMessage = "";

    playerCurrentHP -= dmg;

    if (isAlive(playerCurrentHP)) {
        playerHealthBar.style.width = `${Math.floor(playerCurrentHP / playerMaxHP * 100)}%`;
        outputMessage = `${logNumber}. Enemy have dealt ${dmg} damage to you.`;
    } else {
        outputMessage = `${logNumber}. You are dead. Enemy WIN!.`
        playerAlive = false;
        playerCurrentHP = 0;
        playerHealthBar.style.width = `0%`;
    }

    updateCombatLog(outputMessage);
    playerHPstatus.textContent = `${playerCurrentHP} / ${playerMaxHP}`;
    logNumber++;
}

function playerAttack(dmg) {
    let outputMessage = "";

    enemyCurrentHP -= dmg;

    if (isAlive(enemyCurrentHP)) {
        enemyHealthBar.style.width = `${Math.floor(enemyCurrentHP / enemyMaxHP * 100)}%`;
        outputMessage = `${logNumber}. You have dealt ${dmg} damage to the enemy.`;
    } else {
        outputMessage = `${logNumber}. Enemy is dead. You WIN!`
        enemyAlive = false;
        enemyCurrentHP = 0;
        enemyHealthBar.style.width = `0%`;
    }

    enemyHPstatus.textContent = `${enemyCurrentHP} / ${enemyMaxHP}`;
    updateCombatLog(outputMessage);
    logNumber++;
}

function updateCombatLog(text) {
    const newLog = document.createElement("p");
    newLog.textContent = text;
    log.appendChild(newLog);
}