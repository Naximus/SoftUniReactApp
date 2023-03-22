const { db } = require("mongoose");
const bcrypt = require("bcrypt");
const { isEmail } = require("validator");
const { removeEmptyAttributes } = require("../utils/jsUtils");

const User = require("../models/User");
const Card = require("../models/Card");
const Measurement = require("../models/Measurement");
const settingsService = require("./settingsService");

const jwt = require("../libs/jsonwebtoken");
const { SECRET } = require("../constants");
const { dateToYYYYMMDDHHMINSEC, addMonths } = require("../utils/dateUtils");

exports.getMany = async (query) => {
  let qry = {};
  let result = { data: {}, count: 0 };

  result.count = await Measurement.find({}).countDocuments();

  qry.limit = query.limit ? query.limit : 20;
  result.limit = qry.limit;

  qry.skip = query.skip
    ? query.skip < result.count
      ? query.skip
      : result.count
    : 0;
  result.skip = qry.skip;

  qry.find = {};

  if (query.owner) {
    qry.find.owner = query.owner;
  }

  if (query.creator) {
    qry.find.creator = query.creator;
  }

  qry.orderBy = query.orderBy === "desc" ? "desc" : "asc";

  qry.sort = {};

  if (query.sortBy) {
    qry.sort[query.sortBy] = qry.orderBy;
  } else {
    qry.sort = { name: qry.orderBy };
  }

  result.data = await Measurement.find(qry.find)
    .sort(qry.sort)
    .skip(qry.skip)
    .limit(qry.limit)
    .lean();
  return result;
};

exports.getById = async (id) => {
  const card = await Measurement.findById(id).lean();

  if (!card) {
    throw new Error("Measurement does not exist.");
  }

  return card;
};

exports.create = async (data) => {
  const { weight, neck, chest, waistAboveTheNavel, waistBelowNavel, hips, thigh, owner, notes, creator } =
    data;

  const existingClient = await User.findById(owner);

  if (!existingClient) {
    throw new Error("Client does not exist");
  }

  const existingCreator = await User.findById(creator);

  if (!existingCreator) {
    throw new Error("Creator does not exist");
  }

  if (!existingCreator.type) {
    throw new Error(`Unauthorised operation for ${existingCreator.type}`);
  }

  const newMeasurement = removeEmptyAttributes(data);
  newMeasurement.created = new Date();
  newMeasurement.active = true;

  return await Measurement.create(newMeasurement);
};

exports.delete = async (id) => {
  const measurement = await Measurement.findByIdAndDelete(id).lean();

  if (!measurement) {
    throw new Error("Measurement does not exist.");
  }

  return measurement;
};

exports.updateNotes = async (id, notes) => {
  const measurement = await Measurement.findById(id);

  if (!measurement) {
    throw new Error("Measurement does not exist");
  }

  if (measurement.notes === notes) {
    throw new Error("Nothing to update.");
  }

  measurement.notes = notes;
  measurement.modified = new Date();
  return await measurement.save();
};