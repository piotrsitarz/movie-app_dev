
let commentsDialogTemplate =
`<div class="dialog__wrapper" md-whiteframe="{{height}}" ng-init="height=5" ng-mouseenter="height=8" ng-mouseleave="height=5" layout="column" layout-align="center center">
  <form class="dialog__form" name="dialogForm" layout="column" layout-align="center center">
    <md-input-container class="dialog__input-container">
      <label>Username</label>
      <input class="dialog__input" ng-model="randomName.content" type="text" name="user" required/>
      <div ng-messages="dialogForm.user.$error" role="alert">
        <div ng-message="required">This is required.</div>
      </div>
    </md-input-container>
    <md-input-container class="dialog__input-container">
      <label>Write your comment here...</label>
      <input class="dialog__input" ng-model="comments.toAdd.content" type="text" name="content" required/>
      <div ng-messages="dialogForm.content.$error" role="alert">
        <div ng-message="required">This is required.</div>
      </div>
    </md-input-container>
    <md-input-container class="dialog__input-container">
      <label>Your Vote...</label>
      <input class="dialog__input" ng-model="comments.toAdd.vote" type="number" name="vote" required/>
      <div ng-messages="dialogForm.vote.$error" role="alert">
        <div ng-message="required">This is required.</div>
      </div>
    </md-input-container>
    <md-button class="dialog__button md-raised" ng-click="comments.save(randomName.content, comments.toAdd.content, comments.toAdd.vote)" ng-disabled="dialogForm.$invalid">save</md-button>
  </form>
</div>`;

module.exports = commentsDialogTemplate;
