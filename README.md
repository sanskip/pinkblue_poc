#prerequisite

>node>7.0.0
>mongodb>3.6.0


#Steps For Execution

1.Download project
2.Go to inside project directory and open command prompt
3.create database schema in mongodb with name "pinkblue"
4.create three collection with respective name "users,products,subs_products" (products collection should be create with compound index )
#db.products.createIndex({batchnum:1})

5.Insert Record in "users" collection 
6.For sample data go to filepath "root\src\script\users.json"
7.Go through product data   go to filepath "root\src\script\products.json"
8.change mongodb url in file (path='root\src\server\properties\configuration.js'
9.Enter command on command prompt
# npm install
# npm start



