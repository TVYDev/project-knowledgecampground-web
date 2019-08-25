import QuillEditor from "../QuillEditor";

const html = `
<div class="TVYContentActionView">
    <div class="viewPart"></div>
    <div class="actionPart">
        <div class="vote">
            <i class="far fa-thumbs-up selected"></i>
            <span class="numVote">23</span>
            <i class="far fa-thumbs-down"></i>
            <span class="askedOrEditedDate">Asked seconds ago</span>
        </div>
        <div class="authorIdentity">
            <span class="authorInfo">Vannyou Tang</span>
            <img class="authorAvatar" src="https://static.wixstatic.com/media/4a8176_6b644eece35c4e7588411663df2b1560~mv2.png/v1/fill/w_1000,h_1000,al_c,q_90/file.jpg" alt="avatar">    
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
