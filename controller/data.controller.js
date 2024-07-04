import mongoose from "mongoose";
import NewTaxModel from "../models/new.tax.register.model.js";
import TaxModel from "../models/tax.register.model.js";
import villageModel from "../models/village.model.js";
import WardDataModel from "../models/ward.data.model.js";
import WardModel from "../models/ward.model.js";
import asyncHandler from 'express-async-handler'
import Business from "../models/business.model.js";
// ward get data
const wardGetDataController = async (req, res) => {
  try {
    const wards = await WardModel.find({}).sort({ number: 1 });

    if (wards.length > 0) {
      res.status(200).send({ success: true, message: "all-wards", wards });
    } else {
      res.status(200).send([""]);
    }
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ success: false, message: "Internal Server Error" });
  }
};

// create ward data
const wardDataMakeController = async (req, res) => {
  try {
    const newData = req.body;
    const existingData = await WardDataModel.find({
      ward: newData.ward,
      holding: newData.holding,
    });

    if (existingData.length > 0) {
      // If data with the same holding number exists, find the next available holding number
      const maxHolding = Math.max(
        ...existingData.map((entry) => entry.holding)
      );
      newData.holding = maxHolding + 1;
    }

    const wardDataInstance = new WardDataModel(newData);
    const savedData = await wardDataInstance.save();

    res.status(201).json({ message: "Data Created Successfully", savedData });
  } catch (error) {
    console.error(error.message);
    res
      .status(500)
      .json({ error: "Data making error", errorMessage: error.message });
  }
};

// get wards data

const wardWaysDataController = async (req, res) => {
  try {
    const ward = req.params.id;

    const data = await WardDataModel.find({ ward: ward });
    res.status(200).send({
      success: true,
      countTotal: data.length,
      message: "All Ward Ways Data ",
      data,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error Ward data ",
    });
  }
};

// all data show
const getDataController = async (req, res) => {
  try {
    const id = req.params.id;

    const page = parseInt(req.query.page) || 1;
    const perPage = parseInt(req.query.perPage) || 20;

    const countTotal = await WardDataModel.countDocuments({ ward: id });
    const totalPages = Math.ceil(countTotal / perPage);
    const skip = (page - 1) * perPage;

    const data = await WardDataModel.find({ ward: id })
      .skip(skip)
      .limit(perPage)
      .populate("ward").sort({ holding: 1 });

    res.status(200).send({
      success: true,
      countTotal,
      totalPages,
      currentPage: page,
      perPage,
      message: "Data fetched successfully",
      data,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({
      success: false,
      message: "Error in getting data",
      error: error.message,
    });
  }
};

const allWardsDataController = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const perPage = parseInt(req.query.perPage) || 20;

    const countTotal = await WardDataModel.countDocuments({});
    const totalPages = Math.ceil(countTotal / perPage);

    // Fetch more data than needed to ensure all wards are included
    const data = await WardDataModel.find({})
      .populate("ward")
      .sort({ "ward.number": 1, holding: 1 });

    // Group the data by ward
    const groupedData = data.reduce((result, item) => {
      const wardNumber = item.ward.number;
      result[wardNumber] = result[wardNumber] || [];
      result[wardNumber].push(item);
      return result;
    }, {});

    // Paginate while ensuring all items for a ward are included
    const paginatedData = [];
    for (const wardNumber in groupedData) {
      paginatedData.push(...groupedData[wardNumber]);
    }

    const startIdx = (page - 1) * perPage;
    const endIdx = startIdx + perPage;
    const slicedData = paginatedData.slice(startIdx, endIdx);

    res.status(200).json({
      success: true,
      countTotal,
      totalPages,
      currentPage: page,
      perPage,
      message: "Data fetched successfully",
      data: slicedData,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Error in getting data",
      error: error.message,
    });
  }
};

const allDataCalculateController = async (req, res) => {
  try {
    const ward = req.params.id;
    const data = await WardDataModel.find({ ward: ward }).populate("ward");
    res.status(200).json({
      success: true,
      message: "Data fetched successfully",
      data,
    });
  } catch (error) {
    console.error(error); // Log the error for debugging purposes

    res.status(500).json({
      success: false,
      message: "Error in getting data",
      error: error.message, // Include the error message in the response
    });
  }
};
const allCalculateController = async (req, res) => {
  try {
    const data = await WardDataModel.find({}).populate("ward");
    res.status(200).json({
      success: true,
      message: "Data fetched successfully",
      data,
    });
  } catch (error) {
    console.error(error); // Log the error for debugging purposes

    res.status(500).json({
      success: false,
      message: "Error in getting data",
      error: error.message, // Include the error message in the response
    });
  }
};

const fullDataController = async (req, res) => {
  try {
    const data = await WardDataModel.find({}).populate("ward");
    if (data.length > 0) {
      res.status(200).send({ success: true, message: "all-data", data });
    } else {
      res.status(200).send([""]);
    }
  } catch (error) {
    console.log(error.message);
  }
};

const SingleData = async (req, res) => {
  try {
    const data = await WardDataModel.findOne({ _id: req.params.id }).populate(
      "ward"
    );
    if (data) {
      res.status(200).send({ success: true, message: "single-data", data });
    }
  } catch (error) {
    console.log(error.message);
  }
};

const searchDataController = async (req, res) => {
  try {
    const { wardNumber, searchValue } = req.query;

    const data = await WardDataModel.findOne({
      ward: wardNumber,
      holding: searchValue,
    }).populate("ward"); // Assuming there's a reference to another model named 'ward'

    if (data) {
      res.json({
        success: true,
        message: "get data",

        data,
      });
    } else {
      res.send({
        success: false,
        message: "data not found",
      });
    }
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "Error searching for data", details: error.message });
  }
};

const searchAllDataController = async (req, res) => {
  try {
    const { wardWaysData, searchValue } = req.query;

    // Check if searchValue is a number

    const data = await WardDataModel.find({
      ward: wardWaysData,
      holding: searchValue,
    }).populate("ward"); // Assuming there's a reference to another model named 'ward'

    res.json(data);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "Error searching for data", details: error.message });
  }
};

const TaxRegisterSearchController = async (req, res) => {
  try {
    const { wardWaysData, searchValue } = req.query;

    // Ensure that holding is an integer

    // Use the correct structure for the find query
    const data = await TaxModel.find({
      ward: wardWaysData,
      holding: searchValue,
    }).populate("ward"); // Assuming there's a reference to another model named 'ward'

    res.json(data);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "Error searching for data", details: error.message });
  }
};

const AllDataSearchController = async (req, res) => {
  try {
    const { searchValue } = req.query;

    if (!searchValue) {
      return res.status(400).json({ error: "Search value is required." });
    }

    const isNumber = !isNaN(searchValue);
    let query;

    if (isNumber) {
      // Search for an exact match in the "sn" field if the search value is a number
      query = {
        holding: searchValue,
        nidNumber: searchValue,
        mobile: searchValue,
      };
    } else {
      // Search for Bangla words in specific fields (name, fatherName, motherName)
      const banglaRegex = new RegExp(searchValue, "i");
      query = {
        $or: [
          { name: { $regex: banglaRegex } },
          { fatherName: { $regex: banglaRegex } },
          { motherName: { $regex: banglaRegex } },
        ],
      };
    }

    const data = await WardDataModel.find(query).populate("ward");

    res.json(data);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "Error searching for data", details: error.message });
  }
};



const taxPaymentController = async (req, res) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const { amount, year, paymentId, cor, due, user, total } = req.body;
   
  

    if (!amount || !year || !paymentId || !cor || !due || !user || !total) {
      return res.status(400).json({
        message: "All fields are required.",
      });
    }


    const taxPayment = new TaxModel(req.body);
    await taxPayment.save({ session });

    const wardData = await WardDataModel.findById({_id:paymentId}).session(session);

    if (!wardData) {
      await session.abortTransaction();
      session.endSession();
      return res.status(404).json({
        message: "Ward data not found for the user.",
      });
    }

    wardData.due = due;
    wardData.payment.push(taxPayment.toObject()); // Store the full taxPayment object
    wardData.checkbox.push({ total, amount });

    await wardData.save({ session });

    await taxPayment.populate("user");

    await session.commitTransaction();
    session.endSession();

    return res.status(200).json({
      message: "Payment Successfully",
      taxPayment,
    });
  } catch (error) {
    await session.abortTransaction();
    session.endSession();

    console.error(error);
    return res.status(500).json({
      message: "Something went wrong",
      error: error.message,
    });
  }
};

export default taxPaymentController;


const DataViewControllerByQRCode = async (req, res) => {
  try {
    const dataId = req.params.id;

    const view = await WardDataModel.findOne({ _id: dataId }).populate("ward");
    if (view) {
      res.status(200).send(view);
    }
  } catch (error) {
    console.log(error.message);
  }
};

const updateController = async (req, res) => {
  try {
    const data = await WardDataModel.findByIdAndUpdate(
      req.params.id,
      { ...req.body },
      { new: true }
    );

    await data.save();
    res.status(201).send({
      success: true,
      message: "Data Updated Successfully",
      data,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error in Updte product",
    });
  }
};
const updateQrController = async (req, res) => {
  try {
    const { generatedQR } = req.body;
    const qrUpdate = await TaxModel.findByIdAndUpdate(
      req.params.id,
      { qr: generatedQR },
      { new: true }
    );

    await qrUpdate.save();
    res.status(201).send({
      success: true,
      message: "Data Updated Successfully",
      qrUpdate,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error in Updte qr",
    });
  }
};

const deleteDataController = async (req, res) => {
  try {
    const deletedData = await WardDataModel.findByIdAndDelete(req.params.id);
    if (!deletedData) {
      return res.status(404).send({
        success: false,
        message: "Data not found",
      });
    }
    res.status(200).send({
      success: true,
      message: "Data Deleted successfully",
      deletedData,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error while deleting data",
      error,
    });
  }
};

const paymentViewControllerByQRCode = async (req, res) => {
  try {
    const taxId = req.params.taxId;

    const view = await TaxModel.findOne({ sn: taxId }).populate("ward");
    if (view) {
      const taxView = await view.populate("user");
      res.status(200).send(taxView);
    }
  } catch (error) {
    console.log(error);
  }
};

const TaxRegisterGetController = asyncHandler(async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1; // Default to page 1 if not specified
    const limit = parseInt(req.query.limit) || 10; // Default to 10 documents per page if not specified
    const ward = req.query.ward || 1;

    const totalDocuments = await NewTaxModel.countDocuments();
    const totalPages = Math.ceil(totalDocuments / limit);

    const skip = (page - 1) * limit;

    const taxRegister = await TaxModel.find({ward:ward})
      .sort({ holding: 1 })
      .skip(skip)
      .limit(limit);

    if (taxRegister) {
      res.status(200).send({
        message: "tax Register Data",
        taxRegister,
        currentPage: page,
        totalPages,
      });
    }
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: "Internal Server Error" });
  }
});

const TaxRegisterForCollection = asyncHandler(async (req, res) => {
  try {
    // Fetch the tax register data sorted by creation time in descending order
    const taxRegister = await TaxModel.find({})
      .sort({ createdAt: -1 });

    if (taxRegister) {
      res.status(200).send({
        message: "Tax Register Data",
        taxRegister
      });
    } else {
      res.status(404).send({ message: "No tax register data found" });
    }
  } catch (error) {
    console.error(error.message);
    res.status(500).send({ message: "Internal Server Error" });
  }
});


const villageDataController = async (req, res) => {
  try {
    const village = await villageModel.find({ ward_no: req.params.id });
    if (village) {
      res.status(200).send({ message: "Data ", village });
    }
  } catch (error) {
    console.log(error.message);
  }
};

const ReportDataController = async (req, res) => {
  try {
    const { startDate, endDate } = req.query;

    // Convert string dates to Date objects
    const start = new Date(startDate);
    const end = new Date(endDate);

    // Set the end date to the end of the day
    end.setHours(23, 59, 59, 999);

    // Assuming 'year' is an array in your schema
    const data = await TaxModel.find({
      createdAt: { $gte: start, $lte: end },
    }).populate("ward");

    if (data.length > 0) {
      res.json({ data });
    } else {
      res.status(400).send({
        message: "Data Not Found Try Other Date Range",
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).send({
      success: false,
      error: error.message,
    });
  }
};

const createBusiness = async (req, res) => {
  try {
    const business = new Business(req.body);
    await business.save();
    res.status(201).json({ success: true, data: business });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

// Get all businesses
const getAllBusinesses = async (req, res) => {
  const page = parseInt(req.query.page) || 1; // Current page number, default to 1
  const ward = parseInt(req.query.ward) || 1; // Current ward number, default to 1
  const limit = parseInt(req.query.limit) || 10; // Number of documents per page, default to 10

  try {
    const totalCount = await Business.countDocuments({ wardNo: ward });
    const totalPages = Math.ceil(totalCount / limit);

    const businesses = await Business.find({ wardNo: ward })
      .skip((page - 1) * limit)
      .limit(limit)
      .sort({ formNo: 1 }); // Sorting by 'formNo' in ascending order

    res.status(200).json({
      success: true,
      data: businesses,
      pagination: {
        totalItems: totalCount,
        totalPages: totalPages,
        currentPage: page
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};



// Get business by ID
const getBusinessById = async (req, res) => {
  try {
    const business = await Business.findById(req.params.id);
    if (!business) {
      return res.status(404).json({ success: false, error: 'Business not found' });
    }
    res.status(200).json({ success: true, data: business });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// Update business by ID
const updateBusiness = async (req, res) => {
  try {
    const business = await Business.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!business) {
      return res.status(404).json({ success: false, error: 'Business not found' });
    }
    res.status(200).json({ success: true, data: business });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// Delete business by ID
const deleteBusiness = async (req, res) => {
  try {
    const business = await Business.findByIdAndDelete(req.params.id);
    if (!business) {
      return res.status(404).json({ success: false, error: 'Business not found' });
    }
    res.status(200).json({ success: true, data: {} });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// Search businesses
const searchBusinesses = async (req, res) => {
  const  {searchValue,wardId}  = req.query;
 
  try {
    // Define your search criteria here based on your schema
    const businesses = await Business.find({ wardNo:wardId,
      $or: [
        { formNo: { $regex: searchValue, $options: 'i' } },
        { mobileNo: { $regex: searchValue, $options: 'i' } },
        { ownerName: { $regex: searchValue, $options: 'i' } },
        // Add other fields you want to search here
      ],
    });
    res.status(200).json({ success: true, data: businesses });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

export {
  wardGetDataController,
  wardDataMakeController,
  wardWaysDataController,
  getDataController,
  searchDataController,
  taxPaymentController,
  TaxRegisterGetController,
  DataViewControllerByQRCode,
  paymentViewControllerByQRCode,
  fullDataController,
  SingleData,
  updateController,
  deleteDataController,
  AllDataSearchController,
  searchAllDataController,
  allWardsDataController,
  ReportDataController,
  villageDataController,
  updateQrController,
  TaxRegisterSearchController,
  allDataCalculateController,
  allCalculateController,
  TaxRegisterForCollection,createBusiness, getAllBusinesses, getBusinessById, updateBusiness, deleteBusiness,searchBusinesses
  
};
