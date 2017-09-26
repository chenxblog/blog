var aA_title = document.getElementById('aA_title');
var aA_text = document.getElementById('aA_text');
var aA_btn = document.getElementById('aA_btn');
aA_btn.onclick = function(){
	var jsonData = {
        addArticleAuthor:cx_name,
		addArticleTitle:aA_title.value,
		addArticleContent:aA_text.value,
		addArticleTime:new Date()
		
	}
    console.log(jsonData)
	var xhr = new XMLHttpRequest();
	xhr.open('POST','/addArticle');
	xhr.setRequestHeader('Content-Type','application/json');
	xhr.send(JSON.stringify(jsonData));
    xhr.onreadystatechange = function(){
		if(xhr.readyState ===4 && xhr.status ===200){
			var message = JSON.parse(xhr.responseText);
			if(message.code == 100){
				alert('添加成功')
			}
		}
	}
}
