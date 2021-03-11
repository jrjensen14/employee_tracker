const { prompt } = require("inquirer");
const db = require("./db");
require("console.table");
const logo = require("asciiart-logo");

init();

// Logo & Prompts
function init() {
  const logoText = logo({ name: "Employee Manager" }).render();
  console.log(logoText);
  mainPrompts();
};

// function main prompts
function mainPrompts() {
  prompt([
    {
      type: "list",
      name: "choice",
      message: "What would you like to do",
      choices: [
        {
          name: "View All Employees",
          value: "VIEW_EMPLOYEES"
        },
        {
          name: "Add Employee",
          value: "ADD_NEW_EMPLOYEE"
        },
        {
          name: "Update Employee Role"
        },
        {
          name: "View All Roles",
          value: "VIEW_ALL_ROLES"
        },
        {
          name: "Add Role",
          value: "ADD_ROLE"
        },
        {
          name: "View All Departments",
          value: "VIEW_ALL_DEPARTMENTS"
        },
        {
          name: "Add Department",
          value: "ADD_DEPARTMENT"
        },
        {
          name: "Quit",
          value: "QUIT"
        }
      ]
    }
  ]).then(res => {
    let choice = res.choice;
    switch (choice) {
      case "VIEW_EMPLOYEES":
        viewEmployees();
        break;
      case "ADD_NEW_EMPLOYEE":
        addEmployee();
        break;
      case "VIEW_ALL_ROLES":
        viewAllRoles();
        break;
      case "ADD_ROLE":
        addRole();
        break;
      case "VIEW_ALL_DEPARTMENTS":
        viewAllDepartments();
        break;
      case "ADD_DEPARTMENT":
        addDepartment();
        break;
      default:
        quit();
    }
  })
}

// View ALL emp.
function viewEmployees() {
  db.findAllEmployees()
    .then(([rows]) => {
      let employees = rows;
      console.log("/n");
      console.table(employees);
    })
    .then(() => mainPrompts());
}

// Add an Emp
function addEmployee() {
  prompt([
    {
      name: "first_name",
      message: "What is the employees first name?"
    },
    {
      name: "last_name",
      message: "What is the employees last name?"
    },
  ])
    .then(res => {
      let firstName = res.first_name;
      let lastName = res.last_name;

      db.findAllRoles()
        .then(([rows]) => {
          let roles = rows;
          const roleChoices = roles.map(({ id, title }) => ({
            name: title,
            value: id
          }));
          prompt({
            type: "list",
            name: "roleId",
            message: "What is the employees role?",
            choices: roleChoices
          })
            .then(res => {
              let roleId = res.roleId;

              db.findAllEmployees()
                .then(([rows]) => {
                  let employees = rows;
                  const managerChoices = employees.map(({ id, first_name, last_name }) => ({
                    name: `${first_name} ${last_name}`,
                    value: id
                  }));
                  managerChoices.unshift({ name: "None", value: null });
                  prompt({
                    type: "list",
                    name: "managerId",
                    message: "Who's the employee's manager?",
                    choices: managerChoices
                  })
                    .then(res => {
                      let employee = {
                        manager_id: res.managerId,
                        role_id: roleId,
                        first_name: firstName,
                        last_name: lastName
                      }
                      db.createNewEmployee(employee);
                    })
                    .then(() => console.log(
                      `Added ${firstName} ${lastName} to the database`
                    ))
                    .then(() => mainPrompts())
                })
            })
        })
    })
}


// Update Emp


// View all Roles
function viewAllRoles() {
  db.findAllRoles()
    .then(([rows]) => {
      let roles = rows;
      console.log("/n");
      console.table(roles);
    })
    .then(() => mainPrompts());
}

// Add a role
function addRole() {
  db.findAllDepartments()
    .then(([rows]) => {
      let departments = rows;
      const departmentChoices = departments.map(({ id, name }) => ({
        name: name,
        value: id
      }));
      prompt([
        {
          name: "title",
          message: "Name of the Role?"
        },
        {
          name: "salary",
          message: "What is the salary of this role?"
        },
        {
          type: "list",
          name: "department_id",
          message: "Which department does this role belong to?",
          choices: departmentChoices
        }
      ])
        .then(role => {
          db.createRole(role)
            .then(() => console.log(`Added ${role.title} to the database`))
            .then(() => mainPrompts())
        })
    })
}

// View all Dept.
function viewAllDepartments() {
  db.findAllDepartments()
    .then(([rows]) => {
      let departments = rows;
      console.log("/n");
      console.table(departments);
    })
    .then(() => mainPrompts());
}

// Add a Dept
function addDepartment() {
  prompt([
    {
      name: "name",
      message: "Name of the Department"
    }
  ])
    .then(res => {
      let name = res;
      db.createDepartment(name)
        .then(() => console.log(`Added ${name.name} to the database`))
        .then(() => mainPrompts())
    })
}

// View all emp by department 
// View Emp by Manager
// Remove Emp
// Update Emp's Manager
// Delete a Dept
// Delete a role
// View all Dept & show budget

// Exit App
function quit() {
  console.log("goodbye");
  process.exit();
}


