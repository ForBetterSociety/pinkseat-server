const express = require('express');
const router = express.Router();

const pool = require('../../module/pool.js');

// localhost:3000/info/subway
//모든 지하철의 임산부 좌석을 가져옴
router.get('/subway', async function(req, res) {

	let selectQuery = 'SELECT * FROM pregnant';
	let selectResult = await pool.queryParamCnt_None(selectQuery);
// selectResult : [
// {
// 	pregnant_idx : 1,
// 	ryang_idx : 1,
// 	occupied : 0
// },
// {
// 	subway_idx : 2,
// 	occupied : 1
// },{
// 	subway_idx : 3,
// 	occupied : 0
// },
// {
// 	subway_idx : 4,
// 	occupied : 0
// }
// ]
	if (!selectResult) {
		res.status(500).send({
			message : "Internal Server Error"
		});
	} else {
		res.status(200).send({
			message : "Success",
			data : selectResult
		});
	}
	
});


module.exports = router;