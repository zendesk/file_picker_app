/*global Blob*/
/*global URL*/
/*global File*/
/*global FileReader*/
/*global XMLHttpRequest*/
/*global FormData*/
(function() {
  return {
    defaultState: 'home',
    requests: {
    },
    events: {
      'pane.created': 'onAppCreated',
      'click .insert_link': 'insertLinkClicked',
      'click .attach_file': 'attachFile',
      // ajax requests
      'getFromBox.done': 'gotFromBox',

      // iframe events
      'iframe.fileSelected': 'onFileSelected'
    },
    onAppCreated: function() {
      var loc = this.currentLocation();
      console.dir(loc);
      if(loc == 'nav_bar') {
        // if it's the nav bar
        this.switchTo('nav_bar_home', {
          uri: 'https://app.box.com/embed_widget/files/0/f/0'
        });
        var height = this.$('section').height();
        console.dir(height);
      }
    },
    onFileSelected: function(e, files) {
      files = _.map(files, function(file) {
        file.folder = file.type == 'folder';
        return file;
      });
      _.each(files, function(file) {
        this.insertLink(file);
      }, this);
      this.renderFiles(files);
    },
    renderFiles: function(files) {
      var html = this.renderTemplate('files', {
        files: files
      });
      this.$('div.files').html(html);
    },
    insertLinkClicked: function(e) {
      console.dir(e);
      var file = {
        url: e.currentTarget.dataset.fileUri,
        name: e.currentTarget.dataset.fileName
      };
      this.insertLink(file);
    },
    insertLink: function(file) {
      console.dir(file);
      // 
      // TODO make this conditional on a user setting (localStorage?) or app setting?
      if( this.comment().useRichText() ) {
        var htmlString = helpers.fmt('<a href="%@">%@</a><br>', file.url, file.name);
        this.comment().appendHtml(htmlString);
      } else {
        // services.notify('Rich text is not enabled :(');
          console.log(file.url);
        this.comment().appendText(file.url);
      }
    }
  };
}());