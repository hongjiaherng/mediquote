# MediQuote
A medical insurance premium prediction system.

## About the project
A web application that allows users to get a quote for their medical insurance premium based on medical conditions and demographic information. 

## Getting Started

### Prerequisites

- Python 3.8 or above
- [Poetry](https://python-poetry.org/) - Python dependency management tool

## Usage

### Running the web server

1. Change directory into the server root
```sh
mediquote> cd "./mediquote/server/"
```
2. Activate the virtual environment
```sh
mediquote/mediquote/server> poetry shell
```
3. Start the web server
```sh
mediquote/mediquote/server> flask --app app --port=5000 run
``` 

or 

```sh
mediquote/mediquote/server> python app.py
```


## Acknowledgement
This project is developed to fulfill a group assignment for the WIE3005 Knowledge Management and Engineering course at [University of Malaya](https://www.um.edu.my/)