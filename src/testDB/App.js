import React from 'react';
import reduce from 'lodash/reduce'; 
import axios from 'axios'
import qs from 'qs'
import PostList from 'PostList';


axios.defaults.baseURL = 'http://127.0.0.1'  //根据项目自己更改
axios.interceptors.request.use((config)=>{
    //如果项目中有将token绑定在请求数据的头部，服务器可以有选择的返回数据，只对有效的请求返回数据，这样写
    //这里是用户登录的时候，将token写入了sessionStorage中了，之后进行其他的接口操作时，进行身份验证。
    config.headers.Authorization = window.sessionStorage.getItem("token");
    console.log(config);
    console.log("good afternong");
    return config;
  })
  //在response中
  axios.interceptors.response.use(config =>{
    console.log(config)
    return config;
  })

const http = {
    post:'',
    get:'',
    put:'',
    del:''
}

http.post = function (api, data){
    //let params = qs.stringify(data);
    return new Promise((resolve, reject)=>{
        axios.post(api,data).then(response=>{
            resolve(response)
        })
    })
}

http.get = function (api, data){
    //let params = qs.stringify(data);
    return new Promise((resolve, reject)=>{
        axios.get(api,data).then(response=>{
            resolve(response)
        })
    })
}

http.delete = function (api, data){
    return new Promise((resolve, reject)=>{
        axios.delete(api,data).then(response=>{
            resolve(response)
        })
    })
}

http.put = function (api, data){
    return new Promise((resolve, reject)=>{
        axios.put(api,data).then(response=>{
            resolve(response)
        })
    })
}
const t = () => {
  reduce([1,2,3], (a, b, c) => {
    alert(c);
    }, []);
  alert("good evening");}


const Checkbox = (props) => {
  const { children, ...rest } = props
  return (
    <label>
      <input type="checkbox" {...rest} />
      {children}
    </label>
  )
}
const CheckboxGroup = (props) => {
  const { selected = [], group = [] } = props
  return (
    <React.Fragment>
      {
        group.map(
          value => (
            <Checkbox
              checked={selected.indexOf(value) > -1}
              key={value}
            >
              {value}
            </Checkbox>
          ),
        )
      }
    </React.Fragment>
  )
}

const tt = () => {
    const currentColumnId = "207";
    const subNav = "#subNav";
    const  subNavItem = subNav.find("li");
    subNavItem.forEach(item =>  () => {
        
        if (item.attr("data-id") == currentColumnId)
        {
            item.addClass("active");
            const parents = item.parentsUntil("div");
            parents.forEach(subItem =>  () => {
                
                if (subItem.is('li')) {
                    subItem.addClass("active");
                    subItem.children("ul").addClass("active");
                    subItem.children(".arrow").addClass("active");
                }
            });
        }
        if (item.children("ul").length > 0)
        {
            item.append('<span class="arrow"></span>');
        }
    });
    subNavItem.find(".arrow").on("click", item =>  () => {
       
        item.toggleClass("active");
        item.siblings("ul").toggleClass("active");
    });
}


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "ggg",
    };
  console.log("good");
  }
  componentDidMount(){
        this.getMes();
   }

  getMes = async ()=>{
       // const {data: res} = await http.get('open/home/get_nav_class')
        //console.log('结果',res);
        t();
    }
render() {

  console.log("what");
  return (
    <>
      <PostList />
      {/*<CheckboxGroup
        group={[1, 2, 3]}
        selected={[1, 3]}
      />*/}
      <p>good</p>
    </>
   );
  }
}

export default  App;
