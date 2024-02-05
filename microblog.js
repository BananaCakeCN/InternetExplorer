if (!window.document.documentMode) {
    window.location = 'https://microblog.bananacake.top/'
}
var range = 0;
function lastPage(){
    range -= 25;
    loadList(range);
}
function nextPage(){
    range += 25;
    loadList(range);
}
var result
function loadList(startIndex){
    if (window.XMLHttpRequest) {
        var request = new XMLHttpRequest();
    }else{
        var request = new ActiveXObject("Microsoft.XMLHTTP");
    }
    request.onreadystatechange = function(){
        if(request.readyState == 4){
            result = request.responseText
            console.log(atob(JSON.parse(request.responseText)['content'].replace(/[\r\n]/g, '')))
            var xml = new DOMParser().parseFromString(decodeURIComponent(escape(atob(JSON.parse(request.responseText)['content'].replace(/[\r\n]/g, '')))), "text/xml")
            document.getElementsByTagName('tbody')[0].innerHTML = '<tr id="top"><th class="table-header-leftmost">&nbsp;</th><th class="table-header"><span>Title</span></th><th class="table-header"><span>Time</span></th><th class="table-header"><span>View</span></th></tr>';
            document.getElementById('lengthInfo').innerText = (startIndex + 1) + ' - ' + (startIndex + 25) + ' of ' + xml.getElementsByTagName('url').length + ' (page ' + (startIndex / 25 + 1) + ' of ' + Math.ceil(xml.getElementsByTagName('url').length / 25) + ')';
            if(startIndex / 25 == 0){
                document.getElementById('previous').innerHTML = '<img src="button_PreviousArrow_disabled.gif"><span>Previous</span>';
            }else{
                document.getElementById('previous').innerHTML = '<img src="button_PreviousArrow.gif"><a href="javascript:lastPage();"><span>Previous</span></a>';
            }
            if(startIndex / 25 == Math.ceil(xml.getElementsByTagName('url').length / 25) - 1){
                document.getElementById('next').innerHTML = '<span>Next</span><img src="button_NextArrow_disabled.gif">';
            }else{
                document.getElementById('next').innerHTML = '<a href="javascript:nextPage();"><span>Next</span></a><img src="button_NextArrow.gif">';
            }
            for(var i = startIndex; i < startIndex + 25 && i < xml.getElementsByTagName('url').length; i++){
                let block = document.createElement('tr');
                block.innerHTML = '<tr><td class="table-result"></td><td class="table-result">' + xml.getElementsByTagName('url')[xml.getElementsByTagName('url').length - i - 1].childNodes[5].data + '</td><td class="table-result">' + xml.getElementsByTagName('lastmod')[xml.getElementsByTagName('url').length - i - 1].innerHTML + '</td><td class="table-result"><input value="查看" type="button" index="' + (xml.getElementsByTagName('url').length - i) + '"></td></tr>';
                document.getElementsByTagName('tbody')[0].appendChild(block);
                document.getElementsByTagName('input')[document.getElementsByTagName('input').length-1].addEventListener("click", function(){
                    window.open('https://microblog.bananacake.top/pages/' + this.getAttribute('index'), "_blank", "width=650; height=500; left=" + (window.screen.width/2 - 325) + "; top="+(window.screen.height/2 - 250)+";");
                });
            }
        }
    }
    request.open('GET', 'https://api.github.com/repos/BananaCakeCN/MicroBlog/contents/sitemap.xml');
    request.send();
    
}
loadList(range);
