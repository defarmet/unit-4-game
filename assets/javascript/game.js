$(document).ready(function() {

var fighter = {
	name: "",
	image: "",
	hp: 0,
	atk: 0,
	counter: 0,
	div: "",

	create: function(name, image_src, hp, atk, counter) {
		var new_fighter = Object.create(fighter);
		new_fighter.name = name;
		new_fighter.image = $("<img>");
		new_fighter.image.addClass("fighter_image");
		new_fighter.image.attr("src", image_src);
		new_fighter.hp = hp;
		new_fighter.atk = atk;
		new_fighter.counter = counter;

		new_fighter.div = $("<div>");
		new_fighter.div.addClass("fighter");
		new_fighter.div.attr("name", new_fighter.name);
		new_fighter.update();
		return new_fighter;
	},

	update: function() {
		this.div.empty();
		this.div.append(this.name);
		this.div.append("<br>");
		this.div.append(this.image);
		this.div.append("<br>");
		this.div.append("Health: " + this.hp);
	}
}

var fighters = [];

fighters.push(fighter.create("Luke Skywalker", "assets/images/Luke.jpg", 135, 12, 18));
fighters.push(fighter.create("Sheev Palpatine", "assets/images/Sheev.jpg", 160, 10, 25));
fighters.push(fighter.create("Darth Vader", "assets/images/Vader.jpg", 130, 11, 20));
fighters.push(fighter.create("RX-24", "assets/images/RX-24.jpg", 70, 35, 3000));

for (var i = 0; i < fighters.length; i++) {
	$("#fighters").append(fighters[i].div);
}

var attacker = false;
var defender = false;

function attack() {
	if (attacker && defender) {
		defender.hp -= attacker.atk;
		defender.update();
		if (defender.hp > 0) {
			attacker.hp -= defender.counter;
			attacker.update();
			attacker.atk += attacker.counter;
			if (attacker.hp <= 0) {
				attacker = false;
				$("#fighters").empty();
				$("#fighters-text").text("YOU HAVE LOST. PLEASE REFRESH TO TRY AGAIN.");
			}
		} else {
			defender = false;
			$("#defender").empty();
			$("#enemies-text").text("CHOOSE YOUR DEFENDER");
			if (!fighters.length) {
				$("#fighters-text").text("THE FORCE IS STRONG WITH YOU. REFRESH TO PLAY AGAIN.");
				$("#enemies-text").empty();
			}
		}
	}
}

function update_enemies() {
	for (var i = 0; i < fighters.length; i++) {
		$("#enemies").append(fighters[i].div);
	}
}

function set_attacker() {
	attacker.counter = attacker.atk;
	$("#fighters").append(attacker.div);
	$("#fighters-text").text("FIGHTER SELECTED");
	$("#enemies-text").text("CHOOSE YOUR DEFENDER");
	update_enemies();
}

function set_defender() {
	$("#defender").append(defender.div);
	$("#enemies-text").text("DEFENDER SELECTED");
	update_enemies();
}

function select_fighter() {
	if (!attacker) {
		for (var i = 0; i < fighters.length; i++) {
			if (fighters[i].name === $(this).attr("name")) {
				attacker = fighters[i];
				fighters.splice(i, 1);
				set_attacker();
				return;
			}
		}
	}

	if (!defender) {
		for (var i = 0; i < fighters.length; i++) {
			if (fighters[i].name === $(this).attr("name")) {
				defender = fighters[i];
				fighters.splice(i, 1);
				set_defender();
				return;
			}
		}
	}
}

$(".fighter").click(select_fighter);
$("#attack").click(attack);

});
