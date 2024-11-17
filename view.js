function searchParamsForIE(name){
    var results = new RegExp('[\?&]' + name + '=([^&#]*)').exec(window.location.href);
    if (results == null){
        return null;
    }
    else {
        return decodeURI(results[1]) || 0;
    }
}
document.getElementById("container").innerHTML = '<img style="height: 100%; position: fixed; top: 0; left: 0;" src="http://assets' + (searchParamsForIE('category') == 'photos' && parseInt(searchParamsForIE('index')) > 111 ? '2' : '') + '.bananacake.top/'+searchParamsForIE('category')+'/'+searchParamsForIE('index')+'.png">';
