# Valentines

**Original Valentines plugin. Everything in one.**  
*Let your players be together!*

---

## Features
- GUI: Keep it simple with only `/vgui` command
- Marriages: Marry your favourite person
- Achievements: 14 default achievements you unlock
- Kisses, hugs, likes: Yes, it is there
- Mood: Set your mood. Are you happy? Are you sad? Or neutral
- Effects: Around player

---

## Commands & Permissions

| Command       | Alias | Description                 | Permission           |
|---------------|-------|---------------------|--------------------|
| `/valentines`    | `/val`, `/love` | Displays all available commands in chat | `valentines.use`   |
| `/valentines reload`   | - | Reloads configuration | `valentines.reload`  |
| `/vgui`              | `/vg`, `/lovegui` | Opens main GUI | `valentines.use`  |

---

## Images / Screenshots

Section "**Gallery**"

---

## Files
<details>
  <summary><strong>config.yml</strong></summary>

```yaml
config-version: 4.0

Prefix: "&d&lValentines &7»&r "

symbol-change: true
symbol-color: "&c"
symbol: "♥"
words:
  - "love"
  - "valentines"
  - "heart"

effect:
  enabled: true
  particle-density: 2
  update-rate: 3
  max-height: 2.5
  start-height: 0.1
  radius: 1.0

player-effects: true
kiss-effect: true
marriage-effect: true
hug-effect: true

enabled-worlds:
  - "world"
  - "world_nether"
  - "world_the_end"

disabled-worlds: []

cooldowns:
  hug: 45
  kiss: 60
  like: 240
  mood-change: 120

marriage:
  proposal-timeout: 45
  proposal-cooldown: 30
  require-confirmation: true
  announcement: true
  divorce-confirmation: true
  divorce-cooldown: 600
  marriage-benefits:
    shared-effects: true
    mood-sharing: true
    teleport-to-partner: true
    private-chat: true

anniversary:
  enabled: true
  announcement-type: "global"
  announcement-worlds:
    - "world"
  check-interval: 300

mood:
  enabled: true
  require-marriage: false
  partner-notifications: true
  mood-types:
    - "very-good"
    - "good"
    - "neutral"
    - "bad"
    - "very-bad"

gui:
  update-interval: 15
  items-per-page: 28
  animated-items: true
  sound-effects: true
  custom-textures: false

leaderboard:
  enabled: true
  update-interval: 600
  max-entries: 50
  categories:
    - "total-score"
    - "hugs"
    - "kisses"
    - "likes"
    - "marriages"

performance:
  monitoring-enabled: true
  monitor-interval: 300
  detailed-logging: false
  memory-threshold: 85

debug: false

auto-save: 30

update-checker:
  enabled: true
  check-interval: 24

achievements:
  enabled: true
  broadcast: true
  sound-enabled: true

NoPermissionMessage: "&cYou do not have permission to use this command."
```
</details>

<details>
  <summary><strong>lang/en.yml</strong></summary>

```yaml
plugin:
  enabled: "&aValentines v4.0 has been enabled!"
  disabled: "&cValentines plugin has been disabled."
  reload: "&aValentines plugin has been reloaded successfully!"
  update-available: "&e⚡ A new version of Valentines is available! Check SpigotMC!"

general:
  no-permission: "&cYou don't have permission to use this command!"
  player-offline: "&cThat player is not online right now!"
  player-not-found: "&cPlayer not found!"
  partner-offline: "&cYour partner is not online!"
  cooldown: "&cYou can {command} again in &d{time}&c seconds!"
  invalid-world: "&cThis command cannot be used in this world!"
  feature-disabled: "&cThis feature is currently disabled!"

help:
  header: "&d❤ &5VALENTINES COMMANDS &d❤"
  valentines: "&d/valentines &f- Display help and plugin info"
  valentines-reload: "&d/valentines reload &f- Reload the plugin &7(Admin)"
  gui: "&d/vgui &f- Opens GUI"
  hug: "&d/hug <player> &f- Hug someone"
  kiss: "&d/kiss <player> &f- Kiss someone"
  like: "&d/like <player> &f- Like someone"
  marry: "&d/marry <player> &f- Propose"
  divorce: "&d/divorce &f- Divorce"
  mood: "&d/mood <mood> &f- Set your current mood"

hug:
  usage: "&cUsage: &d/hug <player>"
  self: "&cYou can't hug yourself!"
  sent: "&fYou gave &d{player} &fa hug!"
  received: "&d{player} &fgave you a hug!"
  broadcast: "&d{sender} &fand &d{receiver} &fhugged!"

kiss:
  usage: "&cUsage: &d/kiss <player>"
  self: "&cYou can't kiss yourself!"
  sent: "&fYou kissed &d{player}&f!"
  received: "&d{player} &fkissed you!"
  broadcast: "&d{sender} &fand &d{receiver} &fkissed!"

like:
  usage: "&cUsage: &d/like <player>"
  self: "&cYou already like yourself!"
  already-liked: "&cYou've already liked &d{player}&c!"
  cooldown: "&cYou can like again in &d{time}&c seconds!"
  sent: "&fYou liked &d{player}&f!"
  received: "&d{player} &flikes you!"

marry:
  usage: "&cUsage: &d/marry <player> &for &d/marry confirm/deny"
  self: "&cYou can't marry yourself!"
  proposal-sent: "&fMarriage proposal sent to &d{player}&f! Good luck!"
  proposal-received: "&d{player} &fwants to marry you! \n&fType &d/marry confirm &fto accept or &d/marry deny &fto decline."
  already-married: "&cYou're already married to &d{partner}&c!"
  target-already-married: "&c{player} is already taken!"
  no-pending-proposals: "&cYou have no pending marriage proposals!"
  proposer-offline: "&cThe person who proposed is no longer online!"
  proposal-cooldown: "&cYou can propose again in &d{time}&c seconds!"
  accept-sender: "&a{player} &aaccepted your proposal! You're now married!"
  accept-receiver: "&aYou married &d{player}&a!"
  decline-sender: "&c{player} declined your proposal."
  decline-receiver: "&cYou declined &d{player}'s &cproposal."
  divorce-initiator: "&cYou have divorced &d{player}&c."
  divorce-target: "&c{player} &chas divorced you."
  divorce-confirm: "&eAre you sure you want to divorce &d{player}&e? Type &d/divorce confirm &eto proceed."
  divorce-timeout: "&cDivorce confirmation expired. Use &d/divorce &cagain."
  divorce-cooldown: "&cYou must wait &d{time}&c seconds before you can divorce again!"
  not-married: "&cYou're not married!"
  not-married-to: "&cYou're not married to &d{player}&c!"
  announcement: "&f{player1} &fand &d{player2} &fjust got married! &d Congratulations!"
  divorce-announcement: "&c{player1} &fand &c{player2} &fhave divorced."

anniversary:
  global-announcement: "&d&5ANNIVERSARY CELEBRATION! &f{player1} &fand &d{player2} &fcelebrate &d{years} &fyear(s) of marriage!"
  couple-message: "&d&5Happy Anniversary! &fYou and &d{partner} &fhave been married for &d{years} &fyear(s)!"
  world-announcement: "&d&f{player1} &fand &d{player2} &fcelebrate their &d{years} &fyear anniversary!"

mood:
  not-married: "&cYou must be married to share your mood!"
  updated: "&fYour mood has been updated to: &d{mood}"
  partner-notified: "&fYour partner has been notified of your mood change!"
  partner-mood-changed: "&fYour partner &d{partner} &fis now feeling: &d{mood}"
  unknown: "&7Unknown"
  very-good: "&aVery Good"
  good: "&eGood"
  neutral: "&fNeutral"
  bad: "&cBad"
  very-bad: "&4Very Bad"

stats:
  usage: "&cUsage: &d/valentinesplayer <player>"
  header: "&5{player}'s Valentine Stats"
  kisses: "&dKisses received: &f{count}"
  hugs: "&dHugs received: &f{count}"
  likes: "&dLikes received: &f{count}"
  married: "&dMarried to: &f{partner} &d(for {days} days)"
  single: "&dRelationship status: &fSingle"
  total-score: "&dTotal Score: &f{score}"
  mood: "&dCurrent mood: &f{mood}"

leaderboard:
  header: "&5Valentine Leaderboard"
  entry: "&a#{rank} &d{player} &f- &d{score} &fpoints &7(&d{kisses}&f, &d{hugs}&f, &d{likes}&7)"
  empty: "&cNo players found on the leaderboard yet!"

marriages:
  header: "&5Married Couples "
  couple: "&f&d{player1} &f& &d{player2} &f- &d{days} &fdays together"
  none: "&dThere are no married couples on the server yet!"

player-search:
  prompt: "&fPlease type the name of the player you want to search for:"
  not-found: "&c❌layer '{player}' not found or is not online!"
  searching: "&fSearching for player: &d{player}&f..."

gui:
  main-menu-title: "&d❤ Valentines Menu ❤"
  stats-menu-title: "&d❤ &5Player Stats &d❤"
  leaderboard-title: "&d❤ &5Love Leaderboard &d❤"
  marriages-title: "&d❤ &5Married Couples &d❤"
  settings-title: "&d❤ &5Effect Settings &d❤"
  mood-title: "&d❤ &5Mood Settings &d❤"
  achievements-menu-title: "&d❤ &5Achievements &d❤"
  player-profile-title: "&d❤ &5{player}'s Profile &d❤"

  stats-button-title: "&dYour Stats"
  stats-button-lore:
    - "&fView your statistics"
    - "&7See what and from who you received"
  leaderboard-button-title: "&dLeaderboard"
  leaderboard-button-lore:
    - "&fSee the most loved players"
    - "&7Compete for the top spot!"
  marriages-button-title: "&dMarried Couples"
  marriages-button-lore:
    - "&fView all marriages on the server"
    - "&7See who is really married!"
  settings-button-title: "&dSettings"
  settings-button-lore:
    - "&fCustomize your particle effects"
    - "&7Just don't forget to allow animations!"
  mood-button-title: "&dMood"
  mood-button-lore:
    - "&fSet your current mood"
    - "&7Let others know how you feel!"
  achievements-button-title: "&dAchievements"
  achievements-button-lore:
    - "&fView your achievements"
    - "&7Track your progress!"
  player-search-button-title: "&dPlayer Search"
  player-search-button-lore:
    - "&fSearch for other players"
    - "&7Find and interact with players!"

  hugs-title: "&dHugs Received"
  hugs-lore:
    - "&fYou've received &d{count} &f hugs"
    - "&7Do you actually like it?"
  kisses-title: "&dKisses Received"
  kisses-lore:
    - "&fYou've received &d{count} &fsweet kisses"
    - "&7Maybe you should do your first move?"
  likes-title: "&dLikes Received"
  likes-lore:
    - "&fYou've received &d{count} &flikes"
    - "&7People really appreciate you!"
  marriage-title: "&dMarriage Status"
  marriage-lore:
    - "&fYou are married to &d{partner}"
    - "&fFor &d{days} &fdays"
    - "&7True love never dies!"
  single-title: "&dRelationship Status"
  single-lore:
    - "&fYou are currently single"
    - "&7Don't worry, somebody is out there!"
  mood-display-title: "&dYour Mood"
  mood-display-lore:
    - "&fCurrent mood: &d{mood}"
    - "&7Let others know how you feel!"

  leaderboard-entry-title: "&a#{rank} &d{player}"
  leaderboard-entry-lore:
    - "&fTotal Love Score: &d{score}"
    - "&fHugs: &d{hugs}"
    - "&fKisses: &d{kisses}"
    - "&fLikes: &d{likes}"

  marriage-couple-title: "&d{player1} &f♥ &d{player2}"
  marriage-couple-lore:
    - "&fMarried since: &d{date}"
    - "&fDays together: &d{days}"
    - "&7A beautiful love story!"

  hug-button-title: "&dHug {player}"
  hug-button-lore:
    - "&fGive them a hug"
    - "&7Feels good?"
  kiss-button-title: "&dKiss {player}"
  kiss-button-lore:
    - "&fSend them a kiss"
    - "&7That's good move!"
  like-button-title: "&dLike {player}"
  like-button-lore:
    - "&fShow your appreciation"
    - "&7Let them know you care!"
  marry-button-title: "&dMarry {player}"
  marry-button-lore:
    - "&fPropose marriage"
    - "&7Just hope for the best!"

  mood-very-good-title: "&aVery Good"
  mood-very-good-lore:
    - "&fSet your mood to Very Good"
    - "&7You're feeling amazing!"
  mood-good-title: "&eGood"
  mood-good-lore:
    - "&fSet your mood to Good"
    - "&7You're doing well!"
  mood-neutral-title: "&fNeutral"
  mood-neutral-lore:
    - "&fSet your mood to Neutral"
    - "&7You're feeling okay!"
  mood-bad-title: "&cBad"
  mood-bad-lore:
    - "&fSet your mood to Bad"
    - "&7What happened?"
  mood-very-bad-title: "&4Very Bad"
  mood-very-bad-lore:
    - "&fSet your mood to Very Bad"
    - "&7Why?"

  partner-mood-title: "&d{partner}'s Mood"
  partner-mood-lore:
    - "&fCurrent mood: &d{mood}"

  effect-spiral: "&dSpiral Effect"
  effect-heart: "&dHeart Effect"
  effect-cloud: "&dCloud Effect"
  effect-selected: "&aSelected"
  effect-disabled: "&cDisabled"

  back-button: "&c⬅ Back"
  prev-page-button: "&a⬅ Previous Page"
  next-page-button: "&a➡ Next Page"
  page-info: "&fPage &d{current}&f/&d{total}"
  close-button: "&cClose Menu"

sounds:
  hug: "ENTITY_PLAYER_LEVELUP"
  kiss: "ENTITY_EXPERIENCE_ORB_PICKUP"
  like: "ENTITY_VILLAGER_YES"
  marry: "ENTITY_FIREWORK_ROCKET_LAUNCH"
  divorce: "ENTITY_VILLAGER_NO"
  mood-change: "BLOCK_NOTE_BLOCK_CHIME"

achievements:
  unlocked: "&a&Achievement Unlocked! &d{achievement}"
  description: "&f{description}"
  broadcast: "&d{player} &fhas unlocked the achievement: &d{achievement}&f!"
  progress: "&fYou have unlocked &d{unlocked}&f/&d{total} &fachievements &7({percentage}%)"
```
</details>

<details>
  <summary><strong>likes.yml</strong></summary>

```yaml
```
</details>

<details>
  <summary><strong>marriages.yml</strong></summary>

```yaml
```
</details>

<details>
  <summary><strong>playerdata.yml</strong></summary>

```yaml
players:
  (UUID):
    name: (playername)
    hugs: 0
    kisses: 0
    likes: 0
    hugs-given: 0
    kisses-given: 0
    likes-given: 0
    effect-type: heart
    effect-enabled: true
    mood: unknown
    last-seen: (time)
    achievements: []
```
</details>

<details>
  <summary><strong>proposals.yml</strong></summary>

```yaml
proposals: {}
```
</details>