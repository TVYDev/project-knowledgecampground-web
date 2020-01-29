<template id="tplContentActionView">
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
        <div class="commentsBlock">
            <div class="listOfComments"></div>
            <div class="addNewCommentBlock">
                <div><img class="authorAvatar" src="" alt="avatar"></div>
                <div class="commentBody">
                    <div class="ui input commentInput">
                        <input type="text" class="txtComment"/>
                    </div>
                    <div class="commentButton"><i class="fas fa-chevron-circle-right"></i></div>
                </div>
            </div>
        </div>
    </div>
</template>
