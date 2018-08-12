const express = require('express');
const router = express.Router();
const crypto = require('crypto-promise');

const pool = require('../../module/pool.js');

//로그인
router.post('/login', async(req, res, next) => {
  var id = req.body.id;
  var pwd = req.body.pwd;

  if (!id || !pwd) {
    res.status(400).send({
      message : "Null Value"
    });
  } else {
    let checkQuery = 'SELECT * FROM user WHERE id = ?';
    let checkResult = await pool.queryParamCnt_Arr(checkQuery, [id]);
    if (checkResult.length === 1) {
      const hashedpwd = await crypto.pbkdf2(pwd, checkResult[0].salt, 100000, 32, 'sha512');
      if (hashedpwd.toString('base64') === checkResult[0].pwd) {
        res.status(201).send({
          message: "Login Success"
        });
      } else {
        res.status(400).send({
          message: "Login Failed"
        });
        console.log("pwd error");
      }
    } else {
      res.status(400).send({
        message: "Login Failed"
      });
      console.log("id error");
    }
  }
});

//회원가입
router.post('/register', async(req, res, next) => {
  var user_name = req.body.user_name;
  var user_birth = req.body.user_birth;
  var user_address = req.body.user_address;
  var phone = req.body.phone;

  console.log(req,body);
  
  if (!id || !pwd || !name || !phone) {
    res.status(400).send({
      message : "Null Value"
    });
  } else {
    const salt = await crypto.randomBytes(32);
    const hashedpwd = await crypto.pbkdf2(pwd, salt.toString('base64'), 100000, 32, 'sha512');
    let checkIDQuery = 'SELECT * FROM user WHERE id = ?';
    let checkID = await pool.queryParamCnt_Arr(checkIDQuery, [id]);
    if (checkID.length === 0) {

      let insertQuery = 'INSERT INTO user (name, salt, pwd, phone, id) VALUES (?, ?, ?, ?, ?, ?, ?)';
      let insertResult = await pool.queryParamCnt_Arr(insertQuery, [name, salt.toString('base64'), hashedpwd.toString('base64'), phone, id]);
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
