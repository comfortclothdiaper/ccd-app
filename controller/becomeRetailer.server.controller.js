var retailer = require('../model/becomeRetailer.server.model.js');
var nodemailer = require('nodemailer');

exports.saveRetailerDetails = function (req, res) {
	var newRetailer = new retailer({
		name:req.body.name,
		contactNum: req.body.contactNum,
		email:req.body.email,
		message:req.body.message
	});
	newRetailer.save(function (err, done) { 
		if (err)
			res.json({ status: 422, message: 'Please provide all details' });
		else {
			mailRetailerDetails(req, res);
			// res.json({ status: 201, message: 'Successfully saved your details' });
		}
	});
	function mailRetailerDetails(req, res) { 
		var transporter = nodemailer.createTransport({
			service: 'Gmail',
			auth: {
				user: 'comfortclothdiaper@gmail.com', // Your email id
				pass: 'allah!$gr8' // Your password
			}
		});
		var massageToRetailer = 'Hello ' + req.body.name + ',' + '<br>' + '<br>' +
                   'Thank you for expressing an intrest. ' + '<br>' +
					'We will get back to you shortly' + '<br>' + 'Regards,' + '<br>' + 'Comfort Cloth Diaper.'
		var mailToRetailer = {
			from: "comfortclothdiaper@gmail.com", // sender address
			to: req.body.email, // list of receivers
			subject: 'Comfort Cloth Diaper', // Subject line
			html: massageToRetailer //, // plaintext body                               
		};
		transporter.sendMail(mailToRetailer, function (error, info) {
			if (error) {
				console.log(error);
				res.json({ success: false, msg: 'Error' });
			} else {
				console.log('Mail sent: ' + info.response);
				res.json({ status:201, message: 'Saved Details Successfully'});
			};
		});
		var messageToAdmin = 'Hello CCD Admin,' + '<br>' + '<br>' +
                                'Please find following details of the new Retailer. ' + '<br>' + '<br>' +
                                '<table style="width: 618px;    border-top: solid; border-bottom: solid;   border-color: #3498db; font-family: Arial, sans-serif; background-color: #f2f2f2;" cellspacing="0" cellpadding="5">' +
                                //'<tr><td style="font-style: italic;"><strong>Booking Ref No  </strong></td><td>' + bookingRefNo + '</td></tr>' +
                                //'<tr><td style="font-style: italic;"><strong>Preferred Date & Time  </strong></td><td>' + req.body.bookingDateTime + '</td></tr>' +
                                '<tr><td style="font-style: italic;"><strong>Contact Person Name</strong></td><td>' + req.body.name + '</td></tr>' +
								'<tr><td style="font-style: italic;"><strong>Contact Person Email Id</strong></td><td>' + req.body.email + '</td></tr>' +
								'<tr><td style="font-style: italic;"><strong>Contact Person Number</strong></td><td>' + req.body.contactNum + '</td></tr>' +
								'<tr><td style="font-style: italic;"><strong>Message  </strong></td><td>' + req.body.message + '</td></tr>' +
                                '</table>' + '<br>' +
                                'Regards,' + '<br>' +
                                'Comfort Cloth Diaper Team'
		
		var mailToAdmin = {
			from: "comfortclothdiaper@gmail.com", // sender address
			to: "comfortclothdiaper@gmail.com", // list of receivers   asmazabin@gmail.com
			subject: 'New Retailer Request', // Subject line
			html: messageToAdmin //, // plaintext body                               
		};
		transporter.sendMail(mailToAdmin, function (error, info) {
			if (error) {
				console.log(error);
                                    // res.json({ success: false, msg: 'Error' });
			} else {
				console.log('Message sent to admin: ' + info.response);
                                    //res.json({ yo: info.response });
			};
		});
	}
}