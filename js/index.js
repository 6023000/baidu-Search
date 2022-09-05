// https://sp0.baidu.com/5a1Fazu8AA54nxGko9WTAnF6hhy/su?wd='+ value +'&cb=' + callbackName;

;(function(doc){
  var searchInput = doc.getElementsByClassName('J_searchInput')[0],
      wdList = doc.getElementsByClassName('J_wdList')[0],
      listWrap = doc.getElementsByClassName('list-wrap')[0],
      listTpl = doc.getElementById('J_listTpl').innerHTML;
  
  var init = function(){
    bindEvent();
  }

  function bindEvent(){
    searchInput.addEventListener('input', typeInput, false);
  }

  function renderList(data){
    var list = '',
        val = data.q,
        data = data.s;

    data.forEach(function(elem){
      list += listTpl.replace(/{{(.*?)}}/g, function(node, key){
        return {
          wdLink: elem,
          wd: '<span style="font-weight:normal">' + val + '</span>' + elem.replace(val, ''),
        }[key]
      })
    })

    wdList.innerHTML = list;
    listWrap.style.display = 'block';
  }


  function typeInput(){
    var val = _trimSpace(this.value);
    if(val.length > 0){
      getDatas(val, 'setDatas');
    }else{
      listWrap.style.display = 'none';
      wdList.innerHTML = '';
    }
  }

  function getDatas(val, callbackName){
    var oScript = doc.createElement('script');
    oScript.src = 'https://sp0.baidu.com/5a1Fazu8AA54nxGko9WTAnF6hhy/su?wd='+ val + '&cb=' + callbackName;
    doc.body.appendChild(oScript);
    doc.body.removeChild(oScript);
  }

  window.setDatas = function(data){
    renderList(data);
  }

  function _trimSpace(str){
    return str.replace(/\s+/g, '');
  }

  init();
})(document)



