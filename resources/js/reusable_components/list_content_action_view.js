const html = `
    <div class="TVYListContentActionView">
        <div class="headerBlock">
            <div>
                <i class="fas fa-lightbulb"></i>
                <span class="numRecords"></span>
            </div>
            <div>
                Sort by:&nbsp;
                <button class="btn btnMostDated">Most dated</button>
                &nbsp;|&nbsp;
                <button class="btn btnMostHelpful">Most helpful</button>
            </div>
        </div>
        <div class="list"></div>   
    </div>
`;

class TVYListContentActionView extends HTMLElement
{
    constructor()
    {
        super();
        this.innerHTML = html;

        this.sortedType = TVYListContentActionView.MOST_DATED_SORTED;
        this.currentAvatarUrl = this.getAttribute('data-current-avatar-url');
        this.currentUsername = this.getAttribute('data-current-username');
        this.referencePublicId = this.getAttribute('data-reference-public-id');
        let contentType = this.getAttribute('data-content-type');
        if(contentType === 'question') {
            this.contentType = TVYListContentActionView.QUESTION_CONTENT_TYPE;
        }else {
            this.contentType = TVYListContentActionView.ANSWER_CONTENT_TYPE;
        }

        this.listContentActionView = this.querySelector('.TVYListContentActionView .list');
        this.headerBlock = this.querySelector('.headerBlock');
        this.numRecords = this.querySelector('.numRecords');
        this.btnMostHelpful = this.querySelector('.btnMostHelpful');
        this.btnMostDated = this.querySelector('.btnMostDated');


        this.handleSortRecords(this.sortedType);
        this.btnMostDated.addEventListener('click', () => this.handleSortRecords(TVYListContentActionView.MOST_DATED_SORTED));
        this.btnMostHelpful.addEventListener('click', () => this.handleSortRecords(TVYListContentActionView.MOST_HELPFUL_SORTED));

        this.headerBlock.style.visibility = 'hidden';
        this.renderList();
    }

    static get MOST_HELPFUL_SORTED()    {return 'helpful';}
    static get MOST_DATED_SORTED()      {return 'dated';}

    static get QUESTION_CONTENT_TYPE()  {return 'question';}
    static get ANSWER_CONTENT_TYPE()    {return 'answer';}

    handleSortRecords (sortedType)
    {
        if(this.sortedType !== sortedType) {
            this.sortedType = sortedType;
            this.renderList();
        }
        if(sortedType === TVYListContentActionView.MOST_DATED_SORTED) {
            this.btnMostDated.classList.add('active');
            this.btnMostHelpful.classList.remove('active');
        }else {
            this.btnMostHelpful.classList.add('active');
            this.btnMostDated.classList.remove('active');
        }
    }

    renderList ()
    {
        let url = window.location.origin + '/answer/list-posted-answers-of-question/' + this.referencePublicId + '/' + this.sortedType;
        $.ajax({
            url: url,
            headers: { 'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content') },
            type: 'GET',
            success: (result) => {
                this.updateInfoOfHeaderBlock(result.length);
                this.createContentActionViewElements(result);
            },
            error: function(err) {
                console.log('---Error');
                console.log(err);
            }
        });
    }

    updateInfoOfHeaderBlock(numRecords) {
        let typeRecord = '';
        if(this.contentType === TVYListContentActionView.ANSWER_CONTENT_TYPE){
            typeRecord = 'Answer';
        }else {
            typeRecord = 'Question';
        }

        let pluralOrNot = numRecords > 1 ? 's' : '';
        this.numRecords.innerHTML = `${numRecords} ${typeRecord}${pluralOrNot}`;
        this.headerBlock.style.visibility = 'visible';
    }

    createContentActionViewElements (arrayPublicIds) {
        this.listContentActionView.innerHTML = '';
        let tempHtml = '';
        for(let i=0; i<arrayPublicIds.length; i++) {
            tempHtml += `
                <tvy-content-action-view 
                    data-public-id="${arrayPublicIds[i]}" 
                    data-content-type="${this.contentType}"
                    data-current-avatar-url="${this.currentAvatarUrl}"
                    data-current-username="${this.currentUsername}">
                </tvy-content-action-view>
            `;
        }
        this.listContentActionView.innerHTML = tempHtml;
    }
}

window.customElements.define('tvy-list-content-action-view', TVYListContentActionView);
