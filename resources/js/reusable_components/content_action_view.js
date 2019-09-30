import QuillEditor from "../QuillEditor";
import CodeMirrorEditor from "../CodeMirrorEditor";

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

    static get TEXT_TYPE()  {return 'text';}
    static get CODE_TYPE()  {return 'code';}

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
            let description = this.descriptionContent[i];
            this.addContent(description.data, description.type);
        }
    }

    addContent (descData, type)
    {
        let element = document.createElement('div');
        element.className = 'descElementForView col-md-12';
        this.viewPart.appendChild(element);

        if(type === TVYContentActionView.TEXT_TYPE){
            new QuillEditor(element, false, true, descData);
        }
        else if(type === TVYContentActionView.CODE_TYPE){
            new CodeMirrorEditor(element, CodeMirrorEditor.THEME_MATERIAL, CodeMirrorEditor.MODE_JAVASCRIPT,
                        true, descData);
        }
    }
}

window.customElements.define('tvy-content-action-view', TVYContentActionView);
