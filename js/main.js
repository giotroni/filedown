var destinationType; // sets the format of returned value

var app = {
    
    showAlert: function (message, title) {
        if (navigator.notification) {
            navigator.notification.alert(message, null, title, 'OK');
        } else {
            alert(title ? (title + ": " + message) : message);
        }
    },
    initialize: function() {
        this.bindEvents();
    },
    bindEvents: function(){
        document.addEventListener("deviceready", app.onDeviceReady, false);
    },
    onDeviceReady: function(){
        app.showAlert("Chiamata alla fine del caricamento","msg");
        destinationType=navigator.camera.DestinationType;
        $("#btnFoto").hide();
        $("#btnEntra").on("click", app.nextPage);
        $("#btnFoto").on("click", app.capturePhoto);
    },
    nextPage: function(){
        app.showAlert("Altra pagina","msg");
        $("#btnFoto").show();
    },
    capturePhoto: function() {
        app.showAlert("Fotografa","msg");
        $("#btnFoto").hide();
        navigator.camera.getPicture(app.onPhotoFileSuccess, app.onFail, { quality: 50, destinationType: Camera.DestinationType.FILE_URI });
    },
    onPhotoFileSuccess: function(imageData) {
        // Get image handle
        var smallImage = document.getElementById('smallImage');    
        // Show the captured photo The inline CSS rules are used to resize the image
        smallImage.src = imageData;
        // our file to download
        var url = "http://www.phonegaptutorial.com/wp-content/uploads/examples/phonegap-logo.png";
         
        // we need to access LocalFileSystem
        window.requestFileSystem(window.LocalFileSystem.PERSISTENT, 0, function(fs)
        {
            // create the download directory is doesn't exist
            fs.root.getDirectory('downl', { create: true });
         
            // we will save file in .. downloads/phonegap-logo.png
            var filePath = fs.root.fullPath + '/downl/' + url.split('/').pop();
            alert(folePath);
            var fileTransfer = new window.FileTransfer();
            var uri = encodeURI(decodeURIComponent(url));
         
            fileTransfer.download(uri, filePath, function(entry)
            {
                alert("Successfully downloaded file, full path is " + entry.fullPath);
            },
            function(error)
            {
                alert("Some error " + error.code + " for " + url);
            }, 
            false);
        });
    },
    onFail: function(msg){
        app.showAlert("failed : " + error.code,"msg");
    }
};



app.initialize();