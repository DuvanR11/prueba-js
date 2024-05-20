/*
INSTRUCCIONES:

1. Crear una función tomando como parámetro un "id" de "company" y devolver el nombre de la "company".

2: Crear una función tomando como parámetro un "id" de "company" y quitar la "company" de la lista.

3: Crear una función tomando como parámetro un "id" de "company" y un nuevo "user" cuyo apellido es "Delgado",
   el nombre "Juan", de 35 años y dueño de un carro.
   El nuevo "user" debe agregarse a la lista de "users" de este "company" y tener un "id" generado automáticamente.
   La función también debe modificar el atributo "usersLength" de "company".

4: Crear una función tomando como parámetro un "id" de "company" y un "id" de "user".
   La función debe quitar este "user" de la lista de "users" de "company" y cambiar el atributo "usersLength" de "company".

5: Crear una función tomando como parámetro dos "id" de "company" y un "id" de "user".
   La función debe permitir que el user sea transferido de la primera "company" a la una "company".
   El atributo "usersLength" de cada "company" debe actualizarse.

6: Crear una función tomando la variable "companies" como parámetro y devolviendo un nuevo objeto
   cuyos atributos son la concatenación del apellido, nombre y edad de cada "user". Cada atributo debe tener el valor de boolean "car".

   Ver ejemplo de la variable exampleObj. 

   const exampleObj = {
      johnDoe32: true,
      BernardoMinet45: false,
      alinaChef23: true
   };
*/

const { cleanConsole } = require('../helpers/system.helpers');
const { createAll } = require('../helpers/data.helper');

const companies = createAll();


cleanConsole(7, companies);

// Escribe aquí abajo tu código.

// Función para obtener el nombre de una company por su id
const getCompanyNameById = (companyId) => {
   const company = companies.find(company => company.id === companyId);
   return company ? company.name : "Company no encontrada";
};

// Función para eliminar una company por su id
const deleteCompanyById = (companyId) => {
   const index = companies.findIndex(company => company.id === companyId);
   if (index !== -1) {
       companies.splice(index, 1);
   }
};

// Función para agregar un nuevo usuario a una company por su id
const addUserToCompanyById = (companyId, newUser) => {
   const company = companies.find(company => company.id === companyId);
   if (company) {
       newUser.id = company.users.length; // Generar un id automático
       company.users.push(newUser);
       company.usersLength = company.users.length;
   }
};

// Función para eliminar un usuario de una company por su id
const deleteUserFromCompanyById = (companyId, userId) => {
   const company = companies.find(company => company.id === companyId);
   if (company) {
       const index = company.users.findIndex(user => user.id === userId);
       if (index !== -1) {
           company.users.splice(index, 1);
           company.usersLength = company.users.length;
       }
   }
};

// Función para transferir un usuario de una company a otra
const transferUserBetweenCompanies = (companyIdFrom, companyIdTo, userId) => {
   const companyFrom = companies.find(company => company.id === companyIdFrom);
   const companyTo = companies.find(company => company.id === companyIdTo);
   if (companyFrom && companyTo) {
       const userIndex = companyFrom.users.findIndex(user => user.id === userId);
       if (userIndex !== -1) {
           const user = companyFrom.users[userIndex];
           companyFrom.users.splice(userIndex, 1);
           companyFrom.usersLength = companyFrom.users.length;
           user.id = companyTo.users.length; 
           companyTo.users.push(user);
           companyTo.usersLength = companyTo.users.length;
       }
   }
};

// Función para crear un objeto con la concatenación de nombre, apellido y edad de cada usuario
const createConcatenatedUsersObject = (companies) => {
   const concatenatedUsers = {};
   companies.forEach(company => {
       company.users.forEach(user => {
           const key = user.lastName + user.firstName + user.age;
           concatenatedUsers[key] = user.car;
       });
   });
   return concatenatedUsers;
};

const newUser = { firstName: 'Juan', lastName: 'Delgado', age: 35, car: true };

console.log('Data inicial', companies)

console.log('%c ---- RES 7 --- part 1', 'background: #bada55; color: #222', getCompanyNameById(2));
console.log('%c ---- RES 7 --- part 2', 'background: #bada55; color: #222', deleteCompanyById(0));
console.log('%c ---- RES 7 --- part 3', 'background: #bada55; color: #222', addUserToCompanyById(1, newUser));
console.log('%c ---- RES 7 --- part 4', 'background: #bada55; color: #222', deleteUserFromCompanyById(1, 0));
console.log('%c ---- RES 7 --- part 5', 'background: #bada55; color: #222', transferUserBetweenCompanies(1, 2, 1));
console.log('%c ---- RES 7 --- part 6', 'background: #bada55; color: #222', createConcatenatedUsersObject(companies));

console.log('Data Final', companies)