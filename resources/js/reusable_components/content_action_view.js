import QuillEditor from "../QuillEditor";
import CodeMirrorEditor from "../CodeMirrorEditor";

class TVYContentActionView extends HTMLElement
{
    constructor() {
        super();

        let markup = document.getElementById('tplContentActionView').innerHTML;
        this.innerHTML = markup;

        // Properties
        this._contentType = null;
        this._ownerAvatarUrl = null;
        this._authorName = null;
        this._authorId = null;
        this._readableTime = null;
        this._description = null;
        this._relativePathStoreImages = null;
        this._comments = [];
        this._isMockOnly = false;
        this._vote = 0;
        this._voteByViewer = 0;
        this._canSetBestAnswer = false;
        this._isBestAnswer = false;

        this.publicId = this.getAttribute('data-public-id');
        this.currentAvatarUrl = this.getAttribute('data-current-avatar-url');
        this.currentUsername = this.getAttribute('data-current-username');

        this.setBestAnswer = this.querySelector('.setBestAnswer');
        this.contentActionView = this.querySelector('.TVYContentActionView');

        this.viewPart = this.querySelector('.viewPart');
        this.actionPart = this.querySelector('.actionPart');
        this.askedOrEditedDate = this.actionPart.querySelector('.askedOrEditedDate');
        this.author = this.actionPart.querySelector('.authorIdentity .authorInfo');
        this.avatar = this.actionPart.querySelector('.authorIdentity .authorAvatar');
        this.avatarAddComment = this.querySelector('.addNewCommentBlock .authorAvatar');
        this.txtComment = this.querySelector('.txtComment');
        this.btnComment = this.querySelector('.commentButton');
        this.listOfComments = this.querySelector('.commentsBlock .listOfComments');
        this.numVote = this.querySelector('.vote .numVote');
        this.btnUpVote = this.querySelector('.vote .btnUpVote');
        this.btnDownVote = this.querySelector('.vote .btnDownVote');

        // this.loaderContent = document.createElement('div');
        // this.loaderContent.className = 'ui active centered inline text loader loaderContent';
        // this.loaderContent.innerHTML = 'Loading';
    }

    set contentType (contentType) {
        this._contentType = contentType;
    }
    get contentType () {
        return this._contentType;
    }

    set ownerAvatarUrl (url) {
        this._ownerAvatarUrl = url;
    }
    get ownerAvatarUrl () {
        return this._ownerAvatarUrl;
    }

    set authorName (name) {
        this._authorName = name;
    }
    get authorName () {
        return this._authorName;
    }

    set authorId (id) {
        this._authorId = id;
    }
    get authorId () {
        return this._authorId;
    }

    set readableTime (time) {
        this._readableTime = time;
    }
    get readableTime () {
        return this._readableTime;
    }

    set description (desc) {
        this._description = desc;
    }
    get description () {
        return this._description;
    }

    set relativePathStoreImages (path) {
        this._relativePathStoreImages = path;
    }
    get relativePathStoreImages () {
        return this._relativePathStoreImages;
    }

    set comments (comments) {
        this._comments = comments;
    }
    get comments () {
        return this._comments;
    }

    set isMockOnly (isMock) {
        this._isMockOnly = isMock;
    }
    get isMockOnly () {
        return this._isMockOnly;
    }

    set vote (vote) {
        this._vote = vote;
    }
    get vote () {
        return this._vote;
    }

    set voteByViewer (voteByViewer) {
        this._voteByViewer = voteByViewer;
    }
    get voteByViewer () {
        return this._voteByViewer;
    }

    set canSetBestAnswer (canSetBestAnswer) {
        this._canSetBestAnswer = canSetBestAnswer;
    }
    get canSetBestAnswer () {
        return this._canSetBestAnswer;
    }

    set isBestAnswer (isBestAnswer) {
        this._isBestAnswer = isBestAnswer;
    }
    get isBestAnswer () {
        return this._isBestAnswer;
    }

    get QUESTION_CONTENT_TYPE()  {return 'question';}
    get ANSWER_CONTENT_TYPE()    {return 'answer';}

    get UPVOTE() {return 'upvote';};
    get DOWNVOTE() {return 'downvote';}

    static get TEXT_TYPE()  {return 'text';}
    static get CODE_TYPE()  {return 'code';}
    static get IMAGE_TYPE() {return 'image';}

    upVoteHandler () {
        if(this.btnUpVote.classList.contains('selected')) {
            this._votePost(0, this.UPVOTE);
        }
        else {
            this._votePost(1, this.UPVOTE);
        }

    }

    downVoteHandler () {
        if(this.btnDownVote.classList.contains('selected')) {
            this._votePost(0, this.DOWNVOTE);
        }
        else {
            this._votePost(-1, this.DOWNVOTE);
        }

    }

    updateVoteUI (vote ,voteType) {
        this.numVote.textContent = vote;
        if(voteType === this.UPVOTE) {
            this.btnUpVote.classList.toggle('selected');
            this.btnUpVote.classList.toggle('far');
            this.btnUpVote.classList.toggle('fas');
            this.btnDownVote.classList.remove('selected');
            this.btnDownVote.classList.replace('fas', 'far');
        }
        else if(voteType === this.DOWNVOTE) {
            this.btnDownVote.classList.toggle('selected');
            this.btnDownVote.classList.toggle('far');
            this.btnDownVote.classList.toggle('fas');
            this.btnUpVote.classList.remove('selected');
            this.btnUpVote.classList.replace('fas', 'far');
        }
    }

    _saveComment() {
        let preparedData = {
            'commentable_public_id': this.publicId,
            'commentable_type': this.contentType,
            'body': this.txtComment.value
        };

        let url = window.location.origin + '/comment/post';
        $.ajax({
            url: url,
            headers: { 'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content') },
            data: preparedData,
            type: 'POST',
            success: (result) => {
                if(result.success == true) {
                    this.txtComment.value = '';
                    this._displayNewlyAddedComment(
                        this.currentAvatarUrl,
                        this.currentUsername,
                        this.authorId,
                        result.data.readable_time_en,
                        result.data.body
                    );
                }
            },
            error: function(err) {
                console.log('---Error');
                console.log(err);
            }
        });
    }

    _votePost(vote, voteType) {
        let preparedData = {
            'post_type': this.contentType,
            'post_public_id': this.publicId,
            'vote': vote
        };

        let url = window.location.origin + '/activity/vote-post';
        $.ajax({
            url: url,
            headers: { 'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content') },
            data: preparedData,
            type: 'POST',
            success: (result) => {
                if(result.success == true) {
                    this.vote = result.data.vote;
                    this.updateVoteUI(this.vote, voteType);
                }
            },
            error: function(err) {
                console.log('---Error');
                console.log(err);
            }
        });
    }

    _displayNewlyAddedComment (avatarUrl, authorName, authorId,readableTime, body) {
        let divSingleComment = document.createElement('div');
        divSingleComment.className = 'singleComment';
        const html = `
            <div><img class="authorAvatar" src="${avatarUrl}" alt="avatar"></div>
            <div>
                <div><a href="#${authorId}" class="authorName">${authorName}</a>&nbsp;&nbsp;&nbsp;<span class="commentDateTime">${readableTime}</span></div>
                <div>${body}</div>
            </div>
        `;
        divSingleComment.innerHTML = html;

        this.listOfComments.appendChild(divSingleComment);
    }

    getViewContent () {
        this._fillTheContent();
        if(this.isMockOnly === false) {
            this._fillInfoOfActionPart();
            this._fillListOfComments();
            this._addNecessaryEventListeners();
        }
        this._setUIForBestAnswer();
    }

    _setUIForBestAnswer() {
        if(this.contentType === this.ANSWER_CONTENT_TYPE) {
            this.setBestAnswer.removeAttribute('hidden');
        }else {
            this.contentActionView.style.marginTop = '5px';
        }

        if(!this.canSetBestAnswer && !this.isBestAnswer) {
            this.setBestAnswer.setAttribute('hidden', 'hidden');
        }

        if(this.isBestAnswer) {
            this.setBestAnswer.querySelector('.labelBestAnswer').textContent = '✔️ Best Answer';
            this.setBestAnswer.classList.add('selected');
            this.contentActionView.classList.add('selected');
        }
    }

    _fillVoteInfo () {
        let voteType = null;
        if(this.voteByViewer === 1) {
            voteType = this.UPVOTE;
        }
        else if(this.voteByViewer === -1) {
            voteType = this.DOWNVOTE;
        }
        this.updateVoteUI(this.vote, voteType);

        let titleBtnUpVote = 'Upvote';
        let titleBtnDownVote = 'Downvote';
        if(this.contentType === this.QUESTION_CONTENT_TYPE) {
            titleBtnUpVote = 'This question is clear and written with research effort';
            titleBtnDownVote = 'This question is not clear and written with less or no research effort';
        }
        else if(this.contentType === this.ANSWER_CONTENT_TYPE) {
            titleBtnUpVote = 'This answer is useful';
            titleBtnDownVote = 'This answer is not useful';
        }
        this.btnUpVote.setAttribute('title', titleBtnUpVote);
        this.btnDownVote.setAttribute('title', titleBtnDownVote);
    }

    _addNecessaryEventListeners () {
        this.btnComment.addEventListener('click', this._saveComment.bind(this));
        this.btnUpVote.addEventListener('click', this.upVoteHandler.bind(this));
        this.btnDownVote.addEventListener('click', this.downVoteHandler.bind(this));
    }

    _fillListOfComments () {
        this.comments.forEach(comment => {
            this._displayNewlyAddedComment(comment.avatar_url, comment.author_name, comment.author_id, comment.readable_time_en, comment.body);
        });
    }

    _fillInfoOfActionPart() {
        this.askedOrEditedDate.textContent = this.readableTime;
        this.author.setAttribute('data-author-id', this.authorId);
        this.author.textContent = this.authorName;
        this.avatar.setAttribute('data-author-id', this.authorId);
        this.avatar.setAttribute('src', this.ownerAvatarUrl);
        this.avatarAddComment.setAttribute('src', this.currentAvatarUrl);

        this._fillVoteInfo();
    }

    _fillTheContent () {
        this.viewPart.innerHTML = '';
        if(this.description != null && this.description.length > 0) {
            for (let i=0; i<this.description.length; i++){
                let description = this.description[i];
                this._addContent(description.data, description.type);
            }
        }else {
            this._addWarningNoContent();
        }
    }

    _addWarningNoContent () {
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

    _addContent (descData, type) {
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

            divImageContent.querySelector('.imageView').addEventListener('click', () => this._onClickZoomImage(imageUrl));
        }
    }

    _onClickZoomImage (imageUrl) {
        let modalContentHtml = `
            <img class="imageFile" src="${imageUrl}" style="width: 100%; border-radius: 5px;"/>
        `;
        document.querySelector('.ui.basic.modal.modalZoomImage .content').innerHTML = modalContentHtml;
        $('.ui.basic.modal.modalZoomImage').modal('show');
    }
}

window.customElements.define('tvy-content-action-view', TVYContentActionView);
