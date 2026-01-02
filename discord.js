const DISCORD_ID = '1412833508954476544'; // Put your ID here

async function fetchStatus() {
    try {
        const res = await fetch(`https://api.lanyard.rest/v1/users/${DISCORD_ID}`);
        const { data } = await res.json();
        
        // Update User Info
        document.getElementById('discord-name').innerText = data.discord_user.global_name || data.discord_user.username;
        document.getElementById('discord-avatar').src = `https://cdn.discordapp.com/avatars/${data.discord_user.id}/${data.discord_user.avatar}.png?size=512`;

        // Update Status Dot
        const dot = document.getElementById('status-dot');
        const statusMap = { online: 'bg-green-500', idle: 'bg-yellow-500', dnd: 'bg-red-500', offline: 'bg-gray-600' };
        dot.className = `absolute -bottom-1 -right-1 w-3 h-3 rounded-full border-2 border-black ${statusMap[data.discord_status]}`;
        document.getElementById('discord-status-text').innerText = data.discord_status.toUpperCase();

        // Update Activity
        const activityName = document.getElementById('activity-name');
        const activityDetail = document.getElementById('activity-detail');
        
        if (data.listening_to_spotify) {
            activityName.innerText = "Listening to Spotify";
            activityDetail.innerText = `${data.spotify.song} by ${data.spotify.artist}`;
        } else if (data.activities.length > 0) {
            activityName.innerText = data.activities[0].name;
            activityDetail.innerText = data.activities[0].details || "In-game";
        } else {
            activityName.innerText = "No Activity";
            activityDetail.innerText = "Not doing anything right now";
        }
    } catch (e) { console.error("Lanyard error", e); }
}

fetchStatus();
setInterval(fetchStatus, 15000);