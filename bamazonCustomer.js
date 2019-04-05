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
    if (err) {
      console.log(err);
    }
    console.log('connected to mysql with ' + connection.threadId)
    connection.end();
});

connection.query("SELECT * FROM products", function (err, res){
    
});

inquirer.prompt([{
  message: "Please inter the ID of the product you would like to buy?",
  name: "id"
}, 
{
    message: "How many units of the product you would like to buy?",
    name: "quantity"
}
]).then(function(answer){
    getItem(answer.id);
    console.log(answer.id)
    connection.query("SELECT * FROM products where ?", {item_id: answer.id},
        function (err, res){
            if (err){
                
            }
    console.log(res);
    });
});



// function getItem(id){
//     connection.query("SELECT * FROM products where ?", {item_id: id},
//     function (err, res){
//         if (err){
            
//         }
// console.log(res);
// });
// }

