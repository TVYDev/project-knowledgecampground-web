import NotyAlertMessage from "../NotyAlertMessage";
import QuillEditor from "../QuillEditor";
import CodeMirrorEditor from "../CodeMirrorEditor";

const html = `
    <div class="TVYContentProduction">
        <div class="TVYContentEditor col-md-12">
            <div class="tabTypeContent">
               <button type="button" class="btnAddPlainText selected" data-type="text">Plain Text</button>
               <button type="button" class="btnAddCodingBlock" data-type="code">Coding Block</button>
               <button type="button" class="btnAddImage" data-type="image">Media File</button>
            </div>
            <div class="editor">
                <div id="TVYTextEditor">
                    <div class="actualTextEditor"></div>
                </div>
                <div id="TVYCodeEditor" hidden="hidden">
                    <div class="codeEditorTools ui fluid form">
                        <div class="two fields">
                            <div class="field">
                                <label for="codeEditorMode">Language</label>
                                <input type="hidden" data-selected-mode="" class="codeEditorModeSelected">
                                <select class="ui dropdown codeEditorMode">
                                    <option value="css" selected>CSS</option>
                                    <option value="go">Go</option>
                                    <option value="html">HTML</option>
                                    <option value="javascript">JavaScript</option>
                                    <option value="jsx">JSX</option>
                                    <option value="php">PHP</option>
                                    <option value="swift">Swift</option>
                                    <option value="python">Python</option>
                                    <option value="ruby">Ruby</option>
                                    <option value="sass">Sass</option>
                                    <option value="shell">Shell</option>
                                    <option value="sql">SQL</option>
                                    <option value="xml">XML</option>
                                </select>
                            </div>
                            <div class="field">
                                <label for="codeEditorTheme">Theme</label>
                                <input type="hidden" data-selected-theme="" class="codeEditorThemeSelected">
                                <select class="ui dropdown codeEditorTheme">
                                    <option value="dracula" selected>Dracula</option>
                                    <option value="material">Material</option>
                                    <option value="elegant">Elegant</option>
                                    <option value="eclipse">Eclipse</option>
                                    <option value="duotone-dark">Duotone dark</option>
                                    <option value="duotone-light">Duotone light</option>
                                </select>
                            </div>
                        </div>
                    </div>
                    <div class="actualCodeEditor"></div>
                </div>
                <div id="TVYImageEditor" hidden="hidden">
                    I am image selector
                </div>
            </div>
            <div class="actionContentEditor">
                <button type="button" class="btnAddContent" data-type="text">
                    <i class="far fa-check-circle"></i>
                </button>
            </div>
        </div>
    </div>
`;

const htmlDescTools = `
    <div class="descTools" draggable="true">
        <span class="toolButtonsBlock">
            <button type="button" class="toolArrowUp" action-type="move_up"><i class="fas fa-arrow-up"></i></button>
            <button type="button" class="toolArrowDown" action-type="move_down"><i class="fas fa-arrow-down"></i></button>
            <button type="button" class="toolEdit" action-type="edit"><i class="fas fa-pen"></i></button>
            <button type="button" class="toolDelete" action-type="delete"><i class="fas fa-trash-alt"></i></button>
        </span>
    </div>
    <div class="descContent"></div>
`;

class TVYContentEditor extends HTMLElement
{
    constructor()
    {
        super();
        this.innerHTML = html;

        this.allTabs = this.querySelectorAll('.tabTypeContent button');
        this.allEditors = this.querySelectorAll('.editor > div');
        this.textEditor = this.querySelector('.editor #TVYTextEditor');
        this.actualTextEditor = this.querySelector('#TVYTextEditor .actualTextEditor');

        this.codeEditor = this.querySelector('.editor #TVYCodeEditor');
        this.actualCodeEditor = this.querySelector('#TVYCodeEditor .actualCodeEditor');
        this.codeEditorMode = $('#TVYCodeEditor .codeEditorMode').dropdown({
            forceSelection: false,
            onChange: function(value) {
                $('#TVYCodeEditor .codeEditorModeSelected').attr('data-selected-mode', value);
            }
        });
        this.codeEditorThemeSelect = $('#TVYCodeEditor .codeEditorTheme').dropdown({
            forceSelection: false,
            onChange: function(value) {
                $('#TVYCodeEditor .codeEditorThemeSelected').attr('data-selected-theme', value);
            }
        });
        this.jsObjCodeEditorModeSelect = this.querySelector('#TVYCodeEditor .codeEditorMode');
        this.jsObjCodeEditorThemeSelect = this.querySelector('#TVYCodeEditor .codeEditorTheme');

        this.imageEditor = this.querySelector('.editor #TVYImageEditor');
        this.btnAddContent = this.querySelector('.actionContentEditor .btnAddContent');
        this.contentOrder = document.querySelector('.askQuestionContent .questionPreview .TVYContentOrder');

        this.allDescData = [];
        this.descPosition = 0;

        this.groupDescId = Math.random().toString(36).replace('0.', '');

        this.tabEditorMovement();

        this.quillTextObj = new QuillEditor(this.actualTextEditor).getQuill();

        this.codeMirrorObj = new CodeMirrorEditor(this.actualCodeEditor,
            CodeMirrorEditor.THEME_DRACULA, CodeMirrorEditor.MODE_JAVASCRIPT);

        this.btnAddContent.addEventListener('click', this.addContentListener.bind(this));

        let tvyContentOrder = document.querySelector('.questionPreview .TVYContentOrder');
        tvyContentOrder.addEventListener('click', (event) => {
            this.doContentOrderActions(event);
        });

        this.jsObjCodeEditorModeSelect.addEventListener('change', this.changeModeOfCodeMirrorEditor.bind(this));
        this.jsObjCodeEditorThemeSelect.addEventListener('change', this.changeThemeOfCodeMirrorEditor.bind(this));
    }

    static get TEXT_TYPE()   {return 'text';}
    static get CODE_TYPE()   {return 'code';}
    static get IMAGE_TYPE()  {return 'image';}

    static get ACTION_TYPE_MOVE_UP()    {return 'move_up';}
    static get ACTION_TYPE_MOVE_DOWN()  {return 'move_down';}
    static get ACTION_TYPE_EDIT()       {return 'edit';}
    static get ACTION_TYPE_DELETE()     {return 'delete';}

    changeThemeOfCodeMirrorEditor () {
        let selectedTheme = this.querySelector('#TVYCodeEditor .codeEditorThemeSelected');
        let codeMirrorObj = this.codeMirrorObj;
        setTimeout(function() {
            let theme = selectedTheme.getAttribute('data-selected-theme');
            codeMirrorObj.setTheme(theme);
        },100);
    }

    changeModeOfCodeMirrorEditor () {
        let selectedMode = this.querySelector('#TVYCodeEditor .codeEditorModeSelected');
        let codeMirrorObj = this.codeMirrorObj;
        setTimeout(function() {
            let mode = selectedMode.getAttribute('data-selected-mode');
            codeMirrorObj.setMode(mode);
        },100);
    }

    addContentListener () {
        let thisBtn = this.querySelector('.btnAddContent');
        let dataType = thisBtn.getAttribute('data-type');
        let randomDescId = Math.random().toString(36).replace('0.', '');

        switch(dataType)
        {
            case TVYContentEditor.TEXT_TYPE:
                if(this.quillTextObj.getLength() === 1)
                {
                    new NotyAlertMessage(NotyAlertMessage.WARNING, '⚠️You cannot add empty plain text.').show();
                    break;
                }

                let textEditor = this.querySelector('#TVYTextEditor');
                let dataEditing = textEditor.getAttribute('data-editing');
                if(dataEditing != null){
                    let editingDescEle = this.getDescElementByDescId(dataEditing);
                    let descTools = editingDescEle.querySelector('.descTools');
                    new QuillEditor(editingDescEle.querySelector('.descContent'), false, true, this.quillTextContent);

                    this.updateDataOfADesc(this.quillTextContent, TVYContentEditor.TEXT_TYPE, dataEditing);

                    descTools.classList.remove('editing');
                    descTools.classList.add('edited');
                    textEditor.removeAttribute('data-editing');
                }
                else
                {
                    let textDescContent = this.createDescriptionElementAndAttachEventOfDescTools(randomDescId, TVYContentEditor.TEXT_TYPE, textEditor);

                    new QuillEditor(textDescContent, false, true, this.quillTextContent);

                    this.storeDataContent(this.quillTextContent, TVYContentEditor.TEXT_TYPE, randomDescId);
                }
                this.quillTextObj.setContents(null);
                break;
            case TVYContentEditor.CODE_TYPE:
                if(this.codeMirrorContent == '')
                {
                    new NotyAlertMessage(NotyAlertMessage.WARNING, '⚠️You cannot add empty code block.').show();
                    break;
                }

                let codeEditor = this.querySelector('#TVYCodeEditor');
                let codeDataEditing = codeEditor.getAttribute('data-editing');
                if(codeDataEditing != null)
                {
                    let editingDescEle = this.getDescElementByDescId(codeDataEditing);
                    let descTools = editingDescEle.querySelector('.descTools');
                    let descContent = editingDescEle.querySelector('.descContent');
                    descContent.parentNode.removeChild(descContent);

                    let newDescContent = document.createElement('div');
                    newDescContent.className = 'descContent';
                    editingDescEle.appendChild(newDescContent);
                    new CodeMirrorEditor(newDescContent, CodeMirrorEditor.THEME_MATERIAL, CodeMirrorEditor.MODE_JAVASCRIPT,
                        true, this.codeMirrorContent, null);

                    this.updateDataOfADesc(this.codeMirrorContent, TVYContentEditor.CODE_TYPE, codeDataEditing);

                    descTools.classList.remove('editing');
                    descTools.classList.add('edited');
                    codeEditor.removeAttribute('data-editing');
                }
                else
                {
                    let codeDescContent = this.createDescriptionElementAndAttachEventOfDescTools(randomDescId, TVYContentEditor.CODE_TYPE, codeEditor);

                    new CodeMirrorEditor(codeDescContent, CodeMirrorEditor.THEME_MATERIAL, CodeMirrorEditor.MODE_JAVASCRIPT,
                        true, this.codeMirrorContent, null);

                    this.storeDataContent(this.codeMirrorContent, TVYContentEditor.CODE_TYPE, randomDescId);
                }
                this.codeMirrorObj.clearContent();
                break;
            case 'image':
                console.log('image111');
                break;
            default: break;
        }
    }

    get codeMirrorContent() {
        return this.codeMirrorObj.getContent();
    }

    get quillTextContent() {
        return this.quillTextObj.getContents();
    }

    get quillTextObject() {
        return this.quillTextObj;
    }

    storeDataContent(dataContent, type, descId) {
        let position = ++(this.descPosition);
        switch(type) {
            case TVYContentEditor.TEXT_TYPE:
                this.allDescData.push({pos: position, type: TVYContentEditor.TEXT_TYPE, data: dataContent, desc_id: descId, group_desc_id: this.groupDescId});
                break;
            case TVYContentEditor.CODE_TYPE:
                this.allDescData.push({pos: position, type: TVYContentEditor.CODE_TYPE, data: dataContent, desc_id: descId, group_desc_id: this.groupDescId})
                break;
            case TVYContentEditor.IMAGE_TYPE:
                break;
            default:
                break;
        }
        console.log('Data saved----------');
        console.log(this.allDescData);
        // this.saveDescDataToBackend(true);
        console.log('Data saved----------End');
    }

    updateDataOfADesc(data, type, descId) {
        this.allDescData.forEach(ele => {
           if(ele.desc_id === descId){
               ele.data = data;
               ele.type = type;
           }
        });
    }

    updatePositionsAfterADescElementDeleted (descId) {
        this.descPosition--;
        let prePos = 1;
        let filteredDataContents = this.allDescData.filter(ele => {return ele.desc_id !== descId;});
        filteredDataContents.forEach(ele => {
            ele.pos = prePos++;
        });
        this.allDescData = filteredDataContents;
    }

    getDescObjectByDescId (descId) {
        let descFiltered = this.allDescData.filter(desc => desc.desc_id === descId);
        return descFiltered[0];
    }

    getDescObjectByPosition (pos) {
        let descFiltered = this.allDescData.filter(desc => desc.pos === pos);
        return descFiltered[0];
    }

    getDescElementByDescId (descId) {
        let allDescElements = document.querySelectorAll('.questionPreview .TVYContentOrder .descElement');
        let wantedElement = null;
        allDescElements.forEach(ele => {
           if(ele.getAttribute('data-desc-id') === descId){
               wantedElement = ele;
           }
        });
        return wantedElement;
    }

    tabEditorMovement() {
        this.allTabs.forEach( ele => {
            ele.addEventListener('click', () => {
                // tap changed on click
                this.allTabs.forEach( e => {
                    e.classList.remove('selected');
                });
                ele.classList.add('selected');

                let dataType = ele.getAttribute('data-type');

                // editor changed on click
                this.allEditors.forEach( e => {
                    e.setAttribute('hidden', 'hidden');
                });
                let tempEditorToShow = null;
                if(dataType === 'text'){
                    tempEditorToShow = this.textEditor;
                }else if(dataType === 'code'){
                    tempEditorToShow = this.codeEditor;
                }else if(dataType === 'image'){
                    tempEditorToShow = this.imageEditor;
                }
                tempEditorToShow.removeAttribute('hidden');
                this.btnAddContent.setAttribute('data-type', dataType);
            });
        });
    }

    doContentOrderActions (event)
    {
        let targetButton = event.target.parentNode;
        let actionTypeOfTargetButton = targetButton.getAttribute('action-type');

        let targetDescElement = event.target.parentNode.parentNode.parentNode.parentNode;
        let descIdOfTargetDescElement = targetDescElement.getAttribute('data-desc-id');

        let targetDescTools = event.target.parentNode.parentNode.parentNode;
        let targetEditorType = this.getDescObjectByDescId(descIdOfTargetDescElement).type;
        let targetEditor = null;
        if(targetEditorType === TVYContentEditor.TEXT_TYPE){
            targetEditor = this.querySelector('#TVYTextEditor');
        }else {
            targetEditor = this.querySelector('#TVYCodeEditor')
        }

        if(actionTypeOfTargetButton === TVYContentEditor.ACTION_TYPE_MOVE_UP){
            this.moveDescriptionElement(descIdOfTargetDescElement, TVYContentEditor.ACTION_TYPE_MOVE_UP);
        }
        else if(actionTypeOfTargetButton === TVYContentEditor.ACTION_TYPE_MOVE_DOWN){
            this.moveDescriptionElement(descIdOfTargetDescElement, TVYContentEditor.ACTION_TYPE_MOVE_DOWN);
        }
        else if(actionTypeOfTargetButton === TVYContentEditor.ACTION_TYPE_DELETE){
            this.deleteDescriptionElement(descIdOfTargetDescElement);
        }
        else if(actionTypeOfTargetButton === TVYContentEditor.ACTION_TYPE_EDIT){
            this.editDescriptionElement(targetEditor, descIdOfTargetDescElement, targetEditorType, targetDescTools);
        }
    }

    createDescriptionElementAndAttachEventOfDescTools (descId, descType, editor)
    {
        let contentOrder = document.querySelector('.askQuestionContent .questionPreview .TVYContentOrder');

        let descElement = document.createElement('div');
        descElement.className = 'descElement col-md-12';
        descElement.setAttribute('data-desc-id', descId);
        descElement.innerHTML = htmlDescTools;
        contentOrder.appendChild(descElement);
        let descContent = descElement.querySelector('.descContent');

        return descContent;
    }

    editDescriptionElement (editor, descId, descType, descTools)
    {
        if(descType == TVYContentEditor.TEXT_TYPE){
            this.querySelector('.tabTypeContent .btnAddPlainText').click();
            this.quillTextObj.setContents(this.getDescObjectByDescId(descId).data);
        }else if(descType == TVYContentEditor.CODE_TYPE){
            this.querySelector('.tabTypeContent .btnAddCodingBlock').click();
            this.codeMirrorObj.setContent(this.getDescObjectByDescId(descId).data);
        }

        let allDescTools = this.querySelectorAll('.descTools');
        editor.setAttribute('data-editing', descId);
        allDescTools.forEach(ele => {
            ele.classList.remove('editing');
            ele.classList.remove('edited');
        });
        descTools.classList.remove('edited');
        descTools.classList.add('editing');
    }

    deleteDescriptionElement (currentDescId)
    {
        let selectedElement = this.getDescElementByDescId(currentDescId);
        selectedElement.parentNode.removeChild(selectedElement);
        this.updatePositionsAfterADescElementDeleted(currentDescId);
    }

    moveDescriptionElement (currentDescId, actionType)
    {
        let currentDescObj = this.getDescObjectByDescId(currentDescId);
        let currentDescObjPos = currentDescObj.pos;
        if(actionType === TVYContentEditor.ACTION_TYPE_MOVE_UP && currentDescObjPos === 1){
            new NotyAlertMessage(NotyAlertMessage.WARNING, '⚠️It is already at the top. Cannot move up anymore.').show();
            return;
        }else if(actionType === TVYContentEditor.ACTION_TYPE_MOVE_DOWN && currentDescObjPos === this.descPosition) {
            new NotyAlertMessage(NotyAlertMessage.WARNING, '⚠️It is already at the bottom. Cannot move down anymore.').show();
            return;
        }

        let currentDescElement = this.getDescElementByDescId(currentDescId);
        let cloneOfCurrentDescElement = currentDescElement.cloneNode(true);
        let toBeMoveDescElement = null;

        if(actionType === TVYContentEditor.ACTION_TYPE_MOVE_UP)
        {
            toBeMoveDescElement = currentDescElement.previousElementSibling;
            currentDescElement.parentNode.insertBefore(cloneOfCurrentDescElement, currentDescElement.previousSibling);
        }
        else
        {
            toBeMoveDescElement = currentDescElement.nextElementSibling;
            currentDescElement.parentNode.insertBefore(cloneOfCurrentDescElement, currentDescElement.nextSibling.nextSibling);
        }

        let descIdOfToBeMovedDescElement = toBeMoveDescElement.getAttribute('data-desc-id');
        this.swapDataAndTypeAndDescIdOfTwoDescElements(currentDescId, descIdOfToBeMovedDescElement);

        currentDescElement.parentNode.removeChild(currentDescElement);
        console.log(this.allDescData);
    }

    swapDataAndTypeAndDescIdOfTwoDescElements (descOneId, descTwoId)
    {
        let descOne = this.getDescObjectByDescId(descOneId);
        let descOneData = descOne.data;
        let descOneType = descOne.type;
        let descTwo = this.getDescObjectByDescId(descTwoId);
        let descTwoData = descTwo.data;
        let descTwoType = descTwo.type;

        this.allDescData.forEach(ele => {
            if(ele.desc_id === descOneId){
                ele.desc_id = descTwoId;
                ele.data = descTwoData;
                ele.type = descTwoType;
            }
            else if(ele.desc_id === descTwoId){
                ele.desc_id = descOneId;
                ele.data = descOneData;
                ele.type = descOneType;
            }
        });
    }

    saveDescDataToBackend (isDraft) {
        let url = window.location.origin + '/question/save-during-editing';
        let titleQuestion = $('#formAskQuestion .questionTitle').val();
        $.ajax({
            url: url,
            headers: { 'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content') },
            data: JSON.stringify({
                title: titleQuestion != '' ? titleQuestion : 'sample title',
                public_id: this.getAttribute('data-public-id'),
                desc_data: JSON.stringify(this.allDescData),
                is_draft: isDraft
            }),
            contentType: 'application/json',
            type: 'POST',
            success: function(result) {
                console.log('---Success');
            },
            error: function(err) {
                console.log('---Error');
                console.log(err);
            }
        });
        console.log(this.allDescData);
    }

    connectedCallback()
    {
        console.log('TVYContentEditor is rendered');
    }
}

window.customElements.define('tvy-content-editor', TVYContentEditor);
