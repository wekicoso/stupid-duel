const player = {
    name: "Player",
    maxHP: 50,
    currentHP: 50,
    alive: true,
    critChance: 20,
}

const enemy = {
    name: "Stupid",
    maxHP: 50,
    currentHP: 50,
    alive: true,
    critChance: 20,
}

let moveNumber = 1;

const playerHealthBar = document.querySelector("#playerHealthBar");
const playerHPstatus = document.querySelector("#playerHP");
const enemyHealthBar = document.querySelector("#enemyHealthBar");
const enemyHPstatus = document.querySelector("#enemyHP");
const log = document.querySelector("#log");

enemyHPstatus.textContent = `${enemy.currentHP} / ${enemy.maxHP}`
playerHPstatus.textContent = `${player.currentHP} / ${player.maxHP}`;

const btnAttack = document.querySelector("#attackButton");
btnAttack.addEventListener('click', e => {
    const playerAttackDamage = getRandomDmg(2, 5);
    const enemyAttackDamage = getRandomDmg(2, 5);

    playerAttack(playerAttackDamage);

    if (!enemy.alive) {
        btnAttack.disabled = true;
        return;
    }

    enemyAttack(enemyAttackDamage);

    if (!player.alive) {
        btnAttack.disabled = true;
        return;
    }
});

const btnStartNewGame = document.querySelector("#startNewGame");
btnStartNewGame.addEventListener('click', e => {
    resetGame();
});

function getRandomDmg(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

function isAlive(hp) {
    return hp > 0;
}

function resetGame() {
    moveNumber = 1;
    player.currentHP = player.maxHP;
    enemy.currentHP = enemy.maxHP;
    player.alive = true;
    enemy.alive = true;
    enemyHealthBar.style.setProperty('--width-of-healthbar-', '100%');
    playerHealthBar.style.setProperty('--width-of-healthbar-', '100%');
    const text = document.querySelectorAll("#log p");
    text.forEach((p) => {
        p.remove();
    })
    btnAttack.disabled = false;
    enemyHPstatus.textContent = `${enemy.currentHP} / ${enemy.maxHP}`
    playerHPstatus.textContent = `${player.currentHP} / ${player.maxHP}`;
}

function enemyAttack(dmg) {
    let outputMessage = "";
    const doCrit = isCriticalHit(enemy.critChance);

    if (doCrit) {
        dmg *= 2;
    }

    player.currentHP -= dmg;

    if (isAlive(player.currentHP)) {
        playerHealthBar.style.setProperty('--width-of-healthbar-', `${Math.floor(player.currentHP / player.maxHP * 100)}%`);
        if (doCrit) {
            outputMessage = `-- ${enemy.name} have dealt CRITICAL ${dmg} damage to ${player.name}.`;
        } else {
            outputMessage = `-- ${enemy.name} have dealt ${dmg} damage to ${player.name}.`;
        }
    } else {
        outputMessage = `-- ${player.name} is dead. Enemy WIN!`
        player.alive = false;
        player.currentHP = 0;
        playerHealthBar.style.setProperty('--width-of-healthbar-', `0%`);
    }

    moveNumber++;

    updateCombatLog(outputMessage, doCrit);
    playerHPstatus.textContent = `${player.currentHP} / ${player.maxHP}`;
}

function playerAttack(dmg) {
    let outputMessage = "";
    const doCrit = isCriticalHit(player.critChance);

    if (doCrit) {
        dmg *= 2;
    }

    enemy.currentHP -= dmg;

    if (isAlive(enemy.currentHP)) {
        enemyHealthBar.style.setProperty('--width-of-healthbar-', `${Math.floor(enemy.currentHP / enemy.maxHP * 100)}%`);
        if (doCrit) {
            outputMessage = `${moveNumber}. ${player.name} have dealt CRITICAL ${dmg} damage to the ${enemy.name}.`;
        } else {
            outputMessage = `${moveNumber}. ${player.name} have dealt ${dmg} damage to the ${enemy.name}.`;
        }
    } else {
        outputMessage = `${moveNumber}. ${enemy.name} is dead. ${player.name} WIN!`
        enemy.alive = false;
        enemy.currentHP = 0;
        enemyHealthBar.style.setProperty('--width-of-healthbar-', `0%`);
    }

    enemyHPstatus.textContent = `${enemy.currentHP} / ${enemy.maxHP}`;
    updateCombatLog(outputMessage, doCrit);
}

function updateCombatLog(text, isCrit) {
    const newLog = document.createElement("p");
    newLog.textContent = text;
    if (isCrit) {
        newLog.style.setProperty('color', 'red');
    }
    log.appendChild(newLog);
}

function isCriticalHit(criticalPercentage) {
    return Math.floor(Math.random() * 100) + 1 <= criticalPercentage;
}