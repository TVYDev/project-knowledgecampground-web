import QuillEditor from "../QuillEditor";
import CodeMirrorEditor from "../CodeMirrorEditor";

const html = `
<div class="TVYContentActionView">
    <input type="hidden" name="reRender" class="reRender" />
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

        this.descriptionContent = null;

        this.viewPart = this.querySelector('.viewPart');
        this.actionPart = this.querySelector('.actionPart');
        this.askedOrEditedDate = this.actionPart.querySelector('.askedOrEditedDate');
        this.author = this.actionPart.querySelector('.authorIdentity .authorInfo');
        this.avatar = this.actionPart.querySelector('.authorIdentity .authorAvatar');
        this.reRenderHidden = this.querySelector('.reRender');

        this.reRenderHidden.addEventListener('click', this.getDescriptionContent.bind(this));

        this.fillInfoOfActionPart();
        this.getDescriptionContent();
    }

    static get TEXT_TYPE()  {return 'text';}
    static get CODE_TYPE()  {return 'code';}
    static get IMAGE_TYPE() {return 'image';}

    getDescriptionContent ()
    {
        let url = window.location.origin + '/question/description-of/' + this.getAttribute('data-question-public-id');
        $.ajax({
            url: url,
            headers: { 'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content') },
            type: 'GET',
            success: (result) => {
                if(result){
                    this.descriptionContent = JSON.parse(result);
                    this.fillTheContent();
                }
            },
            error: function(err) {
                console.log('---Error');
                console.log(err);
            }
        });
    }

    fillInfoOfActionPart ()
    {
        this.askedOrEditedDate.textContent = this.getAttribute('data-readable-time');
        this.author.setAttribute('data-author-id', this.getAttribute('data-author-id'));
        this.author.textContent = this.getAttribute('data-author-name');
        this.avatar.setAttribute('data-author-id', this.getAttribute('data-author-id'));
        this.avatar.setAttribute('src', this.getAttribute('data-avatar-url'));
    }

    fillTheContent ()
    {
        if(this.descriptionContent != null) {
            this.viewPart.innerHTML = '';
            for (let i=0; i<this.descriptionContent.length; i++){
                let description = this.descriptionContent[i];
                this.addContent(description.data, description.type);
            }
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
        else if(type === TVYContentActionView.IMAGE_TYPE){
            let imageCaption = '';
            if(descData.caption !== '')
            {
                imageCaption = `<strong>Caption:&nbsp;</strong>${descData.caption}`;
            }
            let imageUrl = `${this.getAttribute('data-relative-path-image')}${descData.image_file_name}`;

            let divImageContent = document.createElement('div');
            divImageContent.className = 'imageContent';
            divImageContent.innerHTML = `
                <div class="imageView">
                    <img class="imageFile" src="${imageUrl}"/>
                    <div class="toolZoomImage">
                        <i class="fas fa-search-plus"></i>&nbsp;Click to zoom in
                    </div>
                </div>
                <p class="imageCaption">${imageCaption}</p>
            `;
            element.appendChild(divImageContent);

            divImageContent.querySelector('.imageView').addEventListener('click', () => this.onClickZoomImage(imageUrl));
        }
    }

    onClickZoomImage (imageUrl) {
        let modalContentHtml = `
            <img class="imageFile" src="${imageUrl}" style="width: 100%; border-radius: 5px;"/>
        `;
        document.querySelector('.ui.basic.modal.modalZoomImage .content').innerHTML = modalContentHtml;
        $('.ui.basic.modal.modalZoomImage').modal('show');
    }
}

window.customElements.define('tvy-content-action-view', TVYContentActionView);
