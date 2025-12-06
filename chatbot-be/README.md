<a id="readme-top"></a>


<!-- PROJECT LOGO -->
<br />
<div align="center">

<h3 align="center">chatbot-be</h3>

  <p align="center">
    
    <br />
    <a href=""><strong>Explore the docs »</strong></a>
    <br />
    <br />
    <a href="">Report Bug</a>
    ·
    <a href="">Request Feature</a>
  </p>
</div>



<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li><a href="#usage">Usage</a></li>
    <li><a href="#running-with-docker">Running with Docker</a></li>
    <li><a href="#build">Build</a></li>
    <li><a href="#roadmap">Roadmap</a></li>
    <li><a href="#contributing">Contributing</a></li>
    <li><a href="#contact">Contact</a></li>
  </ol>
</details>



<!-- ABOUT THE PROJECT -->
# About The Project


TBW

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- GETTING STARTED -->
# Getting Started

This is an example of how you may give instructions on setting up your project locally.
To get a local copy up and running follow these simple example steps.

## Prerequisites

This is an example of how to list things you need to use the software and how to install them.
* python 3.12
  ```sh
  pyenv install 3.12 # python installation using pyenv is recommended but not mandatory (https://github.com/pyenv/pyenv)
  ```
* poetry
  ```sh
  # Linux, macOS, Windows (WSL)
  curl -sSL https://install.python-poetry.org | python3 -
  
  #powershell
  (Invoke-WebRequest -Uri https://install.python-poetry.org -UseBasicParsing).Content | py -
  ```
## Installation

1. Clone the repo
   ```sh
   git clone repo_link
   ```
2. install poetry env
   ```sh
   pyenv local 3.12
   poetry env use 3.12
   poetry lock
   poetry install
   ```

   or with `make` utility:
   ```sh
   make setup
   ```

<!-- USAGE EXAMPLES -->
## Usage

You can run your FastAPI application using one of the following methods:

- **Using a shell command**:
   ```sh
   ENV="local" DATA_FOLDER=$(shell pwd)/data poetry run uvicorn chatbot_be.main:app --port 8090
   ```

- **Using PowerShell**:
   ```powershell
   $ENV:ENV="local"; $ENV:DATA_FOLDER="$(Get-Location)\data"; poetry run uvicorn chatbot_be.main:app --port 8090
   ```

- **Using the `make` utility**:
   ```sh
   make run-local
   ```

You can run tests for your FastAPI application using one of the following methods:

- **Using a shell command**:
   ```sh
   PYTHONPATH=:. poetry run pytest --cov=chatbot_be  
   ```

- **Using PowerShell**:
   ```powershell
   $ENV:PYTHONPATH="."; poetry run pytest --cov=chatbot_be
   ```

- **Using the `make` utility**:
   ```sh
   make test
   ```

<p align="right">(<a href="#readme-top">back to top</a>)</p>

## Running with Docker

You can run your FastAPI application using Docker in the following ways:

- **Using Docker directly**:
   Build the Docker image and run the container manually:
   ```sh
   docker build -t chatbot-be:local .
   docker run -p 8090:8090 --env ENV=local --env DATA_FOLDER=/app/data chatbot-be:local
   ```

- **Using Docker Compose**:
   Use `docker-compose` to build and run the application:
   ```sh
   docker compose up
   ```

- **Using the `make` utility**:
   - Run the application with tests and Docker Compose:
     ```sh
     make run
     ```
   - Run the application with Docker Compose without running tests:
     ```sh
     make run-docker
     ```
     

<!-- ROADMAP -->
## Build

This project provides functionality for building the wheel. The build process can be executed using one of the following commands:

1. `poetry build`, this command utilizes Poetry's built-in build system to package the project.

2. `poetry run -m build`,this command runs the `build` module explicitly using Poetry, which allows for more customization and control over the build process.

Both commands will generate the necessary distribution files for the project, such as source distributions (`.tar.gz`) and wheel files (`.whl`), which can be used for distribution or deployment. These files will be located in the `dist` folder.

<!-- ROADMAP -->
## Roadmap

- [ ] TBW
    - [ ] TBW

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- CONTRIBUTING -->
## Contributing

1. Clone the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Merge Request

<p align="right">(<a href="#readme-top">back to top</a>)</p>


<!-- CONTACT -->
## Contact

varinichiara@gmail.com

<p align="right">(<a href="#readme-top">back to top</a>)</p>