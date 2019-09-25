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

        this.jsObjCodeEditorModeSelect.addEventListener('change', this.changeModeOfCodeMirrorEditor.bind(this));
        this.jsObjCodeEditorThemeSelect.addEventListener('change', this.changeThemeOfCodeMirrorEditor.bind(this));
    }

    static get textType()   {return 'text';}
    static get codeType()   {return 'code';}
    static get imageType()  {return 'image';}

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

        let descHTML = `
            <div class="descTools" draggable="true">
                <span class="toolButtonsBlock">
                    <button type="button" class="toolArrowUp"><i class="fas fa-arrow-up"></i></button>
                    <button type="button" class="toolArrowDown"><i class="fas fa-arrow-down"></i></button>
                    <button type="button" class="toolEdit"><i class="fas fa-pen"></i></button>
                    <button type="button" class="toolDelete"><i class="fas fa-trash-alt"></i></button>
                </span>
            </div>
            <div class="descContent"></div>
        `;

        let contentOrder = document.querySelector('.askQuestionContent .questionPreview .TVYContentOrder');
        let randomDescId = Math.random().toString(36).replace('0.', '');

        switch(dataType)
        {
            case 'text':
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

                    this.updateDataOfADesc(this.quillTextContent, dataEditing);

                    descTools.classList.remove('editing');
                    descTools.classList.add('edited');
                    textEditor.removeAttribute('data-editing');
                }
                else{
                    let textElement = document.createElement('div');
                    textElement.className = 'descElement col-md-12';
                    textElement.setAttribute('data-desc-id', randomDescId);
                    textElement.innerHTML = descHTML;
                    contentOrder.appendChild(textElement);
                    let descContent = textElement.querySelector('.descContent');
                    let descTools = textElement.querySelector('.descTools');

                    let editBtn = textElement.querySelector('.toolEdit');
                    let deleteBtn = textElement.querySelector('.toolDelete');
                    let arrowUpBtn = textElement.querySelector('.toolArrowUp');
                    let arrowDownBtn = textElement.querySelector('.toolArrowDown');
                    editBtn.addEventListener('click', () => {
                        this.quillTextObj.setContents(this.getDescObjectByDescId(randomDescId).data);
                        let allDescTools = this.querySelectorAll('.descTools');
                        textEditor.setAttribute('data-editing', randomDescId);
                        allDescTools.forEach(ele => {
                           ele.classList.remove('editing');
                           ele.classList.remove('edited');
                        });
                        descTools.classList.add('editing');
                    });
                    deleteBtn.addEventListener('click', () => {
                       let selectedElement = this.getDescElementByDescId(randomDescId);
                       selectedElement.parentNode.removeChild(selectedElement);
                       this.updatePositionsAfterADescElementDeleted(randomDescId);
                    });
                    arrowUpBtn.addEventListener('click', () => {
                        let currentDescObj = this.getDescObjectByDescId(randomDescId);
                        let currentDescObjPos = currentDescObj.pos;
                        if(currentDescObjPos === 1){
                            new NotyAlertMessage(NotyAlertMessage.WARNING, '⚠️It is already at the top. Cannot move up anymore.').show();
                        }else{
                            let preDescObjPos = currentDescObjPos - 1;
                            let preDescObj = this.getDescObjectByPosition(preDescObjPos);

                            // Data content
                            let currentDescObjData = currentDescObj.data;
                            let currentDescObjType = currentDescObj.type;
                            let preDescObjData = preDescObj.data;
                            let preDescObjType = preDescObj.type;

                            // Desc element
                            let currentDescElement = this.getDescElementByDescId(randomDescId);
                            let preDescElement = this.getDescElementByDescId(preDescObj.desc_id);

                            let descContentCurrentDescElement = currentDescElement.querySelector('.descContent');
                            let descContentPreDescElement = preDescElement.querySelector('.descContent');
                            descContentCurrentDescElement.parentNode.removeChild(descContentCurrentDescElement);
                            descContentPreDescElement.parentNode.removeChild(descContentPreDescElement);

                            let newDescContentCurrentDescElement = document.createElement('div');
                            newDescContentCurrentDescElement.className = 'descContent';
                            currentDescElement.appendChild(newDescContentCurrentDescElement);

                            let newDescContentPreDescElement = document.createElement('div');
                            newDescContentPreDescElement.className = 'descContent';
                            preDescElement.appendChild(newDescContentPreDescElement);

                            // Exchange data content
                            if(currentDescObjType == TVYContentEditor.textType){
                                new QuillEditor(newDescContentPreDescElement, false, true, currentDescObjData);
                                this.updateDataOfADesc(currentDescObjData, TVYContentEditor.textType, preDescObj.desc_id);
                            }else if(currentDescObjType == TVYContentEditor.codeType){
                                new CodeMirrorEditor(newDescContentPreDescElement, CodeMirrorEditor.THEME_MATERIAL, CodeMirrorEditor.MODE_JAVASCRIPT,
                                    true, currentDescObjData, null);
                                this.updateDataOfADesc(currentDescObjData, TVYContentEditor.codeType, preDescObj.desc_id);
                            }

                            if(preDescObjType == TVYContentEditor.textType){
                                new QuillEditor(newDescContentCurrentDescElement, false, true, preDescObjData);
                                this.updateDataOfADesc(preDescObjData, TVYContentEditor.textType, currentDescObj.desc_id);
                            }else if(preDescObjType == TVYContentEditor.codeType){
                                new CodeMirrorEditor(newDescContentCurrentDescElement, CodeMirrorEditor.THEME_MATERIAL, CodeMirrorEditor.MODE_JAVASCRIPT,
                                    true, preDescObjData, null);
                                this.updateDataOfADesc(preDescObjData, TVYContentEditor.codeType, currentDescObj.desc_id);
                            }

                            // Update data content

                            console.log(this.allDescData);
                        }
                    });
                    arrowDownBtn.addEventListener('click', () => {
                        let currentDescObj = this.getDescObjectByDescId(randomDescId);
                        let currentDesObjPos = currentDescObj.pos;
                        if(currentDesObjPos === this.descPosition){
                            new NotyAlertMessage(NotyAlertMessage.WARNING, '⚠️It is already at the bottom. Cannot move down anymore.').show();
                        }else{
                            let nextDescObjPos = currentDesObjPos + 1;
                            let newDescObj = this.getDescObjectByPosition(nextDescObjPos);

                            // Data content
                            let currentDescObjData = currentDescObj.data;
                            let currentDescObjType = currentDescObj.type;
                            let nextDescObjData = newDescObj.data;
                            let nextDescObjType = newDescObj.type;

                            // Desc element
                            let currentDescElement = this.getDescElementByDescId(randomDescId);
                            let nextDescElement = this.getDescElementByDescId(newDescObj.desc_id);

                            let descContentCurrentDescElement = currentDescElement.querySelector('.descContent');
                            let descContentNextDescElement = nextDescElement.querySelector('.descContent');
                            descContentCurrentDescElement.parentNode.removeChild(descContentCurrentDescElement);
                            descContentNextDescElement.parentNode.removeChild(descContentNextDescElement);

                            let newDescContentCurrentDescElement = document.createElement('div');
                            newDescContentCurrentDescElement.className = 'descContent';
                            currentDescElement.appendChild(newDescContentCurrentDescElement);

                            let newDescContentNextDescElement = document.createElement('div');
                            newDescContentNextDescElement.className = 'descContent';
                            nextDescElement.appendChild(newDescContentNextDescElement);

                            // Exchange data content
                            if(currentDescObjType == TVYContentEditor.textType){
                                new QuillEditor(newDescContentNextDescElement, false, true, currentDescObjData);
                                this.updateDataOfADesc(currentDescObjData, TVYContentEditor.textType, newDescObj.desc_id);
                            }else if(currentDescObjType == TVYContentEditor.codeType){
                                new CodeMirrorEditor(newDescContentNextDescElement, CodeMirrorEditor.THEME_MATERIAL, CodeMirrorEditor.MODE_JAVASCRIPT,
                                    true, currentDescObjData, null);
                                this.updateDataOfADesc(currentDescObjData, TVYContentEditor.codeType, newDescObj.desc_id);
                            }

                            if(nextDescObjType == TVYContentEditor.textType){
                                new QuillEditor(newDescContentCurrentDescElement, false, true, nextDescObjData);
                                this.updateDataOfADesc(nextDescObjData, TVYContentEditor.textType, currentDescObj.desc_id);
                            }else if(nextDescObjType == TVYContentEditor.codeType){
                                new CodeMirrorEditor(newDescContentCurrentDescElement, CodeMirrorEditor.THEME_MATERIAL, CodeMirrorEditor.MODE_JAVASCRIPT,
                                    true, nextDescObjData, null);
                                this.updateDataOfADesc(nextDescObjData, TVYContentEditor.codeType, currentDescObj.desc_id);
                            }

                            // Update data content

                            console.log(this.allDescData);
                        }
                    });

                    new QuillEditor(descContent, false, true, this.quillTextContent);

                    this.storeDataContent(this.quillTextContent, TVYContentEditor.textType, randomDescId);
                }
                this.quillTextObj.setContents(null);
                break;
            case 'code':
                let codeElement = document.createElement('div');
                codeElement.className = 'descElement col-md-12';
                codeElement.setAttribute('data-desc-id', randomDescId);
                codeElement.innerHTML = descHTML;
                contentOrder.appendChild(codeElement);
                let descContent = codeElement.querySelector('.descContent');

                let deleteBtn = codeElement.querySelector('.toolDelete');
                let arrowUpBtn = codeElement.querySelector('.toolArrowUp');
                let arrowDownBtn = codeElement.querySelector('.toolArrowDown');

                deleteBtn.addEventListener('click', () => {
                    let selectedElement = this.getDescElementByDescId(randomDescId);
                    selectedElement.parentNode.removeChild(selectedElement);
                    this.updatePositionsAfterADescElementDeleted(randomDescId);
                });

                arrowUpBtn.addEventListener('click', () => {
                    let currentDescObj = this.getDescObjectByDescId(randomDescId);
                    let currentDescObjPos = currentDescObj.pos;
                    if(currentDescObjPos === 1){
                        new NotyAlertMessage(NotyAlertMessage.WARNING, '⚠️It is already at the top. Cannot move up anymore.').show();
                    }else{
                        let preDescObjPos = currentDescObjPos - 1;
                        let preDescObj = this.getDescObjectByPosition(preDescObjPos);

                        // Data content
                        let currentDescObjData = currentDescObj.data;
                        let currentDescObjType = currentDescObj.type;
                        let preDescObjData = preDescObj.data;
                        let preDescObjType = preDescObj.type;

                        // Desc element
                        let currentDescElement = this.getDescElementByDescId(randomDescId);
                        let preDescElement = this.getDescElementByDescId(preDescObj.desc_id);

                        let descContentCurrentDescElement = currentDescElement.querySelector('.descContent');
                        let descContentPreDescElement = preDescElement.querySelector('.descContent');
                        descContentCurrentDescElement.parentNode.removeChild(descContentCurrentDescElement);
                        descContentPreDescElement.parentNode.removeChild(descContentPreDescElement);

                        let newDescContentCurrentDescElement = document.createElement('div');
                        newDescContentCurrentDescElement.className = 'descContent';
                        currentDescElement.appendChild(newDescContentCurrentDescElement);

                        let newDescContentPreDescElement = document.createElement('div');
                        newDescContentPreDescElement.className = 'descContent';
                        preDescElement.appendChild(newDescContentPreDescElement);

                        // Exchange data content
                        if(currentDescObjType == TVYContentEditor.textType){
                            new QuillEditor(newDescContentPreDescElement, false, true, currentDescObjData);
                            this.updateDataOfADesc(currentDescObjData, TVYContentEditor.textType, preDescObj.desc_id);
                        }else if(currentDescObjType == TVYContentEditor.codeType){
                            new CodeMirrorEditor(newDescContentPreDescElement, CodeMirrorEditor.THEME_MATERIAL, CodeMirrorEditor.MODE_JAVASCRIPT,
                                true, currentDescObjData, null);
                            this.updateDataOfADesc(currentDescObjData, TVYContentEditor.codeType, preDescObj.desc_id);
                        }

                        if(preDescObjType == TVYContentEditor.textType){
                            new QuillEditor(newDescContentCurrentDescElement, false, true, preDescObjData);
                            this.updateDataOfADesc(preDescObjData, TVYContentEditor.textType, currentDescObj.desc_id);
                        }else if(preDescObjType == TVYContentEditor.codeType){
                            new CodeMirrorEditor(newDescContentCurrentDescElement, CodeMirrorEditor.THEME_MATERIAL, CodeMirrorEditor.MODE_JAVASCRIPT,
                                true, preDescObjData, null);
                            this.updateDataOfADesc(preDescObjData, TVYContentEditor.codeType, currentDescObj.desc_id);
                        }

                        // Update data content
                        
                        console.log(this.allDescData);
                    }
                });

                arrowDownBtn.addEventListener('click', () => {
                    let currentDescObj = this.getDescObjectByDescId(randomDescId);
                    let currentDesObjPos = currentDescObj.pos;
                    if(currentDesObjPos === this.descPosition){
                        new NotyAlertMessage(NotyAlertMessage.WARNING, '⚠️It is already at the bottom. Cannot move down anymore.').show();
                    }else{
                        let nextDescObjPos = currentDesObjPos + 1;
                        let newDescObj = this.getDescObjectByPosition(nextDescObjPos);

                        // Data content
                        let currentDescObjData = currentDescObj.data;
                        let currentDescObjType = currentDescObj.type;
                        let nextDescObjData = newDescObj.data;
                        let nextDescObjType = newDescObj.type;

                        // Desc element
                        let currentDescElement = this.getDescElementByDescId(randomDescId);
                        let nextDescElement = this.getDescElementByDescId(newDescObj.desc_id);

                        let descContentCurrentDescElement = currentDescElement.querySelector('.descContent');
                        let descContentNextDescElement = nextDescElement.querySelector('.descContent');
                        descContentCurrentDescElement.parentNode.removeChild(descContentCurrentDescElement);
                        descContentNextDescElement.parentNode.removeChild(descContentNextDescElement);

                        let newDescContentCurrentDescElement = document.createElement('div');
                        newDescContentCurrentDescElement.className = 'descContent';
                        currentDescElement.appendChild(newDescContentCurrentDescElement);

                        let newDescContentNextDescElement = document.createElement('div');
                        newDescContentNextDescElement.className = 'descContent';
                        nextDescElement.appendChild(newDescContentNextDescElement);

                        // Exchange data content
                        if(currentDescObjType == TVYContentEditor.textType){
                            new QuillEditor(newDescContentNextDescElement, false, true, currentDescObjData);
                            this.updateDataOfADesc(currentDescObjData, TVYContentEditor.textType, newDescObj.desc_id);
                        }else if(currentDescObjType == TVYContentEditor.codeType){
                            this.updateDataOfADesc(currentDescObjData, TVYContentEditor.codeType, newDescObj.desc_id);
                            new CodeMirrorEditor(newDescContentNextDescElement, CodeMirrorEditor.THEME_MATERIAL, CodeMirrorEditor.MODE_JAVASCRIPT,
                                true, currentDescObjData, null);
                        }

                        if(nextDescObjType == TVYContentEditor.textType){
                            new QuillEditor(newDescContentCurrentDescElement, false, true, nextDescObjData);
                            this.updateDataOfADesc(nextDescObjData, TVYContentEditor.textType, currentDescObj.desc_id);
                        }else if(nextDescObjType == TVYContentEditor.codeType){
                            new CodeMirrorEditor(newDescContentCurrentDescElement, CodeMirrorEditor.THEME_MATERIAL, CodeMirrorEditor.MODE_JAVASCRIPT,
                                true, nextDescObjData, null);
                            this.updateDataOfADesc(nextDescObjData, TVYContentEditor.codeType, currentDescObj.desc_id);
                        }

                        // Update data content

                        console.log(this.allDescData);
                    }
                });

                new CodeMirrorEditor(descContent, CodeMirrorEditor.THEME_MATERIAL, CodeMirrorEditor.MODE_JAVASCRIPT,
                    true, this.codeMirrorContent, null);

                this.storeDataContent(this.codeMirrorContent, TVYContentEditor.codeType, randomDescId);

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
