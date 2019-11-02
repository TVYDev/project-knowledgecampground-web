const html = `
    <div class="TVYContentManagementPreview">
        <div class="ui form">
            <div class="inline field">
                <div class="ui toggle checkbox chkPreviewQuestion">
                    <input type="checkbox" name="chkPreviewQuestion" tabindex="0" class="hidden">
                    <label>Preview question</label>
                </div>
            </div>
        </div>
        <div class="orderAndPreview">
            <input type="hidden" name="reRender" class="reRender"/>
            <div class="contentPreview" hidden="hidden">    
            </div>
            <div class="contentOrder">
                <div class="TVYContentOrder col-md-12"></div>
            </div>
        </div>
    </div>
`;

class TVYContentManagementPreview extends HTMLElement
{
    constructor() {
        super();
        this.innerHTML = html;

        this.publicId = this.getAttribute('data-public-id');
        this.avatarUrl = this.getAttribute('data-avatar-url');
        this.authorName = this.getAttribute('data-author-name');
        this.dataContentType = this.getAttribute('data-content-type');

        this.contentPreview = this.querySelector('.contentPreview');
        this.reRenderHidden = this.querySelector('.reRender');

        this.reRenderHidden.addEventListener('click', this.handleContentPreview.bind(this));

        this.handlePreviewCheckBox();
        this.handleContentPreview();
    }

    handlePreviewCheckBox () {
        $('.TVYContentManagementPreview .chkPreviewQuestion').checkbox({
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

    handleContentPreview () {
        if(this.querySelector('tvy-content-action-view')){
            this.querySelector('.TVYContentActionView .reRender').click();
        }else {
            let mockedContentActionView = document.createElement('tvy-content-action-view');
            mockedContentActionView.setAttribute('data-question-public-id', this.publicId);
            mockedContentActionView.setAttribute('data-avatar-url', this.avatarUrl);
            mockedContentActionView.setAttribute('data-author-name', this.authorName);
            mockedContentActionView.setAttribute('data-readable-time', 'asked 6 seconds ago');
            mockedContentActionView.setAttribute('data-content-type', this.dataContentType);
            this.contentPreview.appendChild(mockedContentActionView);
        }
    }
}

window.customElements.define('tvy-content-management-preview', TVYContentManagementPreview);
