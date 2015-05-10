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
        $("#btnEntra").on("click", app.nextPage);
        $("#btnFoto").on("click", app.capturePhoto);
        $("#btnDownload").on("click", downloadFile);
        var draggable = document.getElementById('draggable');
        draggable.addEventListener('touchmove', function(event){
            var touch = event.targetTouches[0];
            draggable.style.left = touch.pageX - 25 + 'px';
            draggable.style.top= touch.pageY - 25 + 'px';
            
            event.preventDefault();            
        }, false);
    },
    nextPage: function(){
        app.showAlert("Altra pagina","msg");
        $("#btnFoto").show();
        $("#btnDownload").show();
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
        alert("file orig: " + imageData);
        movePic(imageData);
    },
    onFail: function(msg){
        app.showAlert("failed : " + error.code,"msg");
    }
};


function movePic(file){ 
    window.resolveLocalFileSystemURI(file, resolveOnSuccess, resOnError); 
} 

//Callback function when the file system uri has been resolved
function resolveOnSuccess(entry){ 
    var d = new Date();
    var n = d.getTime();
    //new file name
    var newFileName = n + ".jpg";
    var myFolderApp = "gigio";

    window.requestFileSystem(LocalFileSystem.PERSISTENT, 0,     // accede al file system
        function(fileSys) {                                     // ok accede
            alert("sono dentro");
            //The folder is created if doesn't exist
            fileSys.root.getDirectory( myFolderApp,
                {create:true, exclusive: false},
                function(directory) {                           // cartella creata
                    alert("directory creata, file " + newFileName);
                    var uri = encodeURI("http://www.troni.it/img/vsm/cellula.png");
                    alert("uri: " + uri);
                    alert(directory.toURL());
                    alert(directory.fullPath);
                    var dest = directory.toURL() + "pollo.png";
                    var ft = new FileTransfer();
                    // entry.moveTo(directory, newFileName,  successMove, resOnError);     // muove il file
                    $("#btnDownload").hide();
                    alert("Pronto al download");
                    ft.download(
                        uri,
                        dest,
                        function(theFile) {
                            $("#btnDownload").show();
                            alert("download complete: " + theFile.toURI());
                        },
                        function(error) {
                            $("#btnDownload").show();
                            alert("upload error code: " + error.code + "download error source " + error.source + "download error target " + error.target);
                        }
                    );
                },
                resOnError
            );
        },
        resOnError                                              // accesso al file system non riuscito
    );
}

//Callback function when the file has been moved successfully - inserting the complete path
function successMove(entry) {
    //Store imagepath in session for future use
    // like to store it in database
    alert("file dest: " + entry.fullPath);
    sessionStorage.setItem('imagepath', entry.fullPath);
}

function resOnError(error) {
    alert(error.code);
}

function downloadFile(){
    $("#btnDownload").hide();
    var myFolderApp = "gigio";
    window.requestFileSystem(LocalFileSystem.PERSISTENT, 0,     // accede al file system
        function(fileSys) {                                     // ok accede
            alert("sono dentro");
            //The folder is created if doesn't exist
            fileSys.root.getDirectory( myFolderApp,
                {create:true, exclusive: false},
                function(directory) {                           // cartella creata
                    alert("directory creata, file " + newFileName);
                    var uri = encodeURI("http://www.troni.it/img/vsm/cellula.png");
                    alert("uri: " + uri);
                    var ft = new FileTransfer();
                    $("#btnDownload").hide();
                    ft.download(
                        uri,
                        directory,
                        function(theFile) {
                            $("#btnDownload").show();
                            alert("download complete: " + theFile.toURI());
                        },
                        function(error) {
                            $("#btnDownload").show();
                            alert("upload error code: " + error.code);
                        }
                    );
                },
                resOnError
            );
        },
        resOnError                                              // accesso al file system non riuscito
    );
}


app.initialize();