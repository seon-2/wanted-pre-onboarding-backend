const express = require("express");
const { PrismaClient } = require("@prisma/client");

const router = express.Router();

// prisma client 사용 선언
const client = new PrismaClient();


module.exports = router;
