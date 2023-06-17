const express = require("express");
const ticketRoutes = express.Router();
const GuidanceTicket = require("../models/guidanceTicket.model");

ticketRoutes.route("/get-all-tickets").get(function (req, res) {
  GuidanceTicket.find({}, (err, tickets) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(200).json(tickets);
    }
  });
});

ticketRoutes
  .route("/get-tickets-by-requested-user-id/:userId")
  .get(function (req, res) {
    const { userId } = req.params;
    GuidanceTicket.find({ requestedBy: userId })
      .populate("assignedTo")
      .populate("directedDepartmentID")
      .exec((err, tickets) => {
        if (err) {
          res.status(500).send(err);
        } else {
          const sortedTickets = tickets.sort(
            (a, b) => b.createdTime - a.createdTime
          );

          tickets = sortedTickets;

          res.status(200).send(tickets);
        }
      });
  });

ticketRoutes
  .route("/get-tickets-by-directed-department-id/:deptId")
  .get(function (req, res) {
    const { deptId } = req.params;
    GuidanceTicket.find({ directedDepartmentID: deptId })
      .populate("requestedBy")
      .populate("assignedTo")
      .exec((err, tickets) => {
        if (err) {
          res.status(500).send(err);
        } else {
          const sortedTickets = tickets.sort(
            (a, b) => b.createdTime - a.createdTime
          );

          tickets = sortedTickets;
          res.status(200).send(tickets);
        }
      });
  });

ticketRoutes
  .route("/get-tickets-by-assigned-user-id/:userId")
  .get(function (req, res) {
    const { userId } = req.params;
    GuidanceTicket.find({ assignedTo: userId })
      .populate("requestedBy")
      .exec((err, tickets) => {
        if (err) {
          res.status(500).send(err);
        } else {
          const sortedTickets = tickets.sort(
            (a, b) => b.createdTime - a.createdTime
          );

          tickets = sortedTickets;

          res.status(200).send(tickets);
        }
      });
  });

ticketRoutes
  .route("/get-ticket-details-by-ticket-id/:id")
  .get(function (req, res) {
    const { id } = req.params;
    GuidanceTicket.findById(id, (err, tickets) => {
      if (err) {
        res.status(500).send(err);
      } else {
        res.status(200).json(tickets);
      }
    });
  });

ticketRoutes.route("/assign-ticket-by-ticket-id/:id").put(function (req, res) {
  const { id } = req.params;
  GuidanceTicket.findByIdAndUpdate(id, req.body, (err, tickets) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(200).json({
        message: "Your request is successful",
      });
    }
  });
});

ticketRoutes
  .route("/complete-ticket-by-ticket-id/:id")
  .put(function (req, res) {
    const { id } = req.params;
    GuidanceTicket.findByIdAndUpdate(id, req.body, (err, tickets) => {
      if (err) {
        res.status(500).send(err);
      } else {
        res.status(200).json({
          message: "Your request is successful",
        });
      }
    });
  });

ticketRoutes.route("/save-ticket").post(async (req, res) => {
  const ticket = new GuidanceTicket(req.body);
  ticket
    .save()
    .then(() =>
      res.status(200).json({
        message: "Your request is successful",
      })
    )
    .catch((err) => {
      res
        .status(500)
        .json({ message: "Your request is unsuccessful", error: err });
    });
});

module.exports = ticketRoutes;
