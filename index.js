Parse.initialize("2ARxWfBXA4aeGt2RHR7n9yqWVVNfq7udIsxG1eCP", "cDIIHTqz2g2r2AStQ6JBH0Bx1Bt87NixajzTTB3p");

function parseSetup() {
	var TestObject = Parse.Object.extend("TestObject");
	var testObject = new TestObject();
	testObject.save({foo: "bar"}).then(function(object) {
	  alert("yay! it worked");
	});
}

function newDiscussion() {
	var DiscussionObject = Parse.Object.extend("DiscussionObject");
	var discussionObject = new DiscussionObject();

	discussionObject.set("Title", $("#title").val());
	discussionObject.set("Desc", $("#desc").val());
	discussionObject.set("Comment", $("#comment").val());
	
	discussionObject.save(null, {
		success: function(result) {
			//alert("yay! it worked");
			window.location = "computerScience.html";
		},
		error: function(object, error) {
			alert("failure to create new discussion");
		}
	});
}

function loadDiscussions() {		
	var container = document.createElement("div");
	container.className = "container-fluid";
	
	var discussions = document.createElement("div");
	discussions.className = "jumbotron";
	
	var newDiscussion = document.createElement("div");
	newDiscussion.className = "col-md-12";
	
	var but = document.createElement("a");
	but.className = "btn btn-default";
	but.href = "newDiscussion.html";
	but.innerHTML = "Create New Discussion";
	newDiscussion.appendChild(but);
	
	discussions.appendChild(newDiscussion);
	discussions.appendChild(document.createElement("hr"));
	
	var DiscussionObject = Parse.Object.extend("DiscussionObject");
	var query = new Parse.Query(DiscussionObject);
	
	query.find({
		success: function(results) {
			for(var i = 0; i < results.length; i++) {				
				var outer = document.createElement("div");
				outer.className = "col-md-4";
	
				var inner = document.createElement("div");
				inner.className = "thumbnail";
				inner.style.height = "285px";
				
				var caption = document.createElement("div");
				
				var title = document.createElement("h3");
				title.innerHTML = results[i].get("Title");
				caption.appendChild(title);
				
				var desc = document.createElement("div");
				desc.className = "descBox";
				desc.innerHTML = results[i].get("Desc");
				caption.appendChild(desc);
				
				caption.appendChild(document.createElement("hr"));
				
				var button = document.createElement("a");
				button.className = "btn btn-primary";
				button.href = "#";
				button.innerHTML = "View this discussion";
				caption.appendChild(button);
				
				inner.appendChild(caption);
				outer.appendChild(inner);
				discussions.appendChild(outer);
			}
			
			console.log(Math.floor((results.length-1)/3));
			discussions.style.height = (Math.floor((results.length-1)/3) * 305) + 400+ "px";
		},
		error: function(object, error) {
			console.log("Error " + error + " " + object);
		}
	});
	
	var spacing = document.createElement("div");
	spacing.className = "clearfix visible-lg";
	discussions.appendChild(spacing);
	
	container.appendChild(discussions);
	
	document.getElementsByTagName('body')[0].appendChild(container);
}