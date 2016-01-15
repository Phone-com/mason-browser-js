/**
 * Created by kevincho on 1/13/16.
 *
 * This gets the mason api data via an ajax call and displays it in the raw text field.
 */

$('#get_api').on('click', function()
{
    var api_url = $('#url').val();
    var req_header = $('#req_header').val();
    var httpmethod = 'GET';

    $.ajax
    ({
        type: httpmethod,
        url: api_url,
        beforeSend: function (xhr)
        {
            xhr.setRequestHeader ("Authorization", req_header);
        },
        success: function(response, textStatus, jqXHR)
        {
            // console.log(response);

            var html = "";

            // @meta > @title
            html += "<p><strong>" + response['@meta']['@title'] + "</strong></p>";

            // @controls
            html += "<p><em><strong>Controls</strong></em></p>";
            html += recurse(response["@controls"]);





            // var mason_element = "";
            // var items = recurse(response);
            // html += items + "</ul>";
            $('#pretty_format').html(html);

            $('#raw_format').val(JSON.stringify(response,null,2));
            // console.log (response, textStatus, jqXHR);

            /*
             $.each(response, function(index, element)
             {
                $('#raw_format').val(element.name);
             });
             */
        },
        error: function(jqXHR, textStatus, errorThrown)
        {
            console.log(jqXHR, textStatus, errorThrown);
            $('#raw_format').val(JSON.stringify(jqXHR));
        }
    });

    function recurse(element)
    {
        var item = "";

        for (var key in element)
        {
            if (element[key]["href"]) {
                item += "<p>&nbsp;&nbsp;<a href='" + element[key]["href"] + "'>" + key + "</a> (Link)";
            }
            if (key == "title") {
                item += "<br>&nbsp;&nbsp;" + element[key] + "</p>";
            }
            else {
                if (typeof element[key] == "object") {
                    item += recurse(element[key]);
                }
            }
        }

        return item;
    }
});
