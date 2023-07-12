const dropZone = document.getElementById('dropZone');
const fileInput = document.getElementById('fileInput');

let files_to_upload = [];
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

function displayFileNames(files) {
    var list = document.getElementById('dynamicList');

    singleFile = false 
    // singleFile = true // for single file uncomment

    if(singleFile)
    Array.from(list.children).forEach((name) =>{list.removeChild(name)})
    Array.from(fileInput.files).forEach((file, index) => {
        var listItem = document.createElement('li');
        listItem.className = "list-group-item";
        listItem.id = 'file_${index}';
        listItem.textContent = file.name;
        var deleteButton = document.createElement('span');
        deleteButton.innerHTML = '<i class="bi bi-x-square  float-end" style="cursor: pointer;"></i>';
        deleteButton.addEventListener('click', function(e) {
            list.removeChild(listItem);
        });
        listItem.appendChild(deleteButton);
        // Add the new list item to the list
        list.appendChild(listItem);
    });
    

    // for single file uncomment
    // Array.from(files).forEach((file, index) => {
    //     var listItem = document.createElement('li');
    //     listItem.className = "list-group-item";
    //     listItem.id = 'file_${index}';
    //     listItem.textContent = file.name;
    //     var deleteButton = document.createElement('span');
    //     deleteButton.innerHTML = '<i class="bi bi-x-square  float-end" style="cursor: pointer;"></i>';
    //     deleteButton.addEventListener('click', function(e) {
    //         list.removeChild(listItem);
    //     });
    //     listItem.appendChild(deleteButton);
    //     // Add the new list item to the list
    //     list.appendChild(listItem);
    // });
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