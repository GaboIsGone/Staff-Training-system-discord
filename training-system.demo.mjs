/**
 * ============================================================
 *  DISCORD TRAINING SYSTEM — PUBLIC DEMO
 * ============================================================
 *  This project is intentionally implemented in a SINGLE FILE.
 *
 *  - The production system is modular and private
 *  - Critical automation has been intentionally disabled
 *  - This file exists only to demonstrate capabilities
 *
 *  © Gabo — Demo / Portfolio use only
 * ============================================================
 */

import { Client, GatewayIntentBits, EmbedBuilder } from 'discord.js';
import fs from 'fs';

// ============================================================
// BASIC CONFIGURATION (DEMO VALUES)
// ============================================================

const TOKEN = 'DEMO_TOKEN';
const SERVER_ID = 'DEMO_SERVER_ID';
const PREFIX = '!';

const CONFIG = {
  levels: [1, 2, 3],
  maxScore: {
    1: 15,
    2: 18,
    3: 20
  },
  roles: {
    1: 'ROLE_LEVEL_1',
    2: 'ROLE_LEVEL_2',
    3: 'ROLE_LEVEL_3',
    instructor: 'ROLE_INSTRUCTOR'
  }
};

// ============================================================
// FILE PATHS (LOCAL DEMO STORAGE)
// ============================================================

const STATE_FILE = './demo.state.json';
const GRADES_FILE = './demo.grades.json';
const LOG_FILE = './demo.log.txt';

// ============================================================
// FILE HELPERS
// ============================================================

function loadJSON(path, fallback) {
  try {
    return JSON.parse(fs.readFileSync(path, 'utf8'));
  } catch {
    return fallback;
  }
}

function saveJSON(path, data) {
  fs.writeFileSync(path, JSON.stringify(data, null, 2));
}

function log(message) {
  fs.appendFileSync(
    LOG_FILE,
    `[${new Date().toISOString()}] ${message}\n`
  );
}

// ============================================================
// GLOBAL STATE
// ============================================================

let systemState = loadJSON(STATE_FILE, {
  level: 1,
  phase: 'MATERIAL', // MATERIAL → EVALUATION → CLOSED
  promotion: 1,
  active: true
});

// ============================================================
// DISCORD CLIENT
// ============================================================

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent
  ]
});

// ============================================================
// CORE SYSTEM FUNCTIONS (LIMITED DEMO)
// ============================================================

function advancePhase() {
  if (systemState.phase === 'MATERIAL') systemState.phase = 'EVALUATION';
  else if (systemState.phase === 'EVALUATION') systemState.phase = 'CLOSED';
  else systemState.phase = 'MATERIAL';

  saveJSON(STATE_FILE, systemState);
  log(`Phase changed to ${systemState.phase}`);
}

function advanceLevel() {
  if (systemState.level < 3) {
    systemState.level++;
  } else {
    systemState.level = 1;
    systemState.promotion++;
  }

  systemState.phase = 'MATERIAL';
  saveJSON(STATE_FILE, systemState);
  log(`Advanced to level ${systemState.level}`);
}

// ============================================================
// VALIDATION
// ============================================================

function validateGrade(input) {
  const regex = /^([A-Za-zÀ-ÿ]+_[A-Za-zÀ-ÿ]+)\s*\|\s*(\d+)$/;
  const match = input.match(regex);

  if (!match) return { error: 'Invalid format' };

  const score = Number(match[2]);
  if (score > CONFIG.maxScore[systemState.level]) {
    return { error: 'Score exceeds maximum allowed' };
  }

  return { name: match[1], score };
}

// ============================================================
// EVENTS
// ============================================================

client.once('ready', () => {
  console.log('🧪 TRAINING SYSTEM DEMO ONLINE');
  log('Bot started (demo mode)');
});

// ============================================================
// COMMAND HANDLER
// ============================================================

client.on('messageCreate', async (message) => {
  if (message.author.bot) return;
  if (message.guild?.id !== SERVER_ID) return;
  if (!message.content.startsWith(PREFIX)) return;

  const args = message.content.slice(1).trim().split(/ +/);
  const command = args.shift().toLowerCase();

  // ----------------------------------------------------------
  if (command === 'status') {
    const embed = new EmbedBuilder()
      .setTitle('📊 Training System Status (DEMO)')
      .addFields(
        { name: 'Current Level', value: String(systemState.level), inline: true },
        { name: 'Phase', value: systemState.phase, inline: true },
        { name: 'Promotion', value: String(systemState.promotion), inline: true }
      )
      .setFooter({ text: 'Demo mode — limited functionality' });

    return message.reply({ embeds: [embed] });
  }

  // ----------------------------------------------------------
  if (command === 'phase') {
    advancePhase();
    return message.reply(
      `🔄 Phase advanced to **${systemState.phase}** (simulated)`
    );
  }

  // ----------------------------------------------------------
  if (command === 'level') {
    advanceLevel();
    return message.reply(
      `⏭️ Level updated\nLevel: ${systemState.level}\nPromotion: ${systemState.promotion}`
    );
  }

  // ----------------------------------------------------------
  if (command === 'grade') {
    if (systemState.phase !== 'EVALUATION') {
      return message.reply('❌ The system is not in evaluation phase');
    }

    const input = args.join(' ');
    const result = validateGrade(input);

    if (result.error) {
      return message.reply(`❌ ${result.error}`);
    }

    const grades = loadJSON(GRADES_FILE, []);
    grades.push({
      trainee: result.name,
      score: result.score,
      level: systemState.level,
      promotion: systemState.promotion,
      gradedBy: message.author.id,
      timestamp: Date.now()
    });

    saveJSON(GRADES_FILE, grades);
    log(`Grade registered for ${result.name}`);

    return message.reply(
      `✅ **Grade recorded (DEMO)**\n${result.name}: ${result.score}`
    );
  }

  // ----------------------------------------------------------
  if (command === 'summary') {
    const grades = loadJSON(GRADES_FILE, []);
    const current = grades.filter(
      g => g.level === systemState.level &&
           g.promotion === systemState.promotion
    );

    return message.reply(
      `📋 Registered evaluations: **${current.length}**\n` +
      `*(Partial data — demo only)*`
    );
  }

  // ----------------------------------------------------------
  if (command === 'reset-demo') {
    systemState = {
      level: 1,
      phase: 'MATERIAL',
      promotion: 1,
      active: true
    };

    saveJSON(STATE_FILE, systemState);
    saveJSON(GRADES_FILE, []);
    log('Demo reset executed');

    return message.reply('♻️ Demo system has been reset');
  }

  // ----------------------------------------------------------
  if (command === 'help') {
    return message.reply(
      `🧪 **Training System — Demo Commands**\n\n` +
      `!status → system status\n` +
      `!phase → advance phase\n` +
      `!level → advance level\n` +
      `!grade Name_Lastname | Score\n` +
      `!summary → evaluation summary\n` +
      `!reset-demo → reset demo data\n\n` +
      `⚠️ Full automation disabled`
    );
  }
});

// ============================================================
// LOGIN
// ============================================================

client.login(TOKEN);
