function searchParamsForIE(name){
    var results = new RegExp('[\?&]' + name + '=([^&#]*)').exec(window.location.href);
    if (results == null){
       return null;
    }
    else {
       return decodeURI(results[1]) || 0;
    }
}
document.getElementById("container").innerHTML = '<img style="width: 100%; height: 100%; position: fixed; top: 0; left: 0;" src="https://bananacake.top/'+searchParamsForIE('category')+'/'+searchParamsForIE('index')+'.png">';