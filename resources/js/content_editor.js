$(document).ready(function () {
    let contentEditor = $('.contentEditor');
    let allTabs = contentEditor.children('.tabTypeContent').children('button');
    let allEditorTypes = contentEditor.children('.editor');
    let btnAddContent = contentEditor.children('.actionContentEditor').children('.btnAddContent');

    let quillObj = quillEditor.render();

    allTabs.click(function(ele) {
        let thisElement = $(this);
        let dataType = thisElement.attr('data-type');
        ele.preventDefault();
        allTabs.removeClass('selected');
        thisElement.addClass('selected');
        allEditorTypes.children('div').attr('hidden', 'hidden');
        if(dataType == 'text'){
            allEditorTypes.children('.textEditor').removeAttr('hidden');
            quillObj = quillEditor.render();

        }else if(dataType == 'code'){
            allEditorTypes.children('.codeEditor').removeAttr('hidden');
            let toolbarOptions = [
                ['bold', 'italic', 'underline', 'strike', 'blockquote'],
                [{ 'list': 'ordered'}, { 'list': 'bullet' }],
                [{ 'script': 'sub'}, { 'script': 'super' }],
                [{ 'indent': '-1'}, { 'indent': '+1' }],
                [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
                [{ 'color': [] }, { 'background': [] }],
                [{ 'align': [] }],
                ['clean']
            ];

            quill222 = new Quill('.contentEditor .codeEditor', {
                modules: {
                    toolbar: toolbarOptions
                },
                theme: 'snow'
            });
        }else if(dataType == 'image'){
            allEditorTypes.children('.imageSelector').removeAttr('hidden');
        }
    });

    btnAddContent.click(function (e) {
        e.preventDefault();
        let quillContent = quillObj.getContents();
        $.ajaxSetup({
            headers: {
                'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
            }
        });

        $.ajax({
            method: 'POST',
            url: '/description/save',
            data: JSON.stringify(quillContent),
            success: function(data) {
                console.log('success');
                let ops = data['{"ops":'];
                let opsContent = Object.keys(ops)[0];
                let arrayOps = opsContent.split(/,(?=\{)/);
                let arrayOpsJson = [];
                $.each(arrayOps, function(index, value){
                    arrayOpsJson.push(JSON.parse(value));
                });
                quill222.setContents(arrayOpsJson);
            },
            error: function(xhr) {
                console.log('error');
                console.log(xhr);
            }
        });
    });
});

/**
 *  Quill Text Editor
 */
let quillEditor = new function quillTextEditor () {
    function QuillTextEditor () {}

    QuillTextEditor.prototype.render = function () {
        let toolbarOptions = [
            ['bold', 'italic', 'underline', 'strike', 'blockquote'],
            [{ 'list': 'ordered'}, { 'list': 'bullet' }],
            [{ 'script': 'sub'}, { 'script': 'super' }],
            [{ 'indent': '-1'}, { 'indent': '+1' }],
            [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
            [{ 'color': [] }, { 'background': [] }],
            [{ 'align': [] }],
            ['clean']
        ];

        let quill = new Quill('.contentEditor .textEditor', {
            modules: {
                toolbar: toolbarOptions
            },
            theme: 'snow'
        });

        return quill;
    };

    return new QuillTextEditor();
}