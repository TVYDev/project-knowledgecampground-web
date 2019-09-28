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

    static get textType()   {return 'text';}
    static get codeType()   {return 'code';}
    static get imageType()  {return 'image';}
    static get TEXT_TYPE()   {return 'text';}
    static get CODE_TYPE()   {return 'code';}
    static get IMAGE_TYPE()  {return 'image';}

    static get MOVE_UP()     {return 'move_up';}
    static get MOVE_DOWN()   {return 'move_down';}
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

        // let descHTML = `
        //     <div class="descTools" draggable="true">
        //         <span class="toolButtonsBlock">
        //             <button type="button" class="toolArrowUp"><i class="fas fa-arrow-up"></i></button>
        //             <button type="button" class="toolArrowDown"><i class="fas fa-arrow-down"></i></button>
        //             <button type="button" class="toolEdit"><i class="fas fa-pen"></i></button>
        //             <button type="button" class="toolDelete"><i class="fas fa-trash-alt"></i></button>
        //         </span>
        //     </div>
        //     <div class="descContent"></div>
        // `;

        // let contentOrder = document.querySelector('.askQuestionContent .questionPreview .TVYContentOrder');
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

                    this.updateDataOfADesc(this.quillTextContent, TVYContentEditor.textType, dataEditing);

                    descTools.classList.remove('editing');
                    descTools.classList.add('edited');
                    textEditor.removeAttribute('data-editing');
                }
                else{
                    // let textElement = document.createElement('div');
                    // textElement.className = 'descElement col-md-12';
                    // textElement.setAttribute('data-desc-id', randomDescId);
                    // textElement.innerHTML = descHTML;
                    // contentOrder.appendChild(textElement);
                    // let descContent = textElement.querySelector('.descContent');
                    // let descTools = textElement.querySelector('.descTools');
                    //
                    // let editBtn = textElement.querySelector('.toolEdit');
                    // let deleteBtn = textElement.querySelector('.toolDelete');
                    // let arrowUpBtn = textElement.querySelector('.toolArrowUp');
                    // let arrowDownBtn = textElement.querySelector('.toolArrowDown');
                    // editBtn.addEventListener('click', () => {
                    //     this.editDescriptionElement(textEditor, randomDescId, TVYContentEditor.textType, descTools);
                    // });
                    // deleteBtn.addEventListener('click', () => {
                    //    this.deleteDescriptionElement(randomDescId);
                    // });
                    // arrowUpBtn.addEventListener('click', () => {
                    //     this.moveDescriptionElement(randomDescId, TVYContentEditor.MOVE_UP);
                    // });
                    // arrowDownBtn.addEventListener('click', () => {
                    //     this.moveDescriptionElement(randomDescId, TVYContentEditor.MOVE_DOWN);
                    // });

                    let textDescContent = this.createDescriptionElementAndAttachEventOfDescTools(randomDescId, TVYContentEditor.TEXT_TYPE, textEditor);

                    new QuillEditor(textDescContent, false, true, this.quillTextContent);

                    this.storeDataContent(this.quillTextContent, TVYContentEditor.textType, randomDescId);
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

                    this.updateDataOfADesc(this.codeMirrorContent, TVYContentEditor.codeType, codeDataEditing);

                    descTools.classList.remove('editing');
                    descTools.classList.add('edited');
                    codeEditor.removeAttribute('data-editing');
                    console.log(this.allDescData);
                }
                else
                {
                    // let codeElement = document.createElement('div');
                    // codeElement.className = 'descElement col-md-12';
                    // codeElement.setAttribute('data-desc-id', randomDescId);
                    // codeElement.innerHTML = descHTML;
                    // contentOrder.appendChild(codeElement);
                    // let descContent = codeElement.querySelector('.descContent');
                    // let descTools = codeElement.querySelector('.descTools');
                    //
                    // let editBtn = codeElement.querySelector('.toolEdit');
                    // let deleteBtn = codeElement.querySelector('.toolDelete');
                    // let arrowUpBtn = codeElement.querySelector('.toolArrowUp');
                    // let arrowDownBtn = codeElement.querySelector('.toolArrowDown');
                    //
                    // editBtn.addEventListener('click', () => {
                    //     this.editDescriptionElement(codeEditor, randomDescId, TVYContentEditor.codeType, descTools);
                    // });
                    //
                    // deleteBtn.addEventListener('click', () => {
                    //     this.deleteDescriptionElement(randomDescId);
                    // });
                    // arrowUpBtn.addEventListener('click', () => {
                    //     this.moveDescriptionElement(randomDescId, TVYContentEditor.MOVE_UP);
                    // });
                    // arrowDownBtn.addEventListener('click', () => {
                    //     this.moveDescriptionElement(randomDescId, TVYContentEditor.MOVE_DOWN);
                    // });

                    let codeDescContent = this.createDescriptionElementAndAttachEventOfDescTools(randomDescId, TVYContentEditor.CODE_TYPE, codeEditor);

                    new CodeMirrorEditor(codeDescContent, CodeMirrorEditor.THEME_MATERIAL, CodeMirrorEditor.MODE_JAVASCRIPT,
                        true, this.codeMirrorContent, null);

                    this.storeDataContent(this.codeMirrorContent, TVYContentEditor.codeType, randomDescId);
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
            case TVYContentEditor.textType:
                this.allDescData.push({pos: position, type: TVYContentEditor.textType, data: dataContent, desc_id: descId, group_desc_id: this.groupDescId});
                break;
            case TVYContentEditor.codeType:
                this.allDescData.push({pos: position, type: TVYContentEditor.codeType, data: dataContent, desc_id: descId, group_desc_id: this.groupDescId})
                break;
            case TVYContentEditor.imageType:
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
            this.moveDescriptionElementNew(descIdOfTargetDescElement, TVYContentEditor.ACTION_TYPE_MOVE_UP);
        }
        else if(actionTypeOfTargetButton === TVYContentEditor.ACTION_TYPE_MOVE_DOWN){
            this.moveDescriptionElementNew(descIdOfTargetDescElement, TVYContentEditor.ACTION_TYPE_MOVE_DOWN);
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
        let descTools = descElement.querySelector('.descTools');

        // let editBtn = descElement.querySelector('.toolEdit');
        // let deleteBtn = descElement.querySelector('.toolDelete');
        // let arrowUpBtn = descElement.querySelector('.toolArrowUp');
        // let arrowDownBtn = descElement.querySelector('.toolArrowDown');

        // editBtn.addEventListener('click', () => {
        //     this.editDescriptionElement(editor, descId, descType, descTools);
        // });
        //
        // deleteBtn.addEventListener('click', () => {
        //     this.deleteDescriptionElement(descId);
        // });
        // arrowUpBtn.addEventListener('click', () => {
        //     this.moveDescriptionElementNew(descId, TVYContentEditor.MOVE_UP);
        // });
        // arrowDownBtn.addEventListener('click', () => {
        //     this.moveDescriptionElementNew(descId, TVYContentEditor.MOVE_DOWN);
        // });

        return descContent;
    }

    editDescriptionElement (editor, descId, descType, descTools)
    {
        if(descType == TVYContentEditor.textType){
            this.querySelector('.tabTypeContent .btnAddPlainText').click();
            this.quillTextObj.setContents(this.getDescObjectByDescId(descId).data);
        }else if(descType == TVYContentEditor.codeType){
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

    moveDescriptionElementNew (currentDescId, actionType)
    {
        let currentDescElement = this.getDescElementByDescId(currentDescId);
        let cloneOfCurrentDescElement = currentDescElement.cloneNode(true);

        if(actionType === TVYContentEditor.ACTION_TYPE_MOVE_UP)
        {
            currentDescElement.parentNode.insertBefore(cloneOfCurrentDescElement, currentDescElement.previousSibling);
        }
        else if(actionType === TVYContentEditor.ACTION_TYPE_MOVE_DOWN)
        {
            currentDescElement.parentNode.insertBefore(cloneOfCurrentDescElement, currentDescElement.nextSibling.nextSibling);
        }
        currentDescElement.parentNode.removeChild(currentDescElement);
    }

    moveDescriptionElement (currentDescId, direction)
    {
        let currentDescObj = this.getDescObjectByDescId(currentDescId);
        let currentDescObjPos = currentDescObj.pos;

        let toBeMovedDescObjPos = 0;
        if(direction == TVYContentEditor.MOVE_UP){
            if(currentDescObjPos === 1){
                new NotyAlertMessage(NotyAlertMessage.WARNING, '⚠️It is already at the top. Cannot move up anymore.').show();
            }else{
                toBeMovedDescObjPos = currentDescObjPos - 1;
            }
        }else if(direction == TVYContentEditor.MOVE_DOWN) {
            if (currentDescObjPos === this.descPosition) {
                new NotyAlertMessage(NotyAlertMessage.WARNING, '⚠️It is already at the bottom. Cannot move down anymore.').show();
            }else{
                toBeMovedDescObjPos = currentDescObjPos + 1;
            }
        }else{
            new NotyAlertMessage(NotyAlertMessage.WARNING, '⚠️No movement can be made.').show();
        }

        let toBeMovedDescObj = this.getDescObjectByPosition(toBeMovedDescObjPos);

        // Data content
        let currentDescObjData = currentDescObj.data;
        let currentDescObjType = currentDescObj.type;
        let toBeMovedDescObjData = toBeMovedDescObj.data;
        let toBeMovedDescObjType = toBeMovedDescObj.type;

        // Desc element
        let currentDescElement = this.getDescElementByDescId(currentDescId);
        let toBeMovedDescElement = this.getDescElementByDescId(toBeMovedDescObj.desc_id);

        let descContentOfCurrentDescElement = currentDescElement.querySelector('.descContent');
        let descContentOfToBeMovedDescElement = toBeMovedDescElement.querySelector('.descContent');
        descContentOfCurrentDescElement.parentNode.removeChild(descContentOfCurrentDescElement);
        descContentOfToBeMovedDescElement.parentNode.removeChild(descContentOfToBeMovedDescElement);

        let newDescContentOfCurrentDescElement = document.createElement('div');
        newDescContentOfCurrentDescElement.className = 'descContent';
        currentDescElement.appendChild(newDescContentOfCurrentDescElement);

        let newDescContentOfToBeMovedDescElement = document.createElement('div');
        newDescContentOfToBeMovedDescElement.className = 'descContent';
        toBeMovedDescElement.appendChild(newDescContentOfToBeMovedDescElement);

        if(currentDescObjType == TVYContentEditor.textType){
            new QuillEditor(newDescContentOfToBeMovedDescElement, false, true, currentDescObjData);
            this.updateDataOfADesc(currentDescObjData, TVYContentEditor.textType, toBeMovedDescObj.desc_id);
        }else if(currentDescObjType == TVYContentEditor.codeType){
            new CodeMirrorEditor(newDescContentOfToBeMovedDescElement, CodeMirrorEditor.THEME_MATERIAL, CodeMirrorEditor.MODE_JAVASCRIPT,
                true, currentDescObjData, null);
            this.updateDataOfADesc(currentDescObjData, TVYContentEditor.codeType, toBeMovedDescObj.desc_id);
        }

        if(toBeMovedDescObjType == TVYContentEditor.textType){
            new QuillEditor(newDescContentOfCurrentDescElement, false, true, toBeMovedDescObjData);
            this.updateDataOfADesc(toBeMovedDescObjData, TVYContentEditor.textType, currentDescObj.desc_id);
        }else if(toBeMovedDescObjType == TVYContentEditor.codeType){
            new CodeMirrorEditor(newDescContentOfCurrentDescElement, CodeMirrorEditor.THEME_MATERIAL, CodeMirrorEditor.MODE_JAVASCRIPT,
                true, toBeMovedDescObjData, null);
            this.updateDataOfADesc(toBeMovedDescObjData, TVYContentEditor.codeType, currentDescObj.desc_id);
        }
        this.swapDescIdOfTwoDescElements(currentDescObj.desc_id, toBeMovedDescObj.desc_id);

        console.log(this.allDescData);
    }

    swapDescIdOfTwoDescElements (descIdOne, descIdTwo)
    {
        this.allDescData.forEach(ele => {
            if(ele.desc_id === descIdOne){
                ele.desc_id = descIdTwo;
            }
            else if(ele.desc_id === descIdTwo){
                ele.desc_id = descIdOne;
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
