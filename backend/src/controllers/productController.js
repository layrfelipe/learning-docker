const Product = require("../models/productModel");

module.exports = {
  async all(request, response) {
    try {
      const products = await Product.findAll();
      response.status(200).json(products);
    } catch (error) {
      console.log(error);
      response.status(400).send(error);
    }
  },
  async create(request, response) {
    try {
      const { name, description, price } = request.body;
      await Product.create({
        name: name,
        description: description,
        price: price
      });
      response.status(200).json("Product created");
    } catch (error) {
      console.log(error);
      response.status(400).send(error);
    }
  },
  async one(request, response) {
    try {
      const id = request.params.id;
      const product = await Product.findOne({ where: { id } });
      if (!product) {
        return response.status(400).json("Product not found");
      }
      response.status(200).json(product);
    } catch (error) {
      console.log(error);
      response.status(400).send(error);
    }
  },
  async update(request, response) {
    try {
      const { name, price, description } = request.body;
      const id = request.params.id;
      const product = await Product.findOne({ where: { id } });

      if (!product) {
        return response.status(400).json("Product not found");
      }
      product.name = name;
      product.description = description;
      product.price = price;

      await product.save();
      response.status(200).json("Product updated");
    } catch (error) {
      console.log(error);
      response.status(400).send(error);
    }
  },
  async delete(request,response){
    try {
      const id = request.params.id;
      const product = await Product.destroy({ where: { id } });
      if (!product) {
        return response.status(400).json("Product not found");
      }
      response.status(200).json("Product removed");
    } catch (error) {
      console.log(error);
      response.status(400).send(error);
    }
  }
};
