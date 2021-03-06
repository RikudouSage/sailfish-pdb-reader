function open() {
    var db = LocalStorage.openDatabaseSync("PDBreaderDB","1.0","Database", 1000000);
    return db;
}

function firstrun() {
    ct.mkbasedir(qsTr("Books"));
    //ct.mkFakeBooks();
}

function initBook(book, encoding) {
    open().transaction(function(tx) {
        tx.executeSql("INSERT INTO books (original_name,position,encoding) VALUES (?,?,?)",[book,0,encoding]);
    });
}

function changeMode(mode) {
    if(mode == "book") {
        base1.visible = false;
        book1.visible = true;
        book2.visible = true;
        book3.visible = true;
        about.visible = false;
        help.visible = false;
    } else {
        book1.visible = false;
        book2.visible = false;
        book3.visible = false;
        base1.visible = true;
        about.visible = true;
        help.visible = true;
        pageheader.text = qsTr("PDB book reader");
        textarea.text = welcometext;
        position = 0;
        current_book = "";
        current_visible_text = "";
        current_whole_text = "";
        book_opened = false;
    }
}

function listEncodings() {
    return ["UTF-8","ISO-8859-1","GB2312","WINDOWS-1251","WINDOWS-1252","SHIFT JIS","GBK","WINDOWS-1256","ISO-8859-2","EUC-JP","ISO-8859-15","ISO-8859-9","WINDOWS-1250","WINDOWS-1254","EUC-KR","Big5","WINDOWS-874","US-ASCII","TIS-620","ISO-8859-7","WINDOWS-1255"];
}

function contrastMode(onoff) {
    if(onoff === "on") {
        bg.color = "white";
        textarea.color = "black";
        pageheader.color = "black";
        nextbutton.color = "black";
        prevbutton.color = "black";
        endoftheline.color = "black";
        percenttext.color = "black";
        contrast_mode = true;
        open().transaction(function(tx) {
            tx.executeSql("UPDATE contrast_mode SET onoff=1");
        });
    } else {
        bg.color = "transparent";
        textarea.color = Theme.highlightColor;
        pageheader.color = Theme.secondaryHighlightColor;
        nextbutton.color = Theme.primaryColor;
        prevbutton.color = Theme.primaryColor;
        endoftheline.color = Theme.highlightColor;
        percenttext.color = Theme.highlightColor;
        contrast_mode = false;
        open().transaction(function(tx) {
            tx.executeSql("UPDATE contrast_mode SET onoff=0");
        });
    }
}

function clearDatabase() {
    ct.clearDatabase();
    open().transaction(function(tx) {
        tx.executeSql("DROP TABLE IF EXISTS books");
    });
}

function isPDB(v_bookname) {
    var last = v_bookname.substr(v_bookname.length - 4);
    if(last == ".pdb" || last == ".PDB") {
        return true;
    }
    return false;
}
