<template id="tplContentManagementPreview">
    <div class="TVYContentManagementPreview">
        <div class="ui form">
            <div class="inline field">
                <div class="ui toggle checkbox chkPreviewContent">
                    <input type="checkbox" name="chkPreviewContent" tabindex="0" class="hidden">
                    <label class="lblPreviewContent">Preview</label>
                </div>
            </div>
        </div>
        <div class="orderAndPreview">
            <input type="hidden" name="reRender" class="reRender"/>
            <div class="contentPreview" hidden="hidden">
                <tvy-content-action-view data-for="mock-only"></tvy-content-action-view>
            </div>
            <div class="contentOrder">
                <div class="TVYContentOrder col-md-12"></div>
            </div>
        </div>
    </div>
</template>
