const dropZone = document.getElementById('dropZone');
const fileInput = document.getElementById('fileInput');

// Prevent default drag behaviors
['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
  dropZone.addEventListener(eventName, preventDefaults, false);
});


// Highlight the drop zone when dragging over it
['dragenter', 'dragover'].forEach(eventName => {
  dropZone.addEventListener(eventName, highlight, false);
});

['dragleave', 'drop'].forEach(eventName => {
  dropZone.addEventListener(eventName, unhighlight, false);
});

// Handle click and drop files
dropZone.addEventListener('drop', handleDrop, false);
dropZone.addEventListener('click', handleClick, false);
fileInput.addEventListener('change', handleFileSelection, false);

//helper funtions
function preventDefaults(event) {
  event.preventDefault();
  event.stopPropagation();
}

function highlight() {
  dropZone.classList.add('highlight');
}

function unhighlight() {
  dropZone.classList.remove('highlight');
}

function displayFileNames(files){
    dropZone.innerHTML = '';
    Array.from(files).forEach(file => {
        dropZone.innerHTML += file.name + '<br>';
    });
}

function handleFileSelection(event) {
  const files = event.target.files;
  // Display the file names in the drop zone
  displayFileNames(files);

  // const files = fileInput.files;
  // // Display the file names in the drop zone
  
}

function handleClick() {
  fileInput.click();
}

function handleDrop(event) {
    const dt = event.dataTransfer;
    const files = dt.files;
  // Update the hidden input with the dropped files
    fileInput.files = files;

    displayFileNames(files);

}

// $(document).ready(function () {
//     $('#fileUpload').on('change', function () {
//         var files = this.files;
//         var fileIndex = 0;

//         function uploadNext() {
//             var file = files[fileIndex];
//             if (file) {
//                 var formData = new FormData();
//                 formData.append('file', file);

//                 $.ajax({
//                     url: '/upload',
//                     type: 'POST',
//                     data: formData,
//                     processData: false,
//                     contentType: false,
//                     xhr: function () {
//                         var xhr = new window.XMLHttpRequest();
//                         xhr.upload.addEventListener('progress', function (evt) {
//                             if (evt.lengthComputable) {
//                                 var percentComplete = evt.loaded / evt.total;
//                                 percentComplete = parseInt(percentComplete * 100);
//                                 $('#progressBar').css('width', percentComplete + '%').attr('aria-valuenow', percentComplete);
//                             }
//                         }, false);
//                         return xhr;
//                     },
//                     success: function (data) {
//                         $('#output').append('<pre>' + JSON.stringify(data, null, 2) + '</pre>');
//                         fileIndex++;
//                         uploadNext();
//                     }
//                 });
//             }
//         }

//         uploadNext();
//     });
// });

