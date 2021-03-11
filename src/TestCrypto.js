import axios from 'axios';
import crypto from 'crypto';
import md5 from 'md5';
import qs from 'Qs';
const userRegister = (
    <div class="col-md-6">
        <h4>用户注册</h4>
        <form role="form" method="post" action="/regest">
            <div class="form-group">
                <label for="username">用户名:</label>
                <input id="username" type="text" placeholder="请输入用户名" name="username" class="form-control"/>
            </div>
            <div class="form-group">
                <label for="password">密码:</label>
                <input id="password" type="password" placeholder="请输入密码" name="password" class="form-control"/>
            </div>
            <div class="form-group">
                <input type="submit" value="提交" class="btn btn-success"/>
            </div>
        </form>
    </div>
);



const login=(
    <div class="col-md-6">
        <h4>用户登录</h4>
        <form role="form" method="post" action="/login">
            <div class="form-group">
                <label for="username2">用户名:</label>
                <input id="username2" type="text" placeholder="请输入用户名" name="username" class="form-control"/>
            </div>
            <div class="form-group">
                <label for="password">密码:</label>
                <input id="password" type="password" placeholder="请输入密码" name="password" class="form-control"/>
            </div>
            <div class="form-group">
                <input type="submit" value="提交" class="btn btn-success" id="sub-btn2"/>
            </div>
        </form>
    </div>
);

axio.post("/login",{})
    .then(res => {
        
       const name = res.data.username;
       const password = res.body.password;
       const md5 = crypto.createHash("md5");
       const newPas = md5.update(password).digest("hex");
       db("select * from user1 where name = ?",[name],(err,data)=>{
        console.log(data[0].password);
        if (err){
            res.send("发生错误");
        }
        if (data){
            if (data[0].password === newPas){
                res.send("登录成功");
            }else {
                res.send("用户名或密码错误");
            }
        }
    })
})
.catch(e => {
    console.log(e);
});

let data = new FormData();
data.append('code','1234');
data.append('name','yyyy');
axios.post(`${this.$url}/test/testRequest`,data)
.then(res=>{
    console.log('res=>',res);            
})


import qs from 'Qs'
let data = {"code":"1234","name":"yyyy"};
axios.post(`${this.$url}/test/testRequest`,qs.stringify({
    data
}))
.then(res=>{
    console.log('res=>',res);            
})


const p1 = new Promise(function(resolve,reject){
  resolve('success1');
  resolve('success2');
});

const p2 = new Promise(function(){
  resolve('success3');
  reject('reject');

});

p1.then(function(value){
  console.log(value); // success1
});

p2.then(function(value){
  console.log(value); // success3
});

const p = new Promise(function(resolve,reject){
  resolve('success');
});

p.then(function(value){
  console.log(value);
});
console.log('first');
//输出结果
// first
// succes
