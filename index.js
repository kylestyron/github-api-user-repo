"use strict";

function createRepoItem(repo) {
    //returns a single li as the name of the repo that is a link to the repo.
    //takes in a single json as arguments
    console.log(`${repo.html_url} ${repo.name}`);
    return `<li class="result-item"><a href="${repo.html_url}">${repo.name}</li>`;
}

function getRepoList(user) {
    /*when called by watchForm and passed the name of the user, uses github
    api to fetch list of user's repos, iterate over it, and call createRepoItem
    to create the html of the list items to add to the DOM*/
    console.log('fetching');
    fetch(`https://api.github.com/users/${user}/repos`)
        .then(response => response.json())
        .then(responseJson => 
            displayResults(responseJson))
        .catch(error => console.error(error));    
}

function displayResults(reposJson) {
    let resultStr='';
    console.log(reposJson.length);
    if(!$('.no-results').hasClass('hidden'))
    {
        $('.no-results').addClass('hidden');
    }

    if(!$('.results').hasClass('hidden'))
    {
        $('.results').addClass('hidden');
    }  
    
    if(reposJson.length) {
        $('.the-user').text(getUser());
        for(let repo of reposJson) {
            resultStr += createRepoItem(repo);
        }
        $('.repo-list').html(resultStr);
        $('.results').removeClass('hidden');
    }
    else{
        $('.no-results').removeClass('hidden');
    }

}

function getUser() {
    console.log('getting user');
    return $('#username').val();
}

function watchForm() {
    $('form').submit(event => {
        event.preventDefault();
        let user = getUser();
        getRepoList(user);
    });
}



watchForm();