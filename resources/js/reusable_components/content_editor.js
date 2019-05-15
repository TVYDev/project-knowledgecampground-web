const html = `
    <div class="TVYContentProduction">
        <div class="TVYContentOrder col-md-12"></div>
        <div class="TVYContentEditor col-md-12">
            <div class="tabTypeContent">
               <button type="button" class="btnAddPlainText selected" data-type="text">Add plain text</button>
               <button type="button" class="btnAddCodingBlock" data-type="code">Add coding block</button>
               <button type="button" class="btnAddImage" data-type="image">Add image</button>
            </div>
            <div class="editor">
                <div id="TVYTextEditor">
                    <div class="actualTextEditor">
                    </div>
                </div>
                <div id="TVYCodeEditor" hidden="hidden">
                    I am code editor
                </div>
                <div id="TVYImageEditor" hidden="hidden">
                    I am image selector
                </div>
            </div>
            <div class="actionContentEditor">
                <button type="button" class="btnAddContent" data-type="text">Save</button>
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
        this.imageEditor = this.querySelector('.editor #TVYImageEditor');
        this.btnAddContent = this.querySelector('.actionContentEditor .btnAddContent');
        this.contentOrder = this.querySelector('.TVYContentOrder');

        this.allDataContents = [];
        this.dataPosition = 0;

        this.tapEditorMovement();
        this.quillTextObj = this.renderQuillTextEditor();

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
            <div class="descContent">
                Hello I am here
            </div>
        `;

        let contentOrder = this.querySelector('.TVYContentOrder');
        let randomDescId = Math.random().toString(36).replace('0.', '');

        switch(dataType)
        {
            case 'text':
                if(this.quillTextObj.getLength() === 1)
                {
                    new Noty({
                        type: 'warning',
                        theme: 'nest',
                        layout: 'topRight',
                        text: '⚠️You cannot add empty plain text.',
                        timeout: '6000',
                        progressBar: true,
                        closeWith: ['click'],
                        animation: {
                            open: 'animated flipInY', // Animate.css class names
                            close: 'animated flipOutY' // Animate.css class names
                        }
                    }).show();
                    break;
                }

                let textEditor = this.querySelector('#TVYTextEditor');
                let dataEditing = textEditor.getAttribute('data-editing');
                if(dataEditing != null){
                    let editingDescEle = this.getBeingEditedDescElement(dataEditing);
                    let descTools = editingDescEle.querySelector('.descTools');
                    let q = new Quill(editingDescEle.querySelector('.descContent'), {
                        theme: 'snow',
                        modules: {
                            toolbar: false
                        },
                        readOnly: true
                    });
                    q.setContents(this.quillTextContent);

                    this.updateDataContent(this.quillTextContent, dataEditing);

                    descTools.classList.remove('editing');
                    descTools.classList.add('edited');
                    textEditor.removeAttribute('data-editing');
                }
                else{
                    let textElement = document.createElement('div');
                    textElement.className = 'descElement col-md-12';
                    textElement.setAttribute('data-type', 'type');
                    textElement.setAttribute('data-position', 'position');
                    textElement.setAttribute('data-total-element', 'total');
                    textElement.setAttribute('data-desc-id', randomDescId);
                    textElement.innerHTML = descHTML;
                    contentOrder.appendChild(textElement);
                    let descContent = textElement.querySelector('.descContent');
                    let descTools = textElement.querySelector('.descTools');

                    let editBtn = textElement.querySelector('.toolEdit');
                    editBtn.addEventListener('click', () => {
                        this.quillTextObj.setContents(this.getDataContentByDescId(randomDescId));
                        let allDescTools = this.querySelectorAll('.descTools');
                        textEditor.setAttribute('data-editing', randomDescId);
                        allDescTools.forEach(ele => {
                           ele.classList.remove('editing');
                           ele.classList.remove('edited');
                        });
                        descTools.classList.add('editing');
                    });

                    let q = new Quill(descContent, {
                        theme: 'snow',
                        modules: {
                            toolbar: false
                        },
                        readOnly: true
                    });
                    q.setContents(this.quillTextContent);

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
        let position = ++(this.dataPosition);
        switch(type) {
            case TVYContentEditor.textType:
                this.allDataContents.push({pos: position, type: TVYContentEditor.textType, data: dataContent, descId: descId});
                break;
            case TVYContentEditor.codeType:
                break;
            case TVYContentEditor.imageType:
                break;
            default:
                break;
        }
        console.log('Data saved----------');
        console.log(this.allDataContents);
        console.log('Data saved----------End');
    }

    updateDataContent(dataContent, descId) {
        this.allDataContents.forEach(ele => {
           if(ele.descId === descId){
               ele.data = dataContent;
           }
        });
    }

    getDataContentByDescId(descId) {
        let descFiltered = this.allDataContents.filter(desc => desc.descId === descId);
        return descFiltered[0].data;
    }

    getBeingEditedDescElement(descId) {
        let allDescElements = this.querySelectorAll('.TVYContentOrder .descElement');
        let wantedElement = null;
        allDescElements.forEach(ele => {
           if(ele.getAttribute('data-desc-id') === descId){
               wantedElement = ele;
           }
        });
        return wantedElement;
    }

    tapEditorMovement() {
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

    renderQuillTextEditor()
    {
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

        return new Quill(this.actualTextEditor, {
            theme: 'snow',
            modules: {
                toolbar: toolbarOptions
            }
        });
    }

    connectedCallback()
    {
        console.log('TVYContentEditor is rendered');
    }
}

window.customElements.define('tvy-content-editor', TVYContentEditor);
