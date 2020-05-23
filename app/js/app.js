(function(doc) {
    'use strict';
  

    function getInputValue() {
      return new DOM('[data-js="input"]').getValue();
    }

    function setDataofRequestonHTML(response) {
      var $address = new DOM('[data-js="address"]');
      $address.getElement().appendChild(response);
    }

    function starListeners() {
      var $button = new DOM('[data-js="button"]');
      $button.on('click', handleRequestButton);  
    }

    function handleRequestButton(event) {
      event.preventDefault();  
      var cep = getInputValue();      
      if(isCEPValidToRequest(cep)) {
        cep = clearCEP(cep);
        return requestCEP(cep);        
      }          
      clearFieldCEPAddress();
      displayStatusConnection("CEP inválido para requisição");
    }
    
    function requestCEP(cep) {      
      var ajax = new XMLHttpRequest();     
      ajax.open('GET',`https://viacep.com.br/ws/${cep}/json/`);
      ajax.send();
      ajax.addEventListener('readystatechange', handleProgressOfRequest, false);        
      ajax.addEventListener('load',handleRequestLoaded,false);
      displayStatusConnection(`Buscando informações para o CEP ${cep}...`)        
    }
    
    function handleProgressOfRequest() {        
      if(this.readyState === 2) {        
        clearFieldCEPAddress();     
      }            
    }

    function clearFieldCEPAddress(){
      var address = new DOM('[data-js="address"]');
      address.clearChildrens();
    }

    function displayStatusConnection(message) {
      var $fieldstaterequest = new DOM('[data-js="staterequest"]');    
      $fieldstaterequest.setText(message);
    }

    function handleRequestLoaded() {
        if(isResponseOK(this)) {
          var response = JSON.parse(this.response);          
          displayStatusConnection(`Endereço referente ao CEP ${response.cep}:`)  ;        
          fillDataOfCEP(response);
          return;
        }  
        displayStatusConnection(`Não encontramos o endereço para o CEP ${clearCEP(getInputValue())}:`)                        
    }


    function isResponseOK(ajaxResponse) {               
      if(ajaxResponse.status === 200 & !JSON.parse(ajaxResponse.response).hasOwnProperty('erro')) {
            return true;      
      }
      return false;
    }
    
    function fillDataOfCEP(data) {      
      var fragment = doc.createDocumentFragment();
      Object.keys(data).forEach(function(field) {
        fragment.appendChild(createElement('dt',field.toUpperCase()));
        fragment.appendChild(createElement('dd',data[field] ? data[field] : "Sem Informações"));                                        
      })
      setDataofRequestonHTML(fragment);
    }

    function createElement(element, textNode) {
      var elementCreated = doc.createElement(element);      
      elementCreated.appendChild(doc.createTextNode(textNode));      
      return elementCreated;
    }

    function clearCEP(cep) {
      return regexArrayOnlyNumbers(cep).join('');
    }

    function regexArrayOnlyNumbers(text) {
      return text.match(/\d/g);
    }

    function isCEPValidToRequest(cep) {
        var onlyNumbers = regexArrayOnlyNumbers(cep);
        return onlyNumbers !== null && onlyNumbers.length === 8;
    }

    starListeners();    
})(document);