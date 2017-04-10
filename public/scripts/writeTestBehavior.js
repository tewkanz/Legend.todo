$( () => {
    $('#formElement').on('onsubmit' ,(event) => {
        event.preventDefault();
    });
    $('#btnSubmit').on('click', (event) => {
        event.preventDefault();
        var documentToSend = { 
            title: $('#tfTitle').prop('value'),
            content: $('#txtContent').prop('value')
        };
        var successDelegate = (data, textStatus, jqXHR) =>{
            var message = textStatus + '{' + data.nModified + ' documents updated!}';
            alert(message);
        }
        $.post('/services/writeTest', documentToSend, successDelegate, 'json')
    })
})