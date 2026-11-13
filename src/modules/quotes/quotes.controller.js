
const { z } = require("zod");
const Quote = require("./quotes.model");
const { google } = require("googleapis");

// Google Sheets authentication
const auth = new google.auth.GoogleAuth({
    keyFile: process.env.GOOGLE_APPLICATION_CREDENTIALS,
    scopes: ["https://www.googleapis.com/auth/spreadsheets"]
});

// Append enquiry to Google Sheets
const appendToGoogleSheet = async (enquiry) => {
    const client = await auth.getClient();

    const sheets = google.sheets({
        version: "v4",
        auth: client
    });

    const response = await sheets.spreadsheets.values.append({
        spreadsheetId: process.env.GOOGLE_SHEET_ID,
        range: "Enquiries!A:J",
        valueInputOption: "USER_ENTERED",
        insertDataOption: "INSERT_ROWS",
        requestBody: {
            values: [[
                enquiry.name,
                enquiry.email,
                enquiry.phone,
                enquiry.serviceType,
                enquiry.numberOfGuards,
                enquiry.location,
                enquiry.duration,
                enquiry.message || "",
                enquiry.status,
                enquiry.createdAt.toISOString()
            ]]
        }
    });

    return response.data;
};

// Enquiry validation
const quoteSchema = z.object({
    name: z.string().trim().min(2).max(100),
    email: z.string().trim().email(),
    phone: z.string().trim().min(7).max(20),
    serviceType: z.string().trim().min(2),
    numberOfGuards: z.number().int().min(1),
    location: z.string().trim().min(2),
    duration: z.string().trim().min(1),
    message: z.string().trim().max(1000).optional().default("")
});

// Create quote enquiry
const createQuote = async (req, res, next) => {
    try {
        // 1. Validate request data
        const result = quoteSchema.safeParse(req.body);

        if (!result.success) {
            return res.status(400).json({
                success: false,
                message: "Invalid enquiry details",
                errors: result.error.issues.map(issue => ({
                    field: issue.path.join("."),
                    message: issue.message
                }))
            });
        }

        // 2. Save enquiry in MongoDB
        const savedEnquiry = await Quote.create(result.data);

        console.log("Enquiry saved in MongoDB:", savedEnquiry._id);

        // 3. Append enquiry to Google Sheets
        try {
            console.log("Sending enquiry to Google Sheets...");

            const sheetResponse = await appendToGoogleSheet(savedEnquiry);

            console.log("FULL GOOGLE SHEETS RESPONSE:");
            console.log(JSON.stringify(sheetResponse, null, 2));

        } catch (sheetError) {
            console.error("Google Sheets sync failed!");
            console.error("Error message:", sheetError.message);
            console.error("Google API error:", sheetError.response?.data);
        }

        // 4. Send API response
        return res.status(201).json({
            success: true,
            message: "Quote successfully created",
            data: savedEnquiry
        });

    } catch (error) {
        next(error);
    }
};

module.exports = { createQuote };
