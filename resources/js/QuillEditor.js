export default class QuillEditor {

    get toolbarOptions() {
        return [
            ['bold', 'italic', 'underline', 'strike', 'blockquote'],
            [{ 'list': 'ordered'}, { 'list': 'bullet' }],
            [{ 'script': 'sub'}, { 'script': 'super' }],
            [{ 'indent': '-1'}, { 'indent': '+1' }],
            [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
            [{ 'align': [] }],
            ['clean']
        ];
    }

    constructor (selector, hasToolbar = true, isReadOnly = false, dataContent = null) {
        this.selector = selector;
        this.hasToolbar = hasToolbar;
        this.isReadOnly = isReadOnly;
        this.dataContent = dataContent;

        this.quill = new Quill(this.selector, {
            theme: 'snow',
            modules: {
                toolbar: (this.hasToolbar === true) ? this.toolbarOptions : false
            },
            readOnly: this.isReadOnly
        });

        this.quill.setContents(this.dataContent);
    }

    getQuill() {
        return this.quill;
    }

    getContent() {
        return this.quill.getContents();
    }

    getLength() {
        return this.quill.getLength();
    }

    setFocus() {
        this.quill.focus();
    }

    setContent(content) {
        this.quill.setContents(content);
    }

    clearContent() {
        this.setContent(null);
        this.setFocus();
    }
}
