function convertToArray(nodes){//将节点数组 转化成Array实例
	var array = null;
	try{
		array = Array.prototype.slice.call(nodes,0);
	}
	catch(ex){
		array = [];
		for(var i = 0;i < nodes.length;i++){
			array.push(nodes[i])
		}
	}
	return array;
}



function getQueryStringArgs(key){//将URL解析为独立的片段 给URL传值 获取值
	var qs = (location.search.length > 0?location.search.substring(1):"")
	var items = qs.length?qs.split("&"):[];
	var item = null;
	var name = null;
	var value = null;
	var args = {};
	for(var i = 0;i < items.length;i++){
		item = items[i].split("=");
		name = decodeURIComponent(item[0]);
		value = decodeURIComponent(item[1]);
		if(name.length){
			args[name] = value;
		}
	}
	return args[key];
}


 var pageWidth = window.innerWidth;//兼容

        if(pageWidth != "number"){
        	//document.compatMode 如果是标准模式返回CSS1Compat 混杂模式BackCompat
        	if (document.compatMode == "CSS1Compat") {

        		pagewidth = document.documentElement.clientWidth

        	}
        	else{
        		pagewidth = document.body.clientWidth
        	}

        }
        console.log(pageWidth)



var EventUtli = {//跨浏览器的事件处理程序
	//添加句柄
		addHandler:function(element,type,handler){
			//DOM2级事件处理判断
			if(element.addEventLisener){
				element.addEventLisener(tpye,handler,false)

			}
			else if(element.attachEvent){//IE事件处理判断
				element.attachEvent('on' + type,handler)

			}
			else{//DOM0级事件判断
				element['on' + type] =handler
			}

		},
		//删除句柄
		removeHandler:function(element,type,handler){
			//DOM2级事件处理判断
			if(element.removeEventLisener){
				element.removeEventLisener(tpye,handler,false)

			}
			else if(element.detachEvent){//IE事件处理判断
				element.detachEvent('on' + type,handler)

			}
			else{//DOM0级事件判断
				element['on' + type] =null
			}


		}
	}


//登录注册弹框
var zezhao = document.getElementById("tanchu");
var tanchu = document.getElementById("tanchuzezao");
var zezhao1 = document.getElementById("tanchu1");
var tanchu1 = document.getElementById("tanchuzezao1");
var reg = document.getElementById("register");
var login = document.getElementById("login");
var close = document.getElementById("close");
var close1 = document.getElementById("close1");
var reg1 = document.getElementById("register1");
var login1 = document.getElementById("login1");
var tc_reg = document.getElementById('tc_reg');

reg.onclick = function(){
	zezhao.style.display = tanchu.style.display = "block";

}

close.onclick = function(){
	zezhao.style.display = tanchu.style.display = "none";

}
login.onclick = function(){
	zezhao1.style.display = tanchu1.style.display = "block";

}
close1.onclick = function(){
	zezhao1.style.display = tanchu1.style.display = "none";

}
reg1.onclick = function(){
	zezhao.style.display = tanchu.style.display = "block";
	zezhao1.style.display = tanchu1.style.display = "none";

}
login1.onclick = function(){
	zezhao1.style.display = tanchu1.style.display = "block";
	zezhao.style.display = tanchu.style.display = "none";

}

//用户注册
var unid = document.getElementById('unid');
var upwd = document.getElementById('upwd');
var upwd1 = document.getElementById('upwd1');
tc_reg.onclick = function(){
    var jsonData = {
	    ordinUserId:unid.value,
	    ordinUserPwd:upwd.value
	    
    }
    if(unid.value == ''){
        alert('请输入用户名')
        unid.value = '';
		upwd.value = '';
		upwd1.value = '';
    }
    if(upwd.value !== upwd1.value){
    	alert('密码不一致')

    }
    else{
    	var xhr = new XMLHttpRequest();
	    xhr.open('POST','/addUser');
	    xhr.setRequestHeader('Content-Type','application/json');
	    xhr.send(JSON.stringify(jsonData));
	    xhr.onreadystatechange = function(){
	    	if(xhr.readyState === 4 && xhr.status === 200){
		    	var message = JSON.parse(xhr.responseText);
		    	console.log(upwd.value,upwd1.value)
		    	if(upwd.value = upwd1.value){
		    		console.log(message.code)
		    		if(message.code ==100){
		    	    alert("注册成功");
		    	        unid.value = '';
		    	        upwd.value = '';
		    	        upwd1.value = '';
						zezhao1.style.display = tanchu1.style.display = "block";
						zezhao.style.display = tanchu.style.display = "none";
	    	        }
	    	        if(message.code ==102){
	    	    	    alert('用户名重复，请重新注册')
	    	        }
	    	 
		    	}
		    	  
	    	}

	    }

    }
    
}

//用户登录
var auId = document.getElementById('userId');
var auPwd = document.getElementById('userPwd');
var btn = document.getElementById('btn');
btn.onclick = function(){
    var jsonData = {
        ordinUserId:auId.value,
        ordinUserPwd:auPwd.value
    }
    if(auId.value==''){
    	alert('请输入用户名')

    }
    var xhr = new XMLHttpRequest();
    xhr.open('POST','/loginUser');
    xhr.setRequestHeader('Content-Type','application/json');
    xhr.send(JSON.stringify(jsonData));
    xhr.onreadystatechange = function(){
        if(xhr.readyState ===4 && xhr.status ===200){
            var message = JSON.parse(xhr.responseText);
            if(message.code ===100){
                alert("登录成功");
                localStorage.lastname = auId.value;
                username.innerHTML = localStorage.lastname
                /*window.location ='../index.html'*/
                useron.style.display = 'block';
				ulogin.style.display = 'none';
				zezhao1.style.display = tanchu1.style.display = "none";
            }
            else if(message.code == 102){
                alert('密码错误')
            }
            else{
                alert('账号不存在')
            }

        }
    }
}
//登录过后显示登录信息
var ulogin = document.getElementById('ulogin');
var useron = document.getElementById('useron');
var cancel = document.getElementById('cancel');
var username = document.getElementById('username')
useron.style.display = 'none';

cancel.onclick = function(){
	window.location.reload()
}

