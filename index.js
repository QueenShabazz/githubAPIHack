'use strict';

async function gitUser(user){
        let urls =[`https://api.github.com/users/${user}/repos`, `https://api.github.com/users/${user}`] 
        async function getAllUrls(urls){
            try {
                let data = await Promise.all(
                    urls.map(
                        url =>
                            fetch(url)
                            .then(
                                (response) => response.json()
                            )
                    )
                );
                return (data)
                } catch (error) {
                    console.log(error)
                    throw (error)
                }
         }
        var responses = await getAllUrls (urls);
        //console.log(Object.keys(responses));
        //displayResults(responses);

        $('#results-list').html(`
                <li> ${user} has ${responses[0].length} repos: </li>
                <li><a href=${responses[1].html_url}><img id="prof-pic" src="${responses[1].avatar_url}"/></a></li>
                <li></li>
                <li></li>
        `)
        let repos = responses[0]
        let length = responses[0].length
        for (let i = 0; i < length; i++){
            $('#results-list').append(`<li><a href="${repos[i].git_url}">${repos[i].name}</a><ul><li>${repos[i].description}</li></ul></li>`)
        }
        console.log(responses[0])
        console.log(responses[1].url);
        }
function submit(){
    $('form').submit(event => {
    event.preventDefault();
    let input = $('input').val();
    gitUser(input);
    $('#results-list').empty();
    })
};
//function that displays usernames

$(function(){
    submit();

});

