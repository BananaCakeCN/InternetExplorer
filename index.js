for(var i = 0; i < document.getElementsByTagName('input').length; i++){
    document.getElementsByTagName('input')[i].addEventListener("click", function(){
        console.log(i);
        var image = document.createElement('img');
        image.src = "https://bananacake.top/photos/1.png";
        image.onload = function(){
            window.open("imageViewer.html?index=" + i + "&category=" + "photos", "_blank", "width=" + ((image.width/image.height)*500) + "; height=500; left=" + (window.screen.width/2 - ((image.width/image.height)*500)/2) + "; top="+(window.screen.height/2 - 250)+";");
        }
    });
}