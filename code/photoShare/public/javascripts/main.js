$(function() {
var socket = io.connect();
socket.on('image', function(data) {
  $('#images').append('<li><img class="thumb" src="' + data.url + '" title="' + data.title + '"></li>');
});

function handleFileSelect(evt) {
  var files = evt.target.files; // FileList object

  // Loop through the FileList and render image files as thumbnails.
  for (var i = 0, f; f = files[i]; i++) {

    // Only process image files.
    if (!f.type.match('image.*')) {
      continue;
    }

    var reader = new FileReader();

    // Closure to capture the file information.
    reader.onload = (function(theFile) {
      return function(e) {
        socket.emit('new', { url: e.target.result, title: theFile.name });
      };
    })(f);

    // Read in the image file as a data URL.
    reader.readAsDataURL(f);
  }
}

$('#photos').change(handleFileSelect);


});
