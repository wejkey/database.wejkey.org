# Calendar365

**Original Calendar plugin.**
*Let your players check the date!*

---

## Features
- GUI: Keep it simple with only `/calendar` command
- Edit: Edit months, days, colors in config.yml

---

## Commands & Permissions

| Command       | Alias | Description                 | Permission           |
|---------------|-------|---------------------|--------------------|
| `/calendar`    | - | Opens main gui | `calendar365.use`   |

---

## Images / Screenshots

Section "**Gallery**"

---

## Files
<details>
  <summary><strong>config.yml</strong></summary>

```yaml
messages:
  no-permission: "§cYou don't have permission to use this command!"
  player-only: "§cThis command can only be used by players!"

gui:
  month-selector-title: "§7§lCalendar 365"
  back-button-name: "§c« Back to Months"

months:
  - name: January
    days: 31
    title: "§7Days: §f31"
  - name: February
    days: 28
    title: "§7Days: §f28"
  - name: March
    days: 31
    title: "§7Days: §f31"
  - name: April
    days: 30
    title: "§7Days: §f30"
  - name: May
    days: 31
    title: "§7Days: §f31"
  - name: June
    days: 30
    title: "§7Days: §f30"
  - name: July
    days: 31
    title: "§7Days: §f31"
  - name: August
    days: 31
    title: "§7Days: §f31"
  - name: September
    days: 30
    title: "§7Days: §f30"
  - name: October
    days: 31
    title: "§7Days: §f31"
  - name: November
    days: 30
    title: "§7Days: §f30"
  - name: December
    days: 31
    title: "§7Days: §f31"

date-display:
  today-status: "§f§lTODAY"
  past-status: "§a§lPast"
  future-status: "§c§lFuture"
  day-format: "§e{month} {day}, {year}"
  status-prefix: "§7Status: "
  click-to-view: "§7Click to view!"
```
</details>