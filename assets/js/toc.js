var headerList = Array.from(document.querySelectorAll("h1,h2,h3"));

function tree(headerList, e){
    if(!e) return listChildren(headerList, {tagName: 'H0'})
    var resultTree = {'headTitle': e.innerText};

    if(getLevel(e) < 3){
        var children = listChildren(headerList ,e);
        if(children.length != 0)
            resultTree.children = children;
    }
    
    return resultTree;
}

function getLevel(e){
    return e.tagName.match(/\d/);
}

function listChildren(headerList, e){
    var resultList = [];
    var index = headerList.indexOf(e);

    while(headerList[index+1] && getLevel(headerList[index+1]) > getLevel(e)){
        if(getLevel(headerList[index+1]) - 1 == getLevel(e))
            resultList.push(tree(headerList, headerList[index+1]))
        index++;
    }
    return resultList;
}

//计算
console.log(tree(headerList));