document.addEventListener("DOMContentLoaded", function() {
    const urlParams = new URLSearchParams(window.location.search);
    const playlistsId = urlParams.get("playlistsId");
    let hasExecuted = false;

    if (playlistsId && !hasExecuted) {
        if (!sessionStorage.getItem("playlistsData")) {
            fetch(`https://playlist-to-osu.onrender.com/api/spotify-playlists?playlistsId=${playlistsId}`)
                .then(response => response.json())
                .then(data => {
                    console.log("Playlists:", data); // Affiche les playlists dans la console
                    sessionStorage.setItem("playlistsData", JSON.stringify(data)); // Stocke les données dans sessionStorage
                    displayPlaylists(data.items); // Affiche les playlists dans la page
                })
                .catch(error => console.error("Error fetching playlists:", error));
        } else {
            // Charge les données à partir de sessionStorage si elles sont déjà présentes
            const cachedData = JSON.parse(sessionStorage.getItem("playlistsData"));
            console.log("Cached Playlists:", cachedData);
            displayPlaylists(cachedData.items); // Affiche les playlists dans la page
        }

        hasExecuted = true;
        //urlParams.delete("playlistsId");
        //window.location.href = window.location.pathname;
    }

    function displayPlaylists(playlists) {
        const container = document.getElementById("playlists");
        container.innerHTML = "";
        playlists.forEach(playlist => {
            const div = document.createElement("div");
            div.className = "play";

            const img = document.createElement("img");
            img.src = playlist.images[0].url;
            img.width = 190;
            img.height = 190;

            const txt = document.createElement("p");
            txt.textContent = playlist.name;

            const button = document.createElement("button");
            button.className = "spotify-btn";

            const spotify_logo = document.createElement("img");
            spotify_logo.src = "https://upload.wikimedia.org/wikipedia/commons/1/19/Spotify_logo_without_text.svg"
            button.appendChild(spotify_logo);

            const buttonText = document.createElement("span");
            buttonText.textContent = "View in Spotify";
            button.appendChild(buttonText);

            button.onclick = function () {
                window.open(playlist.external_urls.spotify, '_blank');
            };

            div.appendChild(img);
            div.appendChild(txt);
            div.appendChild(button);
            container.appendChild(div);
        });
        const clearDiv = document.createElement('div');
        clearDiv.classList.add('clear');
        container.appendChild(clearDiv);
    }
});