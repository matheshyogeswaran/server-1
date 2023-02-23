const express = require("express");
const departmentRoutes = express.Router();
const Department = require("../models/department.model");

departmentRoutes.route("/departments/showAllDepartments").get(function (req, res) {
    Department.find({}, (err, departments) => {
      if (err) {
        res.send(err);
      } else {
        res.json(departments);
      }
    });
  });

departmentRoutes.route("/departments/isDepartmentAvailable").post(function (req, res) {
    const depName = req.body.depName;
    Department.findOne({ departmentname: depName }, (err, departments) => {
      if (err) {
        console.log(err);
        res.send(err);
      } else {
        if (departments) {
          res.json({ status: true });
          console.log(true);
        } else {
          res.json({ status: false });
          console.log(false);
        }
      }
    });
  });

departmentRoutes.route("/departments/addDepartment").post(async (req, res) => {
  // console.log(req.body);
  const depName = req.body.departmentName;
  const createdBy = "Name";
  const createdOn = Date.now();
  console.log(depName);
  const departmentDetails = new Department({
    depName,
    createdBy,
    createdOn,
  });
  departmentDetails
    .save()
    .then((item) =>
      res.json({
        message: "Department Added Successfully",
        status: true,
      })
    )
    .catch((err) => {
      if (err.code === 11000) {
        return res.json({
          message: "Department already exists",
          status: false,
        });
      }
      res.status(500).send({ error: err });
    });
});

departmentRoutes.route("/departments/editDepartment").post(async (req, res) => {
  // console.log(req.body);
  newName = req.body.newName;
  reason = req.body.reason;
  editedId = req.body.editedId;
  fromName = req.body.fromName;
  const newReasonObject = {
    reasonID: Math.floor(Date.now()) / 1000,
    reasonValue: reason,
    modifiedBy: "Ishvini",
    fromName: fromName,
    toName: newName,
  };
  try {
    const document = await Department.findById(editedId);
    document.reasons.push(newReasonObject);
    Department.updateOne(
      { _id: editedId },
      { $set: { depName: newName, reasons: document.reasons } }
    )
      .then((result) => {
        return res.json({
          message: "Department Name Updated Successfully",
          status: true,
        });
      })
      .catch((err) => {
        return res.json({
          message: "Error in Updating Department Name",
          status: false,
        });
      });
  } catch {
    return res.json({
      message: "Department Not Found. Try Again !!!",
      status: false,
    });
  }
  // ------------------------------------------------------------------------------
});

departmentRoutes.route("/departments/deleteDepartment").post(async (req, res) => {
    id = req.body.id;
    reason = req.body.reason;
    try {
      const deletedDepartment = await Department.deleteOne({ _id: id });
      // res.status(200).json(deletedchapter);
      return res.json({
        message: "Department Deleted Successfully",
        status: true,
      });
    } catch (error) {
      return res.json({
        message: "Error...!",
        status: false,
      });
    }
});

module.exports = departmentRoutes;