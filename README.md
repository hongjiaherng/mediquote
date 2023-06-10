# MediQuote
A medical insurance premium prediction system.

## About the project
A web application that allows users to get a quote for their medical insurance premium based on medical conditions and demographic information. 

## Getting Started

### Prerequisites
- Client-side
  - [Node.js](https://nodejs.org/en) version 18.16.0
  - Angular CLI with version 16.0.5
- Server-side
  - Python 3.8 or above
  - [Poetry](https://python-poetry.org/) - Python dependency management tool

## Usage

### Running the client

1. Change directory into the client root
```sh
mediquote> cd "./mediquote/client/"
```
2. Install dependencies
```sh
mediquote/mediquote/client> npm install -g @angular/cli@16.0.5
```
2. npm Install
```sh
mediquote/mediquote/client> npm install
```
3. Start the web server
```sh
mediquote/mediquote/client> ng serve
```

### Running the web server

1. Change directory into the server root
```sh
mediquote> cd "./mediquote/server/"
```
2. Install dependencies ([Guide](https://python-poetry.org/docs/basic-usage/#installing-dependencies))
```sh
mediquote/mediquote/server> poetry install
```
3. Activate the virtual environment
```sh
mediquote/mediquote/server> poetry shell
```
4. Start the web server
```sh
mediquote/mediquote/server> python app.py
```
5. Test the web server
```sh
mediquote/mediquote/server> python test_app.py
```
6. Note
  - 3 endpoints are available:
    - `/index` - Home page
    - `/predict/decision-tree` - predict with decision tree model
    - `/predict/random-forest` - predict with random forest model
    - `/predict/mlp` - predict with MLP model
    - `/predict/xgboost` - predict with XGBoost model


## Tools & Technologies
- Client-side
  - Node.js, Angular CLI, NG-ZORRO
- Server-side
  - Python (>=3.8), Poetry, Flask, Scikit-learn, Pandas, Numpy, PyTorch


## Acknowledgement
This project is developed to fulfill a group assignment for the WIE3005 Knowledge Management and Engineering course at [University of Malaya](https://www.um.edu.my/)

Special thanks to the author of [this dataset](https://www.kaggle.com/datasets/tejashvi14/medical-insurance-premium-prediction). Although this dataset might not be robust enough for real-world application, it is sufficient for the purpose of this project to illustrate the idea of predicting premium cost using Machine Learning.
