'use strict';

(function () {

    let questions = null;

    document.addEventListener("DOMContentLoaded",function (){

        questions = document.getElementById("questions");

        fetchLandingPage();

    })

    function status(response) {
        if (response.status >= 200 && response.status < 300) {
            return Promise.resolve(response);
        } else {
            return Promise.reject(new Error(response.status));
        }
    }


    function toHtml(json){

        console.log(json.questionStack);
        let str = '';
        str+=`<div class="container">`
        json.questionStack.forEach(obj=> {
            str+=`<div>${obj.question} </div>`;
            str+= `<div>0 answers</div>`;
            str+=`<form action="/QuestionsServlet" method="post">
                        <input type="hidden" name="questionNumber" value="${obj.key}">
                        <input type="submit" value="show answer">
                   </form>`;
            str+=`<form action="/AddAnswerServlet" method="get">
                        <input type="hidden" name="questionNumber" value="${obj.key}">
                        <input type="submit" value="answer">
                   </form>`;
            str+=`<br/>`
        })
        str+=`</div>`
        return str;
    }


    function fetchLandingPage()
    {
        fetch('/QuestionsServlet')
            .then(status)
            .then(res=> res.json())
            .then(json=>{
                questions.innerHTML =  toHtml(json);
            })
            .catch(()=>{

            })
    }

})();