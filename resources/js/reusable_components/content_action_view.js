import QuillEditor from "../QuillEditor";

const html = `
<div class="TVYContentActionView">
    <div class="viewPart"></div>
    <div class="actionPart">
        <div class="vote">
            <i class="far fa-thumbs-up selected"></i>
            <span class="numVote">23</span>
            <i class="far fa-thumbs-down"></i>
        </div>
        <div class="askedOrEditedDate"></div>
        <div class="authorIdentity">
            <div><a href="#" class="authorInfo"></a></div>
            <div><img class="authorAvatar" src="" alt="avatar"></div>    
        </div>
    </div>
</div>
`;

class TVYContentActionView extends HTMLElement
{
    constructor() {
        super();
        this.innerHTML = html;

        this.viewPart = this.querySelector('.viewPart');
        this.actionPart = this.querySelector('.actionPart');
        this.askedOrEditedDate = this.actionPart.querySelector('.askedOrEditedDate');
        this.author = this.actionPart.querySelector('.authorIdentity .authorInfo');
        this.avatar = this.actionPart.querySelector('.authorIdentity .authorAvatar');

        this.fillInfoOfActionPart();

        this.descriptionContent = JSON.parse(this.getDescriptionContent());
        this.fillTheContent();
    }

    getDescriptionContent ()
    {
        let url = window.location.origin + '/question/description-of/' + this.getAttribute('data-question-public-id');
        let descriptionContent = null;
        $.ajax({
            async: false,
            url: url,
            headers: { 'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content') },
            type: 'GET',
            success: function(result) {
                descriptionContent = result;
            },
            error: function(err) {
                console.log('---Error');
                console.log(err);
            }
        });
        return descriptionContent;
    }

    fillInfoOfActionPart ()
    {
        this.askedOrEditedDate.textContent = this.getAttribute('data-readable-time');
        console.log(this.getAttribute('data-readable-time'));
        this.author.setAttribute('data-author-id', this.getAttribute('data-author-id'));
        this.author.textContent = this.getAttribute('data-author-name');
        this.avatar.setAttribute('data-author-id', this.getAttribute('data-author-id'));
        this.avatar.setAttribute('src', this.getAttribute('data-avatar-url'));
    }

    fillTheContent ()
    {
        let descCount = this.descriptionContent.length;
        for (let i=0; i<descCount; i++){
            switch (this.descriptionContent[i].type) {
                case 'text':
                    this.addTextContent(this.descriptionContent[i].data);
                    break;
                default:
                    break;
            }
        }
    }

    addTextContent (descData)
    {
        let textElement = document.createElement('div');
        textElement.className = 'textDescElement col-md-12';
        this.viewPart.appendChild(textElement);

        new QuillEditor(textElement, false, true, descData);
    }
}

window.customElements.define('tvy-content-action-view', TVYContentActionView);
