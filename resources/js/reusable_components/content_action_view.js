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
        this.relativePathStoreImages = null;

        let contentType = this.getAttribute('data-content-type');
        if(contentType === 'answer') {
            this.contentType = TVYContentActionView.ANSWER_CONTENT_TYPE;
        }else {
            this.contentType = TVYContentActionView.QUESTION_CONTENT_TYPE;
        }

        this.viewPart = this.querySelector('.viewPart');
        this.actionPart = this.querySelector('.actionPart');
        this.askedOrEditedDate = this.actionPart.querySelector('.askedOrEditedDate');
        this.author = this.actionPart.querySelector('.authorIdentity .authorInfo');
        this.avatar = this.actionPart.querySelector('.authorIdentity .authorAvatar');
        this.reRenderHidden = this.querySelector('.reRender');

        this.loaderContent = document.createElement('div');
        this.loaderContent.className = 'ui active centered inline text loader loaderContent';
        this.loaderContent.innerHTML = 'Loading';

        this.reRenderHidden.addEventListener('click', this.getDescriptionContent.bind(this));

        this.getDescriptionContent();
    }

    static get TEXT_TYPE()  {return 'text';}
    static get CODE_TYPE()  {return 'code';}
    static get IMAGE_TYPE() {return 'image';}

    static get QUESTION_CONTENT_TYPE()  {return 'question';}
    static get ANSWER_CONTENT_TYPE()    {return 'answer';}

    getDescriptionContent ()
    {
        let routePath = null;
        if(this.contentType === TVYContentActionView.QUESTION_CONTENT_TYPE) {
            routePath = '/question/content-of-question/';
        }else {
            routePath = '/answer/description-of/';
        }
        let url = window.location.origin + routePath + this.getAttribute('data-public-id');
        $.ajax({
            url: url,
            headers: { 'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content') },
            type: 'GET',
            beforeSend: (xhr) => {
                this.viewPart.innerHTML = '';
                this.viewPart.appendChild(this.loaderContent);
                this.actionPart.style.visibility = 'hidden';
            },
            success: (result) => {
                this.viewPart.removeChild(this.loaderContent);
                if(result.success){
                    this.descriptionContent = JSON.parse(result.data);
                    this.relativePathStoreImages = result.relative_path_store_images;
                    this.fillTheContent();

                    this.fillInfoOfActionPart(result.readable_time, result.author_id, result.author_name, result.avatar_url);
                    this.actionPart.style.visibility = 'visible';
                }else {
                    this.addWarningNoContent();
                }
            },
            error: function(err) {
                console.log('---Error');
                console.log(err);
            }
        });
    }

    fillInfoOfActionPart (readableTime, authorId, authorName, avatarUrl)
    {
        this.askedOrEditedDate.textContent = readableTime;
        this.author.setAttribute('data-author-id', authorId);
        this.author.textContent = authorName;
        this.avatar.setAttribute('data-author-id', authorId);
        this.avatar.setAttribute('src', avatarUrl);
    }

    fillTheContent ()
    {
        this.viewPart.innerHTML = '';
        if(this.descriptionContent != null && this.descriptionContent.length > 0) {
            for (let i=0; i<this.descriptionContent.length; i++){
                let description = this.descriptionContent[i];
                this.addContent(description.data, description.type);
            }
        }else {
            this.addWarningNoContent();
        }
    }

    addWarningNoContent () {
        let element = document.createElement('div');
        element.className = 'ui warning floating message';
        let html = `
            <div class="header">
                No content to preview
            </div>
            Please add some description!
        `;
        element.innerHTML = html;
        this.viewPart.appendChild(element);
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
            let imageUrl = `${this.relativePathStoreImages}${descData.image_file_name}`;
            // suffix with image url to prevent image from caching, otherwise the same url will point to cache image rather than image in the server
            let currentTimeStamp = Date.now();
            let imageUrlWithTimeStamp = `${imageUrl}?${currentTimeStamp}`;

            let divImageContent = document.createElement('div');
            divImageContent.className = 'imageContent';
            divImageContent.innerHTML = `
                <div class="imageView">
                    <img class="imageFile" src="${imageUrlWithTimeStamp}"/>
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
