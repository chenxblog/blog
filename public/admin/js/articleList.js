var fenyeList = document.getElementById('fenyeList');
var contentList = document.getElementById('contentList');
var nowYe = 1;

//第一个函数 做分页内容查询 num 传值为页码 8 就显示8的部分

function pageContent(num){ 
    var xhr = new XMLHttpRequest();
    xhr.open('POST','/pagingQuery');
    xhr.setRequestHeader('Content-Type','application/json');
    xhr.send(JSON.stringify({currentPage:num}));
    xhr.onreadystatechange =function(){
        if(xhr.status == 200 &&xhr.readyState == 4){
            var pageStr = JSON.parse(xhr.responseText).msg;
            var arList = '';
            arList = "<tr>"+
                 "<td style='width: 120px;'>作者</td>"+
                 "<td style='width: 426px;'>标题</td>"+
                 "<td style='width: 218px;'>发布时间</td>"+
                 "<td style='width: 170px;'>操作</td>"+
               "</tr>"
            for(var i = 0; i < pageStr.length; i++ ){
                arList += " <tr>"+
                        "<td>"+pageStr[i].addArticleAuthor+"</td>"+
                        "<td>"+pageStr[i].addArticleTitle+"</td>"+
                        "<td>"+pageStr[i].addArticleTime.split('T')[0]+"</td>"+
                        "<td><a href='javascript:;' style='color: #fc0202;' mid='"+pageStr[i]._id+"'>删除</a></td>"+
                    "</tr>"
                    
                  
             }
             contentList.innerHTML = arList;

        }
    }
}

pageContent(nowYe);

//第二个函数 是 数量函数 文章数量 

var shu;
function numPage(){
    var xhr1 = new XMLHttpRequest();
    xhr1.open('POST','/getArticleCount');
    xhr1.setRequestHeader('Content-Type','application/json');
    xhr1.send(null);
    xhr1.onreadystatechange =function(){
        if(xhr1.status == 200 &&xhr1.readyState == 4){
            var pn = JSON.parse(xhr1.responseText);
            var pn_str = '';
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
        pageContent(target.innerHTML)
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
//删除文章
function delArticle(id){
    var xhr = new XMLHttpRequest();
    xhr.open('POST','/deleteArticle');
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
        delArticle(target.getAttribute('mid'))

    }
}

