
const trashcan = document.querySelector('a.delete');
    trashcan.addEventListener('click', (e) => {
    const endpoint = `/blogs/${trashcan.dataset.doc}`;
    fetch(endpoint, {
        method: 'DELETE',
    })
    .then(response => response.json())
    .then(data => window.location.href = data.redirect)
    .catch(err => console.log(err));
    });

    // fro sharing
    const link = "https://medium.com/@noumcpe0007";
    const text = "Check out this web share tutorial";
    function shareOnFacebook() {
        const facebookIntentURL = "https://www.facebook.com/sharer/sharer.php";
        const contentQuery = `?u=${encodeURIComponent(link)}&quote=${encodeURIComponent(text)}`;
        const shareURL =  facebookIntentURL + contentQuery;
        window.open(shareURL, "_blank");
    }

    function shareOnTwitter() {
        const twitterIntentURL = "https://twitter.com/intent/tweet";
        const contentQuery = `?url=${encodeURIComponent(link)}&text=${encodeURIComponent(text)}`;
        const shareURL = twitterIntentURL + contentQuery;
        window.open(shareURL, "_blank");
    }

    function shareOnWhatsApp() {
        const url = "https://wa.me/?text=" + encodeURIComponent(text + "\n" + link);
        window.open(url, "_blank");
    }