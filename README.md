# Food Recipes

Simple application that allows to draw a recipe for a dish based on the ingredient given by the user.

## Demo 🔴

Link to the demo video: [here](https://youtu.be/INzZixzZhVc).

## Table of Contents 📃

- [General Information](#general-information)
- [Technologies Used](#technologies-used)
- [Installation](#installation)
- [Screenshots](#screenshots)
- [Ideas & Improvements](#ideas-improvements)

## General Information <a name="general-information"/> ℹ️

A project was created to practice Node JS and its basic libraries. The application connects to external API using Fetch and teaches how to handle such data structure.

The project uses the Tasty API and allows to download a random dish recipe, based on an ingredient that the user provides. According to downloaded data
a folder with the name of the dish is created. Depending on the recipe, in folder there are: description of the dish, photo of the dish, exact recipe, list of ingredients and nutritional values.

At first, the data is encrypted and compressed. Then the console interface asks the user to accept the recipe and the data is decrypted and extracted.
If the dish is not to your taste, try again!


## Technologies Used <a name="technologies-used"/> 💻

- Node JS,
- npm,
- Fetch,
- API,
- Eslint + airbnb,

## Installation <a name="installation"/> 💿

> Clone the repository

> Go to it using the terminal

$ cd foldername

> Install dependencies and avoid eslint problems

$ npm install --legacy-peer-deps

> Run the App

$ node index.js **ingredient** (e.g. **pasta, rice, chicken**)

> Test the App

If you want to test the application, please [contact me](uraspawel@gmail.com) for an API key

## Screenshots <a name="screenshots"/> 🖵

- App structure

<a href="https://imgbb.com/"><img src="https://i.ibb.co/2FhJjBW/1.png" alt="App structure" width = "300px" /></a>

- Console interface

<a href="https://ibb.co/9Wh9f9x"><img src="https://i.ibb.co/CQ65X5j/2.png" alt="Console interface" /></a>

- Example of a downloaded recipe

<a href="https://ibb.co/mbDCfpW"><img src="https://i.ibb.co/jb6vntX/3.png" alt="Dish recipe" /></a>

## Ideas & Improvements <a name="ideas-improvements"/> 💡

Currently, the application is at the stage of a working prototype that can be used.
I am gradually implementing improvements and fixing bugs.

The first improvement I'm going to implement is to change the method of file encryption. I'm also going to improve the handling of asynchrony in the project.

I am open to contact, suggestions and cooperation. If you have any ideas or encounter a problem, please email me at: uraspawel@gmail.com
