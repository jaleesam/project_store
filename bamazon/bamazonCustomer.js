var mysql = require("mysql");
var inquirer = require("inquirer");
require ("console.table");

var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,

  // Your username
  user: "root",

  // Your password
  password: "password",
  database: "bamazonDB"
});

connection.connect(function(err) {
  if (err) console.log(err);
  loadProducts();
});


function loadProducts(){
    connection.query("select * from products", function(err, res){
      console.table(res);
      promptCustomerForId(res);
    });
    

}

function promptCustomerForId(result){
inquirer.prompt([
    {
      name: "id_prompt",
      type: "input",
      message: "Please enter the product's ID number: ",
      validate: function(value) {
        if (isNaN(value) === false) {
          return true;
        }
        return false;
      }

    }
  ])
  .then(function(value){
    var chosenId = parseInt(value.id_prompt);
    for(var i = 0; i < result.length; i++){
      if(result[i].item_id === chosenId){
        var product = result[i];
      }
    }
    promptCustomerForQuantity(product);
  });
}

function promptCustomerForQuantity(product){
  inquirer.prompt([
    {
      name: "quantity_prompt",
      type: "input",
      message: "Please enter number of quantity for selected product:",
      validate: function(value) {
        if (isNaN(value)  === false){
          return true;
        }
        return false;
        }
      }
  ])
  .then(function(value){
    var chosenQuantity = parseInt(value.quantity_prompt);
    if(chosenQuantity <= product.stock_quantity){
      connection.query( "UPDATE products SET stock_quantity = stock_quantity - ? WHERE item_id = ?", [chosenQuantity, product.item_id],function(err,res){
        loadProducts();
      }); 
    }
    else{
      console.log("Sorry, you can not purchase the requested item(s).");
      loadProducts();
    }
  })
}
