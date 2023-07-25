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

The Automated Testing includes all the testing that is carried out by a program, like W3C HTML validation.

###  W3C Validator
W3C was used to validate all pages and also the css.

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


The I do seem to have a bit of a contrast issue with my buttons so changing these would probably be worth it in the future for better assibility.


## MANUAL TESTING

### Testing User Stories


| Goals | How are they achieved? | Image |
| :--- | :--- | :--- |
| `First Time Visitors` |
|  |  |  |
| I want to play a game on the web | The website availble on the web and is responsive and adjusts to size of screen | [Multi_Display_Example](https://github.com/VitorBarbosaDev/EndlessRunnerGame/assets/46977318/8950d572-a388-441f-aa08-5d328997a5bb) |
| I want to learn how to play the game and what my goal is . | The game has a button that pops up a written tutorial. | [How To Play](![image](https://github.com/VitorBarbosaDev/EndlessRunnerGame/assets/46977318/841a92a7-1731-4568-bdfa-90f8f9bcfdcf)
) |
| I want to easily tell what my score is. | Score top of screen always. | [Footer](assets/images/testingimages/testing-manual-testing-footer.png) |
|`Returning Visitors`|
|  |  |  |
| I want to see if any new photos have been added to the gallery. | They can click on the gallery link and view any new photos there. | [Gallery Page](assets/images/testingimages/testing-manual-testing-gallery.png) |
| I want to book another haircut. | They can click on the contact page. On that page, there is a link to Instagram where they can direct message, or a submission form that is locationed at the bottom of the contact page. | [Contact Page](assets/images/testingimages/testing-manual-testing-contact.png) |
| I want to find social media links. | Social media links are in the footer on each page. | [Footer](assets/images/testingimages/testing-manual-testing-footer.png) |
|`Frequent Visitor Goals` |
|  |  |  |
| I want to see what time the barber opens and the location. | There is a timesheet on the contact page so they can see the time there, along with a map to the location of the barber. | [Contact Page](assets/images/testingimages/testing-manual-testing-contact.png)  |


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
| `Navbar` |
|  |  |  |  |  |
| Logo | When clicked, the user will be redirected to the home page. | Clicked Logo | Redirected to the home page. | Pass |
| Home Page Link | When clicked, the user will be redirected to the home page.| Clicked link | Redirected to the home page. | Pass |
| About Link | When clicked, the user will be redirected to the About page. | Clicked link | Redirected to the About page. | Pass |
| Services Link | When clicked, the user will be redirected to the Services page. | Clicked link | Redirected to the Services page. | Pass |
| Gallery Link | When clicked, the user will be redirected to the Gallery page. | Clicked link | Redirected to the Gallery page. | Pass |
| Contact Link | When clicked, the user will be redirected to the Contact page. | Clicked link | Redirected to the Contact page. | Pass |
| `Footer` |
|  |  |  |  |  |
| Tiktok Button | When clicked, the user will be redirected to Guilherme's Tiktok page in a new tab. | Clicked button | Redirected to Guilherme's Tiktok page. | Pass |
| Instagram Button |  When clicked, the user will be redirected to Guilherme's Instagram page in a new tab. | Clicked button | Redirected to Guilherme's Instagram page. | Pass |
| `Home Page` |
|   |   |   |   |
| Book Right Now | When clicked, the user will be redirected to the contact page. | Clicked link  | Redirected to the contact page. | Pass |
| Review Photos are responsive | When hovered over, the picture grows larger. | Hovered over photo  | Image got larger and overlayed properly. | Pass |
| Tiktok Section loads and plays video | When videos are hovered over, they start playing and once clicked, they open. | Hovered over and clicked | On click, was redirected to Tiktok page and on hover, allowed me to view the Tiktok clips. | Pass |
| `About Page` |
|   |   |   |   |  |
| Page layout Properly | The image goes to the left and text on right. | Loaded page | The image displays on the left and text on the right. | Pass |
| `Services Page` |
|   |   |   |   |  |
| Page layout Properly | Table loaded in center. | Loaded page | Table loaded in center. | Pass |
| `Gallery Page` |
|   |   |   |   |  |
| Load Images and lay them out in a column of three | Load Images and lay them out in a column of three. | Loaded page | Pages load and the images format into a column of three. | Pass |
| `Contact Page` |
| Page layout Properly | There should be a section on the left with "contact me on Instagram" section then on the right there is a map location and time. Below, a form should load.  | Loaded page | The Instagram section is located to the left and the map and time are located to the right. Below, the "book your cut" form appears. | Pass |
| Instagram Button |  When clicked, the user will be redirected to Guilherme's Instagram page in a new tab. | Clicked button | Redirected to Guilherme's Instagram page.

| Pass |
| Form Validation | User should be unable to submit if first name, last name, email address, and a day isn't selected. | Didn't fill in each individual element then clicked on Book button. | Form submission gets rejected until all the required elements are filled in. | Pass |
| Form Submission | User should be able to submit form and be redirected to the success page. | Clicked on Book button. | Form submits and user gets redirected to success page. | Pass |
| `Success Page` |
|   |   |   |   |   |
| Home page link | Redirects the user to the home page. | Clicked link | Redirected to home page. | Pass |

 - - -


## BUGS

### Known Bugs

As far as I'm aware, there are currently no known bugs.


### Solved Bugs

| No | Bug | How I resolved the issue |
| :--- | :--- | :--- |
| 1 | The photo in the "Why Cut With Me" section had a lot of space on the right. | To fix this, I added a container on top of the image which allowed me to crop the right side of the image to look how I wanted it to. |
| 2 | The format of the "About" page kept breaking between 752 - 500px. | In order to fix this, I needed to add additional media queries and adjusted the format for these resolutions. |
| 3 | The format of the "Contact" page kept breaking between 1550px - 1200px. | In order to fix this, I needed to add additional media queries and adjusted the format for these resolutions. |
| 4 | The header was causing certain pages to have a horizontal scroll. | In order to fix this, I needed to remove the padding that was present as this, combined with width:100%, was causing errors as the header would take up a bit more room than what it should. I also added a margin:0 auto; to then center the logo in the middle of the page. |

