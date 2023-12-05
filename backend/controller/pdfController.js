const fs = require("fs");
const path = require("path");

const downloadPdf = async (req, res, next) => {
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

module.exports = {
  downloadPdf,
};
