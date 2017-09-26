var fenyeList = document.getElementById('fenyeList');
var contentList = document.getElementById('contentList');
var nowYe = 1;

//第一个函数 做分页内容查询 num 传值为页码 8 就显示8的部分

function pageContent(num){ 
    var xhr = new XMLHttpRequest();
    xhr.open('POST','/pagingUser');
    xhr.setRequestHeader('Content-Type','application/json');
    xhr.send(JSON.stringify({currentPage:num}));
    xhr.onreadystatechange =function(){
        if(xhr.status == 200 &&xhr.readyState == 4){
            var pageStr = JSON.parse(xhr.responseText).msg;
            var userList = '';
            userList = "<tr>"+
                 "<td style='width: 246px;'>ID</td>"+
                 "<td style='width: 300px;'>用户名</td>"+
                 "<td style='width: 218px;'>密码</td>"+
                 "<td style='width: 170px;'>操作</td>"+
               "</tr>"
            for(var i = 0; i < pageStr.length; i++ ){
                userList += " <tr>"+
                        "<td>"+pageStr[i]._id+"</td>"+
                        "<td>"+pageStr[i].ordinUserId+"</td>"+
                        "<td>"+pageStr[i].ordinUserPwd+"</td>"+
                        "<td><a href='javascript:;' style='color: #fc0202;' mid='"+pageStr[i]._id+"'>删除</a></td>"+
                    "</tr>"
                    
                  
             }
             contentList.innerHTML = userList;

        }
    }
}

pageContent(nowYe);

//第二个函数 是 数量函数 用户数量 

var shu;
var pn_str = '';
function numPage(){
    var xhr1 = new XMLHttpRequest();
    xhr1.open('POST','/getUserCount');
    xhr1.setRequestHeader('Content-Type','application/json');
    xhr1.send(null);
    xhr1.onreadystatechange =function(){
        if(xhr1.status == 200 &&xhr1.readyState == 4){
            var pn = JSON.parse(xhr1.responseText);
            shu = Math.ceil(pn.msg/8)
            if(shu > 1){
               fenyeList.style.display = 'inline-block'; 

            }
            else{
               fenyeList.style.display = 'none';  
            }
            for(var i = 0;i < Math.ceil(pn.msg/8);i++){
                pn_str += "<li>"+(i+1)+"</li>";

            }
            fenyeList.innerHTML = "<li tl='to'> << </li>"+pn_str+"<li tl='wo'> >> </li>";
        }
    }
}

numPage()
fenyeList.onclick =function(e){
    var target = e.target;
    if(target.nodeName == 'LI'){
        pageContent(target.innerHTML);
        
        //上一页
        if(target.getAttribute('tl') == 'to'){
        //判断当前页码是第一页
            if(nowYe == 1 ){

            }
            else{
                nowYe--
                pageContent(nowYe)
                

            }
            

        }
        //下一页
        if(target.getAttribute('tl') == 'wo'){
            //判断当前页码是最大页码
            if(nowYe == shu){
               pageContent(shu)
            }
            else{
                nowYe++
                pageContent(nowYe)
            }

        }

    }
}
//删除用户
function delUser(id){
    var xhr = new XMLHttpRequest();
    xhr.open('POST','/deleteUser');
    xhr.setRequestHeader('Content-Type','application/json');
    xhr.send(JSON.stringify({id:id}));
    xhr.onreadystatechange =function(){
        if(xhr.status == 200 && xhr.readyState == 4){
            var message = JSON.parse(xhr.responseText)
            console.log(message)
            if(message.code == 100){
                alert('删除成功')
                pageContent(1)
            }
        }
    }
}
contentList.onclick = function(e){
    var target = e.target;
    if(target.nodeName == 'A'){
        delUser(target.getAttribute('mid'))

    }
}

