const { Command } = require("commander");
const program = new Command();
const fs = require("node:fs");
const path = "./todos.json";

program.name("cli-todo").description("CLI Todo Application").version("0.8.0");

// command to add todos in todos.json file
program
  .command("addtodo")
  .description("A CLI todo app")
  .argument("string", "todo to add")
  .action((content) => {
    fs.readFile(path, "utf-8", (err, data) => {
      if (err) {
        console.log(err);
        return;
      }

      let todos;
      try {
        todos = JSON.parse(data);
      } catch (err) {
        todos = [];
      }

      todos.push(content);

      fs.writeFile(path, JSON.stringify(todos, null, 2), (err) => {
        if (err) {
          console.log("Error writing file:", err);
        } else {
          console.log("Todo added successfully!");
        }
      });
    });
  });

// command to display all the todo in todos.json file
program
  .command("readtodos")
  .description("Display all todos")
  .action((content) => {
    fs.readFile(path, "utf-8", (err, data) => {
      if (err) {
        console.log(err);
        return;
      }

      let todos;
      try {
        todos = JSON.parse(data);
      } catch (err) {
        todos = [];
      }

      if (todos.length === 0) {
        console.log("No todos found.");
      } else {
        console.log("Your Todos:");
        todos.forEach((todo, index) => {
          console.log(`${index + 1}. ${todo}`);
        });
      }
    });
  });

program.parse();

// node index.js addtodo "go to gym"
