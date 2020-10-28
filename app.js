const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");


var employees = [];

function generateTeam() {
    var html = render(employees);
    if (!fs.existsSync(OUTPUT_DIR)) {
        fs.mkdirSync(OUTPUT_DIR);
    }
    fs.writeFile(outputPath, html, (err) => {
        if (err) {
            console.error("Failed to write file");
            console.error(err);
        } else {
            console.log("Wrote team.html Successfully");
        }
    });
}

function addEngineer() {
    inquirer.prompt([{
            type: "input",
            message: "Enter a Engineer name",
            name: "name"
        },
        {
            type: "input",
            message: "Enter Engineer Id",
            name: "id"
        },
        {
            type: "input",
            message: "Enter Engineer Email",
            name: "email"
        },
        {
            type: "input",
            message: "Enter Engineer Github",
            name: "github"
        }
    ]).then((results) => {
        var engi = new Engineer(results.name, results.id, results.email, results.github);
        employees.push(engi);
        addEmployee();
    });
}

function addIntern() {
    inquirer.prompt([{
            type: "input",
            message: "Enter a Intern name",
            name: "name"
        },
        {
            type: "input",
            message: "Enter Intern Id",
            name: "id"
        },
        {
            type: "input",
            message: "Enter Intern Email",
            name: "email"
        },
        {
            type: "input",
            message: "Enter Intern School",
            name: "school"
        }
    ]).then((results) => {
        var intern = new Intern(results.name, results.id, results.email, results.school);
        employees.push(intern);
        addEmployee();
    });
}

function addEmployee() {
    inquirer.prompt([{
        type: "list",
        message: "Add another Employee?",
        choices: [
            "Yes",
            "No"
        ],
        name: "addEmployee"
    }]).then((res) => {
        if (res.addEmployee == "No") {
            generateTeam();
            return;
        }
        inquirer.prompt([{
            type: "list",
            message: "Employee Type?",
            choices: [
                "Engineer",
                "Intern"
            ],
            name: "type"
        }]).then((resType) => {
            if (resType.type == "Engineer") {
                addEngineer()
            } else if (resType.type == "Intern") {
                addIntern();
            }
        })
    })
}

function main() {
    inquirer.prompt([{
            type: "input",
            message: "Enter a Manager name",
            name: "name"
        },
        {
            type: "input",
            message: "Enter Manager Id",
            name: "id"
        },
        {
            type: "input",
            message: "Enter Manager Email",
            name: "email"
        },
        {
            type: "input",
            message: "Enter Manager Office Number",
            name: "officenum"
        }
    ]).then((results) => {
        var man = new Manager(results.name, results.id, results.email, results.officenum);
        employees.push(man);
        addEmployee();
    });
}

main();

// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)

// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!

// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.

// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.

// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work! ```