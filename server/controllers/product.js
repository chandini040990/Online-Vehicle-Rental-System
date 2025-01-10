import Product from "../models/product.js";
import fs from "fs";
import slugify from "slugify";
import braintree from "braintree";
import dotenv from "dotenv";
import Booking from "../models/booking.js";
import User from "../models/user.js";
// import sgMail from "@sendgrid/mail";
import nodemailer from "nodemailer";

dotenv.config();

// create the transporter
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT,
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS
  }
});

// veify the transporter configuration 
transporter.verify((error) => {
  if (error) {
    console.log("error with config", error)
  } else {
    console.log("Mail configurations are correct")
  }
})

// sgMail.setApiKey(process.env.SENDGRID_KEY);
const gateway = new braintree.BraintreeGateway({
  environment: braintree.Environment.Sandbox,
  merchantId: process.env.BRAINTREE_MERCHANT_ID,
  publicKey: process.env.BRAINTREE_PUBLIC_KEY,
  privateKey: process.env.BRAINTREE_PRIVATE_KEY,
});

export const create = async (req, res) => {
  try {
    // console.log(req.fields);
    // console.log(req.files);
    const { name, description, price, category, brand, engine, plateNumber, transmission, ownerName, ownerEmail } =
      req.fields;
    const { photo } = req.files;


    // validation
    switch (true) {
      case !name.trim():
        return res.json({ error: "Name is required" });
      case !description.trim():
        return res.json({ error: "Description is required" });
      case !brand.trim():
        return res.json({ error: "Brand is required" });
      case !engine.trim():
        return res.json({ error: "Engine is required" });
      case !plateNumber.trim():
        return res.json({ error: "Plate Number is required" });
      case !transmission.trim():
        return res.json({ error: "Transmission is required" });
      case !price.trim():
        return res.json({ error: "Price is required" });
      case !category.trim():
        return res.json({ error: "Category is required" });
      case !ownerName.trim():
        return res.json({ error: "Owner Name is required" });
      case !ownerEmail.trim():
        return res.json({ error: "Owner Email is required" });
      case photo && photo.size > 1000000:
        return res.json({ error: "Image should be less than 1mb in size" });
    }

    const ownerId = await User.find({ email: ownerEmail }).select(
      "_id");
    // console.log("ownerId", ownerId)

    // create product
    const product = new Product({ ...req.fields, slug: slugify(name), owner: ownerId });

    if (photo) {
      product.photo.data = fs.readFileSync(photo.path);
      product.photo.contentType = photo.type;
    }

    await product.save();
    // console.log("product owner", product)
    res.json(product);
  } catch (err) {
    console.log(err);
    return res.status(400).json(err.message);
  }
};

export const list = async (req, res) => {
  try {
    const products = await Product.find({})
      .populate("category")
      .select("-photo")
      .limit(12)
      .sort({ createdAt: -1 });

    res.json(products);
  } catch (err) {
    console.log(err);
  }
};

export const read = async (req, res) => {
  try {
    const product = await Product.findOne({ slug: req.params.slug })
      .select("-photo")
      .populate("category");

    res.json(product);
  } catch (err) {
    console.log(err);
  }
};

export const photo = async (req, res) => {
  try {
    const product = await Product.findById(req.params.productId).select(
      "photo"
    );
    if (product.photo.data) {
      res.set("Content-Type", product.photo.contentType);
      return res.send(product.photo.data);
    }
  } catch (err) {
    console.log(err);
  }
};

export const remove = async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(
      req.params.productId
    ).select("-photo");
    res.json(product);
  } catch (err) {
    console.log(err);
  }
};

export const update = async (req, res) => {
  try {
    // console.log(req.fields);
    // console.log(req.files);
    const { name, description, price, category, brand, engine, plateNumber, transmission, ownerName, ownerEmail } =
      req.fields;
    const { photo } = req.files;

    // validation
    switch (true) {
      case !name.trim():
        res.json({ error: "Name is required" });
      case !description.trim():
        res.json({ error: "Description is required" });
      case !brand.trim():
        return res.json({ error: "Brand is required" });
      case !engine.trim():
        return res.json({ error: "Engine is required" });
      case !plateNumber.trim():
        return res.json({ error: "Plate number is required" });
      case !transmission.trim():
        return res.json({ error: "Transmission is required" });
      case !price.trim():
        res.json({ error: "Price is required" });
      case !category.trim():
        res.json({ error: "Category is required" });
      case !ownerName.trim():
        res.json({ error: "Owner Name is required" });
      case !ownerEmail.trim():
        res.json({ error: "Owner Email is required" });
      case photo && photo.size > 1000000:
        res.json({ error: "Image should be less than 1mb in size" });
    }

    // update product
    const product = await Product.findByIdAndUpdate(
      req.params.productId,
      {
        ...req.fields,
        ...req.body,
        slug: slugify(name),
      },
      { new: true }
    );

    if (photo) {
      product.photo.data = fs.readFileSync(photo.path);
      product.photo.contentType = photo.type;
    }

    await product.save();
    res.json(product);
  } catch (err) {
    console.log(err);
    return res.status(400).json(err.message);
  }
};

export const filteredProducts = async (req, res) => {
  try {
    const { checked, radio } = req.body;

    let args = {};
    if (checked.length > 0) args.category = checked;
    if (radio.length) args.price = { $gte: radio[0], $lte: radio[1] };
    console.log("args => ", args);

    const products = await Product.find(args);
    console.log("filtered products query => ", products.length);
    res.json(products);
  } catch (err) {
    console.log(err);
  }
};

export const productsCount = async (req, res) => {
  try {
    const total = await Product.find({}).estimatedDocumentCount();
    res.json(total);
  } catch (err) {
    console.log(err);
  }
};

export const listProducts = async (req, res) => {
  try {
    const perPage = 6;
    const page = req.params.page ? req.params.page : 1;

    const products = await Product.find({})
      .select("-photo")
      .skip((page - 1) * perPage)
      .limit(perPage)
      .sort({ createdAt: -1 });

    res.json(products);
  } catch (err) {
    console.log(err);
  }
};

export const productsSearch = async (req, res) => {
  try {
    const { keyword } = req.params;
    const results = await Product.find({
      $or: [
        { name: { $regex: keyword, $options: "i" } },
        { description: { $regex: keyword, $options: "i" } },
      ],
    }).select("-photo");

    res.json(results);
  } catch (err) {
    console.log(err);
  }
};

export const relatedProducts = async (req, res) => {
  try {
    const { productId, categoryId } = req.params;
    const related = await Product.find({
      category: categoryId,
      _id: { $ne: productId },
    })
      .select("-photo")
      .populate("category")
      .limit(3);

    res.json(related);
  } catch (err) {
    console.log(err);
  }
};

export const updateProduct = async (req, res) => {
  try {

    const { bookingFrom, bookingTo, fromLocation, toLocation } =
      req.body;
    const { productId } = req.params.productId;

    // // validation
    // switch (true) {
    //   case !booking_from:
    //     res.json({ error: "Booking From is required" });
    //   case !booking_to:
    //     res.json({ error: "Booking To is required" });
    //   case !from_location.trim():
    //     res.json({ error: "From Location is required" });
    //   case !to_location.trim():
    //     res.json({ error: "To Location is required" });
    // }

    const product = await Product.findByIdAndUpdate(
      req.params.productId,
      {
        booking_from: req.body.bookingFrom,
        booking_to: req.body.bookingTo,
        from_location: req.body.fromLocation,
        to_location: req.body.toLocation
      }
    );

    // await product.save();
    // console.log("updateproduct", product)
    res.json(product);
  } catch (err) {
    console.log(err);
    res.status(400).json(err.message);
  }
};


export const getInvoice = async (req, res) => {
  try {

    const { bookingId } = req.params.bookingId;
    const billing = await Booking.find({ _id: req.params.bookingId }).populate("buyer", "email name");
    res.json(billing);

  } catch (err) {
    console.log(err);
  }
};

export const getToken = async (req, res) => {
  try {
    gateway.clientToken.generate({}, function (err, response) {
      if (err) {
        res.status(500).send(err);
      } else {
        res.send(response);
      }
    });
  } catch (err) {
    console.log(err);
  }
};

export const processPayment = async (req, res) => {
  try {
    // console.log(req.body);
    const { nonce, cart } = req.body;

    let total = 0;
    cart.map((i) => {
      total += i.price;
    });
    // console.log("total => ", total);

    let newTransaction = gateway.transaction.sale(
      {
        amount: total,
        paymentMethodNonce: nonce,
        options: {
          submitForSettlement: true,
        },
      },
      function (error, result) {
        if (result) {
          const booking = new Booking({
            products: cart,
            productData: cart,
            payment: result,
            buyer: req.user._id
          }).save();

          decrementQuantity(cart);
          res.json({ ok: true });
        } else {
          res.status(500).send(error);
        }
      }
    );
  } catch (err) {
    console.log(err);
  }
};

const decrementQuantity = async (cart) => {
  try {
    // build mongodb query
    const bulkOps = cart.map((item) => {
      return {
        updateOne: {
          filter: { _id: item._id },
          update: { $inc: { quantity: -1, booked: +1 } },
        },
      };
    });

    const updated = await Product.bulkWrite(bulkOps, {});
    console.log("blk updated", updated);
  } catch (err) {
    console.log(err);
  }
};

export const bookingStatus = async (req, res) => {
  try {
    const { bookingId } = req.params;
    const { status } = req.body;
    const booking = await Booking.findByIdAndUpdate(
      bookingId,
      { status },
      { new: true }
    ).populate("buyer", "email name");
    // send email

   
    const mailOptions = {
      from: process.env.SMTP_USER,
      to: booking.buyer.email,
      subject: `Booking Status for Booking Id: ${booking._id}`,
      html: `
        <h1>Hi ${booking.buyer.name},</h1></br>
        <h2>Your booking status is: <span style="color:red;">${booking.status}</span></h2>
        <p>Visit the below for more details</p></br>
        <a href="${process.env.CLIENT_URL}/dashboard/user/bookings">your dashboard</a> 
        <p>Please leave your valuable feedback by clicking feedback link</p>
        <a href="${process.env.CLIENT_URL}/dashboard/user/feedback">submit feedback</a>
        <p>Thank you,<p>
        <h2>WHEELS 4 RENT</h2>
      `,
    }

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log("error while sending the mail", error)
        return res.status(500).json({ message: 'Email not sent' })
      }
      res.status(201).json({ message: "Email is sent successfully" })
    })

    res.json(booking);
  } catch (err) {
    console.log(err);
  }
};
