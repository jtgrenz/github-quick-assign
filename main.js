function appendAssignment() {
    if (RegExp(/(https:\/\/github.com\/)+(.)+(\/)+(.)+(issues|pull)+(\/\S*)/).test(window.location.href)) {
        var assigneeForm = document.querySelector('.sidebar-assignee form');
        var avatars = document.querySelectorAll('.participation .participation-avatars a');
        var input = document.createElement('input');
        input.type = 'hidden';
        input.name = 'issue[user_assignee_ids][]';
        assigneeForm.appendChild(input);

        [].forEach.call(avatars, function(avatar) {
            var src = avatar.querySelector('img').src;
            var userId = /\/u\/(\d+)/.exec(src)[1];

            avatar.setAttribute('aria-label', "Assign " + avatar.getAttribute('aria-label'));

            avatar.href = '#';
            avatar.addEventListener('click', function(event) {
                // remove default inputs from modal (only created if user clicked it)
                assigneeForm.querySelector('.select-menu-modal-holder').remove();
                input.value = userId;
                assigneeForm.submit();

                event.preventDefault();
                event.stopPropagation();
            }, false);
        });
    }

};

window.addEventListener("pageLoadTransition", appendAssignment);

var s = document.createElement('script');
s.src = chrome.extension.getURL('inject.js');
s.onload = function() {
    this.parentNode.removeChild(this);
};
(document.head || document.documentElement).appendChild(s);

//still have to load this one for direct page loads
appendAssignment();