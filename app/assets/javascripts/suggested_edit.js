$(document).on('ready', function () {
    $("[data-suggested-edit-approve]").on("click", (ev) => {
        ev.preventDefault();
        const self = $(ev.target);

        $.ajax({
            'type': 'POST',
            'url': '/posts/suggested-edit/' + self.attr("data-suggested-edit-approve") + "/approve",
            'target': self
        })
            .done((response) => {
                if (response.status !== 'success') {
                    QPixel.createNotification('danger', '<strong>Failed:</strong> ' + response.message);
                }
                else {
                    window.location.href = response.redirect_url;
                }
            })
            .fail((jqXHR, textStatus, errorThrown) => {
                QPixel.createNotification('danger', '<strong>Failed:</strong> ' + jqXHR.status);
                console.log(jqXHR.responseText);
            });
    });
    $(".js-suggested-edit-reject").on("click", (ev) => {
        ev.preventDefault();
        
        $(".js-suggested-edit-reject-dialog").toggleClass("is-hidden")
    });
    $("[data-suggested-edit-reject]").on("click", (ev) => {
        ev.preventDefault();
        const self = $(ev.target);

        $.ajax({
            'type': 'POST',
            'url': '/posts/suggested-edit/' + self.attr("data-suggested-edit-reject") + "/reject",
            'data': {
                rejection_comment: $(".js-rejection-reason").val()
            },
            'target': self
        })
            .done((response) => {
                if (response.status !== 'success') {
                    QPixel.createNotification('danger', '<strong>Failed:</strong> ' + response.message);
                }
                else {
                    window.location.href = response.redirect_url;
                }
            })
            .fail((jqXHR, textStatus, errorThrown) => {
                QPixel.createNotification('danger', '<strong>Failed:</strong> ' + jqXHR.status);
                console.log(jqXHR.responseText);
            });
    });
});  