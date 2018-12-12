var queryURL = "http://quotes.rest/qod.json";

         $.ajax({
            url: queryURL,
            method: "GET"
            })
            .then(function(response) {
                //var results = response.data;
                console.log(response);
                console.log(response.contents.quotes[0].author);
                console.log(response.contents.quotes[0].quote)

                // Transfer content to HTML
                $("#quoteOfDay").html(response.contents.quotes[0].quote);
                $("#author").html(response.contents.quotes[0].author);
            });
