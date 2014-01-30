var app = {

	renderHomeView : function() {
		$('body').html(this.homeTpl());
		$('.search-key').on('keyup', $.proxy(this.findByName, this));
	},

	findByName: function() {
	    var self = this;
	    this.store.findByName($('.search-key').val(), function(employees) {
	        $('.employee-list').html(self.employeeLiTpl(employees));
	    });
	},


	initialize : function() {
		var self = this;
		self.homeTpl = Handlebars.compile($("#home-tpl").html());
		self.employeeLiTpl = Handlebars.compile($("#employee-li-tpl").html());

		this.store = new MemoryStore(function() {
			
			self.renderHomeView();
		});
		
	},

	showAlert : function(message, title) {
		if (navigator.notification) {
			navigator.notification.alert(message, null, title, 'OK');
		} else {
			alert(title ? (title + ": " + message) : message);
		}
	}

};

app.initialize();