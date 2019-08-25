import QuillEditor from "../QuillEditor";

const html = `
<div class="TVYContentActionView">
    <div class="viewPart">
        View Part
    </div>
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

        this.fillTheContent();
    }

    fillTheContent ()
    {
        this.addTextContent();
    }

    addTextContent ()
    {
        let textElement = document.createElement('div');
        textElement.className = 'textDescElement col-md-12';
        this.viewPart.appendChild(textElement);

        new QuillEditor(textElement, false, true, null);
    }
}

window.customElements.define('tvy-content-action-view', TVYContentActionView);
