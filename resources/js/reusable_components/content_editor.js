import NotyAlertMessage from "../NotyAlertMessage";
import QuillEditor from "../QuillEditor";
import CodeMirrorEditor from "../CodeMirrorEditor";

const html = `
    <div class="TVYContentProduction">
        <div class="TVYContentEditor col-md-12">
            <div class="tabTypeContent">
               <button type="button" class="btnSelectTabEditor btnAddPlainText selected" data-type="text">Plain Text</button>
               <button type="button" class="btnSelectTabEditor btnAddCodingBlock" data-type="code">Coding Block</button>
               <button type="button" class="btnSelectTabEditor btnAddImage" data-type="image">Media File</button>
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
                    <div class="imageSelector">
                        <div class="dropArea">
                            <div>
                                <label for="iptImageForQuestion" class="dropOrBrowse">
                                    <strong>Drag & Drop image here</strong><br /><br />or<br /><br /><strong>Click to browse image</strong>
                                </label>
                                <input type="file" class="iptBrowseImage" id="iptImageForQuestion" hidden="hidden" accept="image/*"/>                            
                            </div>
                        </div>
                        <div class="previewImage">
                            <img class="uploadedImagePreview" src=""/>
                            <div><button type="button" class="btnLink btnRemovePreviewImage">Remove above image</button></div>
                            <div class="ui small form">
                                <div class="field">
                                    <input type="text" class="imageCaption" placeholder="Provide caption (optional)" />
                                </div>
                            </div>
                        </div>
                    </div>
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
            <button type="button" class="toolArrowBottom" action-type="move_bottom"><i class="fas fa-angle-double-down"></i></button>
            <button type="button" class="toolArrowDown" action-type="move_down"><i class="fas fa-chevron-down"></i></button>
            <span class="toolSeparator">|</span>
            <button type="button" class="toolEdit" action-type="edit"><i class="fas fa-pen"></i></button>
            <button type="button" class="toolDelete" action-type="delete"><i class="fas fa-trash-alt"></i></button>
            <span class="toolSeparator">|</span>
            <button type="button" class="toolArrowUp" action-type="move_up"><i class="fas fa-chevron-up"></i></button>
            <button type="button" class="toolArrowTop" action-type="move_top"><i class="fas fa-angle-double-up"></i></button>
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

        this.questionPublicId = this.getAttribute('data-public-id');

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

        this.fileImageToUpload = null;
        this.nameFileImageToUpload = null;
        this.fileImageExtension = null;
        this.imageEditor = this.querySelector('.editor #TVYImageEditor');
        this.imageSelector = this.imageEditor.querySelector('.imageSelector');
        this.imageBrowser = this.imageEditor.querySelector('.iptBrowseImage');
        this.dropArea = this.imageEditor.querySelector('.dropArea');
        this.previewImage = this.imageEditor.querySelector('.previewImage');
        this.uploadedImagePreivew = this.imageEditor.querySelector('.previewImage .uploadedImagePreview');
        this.btnRemovePreviewImage = this.imageEditor.querySelector('.btnRemovePreviewImage');
        this.imageCaption = this.imageEditor.querySelector('.imageCaption');

        this.btnAddContent = this.querySelector('.actionContentEditor .btnAddContent');
        this.contentOrder = document.querySelector('.askQuestionContent .contentOrder .TVYContentOrder');

        this.allDescData = [];

        this.tabEditorMovement();

        this.quillTextObj = new QuillEditor(this.actualTextEditor);

        this.codeMirrorObj = new CodeMirrorEditor(this.actualCodeEditor,
            CodeMirrorEditor.THEME_DRACULA, CodeMirrorEditor.MODE_JAVASCRIPT);

        this.btnAddContent.addEventListener('click', this.addContentListener.bind(this));

        let tvyContentOrder = document.querySelector('.contentOrder .TVYContentOrder');
        tvyContentOrder.addEventListener('click', (event) => {
            this.doContentOrderActions(event);
        });

        this.jsObjCodeEditorModeSelect.addEventListener('change', this.changeModeOfCodeMirrorEditor.bind(this));
        this.jsObjCodeEditorThemeSelect.addEventListener('change', this.changeThemeOfCodeMirrorEditor.bind(this));

        ['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => this.imageSelector.addEventListener(eventName, this.preventDefaults, false));
        ['dragenter', 'dragover'].forEach(eventName => this.imageSelector.addEventListener(eventName, this.highlightDropArea.bind(this), false));
        ['dragleave', 'drop'].forEach(eventName => this.imageSelector.addEventListener(eventName, this.unhighlightDropArea.bind(this), false));
        this.imageSelector.addEventListener('drop', this.handleDroppedFile.bind(this), false);
        this.imageSelector.addEventListener('click', this.handleImageSelectorClick.bind(this), false);
        this.btnRemovePreviewImage.addEventListener('click', this.handleRemovePreviewImage.bind(this), false);
        this.imageBrowser.addEventListener('change', this.handleBrowsedFile.bind(this), false);

        this.quillTextObj.setFocus();
    }

    static get TEXT_TYPE()   {return 'text';}
    static get CODE_TYPE()   {return 'code';}
    static get IMAGE_TYPE()  {return 'image';}

    static get ACTION_TYPE_MOVE_TOP()       {return 'move_top';}
    static get ACTION_TYPE_MOVE_BOTTOM()    {return 'move_bottom';}
    static get ACTION_TYPE_MOVE_UP()        {return 'move_up';}
    static get ACTION_TYPE_MOVE_DOWN()      {return 'move_down';}
    static get ACTION_TYPE_EDIT()           {return 'edit';}
    static get ACTION_TYPE_DELETE()         {return 'delete';}

    static get ARRAY_INDEX_TOP()    {return 0;}
    static get ARRAY_INDEX_PREV()   {return 777;}
    static get ARRAY_INDEX_NEXT()   {return 888;}
    static get ARRAY_INDEX_BOTTOM() {return 999;}

    handleImageSelectorClick (event) {
        if(!event.target.className.includes('imageCaption')){
            this.imageBrowser.click()
        }
    }

    handleRemovePreviewImage (event) {
        this.uploadedImagePreivew.setAttribute('src', '');
        this.dropArea.style.display = 'block';
        this.previewImage.style.display = 'none';
        event.stopPropagation();
    }

    handleBrowsedFile (event) {
        let files = event.target.files;
        this.previewFile(files[0]);
    }

    handleDroppedFile (event) {
        let dt = event.dataTransfer;
        let files = dt.files;
        this.previewFile(files[0]);
    }

    previewFile (file) {
        if(file != undefined){
            this.fileImageExtension = file.name.split('.')[1];
            this.fileImageToUpload = file;
            let reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onloadend = () => {
                this.uploadedImagePreivew.setAttribute('src', reader.result);
                this.dropArea.style.display = 'none';
                this.previewImage.style.display = 'block';
            }
        }
    }

    highlightDropArea () {
        this.imageSelector.classList.add('highlight');
    }

    unhighlightDropArea () {
        this.imageSelector.classList.remove('highlight');
    }

    preventDefaults (event)
    {
        event.preventDefault();
        event.stopPropagation();
    }

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
                this.quillTextObj.clearContent();
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
                if(this.uploadedImagePreivew.getAttribute('src') == '')
                {
                    new NotyAlertMessage(NotyAlertMessage.WARNING, '⚠️Please select an image to upload').show();
                    break;
                }

                let imageEditor = this.querySelector('#TVYImageEditor');
                let imageDataEditing = imageEditor.getAttribute('data-editing');
                let imageExtension = imageEditor.getAttribute('data-image-extension');

                if(imageDataEditing !== null)
                {
                    let editingDescEle = this.getDescElementByDescId(imageDataEditing);
                    let descTools = editingDescEle.querySelector('.descTools');
                    let descContent = editingDescEle.querySelector('.descContent');

                    descContent.querySelector('.imageContent .imageFile').setAttribute('src', this.uploadedImagePreivew.getAttribute('src'));
                    descContent.querySelector('.imageContent .imageCaption').innerHTML = this.imageCaption.value;

                    let imageFileName = this.questionPublicId + '_' + imageDataEditing + '.' + imageExtension;
                    this.nameFileImageToUpload = imageFileName;
                    this.updateDataOfADesc(
                        {
                            caption: this.imageCaption.value,
                            image_file_name: imageFileName
                        },
                        TVYContentEditor.IMAGE_TYPE,
                        imageDataEditing
                    );

                    descTools.classList.remove('editing');
                    descTools.classList.add('edited');
                    imageEditor.removeAttribute('data-editing');
                    imageEditor.removeAttribute('data-image-extension');
                }
                else
                {
                    let imageDescContent = this.createDescriptionElementAndAttachEventOfDescTools(randomDescId, TVYContentEditor.IMAGE_TYPE);
                    let imageCaptionToView = '';
                    if(this.imageCaption.value !== ''){
                        imageCaptionToView = `<strong>Caption:</strong>&nbsp;${this.imageCaption.value}`;
                    }
                    let imageContentHTML = `
                        <div class="imageContent">
                            <img 
                                class="imageFile" 
                                src=${this.uploadedImagePreivew.getAttribute('src')} 
                                data-image-extension=${this.fileImageExtension} />
                            <p class="imageCaption">${imageCaptionToView}</p>
                        </div>
                    `;
                    imageDescContent.innerHTML = imageContentHTML;

                    let imageFileName = this.questionPublicId + '_' + randomDescId + '.' + this.fileImageExtension;
                    this.nameFileImageToUpload = imageFileName;
                    this.storeDataContent(
                        {
                            caption: this.imageCaption.value,
                            image_file_name: imageFileName
                        },
                        TVYContentEditor.IMAGE_TYPE, randomDescId
                    );
                }

                this.uploadedImagePreivew.setAttribute('src', '');
                this.imageCaption.value = '';
                this.dropArea.style.display = 'block';
                this.previewImage.style.display = 'none';
                this.previewImage.querySelector('.btnRemovePreviewImage').style.visibility = 'visible';
                break;
            default: break;
        }
        this.enableAllTabEditors();
    }

    get codeMirrorContent() {
        return this.codeMirrorObj.getContent();
    }

    get quillTextContent() {
        return this.quillTextObj.getContent();
    }

    storeDataContent(dataContent, type, descId) {
        this.allDescData.push({type: type, data: dataContent, desc_id: descId});
        this.saveDescDataToBackend();
    }

    updateDataOfADesc(data, type, descId) {
        this.allDescData.forEach(ele => {
           if(ele.desc_id === descId){
               ele.data = data;
               ele.type = type;
           }
        });
        this.saveDescDataToBackend();
    }

    getDescObjectByDescId (descId) {
        let descFiltered = this.allDescData.filter(desc => desc.desc_id === descId);
        return descFiltered[0];
    }

    getIndexArrayOfDescObject (descId) {
        let i = 0;
        this.allDescData.forEach((value, index) => {
            if(value.desc_id === descId){
                i = index;
            }
        });
        return i;
    }

    getDescElementByDescIdV2 (descId) {
        return document.querySelector(`.contentOrder .TVYContentOrder .descElement[data-desc-id="${descId}"]`);
    }

    getDescElementByDescId (descId) {
        let allDescElements = document.querySelectorAll('.contentOrder .TVYContentOrder .descElement');
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
                if(dataType === 'text'){
                    this.textEditor.removeAttribute('hidden');
                    this.quillTextObj.setFocus();
                }else if(dataType === 'code'){
                    this.codeEditor.removeAttribute('hidden');
                    this.codeMirrorObj.setFocus();
                }else if(dataType === 'image'){
                    this.imageEditor.removeAttribute('hidden');
                }
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
        }else if(targetEditorType === TVYContentEditor.CODE_TYPE) {
            targetEditor = this.querySelector('#TVYCodeEditor');
        }else if(targetEditorType === TVYContentEditor.IMAGE_TYPE) {
            targetEditor = this.querySelector('#TVYImageEditor');
        }

        if(actionTypeOfTargetButton === TVYContentEditor.ACTION_TYPE_MOVE_UP){
            this.moveDescriptionElement(descIdOfTargetDescElement, TVYContentEditor.ACTION_TYPE_MOVE_UP);
        }
        else if(actionTypeOfTargetButton === TVYContentEditor.ACTION_TYPE_MOVE_DOWN){
            this.moveDescriptionElement(descIdOfTargetDescElement, TVYContentEditor.ACTION_TYPE_MOVE_DOWN);
        }
        else if(actionTypeOfTargetButton === TVYContentEditor.ACTION_TYPE_MOVE_TOP){
            this.moveDescriptionElement(descIdOfTargetDescElement, TVYContentEditor.ACTION_TYPE_MOVE_TOP);
        }
        else if(actionTypeOfTargetButton === TVYContentEditor.ACTION_TYPE_MOVE_BOTTOM){
            this.moveDescriptionElement(descIdOfTargetDescElement, TVYContentEditor.ACTION_TYPE_MOVE_BOTTOM);
        }
        else if(actionTypeOfTargetButton === TVYContentEditor.ACTION_TYPE_DELETE){
            this.deleteDescriptionElement(descIdOfTargetDescElement);
        }
        else if(actionTypeOfTargetButton === TVYContentEditor.ACTION_TYPE_EDIT){
            this.editDescriptionElement(targetEditor, descIdOfTargetDescElement, targetEditorType, targetDescTools);
        }
    }

    createDescriptionElementAndAttachEventOfDescTools (descId, descType = null, editor = null)
    {
        let contentOrder = document.querySelector('.askQuestionContent .contentOrder .TVYContentOrder');

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
        let beingEditedDescTool = document.querySelector('.contentOrder .TVYContentOrder .descTools.editing');
        if(beingEditedDescTool !== null) {
            new NotyAlertMessage(NotyAlertMessage.WARNING, '⚠️You cannot edit this description element because another one is being edited.').show();
            return;
        }

        let allDescTools = document.querySelectorAll('.contentOrder .TVYContentOrder .descTools');
        editor.setAttribute('data-editing', descId);
        allDescTools.forEach(ele => {
            ele.classList.remove('editing');
            ele.classList.remove('edited');
        });
        descTools.classList.remove('edited');
        descTools.classList.add('editing');

        if(descType == TVYContentEditor.TEXT_TYPE){
            this.querySelector('.tabTypeContent .btnAddPlainText').click();
            this.quillTextObj.setContent(this.getDescObjectByDescId(descId).data)
        }else if(descType == TVYContentEditor.CODE_TYPE){
            this.querySelector('.tabTypeContent .btnAddCodingBlock').click();
            this.codeMirrorObj.setContent(this.getDescObjectByDescId(descId).data);
        }else if (descType == TVYContentEditor.IMAGE_TYPE){
            this.querySelector('.tabTypeContent .btnAddImage').click();
            let selectedImageDescToBeEdited = this.getDescElementByDescIdV2(descId).querySelector('.imageContent .imageFile');
            editor.setAttribute('data-image-extension',selectedImageDescToBeEdited.getAttribute('data-image-extension'));
            this.uploadedImagePreivew.setAttribute('src', selectedImageDescToBeEdited.getAttribute('src'));
            this.imageCaption.value = this.getDescObjectByDescId(descId).data.caption;
            this.dropArea.style.display = 'none';
            this.previewImage.style.display = 'block';
            this.previewImage.querySelector('.btnRemovePreviewImage').style.visibility = 'hidden';
        }

        this.enableOnlyOneTabEditor(descType);
    }

    deleteDescriptionElement (currentDescId)
    {
        let selectedElement = this.getDescElementByDescId(currentDescId);
        selectedElement.parentNode.removeChild(selectedElement);

        let remainingDescData = this.allDescData.filter(desc => desc.desc_id !== currentDescId);
        this.allDescData = remainingDescData;
        this.saveDescDataToBackend();
    }

    moveDescriptionElement (currentDescId, actionType)
    {
        let indexArrayOfCurrentDescObj = this.getIndexArrayOfDescObject(currentDescId);
        if(actionType === TVYContentEditor.ACTION_TYPE_MOVE_UP || actionType === TVYContentEditor.ACTION_TYPE_MOVE_TOP)
        {
            if(indexArrayOfCurrentDescObj === 0)
            {
                new NotyAlertMessage(NotyAlertMessage.WARNING, '⚠️It is already at the top. Cannot move up anymore.').show();
                return;
            }
        }
        else if(actionType === TVYContentEditor.ACTION_TYPE_MOVE_DOWN || actionType === TVYContentEditor.ACTION_TYPE_MOVE_BOTTOM)
        {
            if(indexArrayOfCurrentDescObj === this.allDescData.length - 1)
            {
                new NotyAlertMessage(NotyAlertMessage.WARNING, '⚠️It is already at the bottom. Cannot move down anymore.').show();
                return;
            }
        }

        let currentDescElement = this.getDescElementByDescId(currentDescId);
        let cloneOfCurrentDescElement = currentDescElement.cloneNode(true);

        if(actionType === TVYContentEditor.ACTION_TYPE_MOVE_UP)
        {
            this.moveCurrentDescDataToAnIndexOfArray(currentDescId, TVYContentEditor.ARRAY_INDEX_PREV);
            currentDescElement.parentNode.insertBefore(cloneOfCurrentDescElement, currentDescElement.previousSibling);
        }
        else if(actionType === TVYContentEditor.ACTION_TYPE_MOVE_DOWN)
        {
            this.moveCurrentDescDataToAnIndexOfArray(currentDescId, TVYContentEditor.ARRAY_INDEX_NEXT);
            currentDescElement.parentNode.insertBefore(cloneOfCurrentDescElement, currentDescElement.nextSibling.nextSibling);
        }
        else if(actionType === TVYContentEditor.ACTION_TYPE_MOVE_TOP)
        {
            this.moveCurrentDescDataToAnIndexOfArray(currentDescId, TVYContentEditor.ARRAY_INDEX_TOP);
            currentDescElement.parentNode.insertBefore(cloneOfCurrentDescElement, currentDescElement.parentNode.firstChild);
        }
        else if(actionType === TVYContentEditor.ACTION_TYPE_MOVE_BOTTOM)
        {
            this.moveCurrentDescDataToAnIndexOfArray(currentDescId, TVYContentEditor.ARRAY_INDEX_BOTTOM);
            currentDescElement.parentNode.append(cloneOfCurrentDescElement);
        }
        currentDescElement.parentNode.removeChild(currentDescElement);
        this.saveDescDataToBackend();
    }

    enableAllTabEditors()
    {
        let arrayBtnTabs = this.querySelectorAll('.btnSelectTabEditor');
        arrayBtnTabs.forEach(ele =>{
            ele.removeAttribute('disabled');
        });
    }

    enableOnlyOneTabEditor(descType)
    {
        let arrayBtnTabs = this.querySelectorAll('.btnSelectTabEditor');
        arrayBtnTabs.forEach(ele =>{
            if(ele.getAttribute('data-type') === descType){
                ele.removeAttribute('disabled');
            }
            else{
                ele.setAttribute('disabled', 'disabled')
            }
        });
    }

    moveCurrentDescDataToAnIndexOfArray (currentDescId, indexPosition)
    {
        let currentDesc = this.allDescData.find(desc => desc.desc_id === currentDescId);
        let indexArrayOfCurrentDesc = this.allDescData.findIndex(desc => desc.desc_id === currentDescId);
        let arrayDescDataExcludedCurrentDesc = this.allDescData.filter(desc => desc.desc_id !== currentDescId);

        if(indexPosition === TVYContentEditor.ARRAY_INDEX_TOP){
            arrayDescDataExcludedCurrentDesc.unshift(currentDesc);
        }
        else if(indexPosition === TVYContentEditor.ARRAY_INDEX_BOTTOM){
            arrayDescDataExcludedCurrentDesc.push(currentDesc);
        }
        else if(indexPosition === TVYContentEditor.ARRAY_INDEX_PREV){
            arrayDescDataExcludedCurrentDesc.splice(indexArrayOfCurrentDesc - 1, 0, currentDesc);
        }
        else if(indexPosition === TVYContentEditor.ARRAY_INDEX_NEXT){
            arrayDescDataExcludedCurrentDesc.splice(indexArrayOfCurrentDesc + 1, 0, currentDesc);
        }
        else{
            arrayDescDataExcludedCurrentDesc.splice(indexPosition, 0, currentDesc);
        }
        this.allDescData = arrayDescDataExcludedCurrentDesc;
    }

    saveDescDataToBackend () {
        let url = window.location.origin + '/question/save-during-editing';
        let titleQuestion = $('#formAskQuestion .questionTitle').val();

        let formData = new FormData();
        formData.append('title', titleQuestion != '' ? titleQuestion : 'sample title');
        formData.append('public_id', this.questionPublicId);
        formData.append('desc_data', JSON.stringify(this.allDescData));
        formData.append('image_file_upload', this.fileImageToUpload);
        formData.append('image_file_name', this.nameFileImageToUpload);
        this.fileImageToUpload = null;
        this.nameFileImageToUpload = null;

        $.ajax({
            url: url,
            headers: { 'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content') },
            data: formData,
            contentType: false,
            processData: false,
            type: 'POST',
            error: function(err) {
                console.log(err);
            }
        });
        document.querySelector('.TVYContentManagementPreview .reRender').click();
    }

    connectedCallback()
    {
        // console.log('TVYContentEditor is rendered');
    }
}

window.customElements.define('tvy-content-editor', TVYContentEditor);
