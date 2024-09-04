const InquiryDetails = require('../../models/asiri/inquiryDetails');
const { v4: uuidv4 } = require('uuid');
const nodemailer = require('nodemailer');

const createInquiry = async (req, res) => {
    const refId = `INQ-${uuidv4()}`;
    
    const inquiryDetails = new InquiryDetails({
        refId: refId,
        userName: req.body.userName,
        email: req.body.email,
        category: req.body.category,
        subject: req.body.subject,
        description: req.body.description,
    });

    try {
        const savedInquiryDetails = await inquiryDetails.save();

        // Set up nodemailer transporter
        let transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL_USER, // Your email from .env
                pass: process.env.EMAIL_PASS, // Your email password from .env
            },
        });

        // Email content
        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: req.body.email,
            subject: `Thank You for Your Inquiry! Your Reference ID: ${refId}`,
            html: `
                <p>Dear ${req.body.userName},</p>
                <p>Thank you for reaching out to us. We have successfully received your inquiry, and our team is already on it!</p>
                <p><strong>Inquiry Details:</strong></p>
                <ul>
                    <li><strong>Reference ID:</strong> ${refId}</li>
                    <li><strong>Category:</strong> ${req.body.category}</li>
                    <li><strong>Subject:</strong> ${req.body.subject}</li>
                    <li><strong>Description:</strong> ${req.body.description}</li>
                </ul>
                <p>We understand how important this matter is to you and will do our best to resolve it as quickly as possible. A member of our team will be in touch with you shortly if any further information is needed.</p>
                <p>In the meantime, if you have any additional questions or need further assistance, please feel free to reply to this email, quoting your Reference ID <strong>${refId}</strong>.</p>
                <p>Thank you for your patience and understanding.</p>
                <p>Best regards,</p>
                <p><strong>The Smart Dispose Support Team</strong></p>
            `,
        };

        // Send the email
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                return res.json({
                    message: "Inquiry created but failed to send email",
                    error: error,
                });
            } else {
                res.json({
                    message: "Inquiry created and email sent successfully",
                    refId: refId,
                    savedInquiryDetails,
                });
            }
        });

    } catch (err) {
        res.json({ message: "Failed to create an inquiry", err });
    }
}

module.exports = createInquiry;
