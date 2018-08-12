const express = require('express');
const router = express.Router();

const pool = require('../../module/pool.js');

//post localhost:3000/gather {pregnant_idx : 1, occupied : 1}
//임산부 좌석의 상태가 바뀔 때
router.post('/', async function(req, res) {
	let pregnant_idx = req.body.pregnant_idx;
	let occupied = req.body.occupied;

	let updateQuery = 'UPDATE pregnant SET occupied = ? WHERE pregnant_idx = ?';
	let updateResult = await pool.queryParamCnt_Arr(updateQuery, [occupied, pregnant_idx]);
	
	if (!updateResult) {
		res.status(500).send({
			message : "Internal Server Error"
		});
	} else {
		if (updateResult.changedRows === 0) {
			res.status(400).send({
				message : "Same"
			});
		} else {
			res.status(201).send({
				message : "Success"
			});
		}
	}
});

module.exports = router;