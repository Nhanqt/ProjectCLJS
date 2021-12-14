CREATE DATABASE hanashop;

USE hanashop;


CREATE TABLE tbl_users (
	userId serial primary key,
	username varchar(50) NOT NULL,
	password varchar(500) NOT NULL,
	address varchar(200) NOT NULL,
	phone varchar(20) NOT NULL,
	fullname varchar(50) NOT NULL,
	active boolean NOT NULL,
	roleId serial
);

CREATE TABLE tbl_role (
	roleId serial primary key,
	rolename varchar(10) NOT NULL
);

CREATE TABLE tbl_order (
	orderId serial primary key,
	userId serial,
	date timestamp NOT NULL,
	total float NOT NULL,
	active boolean NOT NULL
);

CREATE TABLE tbl_order_detail (
	orderDetailId serial primary key,
	orderId serial,
	productId serial,
	price float NOT NULL,
	quantity int NOT NULL,
	active boolean NOT NULL
);

CREATE TABLE tbl_product (
	productId serial primary key,
	categoryId serial,
	productName varchar (50) NOT NULL,
	image varchar(500) NOT NULL,
	price float NOT NULL,
	quantity int NOT NULL,
	active boolean NOT NULL
);

CREATE TABLE tbl_category (
	categoryId serial primary key,
	categoryName varchar (50) NOT NULL
);

ALTER TABLE tbl_product
ADD CONSTRAINT fk_categoryId FOREIGN KEY (categoryId) REFERENCES tbl_category(categoryId);

ALTER TABLE tbl_order_detail
ADD CONSTRAINT fk_productId FOREIGN KEY (productId) REFERENCES tbl_product(productId);

ALTER TABLE tbl_order_detail
ADD CONSTRAINT fk_orderId FOREIGN KEY (orderId) REFERENCES tbl_order(orderId);

ALTER TABLE tbl_order 
ADD CONSTRAINT fk_userId FOREIGN KEY (userId) REFERENCES tbl_users(userId);

ALTER TABLE tbl_users
ADD CONSTRAINT fk_roleId FOREIGN KEY (roleId) REFERENCES tbl_role(roleId);