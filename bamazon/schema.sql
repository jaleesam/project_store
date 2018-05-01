DROP DATABASE IF EXISTS bamazonDB;
CREATE database bamazonDB;

USE bamazonDB;

CREATE TABLE products (
  item_id INT AUTO_INCREMENT NOT NULL,
  product_name VARCHAR(100) NOT NULL,
  department_name VARCHAR(100) NOT NULL,
  price DECIMAL (10,2) NOT NULL,
  stock_quantity INT NOT NULL,
  
  PRIMARY KEY (item_id)
);



SELECT * FROM products;

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ('Desktop Fan','Home',25.00 ,200), 
        ('Summer Dress','Clothing',50.00 ,400), 
        ('Note Pad','Office',5.00 ,1000),
        ('Baseball Cap','Clothing',20.00 ,500);


