const express = require('express');
const router = express.Router();
const crypto = require('crypto-promise');

const pool = require('../../module/pool.js');
const jwt = require('../../module/jwt.js');

//로그인
router.post('/login', async(req, res, next) => {
  // let token = req.headers.token;
  // let decoded = jwt.verify(token);
  // let user_idx = decoded.user_idx;

  var user_name = req.body.user_name;
  // var user_birth = req.body.user_birth;
  // var user_address = req.body.user_address;
  // var user_date = req.body.user_date;
  // var user_hospital = req.body.user_hospital;

  if (!user_name) {
    res.status(400).send({
      message : "Null Value"
    });
  } else {
    let checkQuery = 'SELECT * FROM user WHERE user_name = ?';
    let checkResult = await pool.queryParamCnt_Arr(checkQuery, [user_name]);
    if (checkResult.length === 1) {
      // const hashedpwd = await crypto.pbkdf2(pwd, checkResult[0].salt, 100000, 32, 'sha512');
      // if (hashedpwd.toString('base64') === checkResult[0].pwd) {
        let token = jwt.sign(checkResult[0].user_idx);

        res.status(201).send({
          message: "Login Success",
          token : token
        });
      // } else {
      //   res.status(400).send({
      //     message: "Login Failed"
      //   });
      //   console.log("pwd error");
      // }
    } else {
      res.status(400).send({
        message: "Login Failed"
      });
      console.log("name error");
    }
  }
});

//회원가입
router.post('/register', async(req, res, next) => {
  var user_name = req.body.user_name;
  var user_birth = req.body.user_birth;
  var user_address = req.body.user_address;
  var user_date = req.body.user_date;
  var user_hospital = req.body.user_hospital;


  console.log(req.body);
  
  if (!user_name || !user_birth || !user_address || !user_date || !user_hospital) {
    res.status(400).send({
      message : "Null Value"
    });
  } else {
    // const salt = await crypto.randomBytes(32);
    // const hashedpwd = await crypto.pbkdf2(pwd, salt.toString('base64'), 100000, 32, 'sha512');
    let checkIDQuery = 'SELECT * FROM user WHERE user_name = ?';
    let checkID = await pool.queryParamCnt_Arr(checkIDQuery, [user_name]);
    if (checkID.length === 0) {

      let insertQuery = 'INSERT INTO user (user_name, user_birth, user_address, user_date, user_hospital) VALUES (?, ?, ?, ?, ?)';
      let insertResult = await pool.queryParamCnt_Arr(insertQuery, [user_name, user_birth, user_address, user_date, user_hospital]);
      if(!checkID || !insertResult) {
        res.status(500).send({
          message : "Internal Server Error"
        });
      } else {
        res.status(201).send({
          message: "Success Register"
        });
      }
    } else {
      console.log("ID 이미 보유");
      res.status(400).send({
        message: "ID Already Exist"
      });
    }
  }
});


module.exports = router;
