USE employees;

INSERT INTO department
    (name)
VALUES
  ('Legal'),
  ('Human Resources'),
  ('Sales'),
  ('Finance');


INSERT INTO role (title, salary, department_id)
VALUES
  ('Lawyer', 150000, 1),
  ('Paralegal', 75000, 1),
  ('HR Manager', 50000, 2),
  ('HR Safety', 55000, 2),
  ('HR Training', 45000, 2),
  ('Sales Manager', 80000, 3),
  ('Salesperson', 50000, 3),
  ('Accountant Manager', 100000, 4),
  ('Payroll', 50000, 4);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES
  ('Antoinette', 'Capet', 1, NULL),
  ('Samuel', 'Delany', 2, 1),
  ('Tony', 'Duvert', 3, 2),
  ('Dennis', 'Cooper', 4, 3),
  ('Monica', 'Bellucci',1, 4 ),
  ('Samuel', 'Johnson', 2, NULL),
  ('John', 'Dryden', 4, NULL),
  ('Alexander', 'Pope', 3, 7),
  ('Lionel', 'Johnson', 1, 8),
  ('Aubrey', 'Beardsley', 3, NULL),
  ('Tulse', 'Luper', 2, NULL),
  ('William', 'Morris', 4, NULL),
  ('George', 'Shaw', 1, 12),
  ('Arnold', 'Bennett', 2, NULL),
  ('Algernon', 'Blackwood', 3, NULL);