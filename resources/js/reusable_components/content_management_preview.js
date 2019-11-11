const html = `
    <div class="TVYContentManagementPreview">
        <div class="ui form">
            <div class="inline field">
                <div class="ui toggle checkbox chkPreviewContent">
                    <input type="checkbox" name="chkPreviewContent" tabindex="0" class="hidden">
                    <label class="lblPreviewContent"></label>
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
        let dataContentType = this.getAttribute('data-content-type');
        if(dataContentType === 'question') {
            this.contentType = TVYContentManagementPreview.QUESTION_CONTENT_TYPE;
        }else {
            this.contentType = TVYContentManagementPreview.ANSWER_CONTENT_TYPE;
        }

        this.contentPreview = this.querySelector('.contentPreview');
        this.reRenderHidden = this.querySelector('.reRender');
        this.lblPreviewContent = this.querySelector('.lblPreviewContent');

        this.reRenderHidden.addEventListener('click', this.handleContentPreview.bind(this));

        this.setLabelTextPreviewContent();
        this.handlePreviewCheckBox();
        this.handleContentPreview();
    }

    static get QUESTION_CONTENT_TYPE()  {return 'question';}
    static get ANSWER_CONTENT_TYPE()    {return 'answer';}

    setLabelTextPreviewContent () {
        let text = '';
        if(this.contentType === TVYContentManagementPreview.QUESTION_CONTENT_TYPE) {
            text = 'Preview your question';
        }else {
            text = 'Preview your answer';
        }
        this.lblPreviewContent.innerHTML = text;
    }

    handlePreviewCheckBox () {
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

    handleContentPreview () {
        if(this.querySelector('tvy-content-action-view')){
            this.querySelector('.TVYContentActionView .reRender').click();
        }else {
            let readableTime = (this.contentType === TVYContentManagementPreview.QUESTION_CONTENT_TYPE ? 'asked' : 'answered') + ' 6 seconds ago';

            let mockedContentActionView = document.createElement('tvy-content-action-view');
            mockedContentActionView.setAttribute('data-public-id', this.publicId);
            mockedContentActionView.setAttribute('data-avatar-url', this.avatarUrl);
            mockedContentActionView.setAttribute('data-author-name', this.authorName);
            mockedContentActionView.setAttribute('data-readable-time', readableTime);
            mockedContentActionView.setAttribute('data-content-type', this.contentType);
            this.contentPreview.appendChild(mockedContentActionView);
        }
    }
}

window.customElements.define('tvy-content-management-preview', TVYContentManagementPreview);
