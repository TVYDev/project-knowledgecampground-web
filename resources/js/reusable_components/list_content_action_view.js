const html = `
    <div class="TVYListContentActionView">
        
    </div>
`;

class TVYListContentActionView extends HTMLElement
{
    constructor()
    {
        super();
        this.innerHTML = html;

        this.referencePublicId = this.getAttribute('data-reference-public-id');
        let contentType = this.getAttribute('data-content-type');
        if(contentType === 'question') {
            this.contentType = TVYListContentActionView.QUESTION_CONTENT_TYPE;
        }else {
            this.contentType = TVYListContentActionView.ANSWER_CONTENT_TYPE;
        }
    }

    static get QUESTION_CONTENT_TYPE()  {return 'question';}
    static get ANSWER_CONTENT_TYPE()    {return 'answer';}

    renderList ()
    {
        for(let i=0;i<3;i++) {

        }
    }

    createContentActionViewElement (publicId, avatarUrl, authorName, readableTime, contentType) {
        // let mockedContentActionView = document.createElement('tvy-content-action-view');
        // mockedContentActionView.setAttribute('data-public-id', this.publicId);
        // mockedContentActionView.setAttribute('data-avatar-url', this.avatarUrl);
        // mockedContentActionView.setAttribute('data-author-name', this.authorName);
        // mockedContentActionView.setAttribute('data-readable-time', readableTime);
        // mockedContentActionView.setAttribute('data-content-type', this.contentType);
        // this.contentPreview.appendChild(mockedContentActionView);
    }
}

window.customElements.define('tvy-list-content-action-view', TVYListContentActionView);
