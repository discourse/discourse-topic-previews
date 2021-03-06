import { ajax } from 'discourse/lib/ajax';
import { popupAjaxError } from 'discourse/lib/ajax-error';
import showModal from "discourse/lib/show-modal";
import { default as computed, on, observes } from 'ember-addons/ember-computed-decorators';

export default Ember.Component.extend ({
  classNames: 'select-thumbnail',

  @computed
  showSelected() {
    return this.get('buffered.image_url') ? true : false;
  },

  actions: {
    showThumbnailSelector() {

      ajax(`/topic-previews/thumbnail-selection.json?topic=${this.get('topic_id')}`).then(result => {
        var controller = showModal('tlp-thumbnail-selector', { model: {
          thumbnails: result,
          topic_id: this.get('topic_id'),
          topic_title: this.get('topic_title'),
          buffered: this.get('buffered')
          }}
        );
      }).catch(function(error) {
               popupAjaxError(error);
      });
    }
  }
})
