$(document).ready(function() {
    
    // --- COLORS ---
    $("#btnRed").click(function() {
        $("#magicBox").css("background", "linear-gradient(135deg, #ff416c, #ff4b2b)");
        $("#boxText").text("RED!");
    });

    $("#btnBlue").click(function() {
        $("#magicBox").css("background", "linear-gradient(135deg, #36D1DC, #5B86E5)");
        $("#boxText").text("BLUE!");
    });

    $("#btnGradient").click(function() {
        $("#magicBox").css("background", "linear-gradient(135deg, #fceabb, #f8b500)");
        $("#boxText").text("GOLD!");
    });

    // --- SHAPES ---
    $("#btnCircle").click(function() {
        $("#magicBox").css("border-radius", "50%");
    });

    $("#btnSquare").click(function() {
        $("#magicBox").css("border-radius", "0%");
    });

    $("#btnRounded").click(function() {
        $("#magicBox").css("border-radius", "20px");
    });

    // --- ANIMATIONS (using css transform state) ---
    let rotation = 0;
    let scale = 1;

    function applyTransform() {
        $("#magicBox").css("transform", `rotate(${rotation}deg) scale(${scale})`);
    }

    $("#btnRotate").click(function() {
        rotation += 45;
        applyTransform();
    });

    $("#btnGrow").click(function() {
        scale += 0.2;
        applyTransform();
    });

    $("#btnShrink").click(function() {
        scale -= 0.2;
        if (scale < 0.2) scale = 0.2; // Prevent it from disappearing completely
        applyTransform();
    });

    // --- ENVIRONMENT ---
    $("#btnDarkMode").click(function() {
        $("body").addClass("dark-mode");
    });

    $("#btnLightMode").click(function() {
        $("body").removeClass("dark-mode");
    });

    $("#btnGlow").click(function() {
        $("#magicBox").toggleClass("glow");
    });

});
