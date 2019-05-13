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
                        I am text editor
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
                <button type="button" class="btnAddContent" data-type="text">Add</button>
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
        console.log(this.contentOrder);

        this.tapEditorMovement();
        this.quillTextObj = this.renderQuillTextEditor();

        this.btnAddContent.addEventListener('click', this.addContentListener);
    }

    addContentListener() {
        let thisBtn = this;
        let dataType = thisBtn.getAttribute('data-type');

        let descHTML = `
            <div class="descElement col-md-12" data-type="type" data-position="position" data-total-element="total" data-desc-id="0001">
                <div class="descTools">
                    <button class="toolArrowUp"><i class="fas fa-arrow-up"></i></button>
                    <button class="toolArrowDown"><i class="fas fa-arrow-down"></i></button>
                    <button class="toolEdit"><i class="fas fa-pen"></i></button>
                    <button class="toolDelete"><i class="fas fa-trash-alt"></i></button>
                </div>
                <div class="descContent">
                    Hello I am here
                </div>
            </div>
        `;

        switch(dataType)
        {
            case 'text':
                console.log('text111');
                console.log(this);
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

    tapEditorMovement() {
        this.allTabs.forEach( ele => {
            ele.addEventListener('click', () => {
                // tap changed on click
                this.allTabs.forEach( e => {
                    e.classList.remove('selected');
                });
                ele.classList.add('selected');

                let dataType = ele.getAttribute('data-type');
                console.log(this.allEditors);

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
            theme: 'snow'
        });
    }

    connectedCallback()
    {
        console.log('TVYContentEditor is rendered');
    }
}

window.customElements.define('tvy-content-editor', TVYContentEditor);
