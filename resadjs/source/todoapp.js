const readline = require('readline');
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});
let todolist = [];
let programrunning = true;
console.log("Welcome to the To-Do List App. In this program, you can add tasks to your to-do list.");
function tasks() {
    console.log("Your current to-do list: " + todolist);
    whileprogramrunning();
}
function addtask() {
    rl.question("Enter the task you want to add: ", (newtask) => {
        todolist.push(newtask);
        console.log(`Task "${newtask}" added to your to-do list.`);
        whileprogramrunning();
    });
}
function whileprogramrunning() {
    console.log("\nMenu:\n1. Add Task\n2. View Tasks\n3.Delete task \n4. Exit");
    rl.question("Please enter the number of your choice: ", (menu) => {
        switch (menu){
            case "1":
                addtask();
                break;
            case "2":
                tasks();
                break;
            case "3":
                rl.question("Enter the task you want to delete: ", (tasktodelete) => {
                    const index = todolist.indexOf(tasktodelete);
                    if (index !== -1) {
                        todolist.splice(index, 1);
                        console.log(`Task "${tasktodelete}" deleted from your to-do list.`);
                    } else {
                        console.log(`Task "${tasktodelete}" not found in your to-do list.`);
                    }
                    whileprogramrunning();
                });
                break;
            case "4":
                programrunning = false;
                console.log("Thank you for using the To-Do List App. Goodbye!");
                rl.close();
                break;
        }
    });
}
whileprogramrunning();