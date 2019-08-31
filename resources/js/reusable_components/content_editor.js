import NotyAlertMessage from "../NotyAlertMessage";
import QuillEditor from "../QuillEditor";

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
                                <select class="ui fluid dropdown codeEditorMode" id="codeEditorMode">
                                    <option>JavaScript</option>
                                    <option>HTML</option>
                                </select>
                            </div>
                            <div class="field">
                                <label for="codeEditorTheme">Theme</label>
                                <select class="ui fluid dropdown codeEditorTheme" id="codeEditorTheme">
                                    <option>Light Theme</option>
                                    <option>Dark Theme</option>
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
        this.imageEditor = this.querySelector('.editor #TVYImageEditor');
        this.btnAddContent = this.querySelector('.actionContentEditor .btnAddContent');
        this.contentOrder = document.querySelector('.askQuestionContent .questionPreview .TVYContentOrder');

        this.allDescData = [];
        this.descPosition = 0;

        this.groupDescId = Math.random().toString(36).replace('0.', '');

        this.tabEditorMovement();
        this.quillTextObj = new QuillEditor(this.actualTextEditor).getQuill();
        this.codeMirrorObj = CodeMirror(this.actualCodeEditor, {
            value: "",
            theme: 'monokai',
            mode:  "javascript",
            autoFocus: true,
            lineNumbers: true,
            autoRefresh: true,
            styleActiveLine: true,
            styleSelectedText: true,
            showCursorWhenSelecting: true,
            autoCloseBrackets: true,
            matchBrackets: true,
            extraKeys: {
                "Ctrl-Space": "autocomplete",
            },
        });
        this.codeMirrorObj.focus();

        this.btnAddContent.addEventListener('click', this.addContentListener.bind(this));
    }

    static get textType()   {return 'text';}
    static get codeType()   {return 'code';}
    static get imageType()  {return 'image';}

    addContentListener () {
        let thisBtn = this.querySelector('.btnAddContent');
        let dataType = thisBtn.getAttribute('data-type');

        let descHTML = `
            <div class="descTools" draggable="true">
                <span>
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
                            let preDescObjData = preDescObj.data;

                            // Desc element
                            let currentDescElement = this.getDescElementByDescId(randomDescId);
                            let preDescElement = this.getDescElementByDescId(preDescObj.desc_id);

                            // Exchange data content
                            new QuillEditor(currentDescElement.querySelector('.descContent'), false, true, preDescObjData);
                            new QuillEditor(preDescElement.querySelector('.descContent'), false, true, currentDescObjData);

                            // Update data content
                            this.updateDataOfADesc(currentDescObjData, preDescObj.desc_id);
                            this.updateDataOfADesc(preDescObjData, currentDescObj.desc_id);
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
                            let nextDescObjData = newDescObj.data;

                            // Desc element
                            let currentDescElement = this.getDescElementByDescId(randomDescId);
                            let nextDescElement = this.getDescElementByDescId(newDescObj.desc_id);

                            // Exchange data content
                            new QuillEditor(currentDescElement.querySelector('.descContent'), false, true, nextDescObjData);
                            new QuillEditor(nextDescElement.querySelector('.descContent'), false, true, currentDescObjData);

                            // Update data content
                            this.updateDataOfADesc(currentDescObjData, newDescObj.desc_id);
                            this.updateDataOfADesc(nextDescObjData, currentDescObj.desc_id);
                        }
                    });

                    new QuillEditor(descContent, false, true, this.quillTextContent);

                    this.storeDataContent(this.quillTextContent, TVYContentEditor.textType, randomDescId);
                }
                this.quillTextObj.setContents(null);
                break;
            case 'code':
                console.log('code111');
                break;
            case 'image':
                console.log('image111');
                break;
            default: break;
        }
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
                break;
            case TVYContentEditor.imageType:
                break;
            default:
                break;
        }
        console.log('Data saved----------');
        this.saveDescDataToBackend(true);
        console.log('Data saved----------End');
    }

    updateDataOfADesc(data, descId) {
        this.allDescData.forEach(ele => {
           if(ele.desc_id === descId){
               ele.data = data;
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
                console.log(result);
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
