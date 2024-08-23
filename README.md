# Project Name Readme

This README file provides instructions for setting up and running the backend and UI layers of the project.

## Backend Setup

1. **Open Visual Studio 2022:**

   Navigate to the `backend` folder and open the `presentation layer` solution file (`presentation Layer.sln`) in Visual Studio 2022.

2. **Open Package Manager Console:**

   In Visual Studio, use the keyboard shortcut "Ctrl + `(backtick)" to open the Package Manager Console.

3. **Select Default Project:**

   Before running database migrations, make sure to choose the default project as the `dataaccess layer`.

4. **Run Database Migrations:**

   In the Package Manager Console, execute the following command to apply database migrations: "update-database"


## Frontend Setup

1. **Open Visual Studio Code:**

Open `UI-Layer` folder in VS Code.

2. **Open Package Manager Console & Install Node Modules:**

In the terminal of Visual Studio Code, execute the following command to install the required Node.js modules: "npm install"

3. **Start the UI Layer:**

After successfully installing the Node modules, you can start the UI layer by running: "ng serve"