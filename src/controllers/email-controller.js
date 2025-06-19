const { EmailService } = require("../services");
const { StatusCodes } = require("http-status-codes");
const { getLogger } = require("../config");
const AppError = require("../utils/AppError");
const logger = getLogger(__filename);
const { SuccessResponse, ErrorResponse } = require("../utils/common");

async function sendMail(req, res) {
  try {
    const { header, to, subject, text } = req.body;
    const response = await EmailService.sendMail(header, to, subject, text);

    if (!response) {
      throw new AppError(
        "Failed to send mail",
        StatusCodes.INTERNAL_SERVER_ERROR
      );
    }
    SuccessResponse.data = response;
    SuccessResponse.message = "Successfully send mail";
    return res.status(StatusCodes.OK).json(SuccessResponse);
  } catch (error) {
    logger.error(error.stack || error.message);

    //If it's an AppError then use it's own message status codes
    const statusCode =
      error instanceof AppError
        ? error.statusCode
        : StatusCodes.INTERNAL_SERVER_ERROR;
    const message =
      error instanceof AppError
        ? error.message
        : "Something went wrong while sending mail";

    ErrorResponse.error = message;
    return res.status(statusCode).json(ErrorResponse);
  }
}

async function createTicket(req, res) {
  try {
    const { header, subject, content, recepientEmail } = req.body;
    const response = await EmailService.createTicket({
      header,
      subject,
      content,
      recepientEmail,
    });
    if (!response) {
      throw new AppError(
        "Failed to create Email",
        StatusCodes.INTERNAL_SERVER_ERROR
      );
    }
    SuccessResponse.data = response;
    SuccessResponse.message = "Successfully created mail";
    return res.status(StatusCodes.OK).json(SuccessResponse);
  } catch (error) {
    logger.error(error.stack || error.message);

    //If it's an AppError then use it's own message status codes
    const statusCode =
      error instanceof AppError
        ? error.statusCode
        : StatusCodes.INTERNAL_SERVER_ERROR;
    const message =
      error instanceof AppError
        ? error.message
        : "Something went wrong while creating mail";

    ErrorResponse.error = message;
    return res.status(statusCode).json(ErrorResponse);
  }
}

async function getPendingTickets(req, res) {
  try {
    const response = await EmailService.getPendingTickets();

    if (!response) {
      throw new AppError(
        "Failed to find pending tickets",
        StatusCodes.INTERNAL_SERVER_ERROR
      );
    }
    SuccessResponse.data = response;
    SuccessResponse.message = "Successfully fetched pending tickets";
    return res.status(StatusCodes.OK).json(SuccessResponse);
  } catch (error) {
    logger.error(error.stack || error.message);

    //If it's an AppError then use it's own message status codes
    const statusCode =
      error instanceof AppError
        ? error.statusCode
        : StatusCodes.INTERNAL_SERVER_ERROR;
    const message =
      error instanceof AppError
        ? error.message
        : "Something went wrong while creating mail";

    ErrorResponse.error = message;
    return res.status(statusCode).json(ErrorResponse);
  }
}

module.exports = { sendMail, createTicket, getPendingTickets };
