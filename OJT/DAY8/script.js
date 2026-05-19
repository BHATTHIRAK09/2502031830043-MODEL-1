document.addEventListener("DOMContentLoaded", () => {
    const startAttackBtn = document.getElementById("start-attack-btn");
    const firewallToggle = document.getElementById("firewall-toggle");
    const cpuPercent = document.getElementById("cpu-percent");
    const meterPercent = document.getElementById("meter-percent");
    const cpuIndicator = document.getElementById("cpu-indicator");
    const serverStatus = document.getElementById("server-status");
    const serverRack = document.querySelector(".server-rack");
    const meterNeedle = document.getElementById("meter-needle");
    const shield = document.getElementById("shield");
    const firewallText = document.getElementById("firewall-text");
    const firewallSubText = document.getElementById("firewall-sub-text");
    const trafficContainer = document.getElementById("traffic-container");
    const userTrafficStatus = document.getElementById("user-traffic-status");
    const bots = document.querySelectorAll('.bot');
    const users = document.querySelectorAll('.user-group');
    
    let isAttacking = false;
    let isFirewallOn = false;
    let cpuLoad = 10;
    
    // Create Firewall Wall in DOM
    const firewallWall = document.createElement("div");
    firewallWall.className = "firewall-wall";
    document.body.appendChild(firewallWall);

    // Get exact starting and ending points for particles
    const getPositions = () => {
        const serverPanel = document.querySelector('.server-panel').getBoundingClientRect();
        const meterRect = document.querySelector('.meter').getBoundingClientRect();
        
        return {
            serverLeftX: serverPanel.left - 10,
            serverRightX: serverPanel.right + 10,
            serverCenterY: meterRect.top,
            wallX: serverPanel.left - 40 // Firewall wall position
        };
    };

    // Update Firewall wall position
    const updateWallPosition = () => {
        const pos = getPositions();
        firewallWall.style.left = `${pos.wallX}px`;
    };
    window.addEventListener('resize', updateWallPosition);
    // Give layout time to settle
    setTimeout(updateWallPosition, 100);

    // Create a particle element
    const createParticle = (type) => {
        const particle = document.createElement("div");
        particle.className = `particle ${type}`;
        trafficContainer.appendChild(particle);
        return particle;
    };

    // Animate normal traffic from users to server
    const spawnNormalTraffic = () => {
        if (cpuLoad >= 90 && !isFirewallOn) return; // Users blocked if under heavy attack and no firewall

        const particle = createParticle('green');
        const pos = getPositions();
        
        // Pick a random user to start from
        const randomUser = users[Math.floor(Math.random() * users.length)];
        const userRect = randomUser.getBoundingClientRect();
        
        const startX = userRect.left;
        const startY = userRect.top + userRect.height / 2;
        const endY = pos.serverCenterY + (Math.random() * 80 - 40);
        
        particle.style.left = `${startX}px`;
        particle.style.top = `${startY}px`;
        particle.style.opacity = '1';
        
        // Animate from right to left (users to server)
        particle.animate([
            { transform: `translate(0, 0) scaleX(-1)` }, // Flip horizontally because arrow points right by default
            { transform: `translate(${pos.serverRightX - startX}px, ${endY - startY}px) scaleX(-1)` }
        ], {
            duration: 1500 + Math.random() * 500,
            easing: 'linear'
        }).onfinish = () => {
            particle.remove();
        };
    };

    // Animate attack traffic from bots to server
    const spawnAttackTraffic = () => {
        const particle = createParticle('red');
        const pos = getPositions();
        
        // Pick a random bot to start from
        const randomBot = bots[Math.floor(Math.random() * bots.length)];
        const botRect = randomBot.getBoundingClientRect();
        
        const startX = botRect.right;
        const startY = botRect.top + botRect.height / 2;
        const endY = pos.serverCenterY + (Math.random() * 120 - 60); // Spread across server
        
        particle.style.left = `${startX}px`;
        particle.style.top = `${startY}px`;
        particle.style.opacity = '1';

        const targetX = isFirewallOn ? pos.wallX : pos.serverLeftX;
        const duration = isFirewallOn ? 600 + Math.random() * 200 : 800 + Math.random() * 200;
        
        particle.animate([
            { transform: `translate(0, 0)` },
            { transform: `translate(${targetX - startX}px, ${endY - startY}px)` }
        ], {
            duration: duration,
            easing: 'linear'
        }).onfinish = () => {
            if (isFirewallOn) {
                // Explode at firewall
                const ratio = (targetX - startX) / (pos.serverLeftX - startX);
                const explosionY = startY + (endY - startY) * ratio;
                const explosion = document.createElement("div");
                explosion.className = "explosion";
                explosion.style.left = `${targetX}px`;
                explosion.style.top = `${explosionY}px`; 
                document.body.appendChild(explosion);
                setTimeout(() => explosion.remove(), 300);
            }
            particle.remove();
        };
    };

    let normalTrafficInterval;
    let attackTrafficInterval;
    let cpuInterval;

    // Start Normal Traffic initially
    normalTrafficInterval = setInterval(spawnNormalTraffic, 1000);

    // Update UI based on CPU Load
    const updateServerState = () => {
        cpuPercent.innerText = `${Math.floor(cpuLoad)}%`;
        meterPercent.innerText = `${Math.floor(cpuLoad)}%`;
        
        // Meter Needle (-70deg to 70deg)
        const rotation = -70 + (cpuLoad / 100) * 140;
        meterNeedle.style.transform = `translateX(-50%) rotate(${rotation}deg)`;

        if (cpuLoad < 50) {
            cpuIndicator.className = "indicator green";
            serverStatus.innerHTML = "STATUS: ONLINE 🌐";
            serverStatus.className = "status-online";
            serverRack.classList.remove("attacked");
            userTrafficStatus.innerHTML = "Genuine Traffic: <span style='color: var(--neon-green)'>Active 🟢</span>";
        } else if (cpuLoad >= 90) {
            cpuIndicator.className = "indicator red";
            serverStatus.innerHTML = "STATUS: OFFLINE 💀";
            serverStatus.className = "status-offline";
            serverRack.classList.add("attacked");
            userTrafficStatus.innerHTML = "Genuine Traffic: <span style='color: var(--neon-red)'>Blocked! ❌</span>";
        } else {
            cpuIndicator.className = "indicator red";
            serverStatus.innerHTML = "STATUS: WARNING ⚠️";
            serverStatus.className = "status-offline";
            serverStatus.style.color = "#ffff33";
            serverStatus.style.textShadow = "0 0 8px #ffff33";
            userTrafficStatus.innerHTML = "Genuine Traffic: <span style='color: #ffff33'>Slow ⚠️</span>";
        }
    };

    // Simulate CPU load changes
    const runCpuSimulation = () => {
        if (isAttacking && !isFirewallOn) {
            if (cpuLoad < 100) cpuLoad += 4;
            if (cpuLoad > 100) cpuLoad = 100;
        } else if (isAttacking && isFirewallOn) {
            if (cpuLoad > 20) cpuLoad -= 5;
            else if (cpuLoad < 20) cpuLoad += 1;
        } else {
            if (cpuLoad > 10) cpuLoad -= 3;
            if (cpuLoad < 10) cpuLoad = 10;
        }
        updateServerState();
    };

    cpuInterval = setInterval(runCpuSimulation, 100);

    // Toggle Attack
    startAttackBtn.addEventListener("click", () => {
        isAttacking = !isAttacking;
        if (isAttacking) {
            startAttackBtn.innerText = "STOP";
            startAttackBtn.style.background = "radial-gradient(circle, #ff0000 0%, #aa0000 100%)";
            startAttackBtn.parentElement.querySelector("h3").innerText = "ATTACKING...";
            
            // Spawn lots of attack traffic
            attackTrafficInterval = setInterval(() => {
                for(let i=0; i<3; i++) spawnAttackTraffic();
            }, 30);
            
            // Highlight bots
            bots.forEach(bot => {
                bot.style.borderColor = "white";
                bot.style.boxShadow = "0 0 15px var(--neon-red)";
            });
        } else {
            startAttackBtn.innerText = "START";
            startAttackBtn.style.background = "";
            startAttackBtn.parentElement.querySelector("h3").innerText = "START ATTACK";
            clearInterval(attackTrafficInterval);
            
            bots.forEach(bot => {
                bot.style.borderColor = "var(--neon-red)";
                bot.style.boxShadow = "0 0 10px rgba(255, 51, 51, 0.3)";
            });
        }
    });

    // Toggle Firewall
    firewallToggle.addEventListener("change", (e) => {
        isFirewallOn = e.target.checked;
        if (isFirewallOn) {
            shield.classList.add("active");
            firewallText.innerText = "FIREWALL ACTIVATED! ✅";
            firewallText.classList.add("active");
            firewallWall.classList.add("active");
            firewallSubText.style.display = "block";
            updateWallPosition();
        } else {
            shield.classList.remove("active");
            firewallText.innerText = "FIREWALL DEACTIVATED";
            firewallText.classList.remove("active");
            firewallWall.classList.remove("active");
            firewallSubText.style.display = "none";
        }
    });
});
