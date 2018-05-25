var fs = require('fs');
var express = require('express');
var dao = require('./dao');

// express提供了一种更好的方式专门用来包装路由
var router = express.Router();

router.get('/students', function (req, res) {
	dao.retrieve(function (err, students) {
		if(err){
			return res.status(500).send('Server error.');
		}
		res.render('index.html', {
			students: students
		});
	});
});

router.get('/students/new', function (req, res) {
	res.render('new.html');
});

router.post('/students/new', function (req, res) {
	dao.create(req.body, function (err) {
		if (err) {
			return res.status(500).send('Server error.')
		}
		res.redirect('/students');
	});
});

router.get('/students/edit', function (req, res) {
	dao.retrieveById(parseInt(req.query.id), function (err, student) {
		if (err) {
			return res.status(500).send('Server error.')
		}
		res.render('edit.html', {
			student: student
		});
	});
});

router.post('/students/edit', function (req, res) {
	dao.update(req.body, function (err) {
		if (err) {
			return res.status(500).send('Server error.')
		}
		res.redirect('/students');
	})
});

router.get('/students/delete', function (req, res) {
	dao.delete(parseInt(req.query.id), function (err) {
		if (err) {
			return res.status(500).send('Server error.')
		}
		res.redirect('/students');
	});
});

module.exports = router;
