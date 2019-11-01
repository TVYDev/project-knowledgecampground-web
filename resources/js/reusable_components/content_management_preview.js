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

        this.contentPreview = this.querySelector('.contentPreview');
        this.reRenderHidden = this.querySelector('.reRender');

        this.reRenderHidden.addEventListener('click', this.handleContentPreview.bind(this));

        this.handlePreviewCheckBox();
        this.handleContentPreview();
    }

    static get CONTENT_TYPE_QUESTION()   {return 'content_type_question';}
    static get CONTENT_TYPE_ANSWER()     {return 'content_type_answer';}

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
            this.contentPreview.appendChild(mockedContentActionView);
        }
    }
}

window.customElements.define('tvy-content-management-preview', TVYContentManagementPreview);
