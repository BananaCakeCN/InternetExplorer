var range = 0;
var album = photos;
albumName = 'photos';
albumNameZh = '"摄影"';
function switchAlbum(name){
    switch(name) {
        case 'photos':
            album = photos;
            albumNameZh = '"摄影"'
            break;
        case 'screenshots':
            album = screenshots;
            albumNameZh = '"截图"';
            break;
        case 'drawings':
            album = drawings;
            albumNameZh = '"图片制作"';
            break;
    }
    document.getElementsByClassName('main-content-title')[0].innerText = albumNameZh;
    albumName = name;
    range = 0;
    loadList(range, album);
}
function lastPage(){
    range -= 25;
    loadList(range, album);
}
function nextPage(){
    range += 25;
    loadList(range, album);
}
function loadList(startIndex, album){
    document.getElementsByTagName('tbody')[0].innerHTML = '<tr id="top"><th class="table-header-leftmost">&nbsp;</th><th class="table-header"><span>Time</span></th><th class="table-header"><span>Classification</span></th><th class="table-header"><span>View</span></th></tr>';
    if(startIndex + 25 > Object.keys(album).length){
        document.getElementById('lengthInfo').innerText = (startIndex + 1) + ' - ' + Object.keys(album).length + ' of ' + Object.keys(album).length + ' (page ' + (startIndex / 25 + 1) + ' of ' + Math.ceil(Object.keys(album).length / 25) + ')';
    }else{
        document.getElementById('lengthInfo').innerText = (startIndex + 1) + ' - ' + (startIndex + 25) + ' of ' + Object.keys(album).length + ' (page ' + (startIndex / 25 + 1) + ' of ' + Math.ceil(Object.keys(album).length / 25) + ')';
    }
    if(startIndex / 25 == 0){
        document.getElementById('previous').innerHTML = '<img src="button_PreviousArrow_disabled.gif"><span>Previous</span>';
    }else{
        document.getElementById('previous').innerHTML = '<img src="button_PreviousArrow.gif"><a href="javascript:lastPage();"><span>Previous</span></a>';
    }
    if(startIndex / 25 == Math.ceil(Object.keys(album).length / 25) - 1){
        document.getElementById('next').innerHTML = '<span>Next</span><img src="button_NextArrow_disabled.gif">';
    }else{
        document.getElementById('next').innerHTML = '<a href="javascript:nextPage();"><span>Next</span></a><img src="button_NextArrow.gif">';
    }
    for(var i = startIndex; i < startIndex+25 && i < Object.keys(album).length; i++){
        let block = document.createElement('tr');
        block.innerHTML = '<tr><td class="table-result"></td><td class="table-result">'+album[Object.keys(album).length-i][1]+'</td><td class="table-result">' + albumNameZh + '</td><td class="table-result"><input value="查看" type="button" index="' + (Object.keys(album).length-i) + '"></td></tr>';
        document.getElementsByTagName('tbody')[0].appendChild(block);
        document.getElementsByTagName('input')[document.getElementsByTagName('input').length-1].addEventListener("click", function(){
            var cacheIndex = this.getAttribute('index');
            var image = document.createElement('img');
            image.src = "http://assets" + (albumName == 'photos' && parseInt(this.getAttribute('index')) > 111 ? '2' : '') + ".bananacake.top/" + albumName + "/" + cacheIndex + ".png";
            image.onload = function(){
                window.open("imageViewer.html?index=" + cacheIndex + "&category=" + albumName, "_blank", "width=" + ((image.width/image.height)*500) + "; height=500; left=" + (window.screen.width/2 - ((image.width/image.height)*500)/2) + "; top="+(window.screen.height/2 - 250)+";");
            }
        });
    }
}
loadList(range, album);
