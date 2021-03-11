const connection = require('./connection');

class DB {
  constructor(connection) {
    this.connection = connection;
  }

  //Find All Employees
  findAllEmployees() {
    return this.connection.promise().query(
      "SELECT employee.id, employee.first_name, employee.last_name, role.title, department.name, role.salary, CONCAT(manager.first_name, ' ', manager.last_name) AS manager FROM employee LEFT JOIN role on employee.role_id = role.id LEFT JOIN department on role.department_id = department.id LEFT JOIN employee manager on manager.id = employee.manager_id;"
    );
  }

  // Find all employees except the givin employee id

  // create new employee
  createNewEmployee(employee) {
    return this.connection.promise().query(
      "INSERT INTO employee SET ?", employee
    );
  }
  // Remove an employee with givin id

  // Update the given employee's role

  // Update the givin employee's manager

  // Find all Roles. join with departments to display the department name
  findAllRoles() {
    return this.connection.promise().query(
      "SELECT role.id, role.title, department.name AS department, role.salary FROM role LEFT JOIN department on role.department_id = department.id;"
    );
  }
  // Create a new role
  createRole(role) {
    return this.connection.promise().query(
      "INSERT INTO role SET ?", role
    );
  }
  // Remove a role from the db

  // Find all departments
  findAllDepartments() {
    return this.connection.promise().query(
      "SELECT department.id, department.name FROM department;"
    );
  }
  // Find all departments, join wiht employees and roles and sum up utilized department budget

  // Create new department 
  createDepartment(department) {
    return this.connection.promise().query(
      "INSERT INTO department SET ?", department
    );
  }
  // Remove a department 

  // Find all employees in a givin department, join with roles to display role titles

  // Find all employees by manager, join with departments and roles to display titles and deparment names
}

module.exports = new DB(connection);