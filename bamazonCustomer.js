var mysql = require('mysql');
var inquirer = require("inquirer")
var connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'root',
  port: '8889',
  database: 'bamazon',
}); 

connection.connect(function (err) {
    if (err) throw err;
    idSearch();
});

function idSearch(){
    inquirer.prompt({
        name: "id",
        type: "input",
        message: "Please enter the ID of the product you would like to buy?"
    })
    .then(function(answer){
        currentID = answer.id;
        var query = 'SELECT item_id, product_name FROM products WHERE ?';
        connection.query(query, {item_id: answer.id}, function(err, res){
            if (err){
                console.log("ERROR: ",err)
            } else {
                for (var i = 0; i < res.length; i++){
                    console.log(res[i]); 
                }
                unitSearch(answer.id);
            }
        });
    });
}
function unitSearch(p_id){
    inquirer.prompt({
        name: "units",
        type: "input",
        message: "How many units of the product you would like to buy?"
    })
    .then(function(answer){
        var query = 'SELECT stock_quantity, price FROM products WHERE ?';
        connection.query(query, {item_id: p_id}, function(err, res){
            if (err){
                console.log("ERROR: ",err)
            } else {
                if (res[0].stock_quantity < answer.units){
                    console.log("Insufficient quantity!")
                    console.log(`The stock quantity is ${res[0].stock_quantity}`); 
                    console.log("Continue shopping with us...\n ")
                    idSearch();  
                } else {
                   var updatedQuantity =  res[0].stock_quantity - answer.units;
                   var updatedQery = "UPDATE products SET ? WHERE ?";
                   connection.query(updatedQery,[{stock_quantity:updatedQuantity}, {item_id: p_id}],function(err, response){
                    console.log(`The total price is: ${res[0].price * answer.units}`); 
                    console.log("Continue shopping with us")
                    idSearch();  
                   });  
                } 
            }
        });
    });
}

