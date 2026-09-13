# Tarot Reading Website

An interactive web application for tarot card readings. The project combines a frontend built with HTML, CSS and JavaScript with a Python Flask backend responsible for card selection and API communication.

## Project Overview

The application allows users to choose a tarot spread, enter basic personal information, and receive a personalized card reading.

The interface includes animations, visual effects, and sound effects to create an interactive user experience.

## Features

### Tarot Spreads

The application supports several types of readings:

* Classic three-card spread — Love, Career, Future
* Past, Present, Future
* Love, Challenge, Advice
* Spiritual Message
* Five-card spread

### User Input and Validation

* User name and date of birth input
* Automatic age calculation
* Form validation
* Required field validation
* Input validation for user data

### Card Reading

* Interactive card selection
* Random card drawing
* Card animations and sound effects
* Display of selected cards and their descriptions
* Different interpretations depending on the selected reading type

## Technologies

### Frontend

* HTML5
* CSS3
* JavaScript

### Backend

* Python
* Flask
* JSON
* CORS

## Backend API

The Flask backend provides an API endpoint:

`/api/gadanie`

The endpoint receives user information and the selected spread type and returns a set of randomly selected cards in JSON format.

Each card contains descriptions for different contexts, such as love, career, and general messages, as well as information about the overall reading.

## Project Structure

```text
tarot-site/
├── images/
├── screenshots/
├── app.py
├── card.mp3
├── index.html
├── script.js
├── style.css
└── README.md
```

## How to Run

1. Install Flask:

```bash
pip install flask
```

2. Start the Flask backend:

```bash
python app.py
```

3. Open `index.html` in a browser.

## Project Focus

This project was created to practice:

* Building an interactive web interface
* Connecting a frontend with a Python backend
* Working with REST API endpoints
* Handling JSON data
* Form validation
* Creating animations and interactive UI elements
