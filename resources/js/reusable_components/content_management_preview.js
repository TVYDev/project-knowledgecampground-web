class TVYContentManagementPreview extends HTMLElement
{
    constructor() {
        super();

        let html = document.getElementById('tplContentManagementPreview').innerHTML;
        this.innerHTML = html;

        // Properties
        this._contentType = null;

        this.publicId = this.getAttribute('data-public-id');

        this.contentPreview = this.querySelector('.contentPreview');
        this.reRenderHidden = this.querySelector('.reRender');
        this.lblPreviewContent = this.querySelector('.lblPreviewContent');
        this.mockedContentActionView = this.querySelector('tvy-content-action-view[data-for="mock-only"]');

        this.mockedContentActionView.setAttribute('data-public-id', this.publicId);

        this.reRenderHidden.addEventListener('click', this._handleMockedContentActionView.bind(this));
    }

    set contentType (type) {
        this._contentType = type;
    }
    get contentType () {
        return this._contentType;
    }

    get QUESTION_CONTENT_TYPE()  {return 'question';}
    get ANSWER_CONTENT_TYPE()    {return 'answer';}

    getManagementPreview () {
        this._handlePreviewCheckBox();
    }

    _handlePreviewCheckBox () {
        $('.TVYContentManagementPreview .chkPreviewContent').checkbox({
            onChecked: function() {
                $('.TVYContentManagementPreview .contentPreview').removeAttr('hidden');
                $('.TVYContentManagementPreview .contentOrder').attr('hidden', 'hidden');
            },
            onUnchecked: function() {
                $('.TVYContentManagementPreview .contentOrder').removeAttr('hidden');
                $('.TVYContentManagementPreview .contentPreview').attr('hidden', 'hidden');
            }
        });
    }

    _handleMockedContentActionView () {
        let url = window.location.origin + `/${this.contentType}/get-info/` + this.publicId;

        $.ajax({
            url: url,
            headers: { 'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content') },
            type: 'GET',
            success: result => {
                if(result.success === true) {
                    const { description, relativePathStoreImages } = result.data;
                    let contentActionView = this.mockedContentActionView;
                    contentActionView.isMockOnly = true;
                    contentActionView.description = JSON.parse(description);
                    contentActionView.relativePathStoreImages = relativePathStoreImages;
                    contentActionView.getViewContent();
                }
            },
            error: err => {
                console.log(`Error getting content of ${type} [${this.publicId}]`, err);
            }
        });
    }
}

window.customElements.define('tvy-content-management-preview', TVYContentManagementPreview);
