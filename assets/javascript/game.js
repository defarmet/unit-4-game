$(document).ready(function() {

var fighter = {
	name: "",
	image: "",
	hp: 0,
	atk: 0,
	counter: 0,
	div: "",

	create: function(name, image, hp, atk, counter) {
		var new_fighter = Object.create(fighter);
		new_fighter.name = name;
		new_fighter.image = image;
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
		this.div.append(this.hp);
	}
}

var fighters = [];

fighters.push(fighter.create("Luke Skywalker", "", 100, 10, 10));
fighters.push(fighter.create("Sheev Palpatine", "", 100, 10, 10));
fighters.push(fighter.create("Darth Vader", "", 100, 10, 10));

for (var i = 0; i < fighters.length; i++) {
	$("#fighters").append(fighters[i].div);
}

var attacker = false;
var defender = false;

function attack() {
	if (defender) {
		defender.hp -= attacker.atk;
		defender.update();
		if (defender.hp > 0) {
			attacker.hp -= defender.counter;
			attacker.update();
		} else {
			defender = false;
			$("#defender").empty();
		}
	}
}

function update_enemies() {
	for (var i = 0; i < fighters.length; i++) {
		$("#enemies").append(fighters[i].div);
	}
}

function set_attacker() {
	$("#fighters").append(attacker.div);
	update_enemies();
}

function set_defender() {
	$("#defender").append(defender.div);
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
