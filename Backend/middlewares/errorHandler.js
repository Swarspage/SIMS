const multer = require("multer");

const errorHandler = (err, req, res, next) => {

    // Handle Multer-specific errors
    if (err instanceof multer.MulterError) {
        switch (err.code) {

        case "LIMIT_FILE_SIZE":
            return res.status(400).json({
            success: false,
            message: "File size should not exceed specified limits.",
            });

        case "LIMIT_UNEXPECTED_FILE":
            return res.status(400).json({
            success: false,
            message: "Unexpected file field",
            });

        case "LIMIT_FILE_COUNT":
            return res.status(400).json({
            success: false,
            message: "Too many files uploaded",
            });

        default:
            return res.status(400).json({
            success: false,
            message: err.message,
            });
        }
    }

    // anything expect above errors are unexpected errors - so log them on the console.
    console.error("From middlewares/errorHandler : ",err);

    // Handle custom validation errors
    if (err.message) {
        return res.status(400).json({
        success: false,
        message: err.message,
        });
    }


    // Fallback
    return res.status(500).json({
        success: false,
        message: "Internal Server Error",
    });
};

module.exports = errorHandler;
