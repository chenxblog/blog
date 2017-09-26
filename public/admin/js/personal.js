var grg_header = document.getElementById('grg_header');
var grg_uid = document.getElementById('grg_uid');
var grg_uname = document.getElementById('grg_uname');
var grg_usex = document.getElementById('grg_usex');
var grg_uage = document.getElementById('grg_uage');
var grg_btn = document.getElementById('grg_btn');
var file = document.getElementById('file');
var popup = document.getElementById('popup');
var zzc = document.getElementById('zzc');
var tpqy = document.getElementById('tpqy');
var xxx = document.getElementById('xxx');
var img = document.getElementById('img')
//关闭弹出层
xxx.onclick =function(){
	popup.style.display = 'none';
}
//点击默认头像 弹开图片上传框
grg_header.onclick = function(){
	popup.style.display = 'block';
}

//修改个人信息
grg_uid.value = cx_id,
grg_uname.value = cx_name,
grg_uage.value = cx_age,
grg_usex.value = cx_sex
/*grg_header.src = '../'+cx_img*/
  


//如果文件上传等于一个字符串 启用模拟点击事件
var strImg = ''
zzc.onclick = function(){
    if(file.value == ''){
    	file.click();
    }
    //图片上传
    file.onchange = function(){
	    console.log(file.value)
	    console.log(file.files[0])
        if(file.files[0].type =='image/jpeg' || file.files[0].type == 'image/png'){
		        var tp = new FormData;
		        tp.append('myfile',file.files[0]);
		        var xhr1 = new XMLHttpRequest();
		        xhr1.open('POST','/tpmdata');
		        xhr1.send(tp);
                xhr1.onreadystatechange = function(){
			        if(xhr1.readyState ===4 && xhr1.status ===200){
			            alert('上传成功')
			            var message = JSON.parse(xhr1.responseText);
			            var strIMG = message.src.substring(message.src.lastIndexOf('\\')+1)
			            img.src = '../../images/temp/'+ strIMG;
			            strImg = message.src;
			        }
			    }
			
        }

    }
}
//鼠标拖动效果
var disx =0;
var disy = 0;
var falg = 0;
document.body.onmousedown = function(e){
	disx = e.clientX - img.offsetLeft;
	disy = e.clientY - img.offsetTop;
	falg = 1;
	var gao = img.offsetHeight - tpqy.offsetHeight;
    var kuan = img.offsetWidth - tpqy.offsetWidth;
		document.body.onmousemove = function(e){
		    if (falg == 1) {
		 	    if(e.clientX - disx <=0 && e.clientY - disy<= 0 && e.clientX - disx >= -kuan 
		 		&& e.clientY - disy >= -gao ){
		 				img.style.left = e.clientX - disx + "px";
				      img.style.top = e.clientY - disy + "px";
                }
		 	}
		 			
		}
			    
}
			
document.body.onmouseup = function(){
	falg = 0;
		
}

//图片裁剪效果
var btn = document.getElementById('btn');
    btn.onclick = function(){
    	var parseLeft = parseInt(img.style.left);
    	var parseTop = parseInt(img.style.top);
    	parseLeft = parseLeft < 0?-parseLeft:null;
    	parseTop = parseTop < 0?-parseTop:null;
    	var str = {//获取图片裁剪的位置
    	 	src:strImg,
    	 	clX:parseLeft+75,
    	 	clY:parseTop+75
    	}
    	var xhr2 = new XMLHttpRequest();
		xhr2.open('POST','/caijian');
		xhr2.setRequestHeader('Content-Type','application/json');
		xhr2.send(JSON.stringify(str));
        xhr2.onreadystatechange = function(){
			if(xhr2.readyState ===4 && xhr2.status ===200){
				var message = JSON.parse(xhr2.responseText);
				if(message.code == 100){
					var see = message.src.substring(message.src.lastIndexOf('\\')+1);
					alert('裁剪成功');
					popup.style.display = 'none';
					var xhr3 = new XMLHttpRequest();
					xhr3.open('GET','../images/temp/'+see);
					xhr3.send(null);
					xhr3.onreadystatechange = function(){
						if(xhr3.readyState ===4 && xhr3.status ===200){
							grg_header.src = '../images/temp/' + see;
						}
					}
				}
			}
		}
    }



