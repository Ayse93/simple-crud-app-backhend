
const express = require('express')
const mongoose = require('mongoose');
const Product = require ('./models/product.model.js');
const app = express()

// Middleware
app.use(express.json());
app.use (express.urlencoded({extented: false}));


app.get('/api', (req, res) => {
    res.send("Hello from Node API Server Updated");

});

app.get ('/api/products', async (req,res) => {
    try {
     const products = await Product.find ({});
     res.status(200).json(products);
    } catch (error) {
      res.status(500).json({message: error.message});
    }
  });


  app.get ('/api/products/:id', async (req,res) => {
    try {
     const {id} = req.params;
     const product = await Product.findById(id);
     res.status(200).json(product);
    } catch (error) {
      res.status(500).json({message: error.message});
    }
  });




app.post('/api/products', async (req,res) => {
    try {
     const product = await Product.create (req.body);
     res.status(200).json(product);
    } catch (error) {
      res.status(500).json({message: error.message});
    }
  });

  // Update a product

  app.put ('/api/products/:id', async (req,res) => {
    try {
     const {id} = req.params;
     const product = await Product.findByIdAndUpdate(id, req.body);

     if(!product) {
        return res.status(404).json({message: "Product not found"});
     }

     const updatedProduct = await Product.findById(id);

     res.status(200).json(updatedProduct);
    } 
    
       catch (error) {
      res.status(500).json({message: error.message});
    }
  });


  // Delete a product

  app.delete ('/api/products/:id', async (req,res) => {
    try {
     const {id} = req.params;
     const product = await Product.findByIdAndDelete(id);

     if(!product) {
        return res.status(404).json({message: "Product not found"});
     }

     res.status(200).json({message:"Product deleted successfully"});
    }  catch (error) {
        res.status(500).json({message: error.message});
      }
    });




mongoose.connect("mongodb+srv://ayseinsan93:gw2UGqMgXJq59LxL@backhenddb.ikiedyp.mongodb.net/Node-API?retryWrites=true&w=majority&appName=BackhendDb")
.then ( () => {
    console.log("Connected to the database!"); 
})
.catch( () => {
    console.log("Connection failed!");
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});

