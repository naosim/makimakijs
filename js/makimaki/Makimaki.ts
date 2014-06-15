(function(){
    var importFiles = [
        "Fragment.js",
        "RouterFragment.js"
    ];
    
    importFiles.forEach((importFile: string)=> {
        document.write('<script type="text/javascript" src="js/makimaki/' + importFile + '"></script>');
    });
})();