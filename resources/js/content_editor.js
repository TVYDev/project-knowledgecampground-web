$(document).ready(function () {
    let contentEditor = $('.contentEditor');
    let allTabs = contentEditor.children('.tabTypeContent').children('button');
    let allEditorTypes = contentEditor.children('.editor');

    renderQuillTextEditor();

    allTabs.click(function(ele) {
        let thisElement = $(this);
        let dataType = thisElement.attr('data-type');
        ele.preventDefault();
        allTabs.removeClass('selected');
        thisElement.addClass('selected');
        allEditorTypes.children('div').attr('hidden', 'hidden');
        if(dataType == 'text'){
            allEditorTypes.children('.textEditor').removeAttr('hidden');
            renderQuillTextEditor();
        }else if(dataType == 'code'){
            allEditorTypes.children('.codeEditor').removeAttr('hidden');
        }else if(dataType == 'image'){
            allEditorTypes.children('.imageSelector').removeAttr('hidden');
        }
    });
});

function renderQuillTextEditor () {
    let toolbarOptions = [
        ['bold', 'italic', 'underline', 'strike', 'blockquote'],
        [{ 'list': 'ordered'}, { 'list': 'bullet' }],
        [{ 'script': 'sub'}, { 'script': 'super' }],
        [{ 'indent': '-1'}, { 'indent': '+1' }],
        ['clean']
    ];

    new Quill('.contentEditor .textEditor', {
        modules: {
            toolbar: toolbarOptions
        },
        theme: 'snow'
    });
}