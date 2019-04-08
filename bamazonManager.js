var mysql = require('mysql');
const inquirer = require('inquirer');
var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    port: '8889',
    database: 'bamazon',
  }); 

  connection.connect(function (err) {
    if (err) throw err;
    start()
});

function start() {
inquirer
  .prompt(
    {
      type: 'list',
      name: 'option',
      message: 'What is the order Mr. manager?',
      choices: ['View Products for Sale','View Low Inventory', 'Add to Inventory','Add New Product']   
  })
  .then(answers => {
    if (answers.option === "View Products for Sale") {
        readProducts();
    } else if(answers.option === "View Low Inventory") {
        lowInventory();
    } else if(answers.option === "Add to Inventory"){
        
    } else if(answers.option === "Add New Product"){
        AddNewProduct()
    } else{
        connection.end();
      }
    });
}

function readProducts() {
    console.log("All available items...\n");
    connection.query("SELECT * FROM products", function(err, res) {
      if (err) throw err;
      console.log(res);
      connection.end();
    });
  }

  function lowInventory() {
    console.log("All items with an inventory count lower than five...\n");
    connection.query("SELECT product_name FROM products WHERE stock_quantity < 5", function(err, res) {
      if (err) throw err;
      console.log(res);
      connection.end();
    });
  }



function AddNewProduct() {
    inquirer
      .prompt([
        // {
        //     name: "item_id",
        //     type: "input",
        //     message: "What is the item_id of your product would like to add?"
        //   },
        {
          name: "product_name",
          type: "input",
          message: "What is the product_name you would like to add?"
        },
        {
          name: "department_name",
          type: "input",
          message: "What is the department_name of the product?"
        },
        {
          name: "price",
          type: "input",
          message: "what is the price of the product?"
        },
          {
            name: "stock_quantity",
            type: "input",
            message: "What is the stock_quantity of the product?",
          
          validate: function(value) {
            if (isNaN(value) === false) {
              return true;
            }
            return false;
          }
        }
      ])
      .then(function(answer) {
        connection.query(
          "INSERT INTO products SET ?",
          {
            // item_id: answer.item_id,
            product_name: answer.product_name,
            department_name: answer.department_name,
            price: answer.price,
            stock_quantity: answer.stock_quantity
          },
          function(err) {
            if (err) throw err;
            console.log("Your new item was added successfully!");
            start();
          }
        );
      });
  }