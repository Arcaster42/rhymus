[![first-timers-only](https://img.shields.io/badge/first--timers--only-friendly-blue.svg?style=flat-square)](https://www.firsttimersonly.com/)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square)](http://makeapullrequest.com)
[![Open Source Love png2](https://badges.frapsoft.com/os/v2/open-source.png?v=103)](https://github.com/ellerbrock/open-source-badges/)
![GitHub closed pull requests](https://img.shields.io/github/issues-pr-closed/arcaster42/rhymus)
[![Build Status](https://travis-ci.org/Arcaster42/rhymus.svg?branch=master)](https://travis-ci.org/Arcaster42/rhymus)

# Rhymus

An open-source rhyming game project designed for new developers and first-time contributors.

## News

As of January 22nd, the `master-vue` branch is now up and ready for contributions! You can use the existing `master` branch as a model for how the Vue application should be developed. Included in the Vue project are unit tests (using Jest) and Vuex (for state management).

Additional improvements to the vanilla `master` branch are still welcome. **React** will have its own branch set up some time in February.

As a professional Vue developer, I will be particularly involved with contributions and any questions that come about regarding the `master-vue` branch, so feel free to ask for advice and make those PRs!

## Gameplay

Rhymus is an open-source game that will display cards with sentences on them. Each sentence will have one word that doesn't quite make sense but rhymes with a word that does. For example, 'I have a pet fog.' -> Answer: 'Dog'. A timer gives you 30 seconds to complete as many as possible.

## Design

This project will go through **two phases**. The first will be an initial build using a Node back-end and HTML, CSS, and JS front-end. For the first build, there will be no React/Redux implementation.

Once the first build is complete and feature-complete, **two new branches** will be created in which the project will be refactored using **React** and **Vue**.

## Contributions

This project is starting from scratch, so there are ample opportunities to contribute. The quickest way to contribute is to **check out the projects tab and see what priorities are there**. Otherwise, any of the following is a great way to contribute:

- Editing the README
- Creating new files for the project structure
- Restructuring the project to comply with best practices
- Coding any of the front-end or back-end
- Coding test files
- Offering alternative styling
- Suggesting better practices for GitHub management (including contribution guidelines)

## Contribution Guidelines

When you contribute, please use the following guidelines:

- Name your branch in a way that reflects what you plan on doing ('implement-card-scrolling')
- Provide detailed information in your pull request regarding what you did and why it is done that way
- In your pull request, reflect on your code and include comments as to whether it may need refactoring or if anything was particularly difficult
- Include tests with your contribution if applicable

This is an open-source project for developers of all experience levels. Please show common courtesy and provide constructive feedback where possible.

## Complete Guide for Beginners

If you are entirely new to contributing to open-source projects or using Git, follow this little guide to make your first PR. Keep in mind there are many ways to complete this, but this is designed to be very basic and easy-to-follow. If it's not, please correct it!

1) Click **Fork** in the top right to make a copy of this repository.
2) Assuming you have GitBash installed, right-click your documents folder (where you store project folders) and open in GitBash.
3) Type in `git clone https://username@github.com/username/rhymus`.
4) Open this folder in your IDE (such as Visual Studio Code).
5) In your terminal (open from the terminal drop-down up top in VS Code), type `git checkout -b add-puzzle`.
6) On the left, open the **src** folder then the **js** folder and open **puzzles.js**.
7) Follow the pattern you see there and create a new rhyming puzzle and save your changes.
8) In your terminal, type in `git commit -m "added new puzzle"`.
9) In your terminal, type in `git remote add origin https://username@github.com/username/rhymus`.
10) In your terminal, type in `git push origin add-puzzle`.
11) In GitHub, go to your repository and select the **add-puzzle** branch.
12) Click on the **New Pull Request** button and fill that out.

Done!

But wait, what just happened?

1) **Forking** created a copy of the repository under your GitHub account.
2 - 3) Using GitBash, you put a copy of that repository onto your local machine where you can open and edit all the files. Cloning just makes an exact copy of the repository the URL points to.
4 - 5) You opened the folder and created a new branch. **Checkout** moves to a new branch, and the -b means it will create the new branch.
6 - 7) You added a new puzzle following the pattern, hopefully!
8) You commited your save! This means you officially saved and got your changes ready to be pushed to your repository officially. The -m signifies a message attached to the commit so that you and others can see what the commit is about.
9) You added a remote! This is a place you will push to regularly. You will only add a single remote one time, then you give it a nickname (usually origin) which you can use instead of typing the long URL every time.
10) You pushed from your local save to your repository on the add-puzzle branch! Your commit is officially in your online repository!
11 - 12) You made a pull request, which is a request for the original repository (this one) to accept your changes into the base!

Maybe you're thinking, **"Wait, what if my code is terrible? Or broken? Or completely wrong?"** Doesn't matter! When you make a pull request, your code will be reviewed before being merged into the official repository. If it needs changes, you will receive comments explaining what, how, and why to change! Once you make changes, you can push again and it will automatically update your pull request (so don't close it if it isn't approved right away). Making those mistakes is exactly how you'll learn.

If you're feeling bold, make more changes, commits, pushes, and PR's!

## About the Author
I'm a full-stack software developer currently working in Tokyo, Japan. I put this project together to both solidify and share my knowledge of programming. I also offer methorship programs to budding programmers in three-month blocks, so feel free to check me out on LinkedIn and contact me if you're interested in finding a mentor.
