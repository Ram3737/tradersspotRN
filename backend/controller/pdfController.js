const fs = require("fs");
const path = require("path");

const downloadTradingGuidePdf = async (req, res, next) => {
  const filename = "Trading-guide.pdf";
  const pdfPath = path.join("pdfs", "Trading-guide.pdf");
  fs.readFile(pdfPath, (err, data) => {
    if (err) {
      return next(err);
    }
    res.setHeader("Content-Type", "application/pdf");
    res.setHeader("Content-Disposition", 'inline; filename="' + filename + '"');
    res.send(data);
  });
};

const downloadTradingInTheZonePdf = async (req, res, next) => {
  const filename = "Trading_in_the_zone.pdf";
  const pdfPath = path.join("pdfs", "Trading_in_the_zone.pdf");
  fs.readFile(pdfPath, (err, data) => {
    if (err) {
      return next(err);
    }
    res.setHeader("Content-Type", "application/pdf");
    res.setHeader("Content-Disposition", 'inline; filename="' + filename + '"');
    res.send(data);
  });
};

const downloadDayTradeForaLivingPdf = async (req, res, next) => {
  const filename = "How_to_Day_Trade_for_a_Living.pdf";
  const pdfPath = path.join("pdfs", "How_to_Day_Trade_for_a_Living.pdf");
  fs.readFile(pdfPath, (err, data) => {
    if (err) {
      return next(err);
    }
    res.setHeader("Content-Type", "application/pdf");
    res.setHeader("Content-Disposition", 'inline; filename="' + filename + '"');
    res.send(data);
  });
};

const downloadUltimateCandlesticksPdf = async (req, res, next) => {
  const filename = "ultimate_candlestick.pdf";
  const pdfPath = path.join("pdfs", "ultimatecandlestick.pdf");
  fs.readFile(pdfPath, (err, data) => {
    if (err) {
      return next(err);
    }
    res.setHeader("Content-Type", "application/pdf");
    res.setHeader("Content-Disposition", 'inline; filename="' + filename + '"');
    res.send(data);
  });
};

module.exports = {
  downloadTradingGuidePdf,
  downloadTradingInTheZonePdf,
  downloadDayTradeForaLivingPdf,
  downloadUltimateCandlesticksPdf,
};
