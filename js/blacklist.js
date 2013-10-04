
// update list, param is list of sites
function updateVisualList(blacklist){
    // the number of elements in the list
    var nItems = blacklist.length;
    // the unordered list
    var listElement = $("#lsblack");
    console.log(listElement);

    // empty the contents of the list
    listElement.empty();

    // for each element in the parameter (list of sites)
    for (var i = 0; i < nItems; i++){
        // <li>
        var listItem = document.createElement("li");

        removeButtonSpan = document.createElement("span");
        removeButtonSpan.class = "spanBtnRemove";
        removeButton = document.createElement("img");
        removeButton.src = "remove.png";
        removeButton.class = "btnRemove";
        removeButton.css = {"position": "fixed", "top": "0px"};
        //$(removeButton).click(removeBlockedSite);
        $(removeButton).on("click", removeBlockedSite);
        removeButtonSpan.appendChild(removeButton);
        listItem.appendChild(removeButtonSpan);

        blockedSiteSpan = document.createElement("span");
        blockedSiteSpan.class = "blockSiteSpan"
        blockedSiteSpan.innerHTML = " " + blacklist[i];
        listItem.appendChild(blockedSiteSpan);

        listElement.append(listItem);
    }
}

function addSiteFromField(){
    var field = $("#blacklist_input");
    var site = field.val();
    chrome.runtime.getBackgroundPage(function(page){
        site = page.parseURLToFilter(site);
        page.addBlockedSite(site, updateVisualList);
    });
}

function removeAllBlockedSites(){
    chrome.runtime.getBackgroundPage(function(page){
        page.removeAllBlockedSites(updateVisualList);
    });
}


$(document).ready(function () {
    $("#add_settings_img").click(addSiteFromField);

    // Process field if enter is pressed
    $("#blacklist_input").keyup(function(event){
        if(event.keyCode == 13){
            addSiteFromField();
        }
    });
    $("#remove_all_img").click(removeAllBlockedSites);

    chrome.storage.sync.get("BLACKLIST", function (items) {
        var blacklist = items["BLACKLIST"];
        if (blacklist == null){
            blacklist = [];
        }
        updateVisualList(["hain"]);
    });
});