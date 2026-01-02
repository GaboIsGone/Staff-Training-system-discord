# 🎓 Discord Training System — Public Demo

Advanced training and evaluation system for Discord servers.

## ⚠️ This repository contains a functional but limited public demo.
The full production system is private and not open-source.

### ✨ Overview

This project demonstrates a structured Discord training system with:

- Multi-level progression

- Training phases

- Evaluation handling

- Persistent state

- Administrative commands

- Simulated automation

The demo is intentionally restricted to prevent production use while still showcasing real system behavior.

### 📁 Why is everything in one file?

This demo is implemented in a single script by design, in order to:

- Make code review easier

- Showcase the full flow in one place

- Avoid exposing the real modular architecture

# ➡️ The professional version is fully modular and can be delivered that way if required by the client.

## 🧪 Features included in this demo

- ✔ Training levels (1–3)
- ✔ Phase system (Material → Evaluation → Closed)
- ✔ Manual and simulated progression
- ✔ Grade validation
- ✔ Local persistence (JSON files)
- ✔ Logs and summaries
- ✔ Administrative commands

## ❌ Features intentionally disabled

- Full automatic scheduling

- External integrations (Google Forms, Sheets, etc.)

- Real role assignment

- Production-grade security

- Mass automation and cleanup

- Scalability features

These are available only in the private version.

## 🕹️ Available Commands
| Command | Description |
|--------|-------------|
| `!status` | Show system status |
| `!phase` | Advance training phase |
| `!level` | Advance level / promotion |
| `!grade Name_Lastname \| Score` | Register a grade |
| `!summary` | Show evaluation summary |
| `!reset-demo` | Reset demo data |
| `!help` | Show help menu |

## ⚙️ Installation & Usage
```bash
npm install discord.js
node training-system.demo.mjs
```

### Before running, configure:

- Discord bot token
- Server ID
- Role IDs (demo values by default)

## 🔐 License

This project is licensed under the
PolyForm Noncommercial License 1.0.0

- ✔ Viewing and evaluation allowed
- ❌ Commercial or production use is prohibited

**See the LICENSE file for full details.**

## 🚀 Full Version

The complete system includes:

- Full automation
- Role management
- External service integration
- Scalable architecture
- Production-ready security
- Custom workflows per server

**📩 Available under a private commercial license.**

### 📌 Disclaimer

This repository exists for demonstration and portfolio purposes only.
It is not intended to be deployed as-is in a real environment.
