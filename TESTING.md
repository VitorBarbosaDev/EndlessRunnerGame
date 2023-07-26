# Endless Runner Game - Testing

![Multi_Display_Example](https://github.com/VitorBarbosaDev/EndlessRunnerGame/assets/46977318/8950d572-a388-441f-aa08-5d328997a5bb)

This website was built to give players an enjoyable yet challenging game that they could play on the web.



Live Site: https://vitorbarbosadev.github.io/EndlessRunnerGame/

---

## CONTENTS

* [AUTOMATED TESTING](#automated-testing)
  * [W3C Validator](#w3c-validator)
  * [Lighthouse](#lighthouse)
  * [WAVE](#wave)

* [MANUAL TESTING](#manual-testing)
  * [Testing User Stories](#testing-user-stories)
  * [Full Testing](#full-testing)

* [BUGS](#bugs)
  * [Known Bugs](#known-bugs)
  * [Solved Bugs](#solved-bugs)

---

## AUTOMATED TESTING

Automated Testing includes all the testing that is carried out by a program, like W3C HTML validation.

###  W3C Validator
W3C was used to validate all pages and also the CSS.

#### Results for Index.html
![image](https://github.com/VitorBarbosaDev/EndlessRunnerGame/assets/46977318/4d16698b-4530-41a5-8ce3-2c264deb2e5f)



#### **CSS Validation**

![image](https://github.com/VitorBarbosaDev/EndlessRunnerGame/assets/46977318/d74c31ac-0a1e-404e-a6ab-88b1f92f9e0d)



### Lighthouse
Lighthouse was used to on all pages below are the results
#### Desktop Testing

#### Results for Index.html
![image](https://github.com/VitorBarbosaDev/EndlessRunnerGame/assets/46977318/aa4046e9-f844-4e98-b16f-69793a76a095)



#### Mobile Testing

#### Results for Index.html
![image](https://github.com/VitorBarbosaDev/EndlessRunnerGame/assets/46977318/c811289f-2735-43e9-964a-13fc6224e065)



### WAVE
Wave was used to test the accessibility of each page 

#### Results for Index.html
- ![image](https://github.com/VitorBarbosaDev/EndlessRunnerGame/assets/46977318/00efa76e-eba4-45a1-bc87-e84573866818)


I do seem to have a bit of a contrast issue with my buttons so changing these would probably be worth it in the future for better assibility.


## MANUAL TESTING

### Testing User Stories


| Goals | How are they achieved? | Image |
| :--- | :--- | :--- |
| `First Time Visitors` |
|  |  |  |
| I want to play a game on the web | The website available on the web and is responsive and adjusts to the size of the screen | [Multi_Display_Example](https://github.com/VitorBarbosaDev/EndlessRunnerGame/assets/46977318/8950d572-a388-441f-aa08-5d328997a5bb) |
| I want to learn how to play the game and what my goal is. | The game has a button that pops up a written tutorial. | [How To Play](https://github.com/VitorBarbosaDev/EndlessRunnerGame/assets/46977318/841a92a7-1731-4568-bdfa-90f8f9bcfdcf)|
| I want to easily tell what my score is. | Score at the top of the screen always. | [score](https://github.com/VitorBarbosaDev/EndlessRunnerGame/assets/46977318/304b7e1c-b30e-4004-b460-cf8e8fc0b59f)|
|`Returning Visitors`|
|  |  |  |
| I want to try and beat my high score. | They can click on the Leaderboard button and scroll to find their last top score  | [Top scores](https://github.com/VitorBarbosaDev/EndlessRunnerGame/assets/46977318/6c24c3e2-9f52-4247-bfbb-f5f32c31e9a4)|
| I want to listen to the game sounds. | They can click the Mute button to turn sound on or off | [Mute Button](https://github.com/VitorBarbosaDev/EndlessRunnerGame/assets/46977318/b522cdc5-dd13-4259-8f08-d184d9bac643) |
| I want to play on my mobile instead of pc. | Responsive design allows players to put down the keyboard and jump on mobile |  [Multi_Display_Example](https://github.com/VitorBarbosaDev/EndlessRunnerGame/assets/46977318/8950d572-a388-441f-aa08-5d328997a5bb) |
|  |  |  |
| I want to few the leaderboard to see if my score is still top ten. | They can see their top scores on the leaderboard screen. | [Top scores](https://github.com/VitorBarbosaDev/EndlessRunnerGame/assets/46977318/6c24c3e2-9f52-4247-bfbb-f5f32c31e9a4) |


### Full Testing

Full testing was performed on the following devices:

* Computer:
  * 1440p Monitor
  * 1080p Monitor
* Laptop:
  * Macbook Pro 2022 14 inch screen
* Mobile Devices:
  * Pocophone F3.
  * Samsung Galaxy S20 Ultra .

Each device tested the site using the following browsers:

* Google Chrome
* Safari
* Firefox


| Feature | Expected Outcome | Testing Performed | Result | Pass/Fail |
| --- | --- | --- | --- | --- |
| `Buttons` |
|  |  |  |  |  |
| Play Button| Request username if null | Clicked button | asked user to input a string. | Pass |
| Play Button| Starts game if name input is not null.| Clicked button | Starts Game. | Pass |
| Mute Button | When clicked changes string and mutes and unmutes. | Clicked button | Unmuted or muted and changed string to reflect. | Pass |
| How to play Button | When clicked, pops up with a screen explaining how to play. | Clicked button | Shows how to play screen. | Pass |
| Leaderboard Button| When clicked, pops up a leaderboard screen with multiple scores gathered from the Firebase database. | Clicked button | pops up with leaderboard screen and allows scroll. | Pass |
| Fullscreen Button | When clicked, full screens the tab and also disappears on smaller screens. | Clicked button | full screens the tab and also disappears on smaller screens. | Pass |
| Restart Button | When clicked, restarts game | Clicked button | restarts game. | Pass |
| `Game Features` |
|  |  |  |  |  |
| Player Jump | When the screen is tapped, the space bar is pressed or clicked the screen player should jump. | Clicked screen, pressed spacebar and tapped screen | player jumps after all inputs. | Pass |
| Sounds | All sounds should play correctly when actions are performed. | I unmuted, died and jumped | background song is playing, jump plays when jump and die plays when crash into the obstacle. | Pass |
| Obstacles movement |  Obstacles should move to the other side of the screen and then reset to the right side | Played game | Obstacles move to one side and then appear on the other at the right time. | Pass |
| Obstacles height |  Obstacles have random heights | played game | Obstacles have random heights. | Pass |
| Score updates |  Score should update once player goes passed obstacles | played game | Score updates once a player goes past obstacles. | Pass |
| Score update leaderboard |  Once the game is over send the score to the database | played game | Once the game is over score is sent to the database and viewable on the leaderboard screen. | Pass |
| Pull leaderboard Scores |  Once the game is over scores are pulled from the database | played game |  Once the game is over scores are pulled from the database and viewable on the leaderboard screen. | Pass |
| `screens` |
|   |   |   |   |
| Leaderboard Screen| Once open player should be able to close by clicking outside the screen or using the x button. | Clicked outside and x button  | closes correctly | Pass |
| How to play Screen| Once open player should be able to close by clicking outside the screen or using the x button. | Clicked outside and x button  | closes correctly | Pass |
|   |   |   |   |  |

 - - -


## BUGS

### Known Bugs

Sometimes the resizing can be a bit funny and causes the game to restart.


### Solved Bugs

| No | Bug | How I resolved the issue |
| :--- | :--- | :--- |
| 1 | The player would double job if multiple inputs were inputted at the same time. | To fix this, I added a tiny time when a player can't jump again |
| 2 | When the height and width of the canvas were set to 100%% canvas text would stretch | In order to fix this, I removed that CSS and made it so the text was responsive in js. |
| 3 | The player could go above or below the canvas. | In order to fix this, I added a limit to stop the player from jumping too high and the player dies if he goes to the bottom. |
| 4 | Players on mobile couldn't tell where the column was. | In order to fix this, I added a marker to make it a bit easier for them to predict. |
| 5 | Game would run at different framerates depending on the device causing jumps and other variables to be different. | In order to fix this, I made the game time-dependent instead of frame rates so now the values I set feel the same everywhere. |
| 6 | Making codes for Firebase a bit more secure. | In order to fix this, I added them to a different file and encrypted them so that while easily breakable they are no longer in plain text I also added rules to the database that only allows scores and names to be added. |

